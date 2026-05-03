import { defaultContent } from '@/data/content';
import { BlogPost } from '@/views/BlogPost';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';
import { safeJsonLd, SITE_URL } from '@/lib/jsonld';

type Props = { params: Promise<{ slug: string }> };

function getPostBySlug(slug: string) {
  return defaultContent.blog.find(p => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Blog | Artbar Tokyo' };
  const lang = await getRequestLang();
  const title = lang === 'jp' ? post.titleJp : post.titleEn;
  const description = lang === 'jp' ? post.excerptJp : post.excerptEn;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
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
  const postUrl = `${SITE_URL}/blog/${slug}`;

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
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
