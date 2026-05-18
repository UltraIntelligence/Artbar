import type { Metadata, Viewport } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeInjector } from '@/components/ThemeInjector';
import { AppChrome } from '@/components/AppChrome';
import { ScrollToTop } from '@/components/ScrollToTop';
import {
  LANG_COOKIE_NAME,
  ROUTE_LOCALE_HEADER,
  ROUTE_PATHNAME_HEADER,
  resolveInitialLanguage,
  resolveRouteLanguage,
} from '@/lib/language';
import { getPublishedCopyPayload } from '@/lib/copy/store';
import { DEFAULT_COPY_PAYLOADS } from '@/lib/copy/defaults';
import {
  buildResolvedJapaneseCopy,
  mergePublishedLocaleIntoContent,
} from '@/lib/copy/resolve';
import { getPublishedMediaMap } from '@/lib/media/store';
import { mergeMediaIntoContent } from '@/lib/media/resolve';
import { segmentJpDeep } from '@/lib/jp-segment';
import { buildOrganizationJsonLd, buildWebsiteJsonLd, safeJsonLd } from '@/lib/jsonld';
import { trimBlogBodiesForPath } from '@/lib/content-payload';

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [buildOrganizationJsonLd(), buildWebsiteJsonLd()],
};

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  /** Must not be `--font-heading`: that name is the Tailwind v4 token for `font-heading`. */
  variable: '--font-josefin',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'Artbar Tokyo | 東京のペイント＆シップスタジオ',
    template: '%s | Artbar Tokyo',
  },
  description: 'Artbar Tokyoは、東京・横浜・大阪で楽しめるペイント＆シップスタジオです。初心者歓迎、ワインやドリンク付きのアート体験を提供しています。',
  metadataBase: new URL('https://artbar.co.jp'),
  openGraph: {
    siteName: 'Artbar Tokyo',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Artbar Tokyo' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const initialLang =
    resolveRouteLanguage(headersList.get(ROUTE_LOCALE_HEADER)) ??
    resolveInitialLanguage(cookieStore.get(LANG_COOKIE_NAME)?.value, headersList.get('accept-language'));
  const htmlLang = initialLang === 'jp' ? 'ja' : 'en';

  // Build the active language content tree server-side. Japanese content still
  // gets BudouX segmentation before render; English receives the same locale-aware
  // published-copy path without segmentation.
  const [supabasePayload, publishedMedia] = await Promise.all([
    getPublishedCopyPayload(initialLang, { timeoutMs: 4000 }),
    getPublishedMediaMap(),
  ]);
  const publishedPayload = supabasePayload ?? DEFAULT_COPY_PAYLOADS[initialLang];
  const mergedContent = mergePublishedLocaleIntoContent(initialLang, publishedPayload);
  const contentForLanguage = initialLang === 'jp' ? segmentJpDeep(mergedContent) : mergedContent;
  const initialContent = mergeMediaIntoContent(contentForLanguage, publishedMedia);
  const requestPathname = headersList.get(ROUTE_PATHNAME_HEADER);
  const trimmedInitialContent = trimBlogBodiesForPath(initialContent, requestPathname);
  const initialLocalizedCopy =
    initialLang === 'jp'
      ? segmentJpDeep(buildResolvedJapaneseCopy(publishedPayload))
      : buildResolvedJapaneseCopy(publishedPayload);
  const initialHasFetchedRuntimeCopy = supabasePayload !== null;

  return (
    <html lang={htmlLang} className={josefinSans.variable} suppressHydrationWarning>
      {/* suppressHydrationWarning: extensions (e.g. ColorZilla) may inject attrs on body before hydrate */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(siteJsonLd) }}
        />
        <ContentProvider
          initialLang={initialLang}
          initialContent={trimmedInitialContent}
          initialLocalizedCopy={initialLocalizedCopy}
          initialMedia={publishedMedia}
          initialHasFetchedRuntimeCopy={initialHasFetchedRuntimeCopy}
        >
          <ThemeInjector />
          <ScrollToTop />
          <AppChrome>{children}</AppChrome>
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  );
}
