import { legalPages } from '@/data/legal-content';
import { LegalPage } from '@/views/LegalPage';

const page = legalPages.privacyPolicy;

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
};

export default function PrivacyPolicyPage() {
  return <LegalPage page={page} />;
}
