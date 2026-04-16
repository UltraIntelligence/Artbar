import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE_NAME, languageFromAcceptLanguage, type SiteLanguage } from '@/lib/language';
import { COPY_ADMIN_COOKIE, COPY_ADMIN_PATH } from '@/lib/copy/defaults';
import { getCopyAdminLoginUrl, hasValidAdminSession } from '@/lib/copy/session';

function isValidLang(v: string | undefined): v is SiteLanguage {
  return v === 'en' || v === 'jp';
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  if (request.nextUrl.pathname.startsWith(COPY_ADMIN_PATH)) {
    const isLoginPage = request.nextUrl.pathname === `${COPY_ADMIN_PATH}/login`;
    const sessionToken = request.cookies.get(COPY_ADMIN_COOKIE)?.value;
    const hasSession = await hasValidAdminSession(sessionToken);

    if (!hasSession && !isLoginPage) {
      return NextResponse.redirect(getCopyAdminLoginUrl(request));
    }

    if (hasSession && isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = COPY_ADMIN_PATH;
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  const existing = request.cookies.get(LANG_COOKIE_NAME)?.value;
  if (isValidLang(existing)) {
    return NextResponse.next();
  }
  const lang = languageFromAcceptLanguage(request.headers.get('accept-language'));
  const res = NextResponse.next();
  res.cookies.set(LANG_COOKIE_NAME, lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?|ttf|eot)$).*)',
  ],
};
