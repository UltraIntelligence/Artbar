import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE_NAME, languageFromAcceptLanguage, type SiteLanguage } from '@/lib/language';

function isValidLang(v: string | undefined): v is SiteLanguage {
  return v === 'en' || v === 'jp';
}

export function middleware(request: NextRequest) {
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
