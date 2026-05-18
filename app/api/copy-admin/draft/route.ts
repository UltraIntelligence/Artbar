import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { parseCopyLocale, saveDraftPayload } from '@/lib/copy/store';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const locale = parseCopyLocale(request.nextUrl.searchParams.get('locale'));
    const body = await request.json();
    const draft = await saveDraftPayload(locale, body.draft);
    return NextResponse.json({ locale, draft });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save draft.' },
      { status: 500 },
    );
  }
}
