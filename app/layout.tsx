import type { Metadata, Viewport } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeInjector } from '@/components/ThemeInjector';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LANG_COOKIE_NAME, resolveInitialLanguage } from '@/lib/language';

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
  description: "Artbar Tokyo — Japan's leading paint and sip studio. Creative art classes in Daikanyama, Harajuku, Ginza, Yokohama, Osaka and Okinawa.",
  metadataBase: new URL('https://artbar.co.jp'),
  openGraph: {
    siteName: 'Artbar Tokyo',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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

  return (
    <html lang={htmlLang} className={josefinSans.variable} suppressHydrationWarning>
      {/* suppressHydrationWarning: extensions (e.g. ColorZilla) may inject attrs on body before hydrate */}
      <body suppressHydrationWarning>
        <ContentProvider initialLang={initialLang}>
          <ThemeInjector />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans text-artbar-navy selection:bg-artbar-taupe selection:text-white">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ContentProvider>
      </body>
    </html>
  );
}
