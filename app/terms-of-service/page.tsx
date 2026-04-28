import { legalPages } from '@/data/legal-content';
import { LegalPage } from '@/views/LegalPage';

const page = legalPages.termsOfService;

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
};

export default function TermsOfServicePage() {
  return <LegalPage page={page} />;
}
