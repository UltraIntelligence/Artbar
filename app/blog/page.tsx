import { defaultContent } from '@/data/content';
import { BlogList } from '@/views/BlogList';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  return {
    title: c.blogPage.title,
    description: c.blogPage.subtitle,
    alternates: { canonical: '/blog' },
    openGraph: buildOpenGraph({
      lang,
      title: c.blogPage.title,
      description: c.blogPage.subtitle,
    }),
  };
}

export default function BlogPage() {
  return <BlogList />;
}
