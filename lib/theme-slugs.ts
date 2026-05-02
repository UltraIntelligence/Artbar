import { ARTBAR_BOOKING_URL } from '@/constants';

export type ThemeListItem = {
  title: string;
  desc: string;
  image: string;
  slug?: string;
  bookingUrl?: string;
};

export function themeSlugFromItem(item: Pick<ThemeListItem, 'title' | 'slug'>): string {
  return item.slug ?? item.title.toLowerCase().replace(/ /g, '-').replace('!', '');
}

const THEME_BOOKING_SLUGS: Record<string, string> = {
  'japan-inspired': 'japan-inspired',
  'paint-pouring': 'paint-pouring',
  'paint-your-pet': 'paint-your-pet',
  'alcohol-ink': 'alcohol-ink',
  'van-gogh': 'van-gogh',
  monet: 'monet',
  picasso: 'picasso',
  renoir: 'renoir',
  matisse: 'matisse',
  kids: 'kids',
  'texture-art': 'texture-painting',
  'texture-painting': 'texture-painting',
  'paint-your-idol': 'paint-your-idol',
};

export function themeBookingUrlFromItem(item: ThemeListItem): string {
  if (item.bookingUrl) {
    return item.bookingUrl;
  }

  const siteSlug = themeSlugFromItem(item);
  const bookingSlug = THEME_BOOKING_SLUGS[siteSlug] ?? siteSlug;
  return `${ARTBAR_BOOKING_URL}/themes/${bookingSlug}`;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const rng = mulberry32(hashString(seed));
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Other themes than `currentResolvedSlug`, shuffled deterministically per slug, then truncated. */
export function pickDiscoveryThemes(
  currentResolvedSlug: string,
  items: ThemeListItem[],
  count = 4
): ThemeListItem[] {
  const others = items.filter((item) => themeSlugFromItem(item) !== currentResolvedSlug);
  const shuffled = seededShuffle(others, `discover:${currentResolvedSlug}`);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
