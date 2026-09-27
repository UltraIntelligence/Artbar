import { NextRequest, NextResponse } from 'next/server';
import { getPublishedCopyPayload, parseCopyLocale } from '@/lib/copy/published';
import { getPublishedMediaMap } from '@/lib/media/published';
import { segmentJpDeep } from '@/lib/jp-segment';
import { buildPublicCopyPayload } from '@/lib/copy/public-payload';

/**
 * Returns the merged content tree + resolved localized copy. Japanese responses
 * include BudouX phrase chunks pre-segmented with the U+200B sentinel for the
 * runtime language toggle path.
 */
export async function GET(request: NextRequest) {
  const locale = parseCopyLocale(request.nextUrl.searchParams.get('locale'));
  const published = getPublishedCopyPayload(locale);
  const publishedMedia = getPublishedMediaMap();

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
