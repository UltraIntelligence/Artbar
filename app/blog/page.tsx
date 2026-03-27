import { defaultContent } from '@/data/content';
import { BlogList } from '@/views/BlogList';
import { nextImageSrcSet } from '@/lib/image-preload';

export const metadata = {
  title: defaultContent.en.blogPage.title,
  description: defaultContent.en.blogPage.subtitle,
};

// Preload the first published blog post's cover image
const firstPostImage = defaultContent.blog.find((p) => p.published)?.image;

export default function BlogPage() {
  return (
    <>
      {firstPostImage && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(firstPostImage)}
          imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fetchPriority="high"
        />
      )}
      <BlogList />
    </>
  );
}
