import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';
import {
  buildResolvedJapaneseCopy,
  mergePublishedIntoContent,
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
 * Returns the merged content tree + resolved JP copy with BudouX phrase chunks
 * pre-segmented (joined by U+200B sentinel). Client `JpText` splits on the
 * sentinel — no client-side BudouX. Used by `ContentContext` for the runtime
 * EN→JP toggle path.
 */
export async function GET(request: NextRequest) {
  const [publishedPayload, publishedMedia] = await Promise.all([
    getPublishedJapaneseCopyPayload({ timeoutMs: 4000 }),
    withTimeout(getPublishedMediaMap(), 4000, {}),
  ]);
  const published = publishedPayload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;

  const currentPath = request.nextUrl.searchParams.get('path');
  const content = trimBlogBodiesForPath(
    mergeMediaIntoContent(segmentJpDeep(mergePublishedIntoContent(published)), publishedMedia),
    currentPath,
  );
  const jpCopy = segmentJpDeep(buildResolvedJapaneseCopy(published));

  return NextResponse.json(
    { content, jpCopy },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
