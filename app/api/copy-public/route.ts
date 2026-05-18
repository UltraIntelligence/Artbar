import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COPY_PAYLOADS } from '@/lib/copy/defaults';
import { getPublishedCopyPayload, parseCopyLocale } from '@/lib/copy/store';
import { getPublishedMediaMap } from '@/lib/media/store';
import { segmentJpDeep } from '@/lib/jp-segment';
import { buildPublicCopyPayload } from '@/lib/copy/public-payload';

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

  return NextResponse.json(
    buildPublicCopyPayload(locale, published, publishedMedia, currentPath, segmentJpDeep),
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
