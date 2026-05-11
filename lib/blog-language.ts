import type { BlogPost } from '@/types';
import type { SiteLanguage } from './language';

export const ENGLISH_BLOG_POSTS_NEED_TRANSLATION = new Set([
  'chris-pyrate-interview',
  'team-building-power',
  'harpers-bazaar-art-2024',
  'texture-art-mediums',
]);

export function isBlogPostAvailableForLanguage(post: BlogPost, lang: SiteLanguage): boolean {
  if (!post.published) return false;
  return lang !== 'en' || !ENGLISH_BLOG_POSTS_NEED_TRANSLATION.has(post.slug);
}
