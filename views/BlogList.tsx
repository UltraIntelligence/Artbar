'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContent } from '../context/ContentContext';
import { JpText } from '../components/JpText';
import { stripJpSentinel } from '../lib/jp-attr';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { localizeHrefForLanguage } from '../lib/locale-routing';
import { isBlogPostAvailableForLanguage } from '../lib/blog-language';
import { SEO_GUIDES, guideCopy, guidePath, guidePrimaryIntent } from '../data/seo-guides';
import { ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
export const BlogList: React.FC = () => {
  const { content, site, lang, localizedCopy } = useContent();
  const posts = content.blog.filter(p => isBlogPostAvailableForLanguage(p, lang));
  const gridReveal = useScrollReveal();

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
           <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block"><JpText>{site.nav.blog}</JpText></span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-6"><JpText>{site.blogPage.title}</JpText></h1>
          <p className="text-lg md:text-xl text-artbar-gray max-w-2xl mx-auto"><JpText>{site.blogPage.subtitle}</JpText></p>
        </header>

        <section className="mb-16 rounded-lg bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-artbar-taupe">
                <BookOpen size={15} /> <JpText>{lang === 'en' ? 'Tokyo Art Guides' : '東京アートガイド'}</JpText>
              </p>
              <h2 className="font-heading text-3xl font-heavy text-artbar-navy">
                <JpText>{lang === 'en' ? 'Start with the right experience' : '目的に合う体験を探す'}</JpText>
              </h2>
            </div>
            <Link
              href={localizeHrefForLanguage('/guides', lang)}
              className="inline-flex min-h-[44px] items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-artbar-navy transition hover:text-artbar-taupe"
            >
              <JpText>{lang === 'en' ? 'All guides' : 'すべてのガイド'}</JpText> <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {SEO_GUIDES.slice(0, 3).map((guide) => {
              const guideLocalCopy = guideCopy(guide, lang);
              return (
                <Link
                  key={guide.slug}
                  href={localizeHrefForLanguage(guidePath(guide.slug), lang)}
                  className="group rounded-lg border border-black/5 bg-artbar-bg p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <p className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-artbar-taupe">
                    {guidePrimaryIntent(guide, lang)}
                  </p>
                  <h3 className="mb-2 font-heading text-xl font-bold leading-tight text-artbar-navy group-hover:text-artbar-taupe">
                    <JpText>{guideLocalCopy.title}</JpText>
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-artbar-gray">
                    <JpText>{guideLocalCopy.description}</JpText>
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <div
          ref={gridReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {posts.map((post) => {
            const title = lang === 'en' ? post.titleEn : post.titleJp;
            const titleForAttr = lang === 'en' ? post.titleEn : stripJpSentinel(post.titleJp);
            const excerpt = lang === 'en' ? post.excerptEn : post.excerptJp;
            const author = lang === 'en' ? post.authorEn : post.authorJp;
            const postHref = localizeHrefForLanguage(`/blog/${post.slug}`, lang);

            return (
              <article key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
                <Link href={postHref} className="block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={post.image}
                    alt={titleForAttr}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-artbar-navy/10 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-artbar-navy shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-artbar-taupe font-bold uppercase tracking-wider mb-4">
                     <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                     <span className="flex items-center gap-1"><User size={12} /> <JpText>{author}</JpText></span>
                  </div>
                  
                  <Link href={postHref} className="block group-hover:text-artbar-taupe transition-colors">
                     <h2 className="text-2xl font-heading font-bold text-artbar-navy mb-4 leading-tight"><JpText>{title}</JpText></h2>
                  </Link>

                  <p className="text-artbar-gray leading-relaxed mb-6 flex-grow line-clamp-3">
                    <JpText>{excerpt}</JpText>
                  </p>

                  <Link 
                    href={postHref}
                    className="inline-flex min-h-[44px] items-center gap-2 py-2 font-heading font-bold text-artbar-navy hover:text-artbar-taupe transition-colors text-sm uppercase tracking-wider mt-auto"
                  >
                    <JpText>{site.blogPage.readMore}</JpText> <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-heading font-bold text-artbar-navy"><JpText>{localizedCopy.ui.blogList.comingSoon}</JpText></p>
          </div>
        )}

      </div>
    </div>
  );
};
