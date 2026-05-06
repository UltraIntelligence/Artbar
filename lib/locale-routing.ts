import type { SiteLanguage } from './language';

export type RouteLocale = 'ja' | 'en';

export const EN_PREFIX = '/en';
export const ROUTE_LOCALE_HEADER = 'x-artbar-route-locale';

const ABSOLUTE_OR_SPECIAL_HREF = /^[a-z][a-z\d+.-]*:|^#|^\/\//i;

export function siteLanguageToRouteLocale(lang: SiteLanguage): RouteLocale {
  return lang === 'en' ? 'en' : 'ja';
}

export function routeLocaleToSiteLanguage(locale: RouteLocale): SiteLanguage {
  return locale === 'en' ? 'en' : 'jp';
}

export function isEnglishPath(pathname: string): boolean {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);
}

export function routeLocaleFromPathname(pathname: string): RouteLocale {
  return isEnglishPath(pathname) ? 'en' : 'ja';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === EN_PREFIX) return '/';
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length);
  return pathname || '/';
}

function splitHref(href: string): { pathname: string; suffix: string } {
  const match = href.match(/^([^?#]*)(.*)$/);
  return { pathname: match?.[1] || '/', suffix: match?.[2] || '' };
}

export function localizePath(pathname: string, locale: RouteLocale): string {
  const barePath = stripLocalePrefix(pathname);
  if (locale === 'ja') return barePath;
  return barePath === '/' ? EN_PREFIX : `${EN_PREFIX}${barePath}`;
}

export function localizeHref(href: string, locale: RouteLocale): string {
  if (!href.startsWith('/') || ABSOLUTE_OR_SPECIAL_HREF.test(href)) return href;
  const { pathname, suffix } = splitHref(href);
  return `${localizePath(pathname, locale)}${suffix}`;
}

export function localizeHrefForLanguage(href: string, lang: SiteLanguage): string {
  return localizeHref(href, siteLanguageToRouteLocale(lang));
}

export function switchLocaleHref(currentHref: string, nextLang: SiteLanguage): string {
  return localizeHref(currentHref, siteLanguageToRouteLocale(nextLang));
}

export function publicUrlForPath(pathname: string, locale: RouteLocale): string {
  return `https://artbar.co.jp${localizePath(pathname, locale)}`;
}

export function localizedAlternates(pathname: string, lang: SiteLanguage) {
  const routeLocale = siteLanguageToRouteLocale(lang);
  const barePath = stripLocalePrefix(pathname);

  return {
    canonical: localizePath(barePath, routeLocale),
    languages: {
      ja: localizePath(barePath, 'ja'),
      en: localizePath(barePath, 'en'),
      'x-default': localizePath(barePath, 'ja'),
    },
  };
}
