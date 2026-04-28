import { legalPages } from '@/data/legal-content';
import { LegalPage } from '@/views/LegalPage';

const page = legalPages.specifiedCommercialTransactions;

export const metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
};

export default function SpecifiedCommercialTransactionsPage() {
  return <LegalPage page={page} />;
}
