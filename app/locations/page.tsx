import { Locations } from '@/views/Locations';
import { LOCATIONS } from '@/constants';

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

export default function LocationsPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Locations />
    </>
  );
}
