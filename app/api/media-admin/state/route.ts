import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { getMediaEditorState } from '@/lib/media/store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Please log in to manage site images.' }, { status: 401 });
  }

  try {
    return NextResponse.json(await getMediaEditorState());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load site images.' },
      { status: 500 },
    );
  }
}
