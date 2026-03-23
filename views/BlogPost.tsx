'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin } from 'lucide-react';
import { SEO } from '../components/SEO';

export const BlogPost: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { content, lang, site } = useContent();

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
  const excerpt = lang === 'en' ? post.excerptEn : post.excerptJp;

  // Simple share (just opens new window)
  const shareUrl = window.location.href;
  const shareTitle = encodeURIComponent(title);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [post.image],
    "datePublished": post.date.replace(/\./g, '-'),
    "author": [{
        "@type": "Person",
        "name": author
    }]
  };

  return (
    <div className="bg-artbar-bg min-h-screen pb-20">
      <SEO 
        title={title}
        description={excerpt}
        image={post.image}
        type="article"
        slug={`/blog/${post.slug}`}
        schema={articleSchema}
      />
      
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img src={post.image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
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
             
             <div className="flex items-center justify-center gap-6 text-sm text-artbar-gray border-t border-b border-gray-100 py-4">
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

          {/* Content */}
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-artbar-navy prose-p:text-artbar-gray prose-p:leading-relaxed prose-a:text-artbar-taupe prose-img:rounded-2xl prose-img:w-full prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: bodyContent }} 
          />
          
          {/* Share */}
          <div className="mt-16 pt-8 border-t border-gray-100">
             <h3 className="text-center font-heading font-bold text-artbar-navy mb-6 text-sm uppercase tracking-widest">Share this story</h3>
             <div className="flex justify-center gap-4">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                   <Facebook size={20} />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                   <Twitter size={20} />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                   <Linkedin size={20} />
                </a>
             </div>
          </div>

        </div>
      </article>

      {/* Recommended */}
      <section className="max-w-[1000px] mx-auto px-6 mt-20">
         <h3 className="font-heading font-bold text-2xl text-artbar-navy mb-8 text-center">More from the Journal</h3>
         <div className="grid md:grid-cols-2 gap-8">
            {content.blog.filter(p => p.id !== post.id).slice(0, 2).map(p => (
               <Link key={p.id} href={`/blog/${p.slug}`} className="bg-white rounded-2xl p-6 flex gap-4 items-center hover:shadow-lg transition-all">
                  <img src={p.image} alt={p.titleEn} className="w-24 h-24 rounded-xl object-cover" />
                  <div>
                     <h4 className="font-heading font-bold text-artbar-navy mb-2 line-clamp-2">{lang === 'en' ? p.titleEn : p.titleJp}</h4>
                     <span className="text-xs text-artbar-taupe font-bold uppercase tracking-wider">{lang === 'en' ? 'Read Story' : '記事を読む'}</span>
                  </div>
               </Link>
            ))}
         </div>
      </section>

    </div>
  );
};