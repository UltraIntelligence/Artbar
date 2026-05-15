import { readFileSync } from 'fs';
import { join } from 'path';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');

const constantsImport = homePage.match(/import\s*\{([\s\S]*?)\}\s*from\s*['"]@\/constants['"]/);
const importedConstants = constantsImport?.[1] ?? '';

assert(
  /\bHERO_HOME_VIDEO_DESKTOP\b/.test(importedConstants) &&
    /\bHERO_HOME_VIDEO_MOBILE\b/.test(importedConstants),
  'Home page must import both hero MP4 constants from @/constants.'
);

const linkBlocks = homePage.match(/<link\b[\s\S]*?\/>/g) ?? [];

function hasLinkBlock(requiredParts: string[]): boolean {
  return linkBlocks.some((block) => requiredParts.every((part) => block.includes(part)));
}

assert(
  hasLinkBlock([
    'rel="preload"',
    'as="video"',
    'href={HERO_HOME_VIDEO_DESKTOP}',
    'type="video/mp4"',
    'media="(min-width: 768px)"',
  ]),
  'Desktop hero video preload must use the imported desktop constant and desktop media scope.'
);

assert(
  hasLinkBlock([
    'rel="preload"',
    'as="video"',
    'href={HERO_HOME_VIDEO_MOBILE}',
    'type="video/mp4"',
    'media="(max-width: 767px)"',
  ]),
  'Mobile hero video preload must use the imported mobile constant and mobile media scope.'
);

console.log('Performance smoke check passed.');
