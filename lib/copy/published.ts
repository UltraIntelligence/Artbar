import english from '@/data/published-copy/en.json';
import japanese from '@/data/published-copy/jp.json';
import { normalizeCopyPayload } from '@/lib/copy/resolve';
import type { CopyLocale } from '@/lib/copy/types';

const published = { en: english, jp: japanese };

export function getPublishedCopyPayload(locale: CopyLocale) {
  return normalizeCopyPayload(locale, published[locale]);
}

export function getPublishedJapaneseCopyPayload() {
  return getPublishedCopyPayload('jp');
}

export function parseCopyLocale(value: unknown): CopyLocale {
  return value === 'en' || value === 'jp' ? value : 'jp';
}
