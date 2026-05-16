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

const normalizedHomePage = homePage.replace(/\s+/g, ' ');
const linkBlocks = normalizedHomePage.match(/<link\b.*?\/>/g) ?? [];
const conditionalBlocks = normalizedHomePage.match(/\{isVideo\((desktopHero|mobileHero)\)[\s\S]*?\)\}/g) ?? [];

function hasLinkBlock(requiredParts: string[]): boolean {
  return linkBlocks.some((block) =>
    requiredParts.every((part) => block.includes(part.replace(/\s+/g, ' ')))
  );
}

assert(
  homePage.includes('getPublishedMediaMap') &&
    homePage.includes("mediaAssetUrl(publishedMedia, 'home.hero.desktop', HERO_HOME_VIDEO_DESKTOP)") &&
    homePage.includes("mediaAssetUrl(publishedMedia, 'home.hero.mobile', HERO_HOME_VIDEO_MOBILE)"),
  'Home hero preloads must resolve published media overrides before falling back to bundled MP4s.'
);

assert(
  conditionalBlocks.some((block) => block.includes('isVideo(desktopHero)')) &&
    hasLinkBlock(['rel="preload"', 'as="video"', 'href={desktopHero}', 'media="(min-width: 768px)"']) &&
    hasLinkBlock(['rel="preload"', 'as="image"', 'imageSrcSet={nextImageSrcSet(desktopHero)}', 'media="(min-width: 768px)"']),
  'Desktop hero preload must support both video fallback and uploaded image overrides.'
);

assert(
  conditionalBlocks.some((block) => block.includes('isVideo(mobileHero)')) &&
    hasLinkBlock(['rel="preload"', 'as="video"', 'href={mobileHero}', 'media="(max-width: 767px)"']) &&
    hasLinkBlock(['rel="preload"', 'as="image"', 'imageSrcSet={nextImageSrcSet(mobileHero)}', 'media="(max-width: 767px)"']),
  'Mobile hero preload must support both video fallback and uploaded image overrides.'
);

console.log('Performance smoke check passed.');
