import React from 'react';
import { useContent } from '../context/ContentContext';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'business';
  slug?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  type = 'website', 
  slug = '',
  schema 
}) => {
  const { lang } = useContent();
  const siteUrl = 'https://artbar.co.jp'; // Production URL
  const currentUrl = `${siteUrl}${slug}`;
  
  const defaultDescription = lang === 'en' 
    ? "Japan's First Paint & Sip Studio. Relax, Sip, Create, Connect." 
    : "日本初のPaint & Sipスタジオ。リラックス、ドリンク、クリエイト、コネクト。";
    
  const defaultImage = "https://artbar.co.jp/og-default.jpg"; 

  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const fullTitle = `${title} | Artbar Tokyo`;

  return (
    <>
      {/* React 19 automatically hoists these to the <head> */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
};