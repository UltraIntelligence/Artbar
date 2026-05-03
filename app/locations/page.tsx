import { Locations } from '@/views/Locations';
import { LOCATIONS } from '@/constants';
import { nextImageSrcSet } from '@/lib/image-preload';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';

export async function generateMetadata(): Promise<Metadata> {
  // No JP entries exist for the locations page hero/title — fall back to JP-equivalent
  // copy derived from the existing nav label. og:locale still switches per visitor.
  const lang = await getRequestLang();
  const title = lang === 'jp' ? 'スタジオアクセス' : 'Our Locations';
  const description =
    lang === 'jp'
      ? '代官山・原宿・銀座・横浜・大阪のArtbarペイント＆シップ・スタジオ案内。'
      : 'Find Artbar paint and sip studios in Daikanyama, Harajuku, Ginza, Yokohama, and Osaka.';
  return {
    title,
    description,
    alternates: { canonical: '/locations' },
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

const locationsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': LOCATIONS.map((loc) => ({
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/locations#${loc.id}`,
    name: loc.nameEn,
    image: `${SITE_URL}${loc.image}`,
    url: `${SITE_URL}/locations#${loc.id}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.addressEn,
      addressCountry: 'JP',
    },
    ...(loc.mapUrl && { hasMap: loc.mapUrl }),
  })),
};

// Preload the first two location images (above the fold on most viewports)
const PRELOAD_LOCATION_IMAGES = LOCATIONS.slice(0, 2).map((loc) => loc.image);

export default function LocationsPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(locationsJsonLd) }}
      />
      {PRELOAD_LOCATION_IMAGES.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(src)}
          imageSizes="(max-width: 1024px) 100vw, 40vw"
          fetchPriority="high"
        />
      ))}
      <Locations />
    </>
  );
}
