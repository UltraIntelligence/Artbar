import { defaultContent } from '@/data/content';
import { PageJsonLd } from '@/components/PageJsonLd';
import { Home } from '@/views/Home';
import { HERO_HOME_VIDEO_DESKTOP, HERO_HOME_VIDEO_MOBILE } from '@/constants';
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

export default async function HomePage() {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title =
    lang === 'jp'
      ? `${c.home.hero.title}${c.home.hero.titleHighlight}`
      : 'Artbar Tokyo | Paint & Sip Studio';
  const description = cleanCopy(c.home.hero.subtitle);

  return (
    <>
      <link
        rel="preload"
        as="video"
        href={HERO_HOME_VIDEO_DESKTOP}
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="video"
        href={HERO_HOME_VIDEO_MOBILE}
        type="video/mp4"
        media="(max-width: 767px)"
      />
      <PageJsonLd path="/" lang={lang} name={title} description={description} />
      <Home />
    </>
  );
}
