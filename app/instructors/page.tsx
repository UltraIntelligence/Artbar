import { defaultContent } from '@/data/content';
import { Instructors } from '@/views/Instructors';
import { GI, INSTRUCTOR_IDS } from '@/data/generated-image-paths';
import { nextImageSrcSet } from '@/lib/image-preload';

export const metadata = {
  title: defaultContent.en.instructorsPage.title,
  description: defaultContent.en.instructorsPage.subtitle,
  alternates: { canonical: '/instructors' },
};

// Preload the first three instructor artwork images (above-the-fold on all viewports)
const PRELOAD_ARTWORKS = INSTRUCTOR_IDS.slice(0, 3).map((id) => GI.instructors[id].artwork);

export default function InstructorsPage() {
  return (
    <>
      {PRELOAD_ARTWORKS.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(src)}
          imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fetchPriority="high"
        />
      ))}
      <Instructors />
    </>
  );
}
