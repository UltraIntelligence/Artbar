import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { parseCopyMutationLocale, publishDraftPayload } from '@/lib/copy/store';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const locale = parseCopyMutationLocale(request.nextUrl.searchParams.get('locale'));
    if (!locale) {
      return NextResponse.json({ error: 'Invalid copy locale.' }, { status: 400 });
    }

    return NextResponse.json({ locale, ...(await publishDraftPayload(locale)) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to publish draft.' },
      { status: 500 },
    );
  }
}
