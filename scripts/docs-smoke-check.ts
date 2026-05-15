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
assert(!dataModel.includes('There is **no database**'), 'data-model.md must not claim the app has no database.');
assert(!dataModel.includes('/api/ai-text'), 'data-model.md must not document the removed /api/ai-text route.');
assert(!dataModel.includes('views/Admin.tsx'), 'data-model.md must not document the removed views/Admin.tsx flow.');
assert(!dataModel.includes('`/admin`'), 'data-model.md must not point readers to the removed /admin route.');
assert(
  !dataModel.includes('Empty arrays in saved JSON **do not** override defaults'),
  'data-model.md must not claim empty arrays preserve defaults.',
);
assert(
  !dataModel.includes('empty arrays keep defaults'),
  'data-model.md must not claim empty arrays keep defaults.',
);
assert(
  dataModel.includes('Supabase-backed Japanese copy publishing layer'),
  'data-model.md must describe the Supabase-backed Japanese copy publishing layer.',
);
assert(dataModel.includes('/copy-admin'), 'data-model.md must document the copy-admin workflow.');
assert(dataModel.includes('GET /api/copy-public'), 'data-model.md must document the public copy API.');
assert(dataModel.includes('POST /api/contact'), 'data-model.md must document the contact API.');
assert(dataModel.includes('POST /api/generate-sketch'), 'data-model.md must keep the sketch API contract.');

console.log('Docs smoke check passed.');
