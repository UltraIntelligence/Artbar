import type { Metadata, Viewport } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeInjector } from '@/components/ThemeInjector';
import { AppChrome } from '@/components/AppChrome';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LANG_COOKIE_NAME, resolveInitialLanguage } from '@/lib/language';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import {
  buildResolvedJapaneseCopy,
  mergePublishedIntoContent,
} from '@/lib/copy/resolve';
import { segmentJpDeep } from '@/lib/jp-segment';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Artbar Tokyo',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/artbar-logo-dark.png`,
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
    default: 'Artbar Tokyo | Paint & Sip Studio',
    template: '%s | Artbar Tokyo',
  },
  description: "Artbar Tokyo — Japan's leading paint and sip studio. Creative art classes in Daikanyama, Harajuku, Ginza, Yokohama, and Osaka.",
  metadataBase: new URL('https://artbar.co.jp'),
  openGraph: {
    siteName: 'Artbar Tokyo',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
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
  const initialLang = resolveInitialLanguage(
    cookieStore.get(LANG_COOKIE_NAME)?.value,
    headersList.get('accept-language')
  );
  const htmlLang = initialLang === 'jp' ? 'ja' : 'en';

  // Build the merged content tree server-side. JP visitors get a Supabase fetch +
  // BudouX segmentation; EN visitors skip the fetch and receive the static defaults
  // (still segmented — defaultContent.jp leaks into both branches via the merge).
  // Both branches hand ContentProvider a payload already shaped for direct render —
  // no client-side merge, no client-side BudouX.
  //
  // We track whether the Supabase fetch actually returned data (vs falling back to
  // DEFAULT_JAPANESE_COPY_PAYLOAD on timeout/error). If it fell back, the client
  // should still attempt a runtime fetch to recover fresh published copy.
  const supabaseJpPayload =
    initialLang === 'jp' ? await getPublishedJapaneseCopyPayload({ timeoutMs: 4000 }) : null;
  const publishedPayload = supabaseJpPayload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;
  const initialContent = segmentJpDeep(mergePublishedIntoContent(publishedPayload));
  const initialJpCopy = segmentJpDeep(buildResolvedJapaneseCopy(publishedPayload));
  const initialHasFetchedRuntimeJp = supabaseJpPayload !== null;

  return (
    <html lang={htmlLang} className={josefinSans.variable} suppressHydrationWarning>
      {/* suppressHydrationWarning: extensions (e.g. ColorZilla) may inject attrs on body before hydrate */}
      <body suppressHydrationWarning>
        {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
        />
        <ContentProvider
          initialLang={initialLang}
          initialContent={initialContent}
          initialJpCopy={initialJpCopy}
          initialHasFetchedRuntimeJp={initialHasFetchedRuntimeJp}
        >
          <ThemeInjector />
          <ScrollToTop />
          <AppChrome>{children}</AppChrome>
        </ContentProvider>
      </body>
    </html>
  );
}
