import { defaultContent } from '@/data/content';
import { PrivateParties } from '@/views/PrivateParties';

export const metadata = {
  title: defaultContent.en.privateParties.hero.title,
  description: defaultContent.en.privateParties.hero.subtitle,
  alternates: { canonical: '/private-parties' },
};

export default function PrivatePartiesPage() {
  return <PrivateParties />;
}
