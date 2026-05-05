import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAdminSessionToken, setAdminSessionCookie } from '@/lib/copy/session';
import { COPY_ADMIN_PATH } from '@/lib/copy/defaults';
import { isCopyBackendConfigured } from '@/lib/copy/store';
import { isSameOriginMutation } from '@/lib/copy/request-security';

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

export async function POST(request: NextRequest) {
  if (!isSameOriginMutation(request)) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=invalid`, request.url), 303);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = await checkRateLimit('copy-admin-login', ip, 8, 60);
  if (!allowed) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=invalid`, request.url), 303);
  }

  if (!process.env.COPY_ADMIN_PASSWORD || !process.env.COPY_ADMIN_SESSION_SECRET || !isCopyBackendConfigured()) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=config`, request.url), 303);
  }

  const formData = await request.formData();
  const password = String(formData.get('password') || '');
  if (!timingSafeEqual(password, process.env.COPY_ADMIN_PASSWORD)) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=invalid`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(COPY_ADMIN_PATH, request.url), 303);
  setAdminSessionCookie(response, await createAdminSessionToken());
  return response;
}
