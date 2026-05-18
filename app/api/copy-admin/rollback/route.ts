import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { parseCopyLocale, rollbackPublishedPayload } from '@/lib/copy/store';
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
    return NextResponse.json({ locale, ...(await rollbackPublishedPayload(locale)) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to roll back draft.' },
      { status: 500 },
    );
  }
}
