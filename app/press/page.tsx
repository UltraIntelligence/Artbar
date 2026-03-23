import { defaultContent } from '@/data/content';
import { Press } from '@/views/Press';

export const metadata = {
  title: defaultContent.en.pressPage.title,
};

export default function PressPage() {
  return <Press />;
}
