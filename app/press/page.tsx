import { defaultContent } from '@/data/content';
import { Press } from '@/views/Press';

export const metadata = {
  title: defaultContent.en.pressPage.title,
  description: defaultContent.en.pressPage.subtitle,
  alternates: { canonical: '/press' },
};

export default function PressPage() {
  return <Press />;
}
