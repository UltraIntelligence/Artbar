import { defaultContent } from '@/data/content';
import { PageJsonLd } from '@/components/PageJsonLd';
import { PrivateParties } from '@/views/PrivateParties';
import { GI } from '@/data/generated-image-paths';
import { nextImageSrcSet } from '@/lib/image-preload';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

function cleanCopy(s: string): string {
  return s.replace(/<wbr\s*\/?>/g, '').replace(/\s*\n\s*/g, ' ').trim();
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = `${c.privateParties.hero.title} ${c.privateParties.hero.titleHighlight}`.trim();
  const description = cleanCopy(c.privateParties.hero.subtitle);
  return {
    title,
    description,
    alternates: buildLocalizedAlternates('/private-parties', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function PrivatePartiesPage() {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = `${c.privateParties.hero.title} ${c.privateParties.hero.titleHighlight}`.trim();
  const description = cleanCopy(c.privateParties.hero.subtitle);

  return (
    <>
      <PageJsonLd path="/private-parties" lang={lang} name={title} description={description} />
      <link
        rel="preload"
        as="image"
        imageSrcSet={nextImageSrcSet(GI.privateOccasions.birthday)}
        imageSizes="(max-width: 1200px) 100vw, 80vw"
        fetchPriority="high"
      />
      <PrivateParties />
    </>
  );
}
