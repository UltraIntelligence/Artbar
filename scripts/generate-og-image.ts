/**
 * Generate the default Open Graph share card.
 *
 * Output: public/og-image.png (1200x630, sRGB PNG).
 *
 * Strategy: Gemini renders an abstract painterly backdrop sized 16:9; sharp
 * resizes/crops to the exact 1200x630 OG spec and composites a wordmark
 * overlay so the brand text is crisp regardless of model text quality.
 *
 * Usage:
 *   npx tsx scripts/generate-og-image.ts
 *   npx tsx scripts/generate-og-image.ts --backdrop-only   # skip text overlay
 *
 * Requires GEMINI_API_KEY in .env.local.
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { GoogleGenAI } from '@google/genai';
import {
  geminiImageGenerationConfig,
  resolveGeminiImageModel,
} from '../lib/gemini-image-config';

const OUT_PATH = join(process.cwd(), 'public', 'og-image.png');
const WIDTH = 1200;
const HEIGHT = 630;

const PROMPT = `Editorial brand share card backdrop for Artbar Tokyo, a paint and sip studio. \
Soft painterly abstract composition: gentle brush strokes and washes of warm taupe (#A39384), \
deep navy (#053761), and off-white cream (#F1EFEC), with subtle hints of muted ochre and dusty rose. \
Composition leaves the lower-left third quiet and unbusy for a wordmark overlay; the upper-right \
two-thirds carries painterly motion and creative energy. Refined, premium, magazine-editorial feel \
— think a high-end gallery's promotional poster. No people, no figures, no text, no logos, no URLs. \
Aspect ratio 16:9, designed to read at thumbnail size.`;

function loadEnvLocal() {
  const envPath = join(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

const TEXT_OVERLAY_SVG = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="legibility" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(5,55,97,0.55)" />
      <stop offset="55%" stop-color="rgba(5,55,97,0.18)" />
      <stop offset="100%" stop-color="rgba(5,55,97,0)" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#legibility)" />
  <text x="80" y="350"
        font-family="'Josefin Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="700" font-size="108"
        fill="#F1EFEC" letter-spacing="-2">
    Artbar Tokyo
  </text>
  <text x="84" y="420"
        font-family="'Josefin Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="500" font-size="34"
        fill="#F1EFEC" opacity="0.92" letter-spacing="4">
    PAINT &#38; SIP STUDIO
  </text>
  <text x="84" y="470"
        font-family="'Josefin Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="400" font-size="22"
        fill="#F1EFEC" opacity="0.78" letter-spacing="3">
    artbar.co.jp
  </text>
</svg>`.trim();

async function generateBackdrop(): Promise<Buffer> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY missing in .env.local');

  const ai = new GoogleGenAI({ apiKey: key });
  const model = resolveGeminiImageModel();

  console.log(`[og-image] requesting backdrop from ${model}...`);
  const response = await ai.models.generateContent({
    model,
    contents: { parts: [{ text: PROMPT }] },
    config: {
      ...geminiImageGenerationConfig,
      imageConfig: { imageSize: '2K', aspectRatio: '16:9' },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: { inlineData?: unknown }) => p.inlineData);
  const data = (imagePart as { inlineData?: { data?: string } })?.inlineData?.data;
  if (!data) throw new Error('No image bytes in Gemini response');

  return Buffer.from(data, 'base64');
}

async function main() {
  loadEnvLocal();
  const backdropOnly = process.argv.includes('--backdrop-only');

  const raw = await generateBackdrop();
  console.log(`[og-image] backdrop received (${raw.length} bytes), resizing...`);

  const resized = await sharp(raw)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .toBuffer();

  if (backdropOnly) {
    await sharp(resized).png({ quality: 92 }).toFile(OUT_PATH);
  } else {
    await sharp(resized)
      .composite([{ input: Buffer.from(TEXT_OVERLAY_SVG), top: 0, left: 0 }])
      .png({ quality: 92 })
      .toFile(OUT_PATH);
  }

  const meta = await sharp(OUT_PATH).metadata();
  console.log(`[og-image] wrote ${OUT_PATH} (${meta.width}x${meta.height}, ${meta.format})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
