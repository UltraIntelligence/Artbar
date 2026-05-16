import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';
import { mergePublishedIntoContent } from '@/lib/copy/resolve';
import { getPublishedMediaMap } from '@/lib/media/store';
import { mergeMediaIntoContent } from '@/lib/media/resolve';
import { segmentJpDeep } from '@/lib/jp-segment';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Props) {
  const { slug } = await params;
  const [publishedPayload, publishedMedia] = await Promise.all([
    getPublishedJapaneseCopyPayload({ timeoutMs: 4000 }),
    getPublishedMediaMap(),
  ]);
  const published = publishedPayload ?? DEFAULT_JAPANESE_COPY_PAYLOAD;
  const content = mergeMediaIntoContent(
    segmentJpDeep(mergePublishedIntoContent(published)),
    publishedMedia,
  );
  const post = content.blog.find((item) => item.slug === slug && item.published);

  if (!post) {
    return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
  }

  return NextResponse.json(
    { post },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
