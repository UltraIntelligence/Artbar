import 'server-only';
import { cookies, headers } from 'next/headers';
import { LANG_COOKIE_NAME, resolveInitialLanguage, type SiteLanguage } from './language';
import type { Metadata } from 'next';

/**
 * Resolve the visitor's preferred language for use inside `generateMetadata`.
 * Mirrors the logic in `app/layout.tsx` and `middleware.ts`: cookie wins, then Accept-Language.
 */
export async function getRequestLang(): Promise<SiteLanguage> {
  const cookieStore = await cookies();
  const acceptLanguage = (await headers()).get('accept-language');
  return resolveInitialLanguage(cookieStore.get(LANG_COOKIE_NAME)?.value, acceptLanguage);
}

export function ogLocale(lang: SiteLanguage): 'ja_JP' | 'en_US' {
  return lang === 'jp' ? 'ja_JP' : 'en_US';
}

const DEFAULT_OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'Artbar Tokyo' };

type OpenGraphImages = NonNullable<NonNullable<Metadata['openGraph']>['images']>;

type BuildOgOptions = {
  lang: SiteLanguage;
  title: string;
  description?: string;
  type?: 'website' | 'article';
  images?: OpenGraphImages;
};

/**
 * Per-page `openGraph` blocks fully override (not merge with) the parent layout's,
 * so we re-include the default OG image here unless the page provides its own.
 */
export function buildOpenGraph(opts: BuildOgOptions): NonNullable<Metadata['openGraph']> {
  const base = {
    title: opts.title,
    ...(opts.description && { description: opts.description }),
    locale: ogLocale(opts.lang),
    images: opts.images ?? [DEFAULT_OG_IMAGE],
  };
  return opts.type === 'article'
    ? { ...base, type: 'article' as const }
    : { ...base, type: 'website' as const };
}
