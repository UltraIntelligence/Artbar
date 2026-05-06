import type { MetadataRoute } from 'next';
import { defaultContent } from '@/data/content';
import { THEME_PAGE_SLUGS } from '@/data/generated-image-paths';
import { getCanonicalThemeSlug } from '@/data/theme-details';
import { localizePath, type RouteLocale } from '@/lib/locale-routing';

const BASE_URL = 'https://artbar.co.jp';

function localizedEntry(
  path: string,
  locale: RouteLocale,
  options: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${localizePath(path, locale)}`,
    alternates: {
      languages: {
        ja: `${BASE_URL}${localizePath(path, 'ja')}`,
        en: `${BASE_URL}${localizePath(path, 'en')}`,
      },
    },
    ...options,
  };
}

function localizedEntries(
  path: string,
  options: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>
): MetadataRoute.Sitemap {
  return [localizedEntry(path, 'ja', options), localizedEntry(path, 'en', options)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedEntries('/', { priority: 1.0, changeFrequency: 'weekly' }),
    ...localizedEntries('/instructors', { priority: 0.8, changeFrequency: 'monthly' }),
    ...localizedEntries('/team-building', { priority: 0.9, changeFrequency: 'monthly' }),
    ...localizedEntries('/private-parties', { priority: 0.9, changeFrequency: 'monthly' }),
    ...localizedEntries('/locations', { priority: 0.8, changeFrequency: 'monthly' }),
    ...localizedEntries('/press', { priority: 0.6, changeFrequency: 'monthly' }),
    ...localizedEntries('/contact', { priority: 0.7, changeFrequency: 'yearly' }),
    ...localizedEntries('/blog', { priority: 0.7, changeFrequency: 'weekly' }),
    ...localizedEntries('/privacy-policy', { priority: 0.3, changeFrequency: 'yearly' }),
    ...localizedEntries('/terms-of-service', { priority: 0.3, changeFrequency: 'yearly' }),
    ...localizedEntries('/specified-commercial-transactions', {
      priority: 0.3,
      changeFrequency: 'yearly',
    }),
  ];

  const themeRoutes: MetadataRoute.Sitemap = THEME_PAGE_SLUGS.flatMap((slug) =>
    localizedEntries(`/themes/${getCanonicalThemeSlug(slug)}`, {
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = defaultContent.blog
    .filter((post) => post.published)
    .flatMap((post) =>
      localizedEntries(`/blog/${post.slug}`, {
        priority: 0.6,
        changeFrequency: 'yearly' as const,
      })
    );

  return [...staticRoutes, ...themeRoutes, ...blogRoutes];
}
