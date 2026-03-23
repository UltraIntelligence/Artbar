import { defaultContent } from '@/data/content';
import { Contact } from '@/views/Contact';

export const metadata = {
  title: defaultContent.en.contactPage.title,
};

export default function ContactPage() {
  return <Contact />;
}
