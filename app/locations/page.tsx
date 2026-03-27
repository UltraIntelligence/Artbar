import { Locations } from '@/views/Locations';
import { LOCATIONS } from '@/constants';
import { nextImageSrcSet } from '@/lib/image-preload';

export const metadata = {
  title: 'Our Locations',
  description: 'Find Artbar paint and sip studios in Daikanyama, Harajuku, Ginza, Yokohama, Osaka, and Okinawa.',
  alternates: { canonical: '/locations' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: LOCATIONS.map((loc, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'ArtStudio',
      name: loc.nameEn,
      address: loc.addressEn,
      url: `https://artbar.co.jp/locations#${loc.id}`,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
