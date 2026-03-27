import { defaultContent } from '@/data/content';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://artbar.co.jp';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/instructors`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/team-building`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/private-parties`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/locations`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/press`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/paint-your-pet`, priority: 0.8, changeFrequency: 'monthly' },
  ];

  const blogRoutes: MetadataRoute.Sitemap = defaultContent.blog
    .filter(p => p.published)
    .map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(post.date),
    }));

  const themeRoutes: MetadataRoute.Sitemap = [
    'japan-inspired', 'van-gogh', 'paint-pouring', 'alcohol-ink',
    'monet', 'picasso', 'renoir', 'matisse', 'kids',
    'texture-art', 'texture-painting', 'paint-your-pet', 'paint-your-idol',
  ].map(slug => ({
    url: `${BASE_URL}/themes/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...blogRoutes, ...themeRoutes];
}
