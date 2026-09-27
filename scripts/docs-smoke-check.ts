import { readFileSync } from 'fs';
import { join } from 'path';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const readme = readFileSync(join(process.cwd(), 'README.md'), 'utf8');
const dataModel = readFileSync(join(process.cwd(), 'data-model.md'), 'utf8');

assert(readme.includes('Artbar Tokyo'), 'README must describe the Artbar Tokyo site.');
assert(!readme.includes('AI Studio app'), 'README must not keep the old AI Studio boilerplate.');
assert(!readme.includes('ai.studio/apps'), 'README must not link to the old AI Studio app.');
assert(dataModel.includes('data/published-copy/en.json'), 'data-model.md must describe checked-in English copy.');
assert(dataModel.includes('data/published-copy/jp.json'), 'data-model.md must describe checked-in Japanese copy.');
assert(dataModel.includes('data/published-media.json'), 'data-model.md must describe local published media.');
assert(!readme.includes('Go to `/copy-admin`'), 'README must not advertise the retired copy admin.');
assert(dataModel.includes('/api/copy-public'), 'data-model.md must document the public copy API.');
assert(dataModel.includes('Contact form email'), 'data-model.md must document the contact form service.');
assert(dataModel.includes('Paint Your Pet sketch'), 'data-model.md must keep the sketch service context.');

console.log('Docs smoke check passed.');
