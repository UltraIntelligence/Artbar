import { defaultContent } from '@/data/content';
import { BlogList } from '@/views/BlogList';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = lang === 'jp' ? 'Artbarジャーナル' : c.blogPage.title;
  return {
    title,
    description: c.blogPage.subtitle,
    alternates: buildLocalizedAlternates('/blog', lang),
    openGraph: buildOpenGraph({
      lang,
      title,
      description: c.blogPage.subtitle,
    }),
  };
}

export default function BlogPage() {
  return <BlogList />;
}
