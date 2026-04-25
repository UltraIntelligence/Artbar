'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Calendar, User } from 'lucide-react';
export const BlogList: React.FC = () => {
  const { content, site, lang, jpCopy } = useContent();
  const posts = content.blog.filter(p => p.published);
  const gridReveal = useScrollReveal();

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
           <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">{site.nav.blog}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-6">{site.blogPage.title}</h1>
          <p className="text-lg md:text-xl text-artbar-gray max-w-2xl mx-auto">{site.blogPage.subtitle}</p>
        </header>

        <div
          ref={gridReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {posts.map((post, idx) => {
            const title = lang === 'en' ? post.titleEn : post.titleJp;
            const excerpt = lang === 'en' ? post.excerptEn : post.excerptJp;
            const author = lang === 'en' ? post.authorEn : post.authorJp;
            
            return (
              <article key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={post.image}
                    alt={title}
                    fill
                    priority={idx === 0}
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
                     <span className="flex items-center gap-1"><User size={12} /> {author}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-artbar-taupe transition-colors">
                     <h2 className="text-2xl font-heading font-bold text-artbar-navy mb-4 leading-tight">{title}</h2>
                  </Link>
                  
                  <p className="text-artbar-gray leading-relaxed mb-6 flex-grow line-clamp-3">
                    {excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex min-h-[44px] items-center gap-2 py-2 font-heading font-bold text-artbar-navy hover:text-artbar-taupe transition-colors text-sm uppercase tracking-wider mt-auto"
                  >
                    {site.blogPage.readMore} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-heading font-bold text-artbar-navy">{lang === 'en' ? 'Coming Soon...' : jpCopy.ui.blogList.comingSoon}</p>
          </div>
        )}

      </div>
    </div>
  );
};
