import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // robots.txt is prefix-matched, so `/copy-admin` covers both the bare path
      // and `/copy-admin/login` (and any future sub-routes).
      disallow: ['/admin', '/copy-admin', '/api/'],
    },
    sitemap: 'https://artbar.co.jp/sitemap.xml',
  };
}
