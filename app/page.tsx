import { defaultContent } from '@/data/content';
import { Home } from '@/views/Home';

export const metadata = {
  title: 'Artbar Tokyo | Paint & Sip Studio',
  description: defaultContent.en.home.hero.subtitle,
};

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        href="/media/artbar-home-video-mobile-3%202.mp4"
        as="video"
        type="video/mp4"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        href="/media/artbar-home-video-desktop%201.mp4"
        as="video"
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <Home />
    </>
  );
}
