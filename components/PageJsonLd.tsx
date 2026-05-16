import { buildWebPageJsonLd, safeJsonLd } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';
import type { SiteLanguage } from '@/lib/language';

type PageJsonLdProps = {
  path: string;
  lang: SiteLanguage;
  name: string;
  description?: string;
};

export function PageJsonLd({ path, lang, name, description }: PageJsonLdProps) {
  const routeLocale = siteLanguageToRouteLocale(lang);
  const schemaLang = routeLocale === 'ja' ? 'ja' : 'en';
  const jsonLd = buildWebPageJsonLd({
    url: publicUrlForPath(path, routeLocale),
    name,
    description,
    lang: schemaLang,
  });

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
  );
}
