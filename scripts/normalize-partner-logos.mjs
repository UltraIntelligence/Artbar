/**
 * Normalize partner logo SVGs so they carry equal *visual mass* in the logo
 * wall — no more hand-tuning a per-brand scale factor by eye.
 *
 * For each SVG in public/brand/partners/ this:
 *   1. Rasterizes it and finds the tight painted bounding box.
 *   2. Rewrites the SVG's viewBox in place to that box (removes the arbitrary
 *      internal padding that made object-contain size marks inconsistently)
 *      and drops fixed width/height so the mark scales fluidly.
 *   3. Derives one optical scale per brand from its aspect ratio, calibrated
 *      to the existing hand-tuned look: in a height-matched row a solid,
 *      near-square emblem (Apple, GE) reads heavier than a thin wordmark, so
 *      it is scaled down; wide wordmarks sit at full height. The curve is a
 *      power law fit to the previous by-eye values — new logos auto-match the
 *      established look. Tune EXPONENT / REF_ASPECT globally, never per-brand.
 *
 * Output: data/partner-logo-normalization.ts (GENERATED — do not edit).
 *
 * Re-runnable and idempotent: once a viewBox is tight, re-measuring yields the
 * same box and the same scale. Add a client = drop its SVG in the folder and
 * run `npm run normalize:logos`.
 *
 * Usage: node scripts/normalize-partner-logos.mjs [--dry]
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SVG_DIR = join(ROOT, 'public/brand/partners');
const OUT_FILE = join(ROOT, 'data/partner-logo-normalization.ts');

const DRY = process.argv.includes('--dry');
const ALPHA_THRESHOLD = 16; // treat pixels with alpha > this as "painted ink"
const RENDER_DENSITY = 220; // rasterization density; higher = tighter bbox

// Optical-scale curve: scale = clamp((aspect / REF_ASPECT) ** EXPONENT, MIN, 1).
// Fit to the previous hand-tuned values (Apple 0.81->~0.70, GE 1.0->~0.72,
// Nike 2.8->1.0). REF_ASPECT is the aspect at which a mark sits at full height;
// EXPONENT controls how hard sub-reference (emblem) marks are pulled down.
const REF_ASPECT = 2.8;
const EXPONENT = 0.32;
const SCALE_MIN = 0.66; // floor so the squarest marks never vanish

// Rare per-brand nudges for lockups the pure-aspect curve misreads. Keep this
// as small as possible — it is NOT a return to hand-tuning every logo. Adidas
// is the stacked bars-over-wordmark lockup: its 1.48 aspect earns a 0.82 scale,
// but the wordmark's cap-height then reads ~20% smaller than neighboring marks,
// so it gets a documented bump. Everything not listed stays fully auto-derived.
const SCALE_OVERRIDES = {
  Adidas: 0.94,
};

// Previous by-eye desktop scales, for the sanity-check column in the report.
const PREV_SCALE = {
  Apple: 0.7, GE: 0.72, Toyota: 0.78, Adidas: 0.72,
  Spotify: 0.88, 'Coca-Cola': 0.92, Netflix: 0.92,
};

/** Display name from filename: coca-cola.svg -> "Coca-Cola", ge.svg -> "GE". */
const NAME_OVERRIDES = {
  'coca-cola': 'Coca-Cola',
  ge: 'GE',
  loreal: "L'Oreal",
  lumine: 'LUMINE',
  'morrison-foerster': 'Morrison Foerster',
};
function displayName(slug) {
  if (NAME_OVERRIDES[slug]) return NAME_OVERRIDES[slug];
  return slug.replace(/(^|-)([a-z])/g, (_, sep, c) => (sep ? ' ' : '') + c.toUpperCase());
}

/** Parse the user-space box from an SVG's viewBox, falling back to width/height. */
function userBox(svg) {
  const vb = svg.match(/viewBox\s*=\s*['"]([\d.\s+,-]+)['"]/i);
  if (vb) {
    const [minX, minY, w, h] = vb[1].trim().split(/[\s,]+/).map(Number);
    if ([minX, minY, w, h].every((n) => Number.isFinite(n)) && w > 0 && h > 0) {
      return { minX, minY, w, h };
    }
  }
  const w = Number(svg.match(/\bwidth\s*=\s*['"]([\d.]+)['"]/i)?.[1]);
  const h = Number(svg.match(/\bheight\s*=\s*['"]([\d.]+)['"]/i)?.[1]);
  if (w > 0 && h > 0) return { minX: 0, minY: 0, w, h };
  throw new Error('no viewBox or width/height');
}

/** Tight painted bbox (raster px) + painted-pixel count from an RGBA buffer. */
function measure(data, info) {
  const { width, height, channels } = info;
  let minX = width, minY = height, maxX = -1, maxY = -1, painted = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * channels + (channels - 1)];
      if (alpha > ALPHA_THRESHOLD) {
        painted++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('fully transparent render');
  return { minX, minY, maxX, maxY, painted };
}

/** Replace the opening <svg> tag's viewBox and strip fixed width/height. */
function rewriteViewBox(svg, vb) {
  const round = (n) => Number(n.toFixed(2));
  const viewBox = `${round(vb.minX)} ${round(vb.minY)} ${round(vb.w)} ${round(vb.h)}`;
  return svg.replace(/<svg\b[^>]*>/i, (tag) => {
    const out = tag
      .replace(/\s+viewBox\s*=\s*['"][^'"]*['"]/gi, '')
      .replace(/\s+width\s*=\s*['"][^'"]*['"]/gi, '')
      .replace(/\s+height\s*=\s*['"][^'"]*['"]/gi, '');
    return out.replace(/<svg\b/i, `<svg viewBox="${viewBox}"`);
  });
}

const files = readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg')).sort();
const logos = [];

for (const file of files) {
  const slug = basename(file, '.svg');
  const path = join(SVG_DIR, file);
  const svg = readFileSync(path, 'utf8');
  const box = userBox(svg);

  const { data, info } = await sharp(Buffer.from(svg), { density: RENDER_DENSITY })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const m = measure(data, info);

  // px -> user units
  const sx = box.w / info.width;
  const sy = box.h / info.height;
  const tightW = (m.maxX - m.minX + 1) * sx;
  const tightH = (m.maxY - m.minY + 1) * sy;
  const tightVB = {
    minX: box.minX + m.minX * sx,
    minY: box.minY + m.minY * sy,
    w: tightW,
    h: tightH,
  };

  // Tight-box aspect drives the optical scale; ink fraction is reported for
  // transparency (denser marks may want a touch more shrink via EXPONENT).
  const tightBoxPx = (m.maxX - m.minX + 1) * (m.maxY - m.minY + 1);
  const inkFraction = m.painted / tightBoxPx;
  const aspect = tightW / tightH;

  const name = displayName(slug);
  const raw = (aspect / REF_ASPECT) ** EXPONENT;
  const aspectScale = Math.min(1, Math.max(SCALE_MIN, raw));
  const scale = Number((SCALE_OVERRIDES[name] ?? aspectScale).toFixed(3));

  logos.push({
    slug,
    name,
    path,
    svg,
    tightVB,
    aspect,
    inkFraction,
    scale,
    width: Number(tightVB.w.toFixed(2)),
    height: Number(tightVB.h.toFixed(2)),
  });
}

// Report — new scale next to the previous hand-tuned value where one existed.
const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${pad('logo', 22)}${pad('aspect', 9)}${pad('ink', 8)}${pad('scale', 8)}prev`);
for (const l of logos) {
  const prev = PREV_SCALE[l.name] != null ? PREV_SCALE[l.name] : '—';
  console.log(
    `${pad(l.name, 22)}${pad(l.aspect.toFixed(2), 9)}${pad(l.inkFraction.toFixed(2), 8)}${pad(l.scale, 8)}${prev}`,
  );
}

if (DRY) {
  console.log('\n[--dry] no files written.');
  process.exit(0);
}

// Rewrite each SVG's viewBox in place.
for (const l of logos) {
  writeFileSync(l.path, rewriteViewBox(l.svg, l.tightVB));
}

// Emit the generated data file.
const entries = logos
  .map((l) => `  ${JSON.stringify(l.name)}: { scale: ${l.scale}, width: ${l.width}, height: ${l.height} },`)
  .join('\n');
const banner = `// GENERATED by scripts/normalize-partner-logos.mjs — do not edit by hand.
// Run \`npm run normalize:logos\` after adding or changing a partner SVG.
`;
const body = `${banner}
export type PartnerLogoNormalization = { scale: number; width: number; height: number };

/** Per-brand optical scale (aspect-calibrated) + tight intrinsic dimensions. */
export const PARTNER_LOGO_NORMALIZATION: Record<string, PartnerLogoNormalization> = {
${entries}
};
`;
writeFileSync(OUT_FILE, body);
console.log(`\nWrote ${basename(OUT_FILE)} and normalized ${logos.length} SVG viewBoxes.`);
