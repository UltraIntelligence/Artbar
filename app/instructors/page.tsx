import { defaultContent } from '@/data/content';
import { Instructors } from '@/views/Instructors';

export const metadata = {
  title: defaultContent.en.instructorsPage.title,
  description: defaultContent.en.instructorsPage.subtitle,
  alternates: { canonical: '/instructors' },
};

export default function InstructorsPage() {
  return <Instructors />;
}
