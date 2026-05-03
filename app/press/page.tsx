import { defaultContent } from '@/data/content';
import { Press } from '@/views/Press';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  return {
    title: c.pressPage.title,
    description: c.pressPage.subtitle,
    alternates: { canonical: '/press' },
    openGraph: buildOpenGraph({
      lang,
      title: c.pressPage.title,
      description: c.pressPage.subtitle,
    }),
  };
}

export default function PressPage() {
  return <Press />;
}
