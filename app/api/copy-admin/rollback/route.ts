import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { rollbackPublishedPayload } from '@/lib/copy/store';

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json(await rollbackPublishedPayload());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to roll back draft.' },
      { status: 500 },
    );
  }
}
