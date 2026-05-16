import { NextRequest, NextResponse } from 'next/server';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { publishDraftMediaAssets } from '@/lib/media/store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Please log in to publish site images.' }, { status: 401 });
  }

  try {
    let pageKey: string | undefined;
    if (request.headers.get('content-type')?.includes('application/json')) {
      let body: { pageKey?: unknown } | null;
      try {
        body = await request.json() as { pageKey?: unknown } | null;
      } catch {
        return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
      }
      pageKey = typeof body?.pageKey === 'string' ? body.pageKey : undefined;
    }
    return NextResponse.json(await publishDraftMediaAssets({ pageKey }));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to publish image changes.' },
      { status: 500 },
    );
  }
}
