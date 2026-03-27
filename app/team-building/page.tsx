import { defaultContent } from '@/data/content';
import { TeamBuilding } from '@/views/TeamBuilding';
import { GI } from '@/data/generated-image-paths';
import { nextImageSrcSet } from '@/lib/image-preload';

export const metadata = {
  title: defaultContent.en.teamBuilding.hero.title,
  description: defaultContent.en.teamBuilding.hero.subtitle,
  alternates: { canonical: '/team-building' },
};

export default function TeamBuildingPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={nextImageSrcSet(GI.heroTeamBuilding)}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <TeamBuilding />
    </>
  );
}
