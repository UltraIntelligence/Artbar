import { defaultContent } from '@/data/content';
import { PaintYourPet } from '@/views/PaintYourPet';

export const metadata = {
  title: defaultContent.en.paintYourPet.title,
  description: defaultContent.en.paintYourPet.subtitle,
};

export default function PaintYourPetPage() {
  return <PaintYourPet />;
}
