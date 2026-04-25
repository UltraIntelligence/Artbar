import { NextResponse } from 'next/server';
import { DEFAULT_JAPANESE_COPY_PAYLOAD } from '@/lib/copy/defaults';
import { getPublishedJapaneseCopyPayload } from '@/lib/copy/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const published =
    (await getPublishedJapaneseCopyPayload({ timeoutMs: 4000 })) ??
    DEFAULT_JAPANESE_COPY_PAYLOAD;

  return NextResponse.json(
    { published },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
