import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { createAdminSessionToken, setAdminSessionCookie } from '@/lib/copy/session';
import { COPY_ADMIN_PATH } from '@/lib/copy/defaults';
import { isCopyBackendConfigured } from '@/lib/copy/store';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = rateLimit(ip, { limit: 8, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=invalid`, request.url), 303);
  }

  if (!process.env.COPY_ADMIN_PASSWORD || !process.env.COPY_ADMIN_SESSION_SECRET || !isCopyBackendConfigured()) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=config`, request.url), 303);
  }

  const formData = await request.formData();
  const password = String(formData.get('password') || '');
  if (password !== process.env.COPY_ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL(`${COPY_ADMIN_PATH}/login?error=invalid`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(COPY_ADMIN_PATH, request.url), 303);
  setAdminSessionCookie(response, await createAdminSessionToken());
  return response;
}
