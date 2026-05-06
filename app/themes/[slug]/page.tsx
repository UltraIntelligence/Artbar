import { ThemeDetail } from '@/views/ThemeDetail';
import type { Metadata } from 'next';
import { THEME_PAGE_IMAGES, type ThemePageSlug } from '@/data/generated-image-paths';
import { getCanonicalThemeSlug, getThemeContent, resolveThemeContentSlug } from '@/data/theme-details';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getRequestLang();
  const theme = getThemeContent(resolveThemeContentSlug(slug), lang);
  const title = theme.seoTitle;
  const description = theme.seoDesc;
  return {
    title: { absolute: title },
    ...(description && { description }),
    alternates: buildLocalizedAlternates(`/themes/${getCanonicalThemeSlug(slug)}`, lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getRequestLang();

  const resolvedSlug = resolveThemeContentSlug(slug);
  const heroImage = THEME_PAGE_IMAGES[resolvedSlug as ThemePageSlug]?.hero;
  const theme = getThemeContent(resolvedSlug, lang);
  const routeLocale = siteLanguageToRouteLocale(lang);
  const themeUrl = publicUrlForPath(`/themes/${getCanonicalThemeSlug(slug)}`, routeLocale);
  const homeUrl = publicUrlForPath('/', routeLocale);
  const homeName = lang === 'jp' ? 'ホーム' : 'Home';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: theme.title, item: themeUrl },
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      {heroImage && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(heroImage)}
          imageSizes="100vw"
          fetchPriority="high"
        />
      )}
      <ThemeDetail />
    </>
  );
}
