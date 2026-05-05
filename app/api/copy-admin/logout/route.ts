import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/copy/session';
import { forbiddenMutationResponse, isSameOriginMutation } from '@/lib/copy/request-security';
import { COPY_ADMIN_PATH } from '@/lib/copy/defaults';

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return forbiddenMutationResponse();
  }

  const response = NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login`, request.url), 303);
  clearAdminSessionCookie(response);
  return response;
}
