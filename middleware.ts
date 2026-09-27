import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE_NAME, ROUTE_PATHNAME_HEADER, languageFromAcceptLanguage, type SiteLanguage } from '@/lib/language';
import { ROUTE_LOCALE_HEADER, routeLocaleFromPathname } from '@/lib/locale-routing';

function isValidLang(v: string | undefined): v is SiteLanguage {
  return v === 'en' || v === 'jp';
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(ROUTE_LOCALE_HEADER, routeLocaleFromPathname(request.nextUrl.pathname));
  requestHeaders.set(ROUTE_PATHNAME_HEADER, request.nextUrl.pathname);

  if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/copy-admin')) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  const existing = request.cookies.get(LANG_COOKIE_NAME)?.value;
  if (isValidLang(existing)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  const lang = languageFromAcceptLanguage(request.headers.get('accept-language'));
  const res = NextResponse.next({ request: { headers: requestHeaders } });
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
