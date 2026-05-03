import { defaultContent } from '@/data/content';
import { Contact } from '@/views/Contact';
import type { Metadata } from 'next';
import { getRequestLang, buildOpenGraph } from '@/lib/request-lang';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const description =
    lang === 'jp'
      ? 'Artbar Tokyoへのお問い合わせはこちらから。通常24時間以内にご返信いたします。ご予約・キャンセル・各種お問い合わせを承ります。'
      : 'Get in touch with Artbar Tokyo. We reply within 24 hours. Use the form for bookings, cancellations, or general enquiries.';
  return {
    title: c.contactPage.title,
    description,
    alternates: { canonical: '/contact' },
    openGraph: buildOpenGraph({ lang, title: c.contactPage.title, description }),
  };
}

export default function ContactPage() {
  return <Contact />;
}
