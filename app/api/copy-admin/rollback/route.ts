import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { parseCopyLocaleForMutation, rollbackPublishedPayload } from '@/lib/copy/store';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const localeParam = request.nextUrl.searchParams.get('locale');
    const locale = localeParam === null ? 'jp' : parseCopyLocaleForMutation(localeParam);
    if (!locale) {
      return NextResponse.json({ error: 'Invalid copy locale.' }, { status: 400 });
    }

    return NextResponse.json({ locale, ...(await rollbackPublishedPayload(locale)) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to roll back draft.' },
      { status: 500 },
    );
  }
}
