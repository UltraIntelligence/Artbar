'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin } from 'lucide-react';
export const BlogPost: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { content, lang, site } = useContent();
  const proseReveal = useScrollReveal();
  const moreReveal = useScrollReveal();

  const post = content.blog.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-artbar-bg">
        <h1 className="text-4xl font-heading font-heavy text-artbar-navy mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-artbar-taupe hover:underline">Back to Journal</Link>
      </div>
    );
  }

  const title = lang === 'en' ? post.titleEn : post.titleJp;
  const bodyContent = lang === 'en' ? post.contentEn : post.contentJp;
  const author = lang === 'en' ? post.authorEn : post.authorJp;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(title);
  const shareLabel = lang === 'en' ? 'Share this story' : 'この記事をシェア';

  return (
    <div className="grain relative bg-artbar-bg min-h-screen pb-20">
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image src={post.image} alt={title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-artbar-navy/30 via-transparent to-artbar-bg"></div>
        <div className="absolute top-32 left-0 w-full px-6">
           <div className="max-w-[1000px] mx-auto">
             <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-white/30 transition-colors"
             >
               <ArrowLeft size={16} /> {site.blogPage.back}
             </Link>
           </div>
        </div>
      </div>

      <article className="max-w-[800px] mx-auto px-6 relative -mt-32 z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-white/50">
          
          {/* Header */}
          <header className="mb-10 text-center">
             <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map(tag => (
                   <span key={tag} className="bg-artbar-bg text-artbar-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{tag}</span>
                ))}
             </div>
             
             <h1 className="text-3xl md:text-5xl font-heading font-heavy text-artbar-navy mb-6 leading-tight">
               {title}
             </h1>
             
             <div className="flex items-center justify-center gap-6 text-sm md:text-base text-artbar-gray border-t border-b border-gray-100 py-4">
                <div className="flex items-center gap-2">
                   <User size={16} className="text-artbar-taupe" />
                   <span className="font-heading font-bold">{author}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar size={16} className="text-artbar-taupe" />
                   <span className="font-mono">{post.date}</span>
                </div>
             </div>
          </header>

          <div
            ref={proseReveal.ref}
            className={`reveal artbar-prose max-w-none ${proseReveal.isVisible ? 'visible' : ''}`}
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />

          <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-center font-heading font-bold text-artbar-navy mb-6 text-sm uppercase tracking-widest">
              {shareLabel}
            </h3>
            <div className="flex justify-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#3b5998] hover:opacity-80 transition-opacity shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-current" strokeWidth={2} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1DA1F2] hover:opacity-80 transition-opacity shadow-sm"
                aria-label="X"
              >
                <Twitter size={20} className="text-current" strokeWidth={2} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0077B5] hover:opacity-80 transition-opacity shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-current" strokeWidth={2} />
              </a>
            </div>
          </div>

        </div>
      </article>

      <section className="max-w-[1000px] mx-auto px-6 mt-20">
        <h3 className="font-heading font-bold text-2xl text-artbar-navy mb-8 text-center">
          {lang === 'en' ? 'More from the Journal' : 'ジャーナルのほかの記事'}
        </h3>
        <div
          ref={moreReveal.ref}
          className={`grid md:grid-cols-2 gap-8 reveal-stagger ${moreReveal.isVisible ? 'visible' : ''}`}
        >
          {content.blog
            .filter((p) => p.id !== post.id)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-2xl p-6 flex gap-4 items-center hover:shadow-lg transition-all snap-start"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={p.image}
                    alt={lang === 'en' ? p.titleEn : p.titleJp}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-artbar-navy mb-2 line-clamp-2">
                    {lang === 'en' ? p.titleEn : p.titleJp}
                  </h4>
                  <span className="text-sm text-artbar-taupe font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Read Story' : '記事を読む'}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>

    </div>
  );
};