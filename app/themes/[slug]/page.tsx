import { ThemeDetail } from '@/views/ThemeDetail';
import type { Metadata } from 'next';

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
  'kids': 'Kids Art Classes Tokyo | Children\'s Painting Workshops Artbar',
  'texture-art': 'Texture Painting Classes Tokyo | Sculptural Art Artbar',
  'texture-painting': 'Texture Painting Classes Tokyo | Sculptural Art Artbar',
  'paint-your-pet': 'Paint Your Pet Tokyo | Pet Portrait Classes Artbar',
  'paint-your-idol': 'Paint Your Idol Tokyo | Celebrity Portrait Classes Artbar',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = THEME_TITLES[slug] ?? 'Theme | Artbar Tokyo';
  return { title };
}

export default function ThemeDetailPage() {
  return <ThemeDetail />;
}
