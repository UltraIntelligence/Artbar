import { defaultContent } from '@/data/content';
import { Press } from '@/views/Press';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = lang === 'jp' ? c.nav.press : c.pressPage.title;
  return {
    title,
    description: c.pressPage.subtitle,
    alternates: buildLocalizedAlternates('/press', lang),
    openGraph: buildOpenGraph({
      lang,
      title,
      description: c.pressPage.subtitle,
    }),
  };
}

export default function PressPage() {
  return <Press />;
}
