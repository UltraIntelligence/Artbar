import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COPY_PAYLOADS } from '@/lib/copy/defaults';
import { getPublishedCopyPayload, parseCopyLocale } from '@/lib/copy/store';
import {
  buildResolvedCopy,
  mergePublishedLocaleIntoContent,
} from '@/lib/copy/resolve';
import { getPublishedMediaMap } from '@/lib/media/store';
import { mergeMediaIntoContent } from '@/lib/media/resolve';
import { segmentJpDeep } from '@/lib/jp-segment';
import { trimBlogBodiesForPath } from '@/lib/content-payload';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

/**
 * Returns the merged content tree + resolved localized copy. Japanese responses
 * include BudouX phrase chunks pre-segmented with the U+200B sentinel for the
 * runtime language toggle path.
 */
export async function GET(request: NextRequest) {
  const locale = parseCopyLocale(request.nextUrl.searchParams.get('locale'));
  const [publishedPayload, publishedMedia] = await Promise.all([
    getPublishedCopyPayload(locale, { timeoutMs: 4000 }),
    withTimeout(getPublishedMediaMap(), 4000, {}),
  ]);
  const published = publishedPayload ?? DEFAULT_COPY_PAYLOADS[locale];

  const currentPath = request.nextUrl.searchParams.get('path');
  const mergedContent = mergeMediaIntoContent(
    mergePublishedLocaleIntoContent(locale, published),
    publishedMedia,
  );
  const content = trimBlogBodiesForPath(
    locale === 'jp' ? segmentJpDeep(mergedContent) : mergedContent,
    currentPath,
  );
  const localizedCopy =
    locale === 'jp'
      ? segmentJpDeep(buildResolvedCopy(locale, published))
      : buildResolvedCopy(locale, published);

  return NextResponse.json(
    { locale, content, localizedCopy, jpCopy: localizedCopy },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
