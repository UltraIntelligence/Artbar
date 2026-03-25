export type SiteLanguage = 'en' | 'jp';

export const LANG_COOKIE_NAME = 'artbar_lang';

/**
 * Prefer Japanese when the browser lists any `ja` tag first in Accept-Language.
 */
export function languageFromAcceptLanguage(accept: string | null | undefined): SiteLanguage {
  if (!accept) return 'en';
  const tags = accept.split(',').map((part) => part.trim().split(';')[0].toLowerCase());
  for (const tag of tags) {
    if (tag.startsWith('ja')) return 'jp';
  }
  return 'en';
}

/**
 * Cookie wins when set; otherwise infer from Accept-Language (first visit before cookie is stored).
 */
export function resolveInitialLanguage(
  cookieValue: string | undefined | null,
  acceptLanguage: string | null | undefined
): SiteLanguage {
  if (cookieValue === 'en' || cookieValue === 'jp') return cookieValue;
  return languageFromAcceptLanguage(acceptLanguage ?? null);
}

export function setLangCookieClient(lang: SiteLanguage): void {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
