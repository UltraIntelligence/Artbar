import { defaultContent } from '@/data/content';
import { PrivateParties } from '@/views/PrivateParties';
import { GI } from '@/data/generated-image-paths';
import { nextImageSrcSet } from '@/lib/image-preload';

export const metadata = {
  title: defaultContent.en.privateParties.hero.title,
  description: defaultContent.en.privateParties.hero.subtitle,
  alternates: { canonical: '/private-parties' },
};

export default function PrivatePartiesPage() {
  return (
    <>
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
