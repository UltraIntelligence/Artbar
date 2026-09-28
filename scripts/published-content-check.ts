import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'data/published-source-manifest.json'), 'utf8'));
const media = JSON.parse(readFileSync(join(root, 'data/published-media.json'), 'utf8'));

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

for (const locale of ['en', 'jp']) {
  const bytes = readFileSync(join(root, `data/published-copy/${locale}.json`));
  JSON.parse(bytes.toString('utf8'));
  const digest = createHash('sha256').update(bytes).digest('hex');
  assert(digest === manifest.copy[locale].sha256_file, `${locale} published copy differs from the captured source.`);
}

const slots = Object.keys(manifest.media);
assert(slots.length === 28, `Expected 28 published image slots, found ${slots.length}.`);
assert(Object.keys(media).length === slots.length, 'Published media map and source manifest have different slot counts.');
for (const slot of slots) {
  const expected = manifest.media[slot];
  const url = media[slot]?.url;
  assert(url === expected.local_url && url.startsWith('/media/published/'), `Invalid local image URL for ${slot}.`);
  const localPath = join(root, 'public', url);
  assert(existsSync(localPath), `Missing published image for ${slot}.`);
  const bytes = readFileSync(localPath);
  assert(bytes.length === expected.size, `Published image size changed for ${slot}.`);
  assert(createHash('sha256').update(bytes).digest('hex') === expected.sha256, `Published image changed for ${slot}.`);
}
assert(!JSON.stringify(media).includes('supabase.co'), 'Media map still points to Supabase.');
console.log(`Published content verified: 2 languages and ${slots.length} local images.`);
