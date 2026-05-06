import { Locations } from '@/views/Locations';
import {
  LOCATIONS,
  LOCATION_DEFAULT_OPENING_HOURS,
  LOCATION_DEFAULT_PRICE_RANGE,
} from '@/constants';
import { nextImageSrcSet } from '@/lib/image-preload';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';

export async function generateMetadata(): Promise<Metadata> {
  // No JP entries exist for the locations page hero/title — fall back to JP-equivalent
  // copy derived from the existing nav label. og:locale follows the route language.
  const lang = await getRequestLang();
  const title = lang === 'jp' ? 'スタジオアクセス' : 'Our Locations';
  const description =
    lang === 'jp'
      ? '代官山・原宿・銀座・横浜・大阪のArtbarペイント＆シップ・スタジオ案内。'
      : 'Find Artbar paint and sip studios in Daikanyama, Harajuku, Ginza, Yokohama, and Osaka.';
  return {
    title,
    description,
    alternates: buildLocalizedAlternates('/locations', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

// Preload the first two location images (above the fold on most viewports)
const PRELOAD_LOCATION_IMAGES = LOCATIONS.slice(0, 2).map((loc) => loc.image);

export default async function LocationsPage() {
  const lang = await getRequestLang();
  const locationsUrl = publicUrlForPath('/locations', siteLanguageToRouteLocale(lang));
  const locationsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': LOCATIONS.map((loc) => ({
      '@type': 'LocalBusiness',
      '@id': `${locationsUrl}#${loc.id}`,
      name: loc.nameEn,
      image: `${SITE_URL}${loc.image}`,
      url: `${locationsUrl}#${loc.id}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.addressEn,
        addressCountry: 'JP',
      },
      ...(loc.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: loc.geo.latitude,
          longitude: loc.geo.longitude,
        },
      }),
      openingHours: loc.openingHours ?? LOCATION_DEFAULT_OPENING_HOURS,
      priceRange: loc.priceRange ?? LOCATION_DEFAULT_PRICE_RANGE,
      ...(loc.mapUrl && { hasMap: loc.mapUrl }),
    })),
  };

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
