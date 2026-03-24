import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { ThemeInjector } from '@/components/ThemeInjector';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  /** Must not be `--font-heading`: that name is the Tailwind v4 token for `font-heading`. */
  variable: '--font-josefin',
  display: 'swap',
});

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefinSans.variable}>
      <body>
        <ContentProvider>
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
