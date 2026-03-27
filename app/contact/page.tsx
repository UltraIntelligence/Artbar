import { defaultContent } from '@/data/content';
import { Contact } from '@/views/Contact';

export const metadata = {
  title: defaultContent.en.contactPage.title,
  description: 'Get in touch with Artbar Tokyo. We reply within 24 hours. Use the form for bookings, cancellations, or general enquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <Contact />;
}
