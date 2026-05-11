import { defaultContent } from '@/data/content';
import { PageJsonLd } from '@/components/PageJsonLd';
import { Instructors } from '@/views/Instructors';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  return {
    title: c.instructorsPage.title,
    description: c.instructorsPage.subtitle,
    alternates: buildLocalizedAlternates('/instructors', lang),
    openGraph: buildOpenGraph({
      lang,
      title: c.instructorsPage.title,
      description: c.instructorsPage.subtitle,
    }),
  };
}

export default async function InstructorsPage() {
  const lang = await getRequestLang();
  const c = defaultContent[lang];

  return (
    <>
      <PageJsonLd
        path="/instructors"
        lang={lang}
        name={c.instructorsPage.title}
        description={c.instructorsPage.subtitle}
      />
      <Instructors />
    </>
  );
}
