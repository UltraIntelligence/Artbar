import { defaultContent } from '@/data/content';
import { PrivateParties } from '@/views/PrivateParties';

export const metadata = {
  title: defaultContent.en.privateParties.hero.title,
};

export default function PrivatePartiesPage() {
  return <PrivateParties />;
}
