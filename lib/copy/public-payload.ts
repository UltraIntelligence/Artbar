import { mergeMediaIntoContent } from '@/lib/media/resolve';
import {
  buildResolvedCopy,
  mergePublishedLocaleIntoContent,
} from '@/lib/copy/resolve';
import { trimBlogBodiesForPath } from '@/lib/content-payload';
import type { CopyLocale, LocalizedCopyPayload } from '@/lib/copy/types';
import type { PublishedMediaMap } from '@/lib/media/types';

export function buildPublicCopyPayload(
  locale: CopyLocale,
  published: LocalizedCopyPayload,
  publishedMedia: PublishedMediaMap,
  currentPath: string | null,
  segmentJapanese: <T>(value: T) => T,
) {
  const mergedContent = mergeMediaIntoContent(
    mergePublishedLocaleIntoContent(locale, published),
    publishedMedia,
  );
  const content = trimBlogBodiesForPath(
    locale === 'jp' ? segmentJapanese(mergedContent) : mergedContent,
    currentPath,
  );
  const localizedCopy =
    locale === 'jp'
      ? segmentJapanese(buildResolvedCopy(locale, published))
      : buildResolvedCopy(locale, published);

  return { locale, content, localizedCopy, jpCopy: localizedCopy };
}
