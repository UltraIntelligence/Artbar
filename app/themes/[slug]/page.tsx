import { ThemeDetail } from '@/views/ThemeDetail';
import { PageJsonLd } from '@/components/PageJsonLd';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { THEME_PAGE_IMAGES, THEME_PAGE_SLUGS, type ThemePageSlug } from '@/data/generated-image-paths';
import { getCanonicalThemeSlug, getThemeContent, hasThemeContent, resolveThemeContentSlug } from '@/data/theme-details';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getPublishedMediaMap } from '@/lib/media/store';
import { mediaAssetUrl } from '@/lib/media/resolve';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';
import { buildServiceJsonLd, safeJsonLd } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Array.from(new Set(THEME_PAGE_SLUGS.map((slug) => getCanonicalThemeSlug(slug)))).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasThemeContent(slug)) notFound();
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
  if (!hasThemeContent(slug)) notFound();
  const lang = await getRequestLang();

  const resolvedSlug = resolveThemeContentSlug(slug);
  const publishedMedia = await getPublishedMediaMap();
  const heroImage = mediaAssetUrl(
    publishedMedia,
    `themes.${resolvedSlug}.hero`,
    THEME_PAGE_IMAGES[resolvedSlug as ThemePageSlug]?.hero ?? '',
  );
  const theme = getThemeContent(resolvedSlug, lang);
  const routeLocale = siteLanguageToRouteLocale(lang);
  const themeUrl = publicUrlForPath(`/themes/${getCanonicalThemeSlug(slug)}`, routeLocale);
  const homeUrl = publicUrlForPath('/', routeLocale);
  const homeName = lang === 'jp' ? 'ホーム' : 'Home';
  const canonicalPath = `/themes/${getCanonicalThemeSlug(slug)}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: theme.title, item: themeUrl },
    ],
  };

  const serviceJsonLd = buildServiceJsonLd({
    url: themeUrl,
    name: theme.title,
    description: theme.seoDesc,
    serviceType: 'Paint and sip art class',
  });

  return (
    <>
      <PageJsonLd path={canonicalPath} lang={lang} name={theme.seoTitle} description={theme.seoDesc} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }}
      />
      {heroImage && (
        <link
          rel="preload"
          as="image"
          {...(process.env.NODE_ENV === 'development'
            ? { href: heroImage }
            : { imageSrcSet: nextImageSrcSet(heroImage), imageSizes: '100vw' })}
          fetchPriority="high"
        />
      )}
      <ThemeDetail />
    </>
  );
}
