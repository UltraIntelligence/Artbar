import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';
import { mergePublishedIntoContent } from '@/lib/copy/resolve';
import { segmentJpDeep } from '@/lib/jp-segment';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Props) {
  const { slug } = await params;
  const published =
    (await getPublishedJapaneseCopyPayload({ timeoutMs: 4000 })) ??
    DEFAULT_JAPANESE_COPY_PAYLOAD;
  const content = segmentJpDeep(mergePublishedIntoContent(published));
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
