import 'server-only';
import { ARTBAR_BOOKING_URL, ARTBAR_TOKYO_EMAIL, SOCIAL_PROFILE_URLS } from '@/constants';
import type { Location } from '@/types';

/**
 * JSON.stringify with `</` escaped to `<\/` to prevent the JSON payload
 * from terminating the surrounding `<script>` tag if any field ever
 * contains the string `</script>`.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/<\/(?=script)/gi, '<\\/');
}

export const SITE_URL = 'https://artbar.co.jp';
export const SITE_NAME = 'Artbar Tokyo';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(pathOrUrl: string): string {
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: 'Paint Garage LLC.',
    url: SITE_URL,
    logo: absoluteUrl('/brand/artbar-logo-dark.png'),
    image: absoluteUrl('/og-image.png'),
    email: ARTBAR_TOKYO_EMAIL,
    sameAs: SOCIAL_PROFILE_URLS,
    areaServed: [
      { '@type': 'City', name: 'Tokyo' },
      { '@type': 'City', name: 'Yokohama' },
      { '@type': 'City', name: 'Osaka' },
    ],
    knowsAbout: [
      'Paint and sip classes',
      'Art workshops',
      'Private painting parties',
      'Corporate team building',
      'Bilingual art instruction',
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: ['ja', 'en'],
    potentialAction: {
      '@type': 'ReserveAction',
      target: ARTBAR_BOOKING_URL,
      name: 'View Artbar Tokyo schedule',
    },
  };
}

export function buildWebPageJsonLd({
  url,
  name,
  description,
  lang,
}: {
  url: string;
  name: string;
  description?: string;
  lang: 'ja' | 'en';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description && { description }),
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}

export function buildServiceJsonLd({
  url,
  name,
  description,
  serviceType,
}: {
  url: string;
  name: string;
  description?: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    url,
    serviceType,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'City', name: 'Tokyo' },
      { '@type': 'City', name: 'Yokohama' },
      { '@type': 'City', name: 'Osaka' },
    ],
    ...(description && { description }),
  };
}

export function buildLocalBusinessJsonLd({
  location,
  pageUrl,
  lang,
  openingHours,
  priceRange,
}: {
  location: Location;
  pageUrl: string;
  lang: 'ja' | 'en';
  openingHours: string[];
  priceRange: string;
}) {
  const name = lang === 'ja' ? location.nameJp : location.nameEn;
  const address = lang === 'ja' ? location.addressJp : location.addressEn;

  return {
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#${location.id}`,
    name,
    image: absoluteUrl(location.image),
    url: `${pageUrl}#${location.id}`,
    parentOrganization: { '@id': ORGANIZATION_ID },
    email: ARTBAR_TOKYO_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressCountry: 'JP',
    },
    ...(location.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.geo.latitude,
        longitude: location.geo.longitude,
      },
    }),
    openingHours,
    priceRange,
    ...(location.mapUrl && { hasMap: location.mapUrl }),
  };
}
