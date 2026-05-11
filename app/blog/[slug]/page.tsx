import { defaultContent } from '@/data/content';
import { BlogPost } from '@/views/BlogPost';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';
import { isBlogPostAvailableForLanguage } from '@/lib/blog-language';
import { metaDescription } from '@/lib/seo-text';

type Props = { params: Promise<{ slug: string }> };

function getPostBySlug(slug: string) {
  return defaultContent.blog.find(p => p.slug === slug && p.published);
}

export function generateStaticParams() {
  return defaultContent.blog
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Blog | Artbar Tokyo' };
  const lang = await getRequestLang();
  const title = lang === 'jp' ? post.titleJp : post.titleEn;
  const isIndexable = isBlogPostAvailableForLanguage(post, lang);
  const hasEnglishVersion = isBlogPostAvailableForLanguage(post, 'en');
  const description = metaDescription(lang === 'jp' ? post.excerptJp : post.excerptEn, lang === 'jp' ? 110 : 155);
  const twitterImage = encodeURI(post.image ?? '/og-image.png');
  return {
    title,
    description,
    alternates: hasEnglishVersion
      ? buildLocalizedAlternates(`/blog/${slug}`, lang)
      : {
          canonical: lang === 'jp' ? `/blog/${slug}` : `/en/blog/${slug}`,
          languages: lang === 'jp' ? { ja: `/blog/${slug}`, 'x-default': `/blog/${slug}` } : undefined,
        },
    ...(!isIndexable && { robots: { index: false, follow: true } }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImage],
    },
    openGraph: buildOpenGraph({
      lang,
      title,
      description,
      type: 'article',
      images: post.image ? [{ url: post.image }] : undefined,
    }),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const lang = await getRequestLang();
  const headline = lang === 'jp' ? post.titleJp : post.titleEn;
  const authorName = lang === 'jp' ? post.authorJp : post.authorEn;
  const routeLocale = siteLanguageToRouteLocale(lang);
  const postUrl = publicUrlForPath(`/blog/${slug}`, routeLocale);
  const blogUrl = publicUrlForPath('/blog', routeLocale);
  const homeUrl = publicUrlForPath('/', routeLocale);

  // post.date arrives as "YYYY.MM.DD" in source data; normalize to ISO 8601 for schema.org.
  const isoDate = post.date.replace(/\./g, '-');

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    ...(post.image && { image: `${SITE_URL}${post.image}` }),
    datePublished: isoDate,
    dateModified: isoDate,
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Artbar Tokyo',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/artbar-logo-dark.png` },
    },
    mainEntityOfPage: postUrl,
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'jp' ? 'ホーム' : 'Home', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: lang === 'jp' ? 'ブログ' : 'Blog', item: blogUrl },
      { '@type': 'ListItem', position: 3, name: headline, item: postUrl },
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogJsonLd) }}
      />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      {post.image && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(post.image)}
          imageSizes="100vw"
          fetchPriority="high"
        />
      )}
      <BlogPost />
    </>
  );
}
