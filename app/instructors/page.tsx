import { defaultContent } from '@/data/content';
import { Instructors } from '@/views/Instructors';

export const metadata = {
  title: defaultContent.en.instructorsPage.title,
};

export default function InstructorsPage() {
  return <Instructors />;
}
