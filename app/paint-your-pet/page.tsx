import type { Metadata } from 'next';
import { defaultContent } from '@/data/content';
import { PaintYourPet } from '@/views/PaintYourPet';
import { PageJsonLd } from '@/components/PageJsonLd';
import { buildOpenGraph, buildLocalizedAlternates, getRequestLang } from '@/lib/request-lang';
import { buildServiceJsonLd, safeJsonLd } from '@/lib/jsonld';
import { publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';
import { metaDescription } from '@/lib/seo-text';

function getPaintYourPetMeta(lang: 'en' | 'jp') {
  const content = defaultContent[lang].paintYourPet;
  const title = lang === 'jp' ? `${content.title} | Artbar Tokyo` : 'Paint Your Pet Tokyo | Artbar Tokyo';
  const description = metaDescription(content.desc, lang === 'jp' ? 115 : 155);
  return { title, description };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const { title, description } = getPaintYourPetMeta(lang);

  return {
    title: { absolute: title },
    description,
    alternates: buildLocalizedAlternates('/paint-your-pet', lang),
    openGraph: buildOpenGraph({ lang, title, description }),
  };
}

export default async function PaintYourPetPage() {
  const lang = await getRequestLang();
  const routeLocale = siteLanguageToRouteLocale(lang);
  const { title, description } = getPaintYourPetMeta(lang);
  const url = publicUrlForPath('/paint-your-pet', routeLocale);
  const serviceJsonLd = buildServiceJsonLd({
    url,
    name: title,
    description,
    serviceType: 'Custom pet portrait painting class',
  });

  return (
    <>
      <PageJsonLd path="/paint-your-pet" lang={lang} name={title} description={description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }} />
      <PaintYourPet />
    </>
  );
}
