import { defaultContent } from '@/data/content';
import { BlogPost } from '@/views/BlogPost';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = defaultContent.blog.find(p => p.slug === slug);
  if (!post) return { title: 'Blog | Artbar Tokyo' };
  return {
    title: post.titleEn,
    description: post.excerptEn,
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
    },
  };
}

export default function BlogPostPage() {
  return <BlogPost />;
}
