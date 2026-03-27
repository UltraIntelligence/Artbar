import { ThemeDetail } from '@/views/ThemeDetail';
import type { Metadata } from 'next';
import { THEME_PAGE_IMAGES, type ThemePageSlug } from '@/data/generated-image-paths';
import { resolveThemeContentSlug } from '@/data/theme-details';
import { nextImageSrcSet } from '@/lib/image-preload';

type Props = { params: Promise<{ slug: string }> };

const THEME_TITLES: Record<string, string> = {
  'japan-inspired': 'Japan-Inspired Painting Classes Tokyo | Artbar Tokyo',
  'van-gogh': 'Van Gogh Painting Class Tokyo | Artbar Paint and Sip',
  'paint-pouring': 'Paint Pouring Classes Tokyo | Fluid Art Paint and Sip Artbar',
  'alcohol-ink': 'Alcohol Ink Art Tokyo | Paint and Sip Classes | Artbar',
  'monet': 'Monet Painting Classes Tokyo | Impressionist Paint and Sip',
  'picasso': 'Picasso Abstract Art Class Tokyo | Paint and Sip Artbar',
  'renoir': 'Renoir Painting Class Tokyo | Romantic Paint and Sip Artbar',
  'matisse': 'Matisse Modern Art Class Tokyo | Paint and Sip Artbar',
  'kids': "Kids Art Classes Tokyo | Children's Painting Workshops Artbar",
  'texture-art': 'Texture Painting Classes Tokyo | Sculptural Art Artbar',
  'texture-painting': 'Texture Painting Classes Tokyo | Sculptural Art Artbar',
  'paint-your-pet': 'Paint Your Pet Tokyo | Pet Portrait Classes Artbar',
  'paint-your-idol': 'Paint Your Idol Tokyo | Celebrity Portrait Classes Artbar',
};

const THEME_DESCRIPTIONS: Record<string, string> = {
  'japan-inspired': 'Paint cherry blossoms, Mt. Fuji, and Japanese motifs in step-by-step art classes at Artbar Tokyo. No experience needed.',
  'van-gogh': "Channel Starry Night and Sunflowers in our Van Gogh painting classes. Beginner-friendly paint and sip at Artbar Tokyo.",
  'paint-pouring': 'Create stunning fluid art with vibrant acrylic pours. No brushwork required — just colour and flow. Paint pouring at Artbar Tokyo.',
  'alcohol-ink': 'Vibrant, abstract alcohol ink art classes at Artbar Tokyo. Create one-of-a-kind pieces with vivid colours and organic patterns.',
  'monet': "Paint Monet's iconic water lilies and impressionist landscapes. Beginner-friendly painting classes at Artbar Tokyo.",
  'picasso': 'Explore cubism and bold abstract art in our Picasso-inspired painting classes. No experience needed at Artbar Tokyo.',
  'renoir': 'Paint in the romantic Impressionist style of Renoir — soft light, warm tones, beautiful scenes — at Artbar Tokyo.',
  'matisse': 'Bold colours and flowing shapes inspired by Matisse. Expressive, creative painting classes at Artbar Tokyo.',
  'kids': 'Fun, guided art classes for children in Tokyo. Kid-friendly materials, patient bilingual instructors, and creative themes at Artbar.',
  'texture-art': 'Create tactile, sculptural paintings with palette knives and mixed media. Unique texture painting classes at Artbar Tokyo.',
  'texture-painting': 'Create tactile, sculptural paintings with palette knives and mixed media. Unique texture painting classes at Artbar Tokyo.',
  'paint-your-pet': 'Turn your pet photo into a beautiful painted portrait. Fun, guided painting classes at Artbar Tokyo studios.',
  'paint-your-idol': 'Paint a portrait of your favourite celebrity or idol. Step-by-step portrait painting classes at Artbar Tokyo.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = THEME_TITLES[slug] ?? 'Theme | Artbar Tokyo';
  const description = THEME_DESCRIPTIONS[slug];
  return {
    title,
    ...(description && { description }),
    alternates: { canonical: `/themes/${slug}` },
  };
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = resolveThemeContentSlug(slug);
  const heroImage = THEME_PAGE_IMAGES[resolvedSlug as ThemePageSlug]?.hero;
  return (
    <>
      {heroImage && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={nextImageSrcSet(heroImage)}
          imageSizes="100vw"
          fetchPriority="high"
        />
      )}
      <ThemeDetail />
    </>
  );
}
