/**
 * Generate site images via Gemini and write to public/media/generated/.
 *
 * Usage:
 *   npm run generate:images              # all enabled items
 *   npm run generate:images -- --dry-run
 *   npm run generate:images -- --id=hero-team-building
 *
 * Requires GEMINI_API_KEY in .env.local (or env).
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { GoogleGenAI } from '@google/genai';
import { geminiImageGenerationConfig, resolveGeminiImageModel } from '../lib/gemini-image-config';
import { IMAGE_MANIFEST, type ManifestItem } from './image-manifest';

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

function publicUrlToOutputPath(publicUrl: string): string {
  const pathPart = publicUrl.replace(/^\/+/, '');
  return join(process.cwd(), 'public', pathPart);
}

function extMime(path: string): string {
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes('--dry-run');
  let id: string | undefined;
  for (const a of argv) {
    if (a.startsWith('--id=')) id = a.slice('--id='.length);
  }
  return { dryRun, id };
}

async function generateOne(
  ai: GoogleGenAI | null,
  model: string,
  item: ManifestItem,
  dryRun: boolean
): Promise<void> {
  const outPath = publicUrlToOutputPath(item.publicUrl);
  if (dryRun) {
    console.log(`[dry-run] would generate ${item.id} -> ${outPath}`);
    return;
  }

  if (!ai) throw new Error('Missing Gemini client');

  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

  if (item.referencePaths?.length) {
    for (const rel of item.referencePaths) {
      const abs = join(process.cwd(), rel);
      if (!existsSync(abs)) {
        throw new Error(`Reference file missing: ${rel}`);
      }
      const buf = readFileSync(abs);
      const mime = extMime(rel);
      parts.push({ inlineData: { mimeType: mime, data: buf.toString('base64') } });
    }
  }

  parts.push({ text: item.prompt });

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      ...geminiImageGenerationConfig,
    },
  });

  const responseParts = response.candidates?.[0]?.content?.parts;
  const imagePart = responseParts?.find((p: { inlineData?: unknown }) => p.inlineData);

  const data = (imagePart as { inlineData?: { data?: string; mimeType?: string } })?.inlineData;
  if (!data?.data) {
    throw new Error(`No image in response for ${item.id}`);
  }

  const buffer = Buffer.from(data.data, 'base64');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  console.log(`Wrote ${item.id} (${buffer.length} bytes) -> ${outPath}`);
}

async function main() {
  loadEnvLocal();
  const { dryRun, id } = parseArgs();
  const key = process.env.GEMINI_API_KEY;
  if (!key && !dryRun) {
    console.error('GEMINI_API_KEY is not set. Add it to .env.local or export it.');
    process.exit(1);
  }

  const model = resolveGeminiImageModel();
  let items = IMAGE_MANIFEST.items.filter((i) => i.enabled);
  if (id) items = items.filter((i) => i.id === id);
  if (!items.length) {
    console.log('No items to process.');
    process.exit(0);
  }

  console.log(`Model: ${model}, items: ${items.length}${dryRun ? ' (dry-run)' : ''}`);

  const ai = key ? new GoogleGenAI({ apiKey: key }) : null;

  const delayMs = Number(process.env.GEMINI_IMAGE_DELAY_MS || '1500');

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      await generateOne(ai, model, item, dryRun);
    } catch (e) {
      console.error(`Failed ${item.id}:`, e);
      process.exitCode = 1;
      if (!process.env.GEMINI_IMAGE_CONTINUE_ON_ERROR) break;
    }
    if (!dryRun && i < items.length - 1 && delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
