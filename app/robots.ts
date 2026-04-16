import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/copy-admin'] },
    sitemap: 'https://artbar.co.jp/sitemap.xml',
  };
}
