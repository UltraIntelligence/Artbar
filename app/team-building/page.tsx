import { defaultContent } from '@/data/content';
import { PageJsonLd } from '@/components/PageJsonLd';
import { TeamBuilding } from '@/views/TeamBuilding';
import { GI } from '@/data/generated-image-paths';
import { nextImageSrcSet } from '@/lib/image-preload';
import { getPublishedMediaMap } from '@/lib/media/store';
import { mediaAssetUrl } from '@/lib/media/resolve';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';

function cleanCopy(s: string): string {
  return s.replace(/<wbr\s*\/?>/g, '').replace(/\s*\n\s*/g, ' ').trim();
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = `${c.teamBuilding.hero.title} ${c.teamBuilding.hero.titleHighlight}`.trim();
  const description = cleanCopy(c.teamBuilding.hero.subtitle);
  return {
    title,
    description,
    alternates: buildLocalizedAlternates('/team-building', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function TeamBuildingPage() {
  const lang = await getRequestLang();
  const publishedMedia = await getPublishedMediaMap();
  const c = defaultContent[lang];
  const title = `${c.teamBuilding.hero.title} ${c.teamBuilding.hero.titleHighlight}`.trim();
  const description = cleanCopy(c.teamBuilding.hero.subtitle);
  const heroImage = mediaAssetUrl(publishedMedia, 'teamBuilding.hero', GI.heroTeamBuilding);

  return (
    <>
      <PageJsonLd path="/team-building" lang={lang} name={title} description={description} />
      <link
        rel="preload"
        as="image"
        imageSrcSet={nextImageSrcSet(heroImage)}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <TeamBuilding />
    </>
  );
}
