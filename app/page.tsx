import { defaultContent } from '@/data/content';
import { Home } from '@/views/Home';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';

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
    alternates: { canonical: '/' },
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        href="/media/artbar-home-video-mobile-3%202.mp4"
        as="video"
        type="video/mp4"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        href="/media/artbar-home-video-desktop%201.mp4"
        as="video"
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <Home />
    </>
  );
}
