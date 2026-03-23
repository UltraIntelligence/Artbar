import { defaultContent } from '@/data/content';
import { Home } from '@/views/Home';

export const metadata = {
  title: 'Artbar Tokyo | Paint & Sip Studio',
  description: defaultContent.en.home.hero.subtitle,
};

export default function HomePage() {
  return <Home />;
}
