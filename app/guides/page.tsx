import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SEO_GUIDES, guideCopy, guidePath, guidePrimaryIntent } from '@/data/seo-guides';
import { buildOpenGraph, buildLocalizedAlternates, getRequestLang } from '@/lib/request-lang';
import { localizeHrefForLanguage, publicUrlForPath, siteLanguageToRouteLocale } from '@/lib/locale-routing';
import { safeJsonLd } from '@/lib/jsonld';

function guideIndexCopy(lang: 'en' | 'jp') {
  return lang === 'jp'
    ? {
        title: 'Artbar Tokyo ガイド',
        description: '東京の雨の日デート、アート体験、絵画体験、ワークショップ、貸切イベントを探すためのArtbar Tokyoガイド集です。',
        eyebrow: 'Journal Guides',
        intro: '日本語でよく探される目的別にArtbar Tokyoの体験を見つけられるガイドです。雨の日デート、アート体験、ワークショップなど、検索から予約まで自然に進めます。',
        read: 'ガイドを見る',
      }
    : {
        title: 'Artbar Tokyo Guides',
        description: 'Guides to paint and sip, art and wine, beginner art classes, private events, and creative Tokyo experiences.',
        eyebrow: 'Journal Guides',
        intro: 'Use these guides to choose the right Artbar Tokyo experience by intent, occasion, location, and theme.',
        read: 'Read guide',
      };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const copy = guideIndexCopy(lang);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocalizedAlternates('/guides', lang),
    openGraph: buildOpenGraph({ lang, title: copy.title, description: copy.description }),
  };
}

export default async function GuidesPage() {
  const lang = await getRequestLang();
  const routeLocale = siteLanguageToRouteLocale(lang);
  const copy = guideIndexCopy(lang);
  const url = publicUrlForPath('/guides', routeLocale);
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: copy.title,
    description: copy.description,
    url,
    inLanguage: routeLocale === 'ja' ? 'ja' : 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SEO_GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guideCopy(guide, lang).title,
        url: publicUrlForPath(guidePath(guide.slug), routeLocale),
      })),
    },
  };

  return (
    <main className="grain min-h-screen bg-artbar-bg pt-36 pb-20">
      <PageJsonLd path="/guides" lang={lang} name={copy.title} description={copy.description} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is static server-generated data, not user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }} />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-artbar-taupe">
            <BookOpen size={16} /> {copy.eyebrow}
          </p>
          <h1 className="mb-6 font-heading text-4xl font-heavy leading-tight text-artbar-navy md:text-6xl">
            {copy.title}
          </h1>
          <p className="text-lg leading-relaxed text-artbar-gray md:text-xl">{copy.intro}</p>
        </header>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {SEO_GUIDES.map((guide, index) => {
            const guideLocalCopy = guideCopy(guide, lang);
            return (
              <article key={guide.slug} className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={localizeHrefForLanguage(guidePath(guide.slug), lang)} className="relative block aspect-[4/3] overflow-hidden bg-artbar-bg">
                  <Image
                    src={guide.image}
                    alt={guideLocalCopy.title}
                    fill
                    priority={index === 0}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-artbar-navy/10 transition group-hover:bg-transparent" />
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-artbar-taupe">
                    {guidePrimaryIntent(guide, lang)}
                  </p>
                  <h2 className="mb-3 font-heading text-2xl font-bold leading-tight text-artbar-navy">
                    {guideLocalCopy.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 flex-1 leading-relaxed text-artbar-gray">
                    {guideLocalCopy.description}
                  </p>
                  <Link
                    href={localizeHrefForLanguage(guidePath(guide.slug), lang)}
                    className="inline-flex min-h-[44px] items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-artbar-navy transition hover:text-artbar-taupe"
                  >
                    {copy.read} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
