import { NextResponse } from 'next/server';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';

export async function GET() {
  const published =
    (await getPublishedJapaneseCopyPayload({ timeoutMs: 700 })) ??
    DEFAULT_JAPANESE_COPY_PAYLOAD;

  return NextResponse.json(
    { published },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
      },
    },
  );
}
