import { legalPages } from '@/data/legal-content';
import { LegalPage } from '@/views/LegalPage';
import { getRequestLang, buildLocalizedAlternates, buildOpenGraph } from '@/lib/request-lang';

const page = legalPages.termsOfService;

export async function generateMetadata() {
  const lang = await getRequestLang();
  const section = page.sections.find((s) => s.language === (lang === 'en' ? 'English' : '日本語')) as
    | { title?: string; intro?: string }
    | undefined;
  const title = section?.title ?? page.title;
  const description = section?.intro ?? page.description;
  return {
    title,
    description,
    alternates: buildLocalizedAlternates(`/${page.slug}`, lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function TermsOfServicePage() {
  const lang = await getRequestLang();
  return <LegalPage page={page} lang={lang} />;
}
