import { defaultContent } from '@/data/content';
import { Home } from '@/views/Home';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

function cleanCopy(s: string): string {
  return s.replace(/<wbr\s*\/?>/g, '').replace(/\s*\n\s*/g, ' ').trim();
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title =
    lang === 'jp'
      ? `${c.home.hero.title}${c.home.hero.titleHighlight}`
      : 'Artbar Tokyo | Paint & Sip Studio';
  const description = cleanCopy(c.home.hero.subtitle);
  return {
    title: { absolute: title },
    description,
    alternates: buildLocalizedAlternates('/', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default function HomePage() {
  return <Home />;
}
