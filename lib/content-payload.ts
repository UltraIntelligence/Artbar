import type { BlogPost, ContentData } from '@/types';
import { stripLocalePrefix } from '@/lib/locale-routing';

function blogSlugFromPathname(pathname: string | null | undefined): string | null {
  const barePath = stripLocalePrefix(pathname ?? '/');
  const match = barePath.match(/^\/blog\/([^/?#]+)\/?$/);
  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function stripBlogBody(post: BlogPost): BlogPost {
  return {
    ...post,
    contentEn: '',
    contentJp: '',
  };
}

/**
 * Most pages only need blog cards: title, image, excerpt, date, author, tags.
 * Keep full article HTML only for the currently requested article page.
 */
export function trimBlogBodiesForPath(content: ContentData, pathname: string | null | undefined): ContentData {
  const activeSlug = blogSlugFromPathname(pathname);

  return {
    ...content,
    blog: content.blog.map((post) => (post.slug === activeSlug ? post : stripBlogBody(post))),
  };
}
