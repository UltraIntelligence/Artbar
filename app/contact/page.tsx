import { defaultContent } from '@/data/content';
import { PageJsonLd } from '@/components/PageJsonLd';
import { Contact } from '@/views/Contact';
import type { Metadata } from 'next';
import { FAQS, FAQS_JP } from '@/constants';
import { getRequestLang, buildOpenGraph, buildLocalizedAlternates } from '@/lib/request-lang';
import { safeJsonLd } from '@/lib/jsonld';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = lang === 'jp' ? c.nav.contact : c.contactPage.title;
  const description =
    lang === 'jp'
      ? 'Artbar Tokyoへのお問い合わせはこちらから。通常24時間以内にご返信いたします。ご予約・キャンセル・各種お問い合わせを承ります。'
      : 'Get in touch with Artbar Tokyo. We reply within 24 hours. Use the form for bookings, cancellations, or general enquiries.';
  return {
    title,
    description,
    alternates: buildLocalizedAlternates('/contact', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function ContactPage() {
  const lang = await getRequestLang();
  const c = defaultContent[lang];
  const title = lang === 'jp' ? c.nav.contact : c.contactPage.title;
  const description =
    lang === 'jp'
      ? 'Artbar Tokyoへのお問い合わせはこちらから。通常24時間以内にご返信いたします。ご予約・キャンセル・各種お問い合わせを承ります。'
      : 'Get in touch with Artbar Tokyo. We reply within 24 hours. Use the form for bookings, cancellations, or general enquiries.';
  const faqs = lang === 'jp' ? FAQS_JP : FAQS;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <PageJsonLd path="/contact" lang={lang} name={title} description={description} />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
        />
      )}
      <Contact />
    </>
  );
}
