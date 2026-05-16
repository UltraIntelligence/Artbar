import { NextRequest, NextResponse } from 'next/server';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';
import { isAdminRequestAuthenticated } from '@/lib/copy/session';
import { resetMediaSlotToDefault } from '@/lib/media/store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Please log in to reset site images.' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null) as { slotKey?: unknown } | null;
    const slotKey = typeof body?.slotKey === 'string' ? body.slotKey : '';
    if (!slotKey) {
      return NextResponse.json({ error: 'Please choose an image to reset.' }, { status: 400 });
    }

    return NextResponse.json(await resetMediaSlotToDefault(slotKey));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to reset that image.' },
      { status: 500 },
    );
  }
}
