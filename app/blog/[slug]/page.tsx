import { defaultContent } from '@/data/content';
import { BlogPost } from '@/views/BlogPost';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';

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
  return (
    <>
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
