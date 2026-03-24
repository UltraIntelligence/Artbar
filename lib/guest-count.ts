/** Base total on anchor day (inclusive), Asia/Tokyo calendar. */
const GUEST_COUNT_BASE = 100_457;
const GUEST_COUNT_DAILY = 45;
/** First JST date when the displayed total equals `GUEST_COUNT_BASE`. */
const ANCHOR_JST = '2026-03-24';

function jstDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/** Total guests for “today” in Tokyo (increments by 45 each JST midnight). */
export function getGuestCountTotal(now: Date = new Date()): number {
  const anchor = new Date(`${ANCHOR_JST}T00:00:00+09:00`);
  const today = new Date(`${jstDateString(now)}T00:00:00+09:00`);
  const days = Math.floor((today.getTime() - anchor.getTime()) / 86_400_000);
  return GUEST_COUNT_BASE + Math.max(0, days) * GUEST_COUNT_DAILY;
}

export function formatGuestCountDisplay(lang: 'en' | 'jp', now: Date = new Date()): string {
  const n = getGuestCountTotal(now);
  return n.toLocaleString(lang === 'jp' ? 'ja-JP' : 'en-US');
}

/** JP concept headline: supports `{{count}}` or legacy `累計12,345名` style. */
export function formatGuestConceptLabel(
  label: string,
  lang: 'en' | 'jp',
  countFormatted: string,
): string {
  if (lang !== 'jp') return label;
  if (label.includes('{{count}}')) return label.replace(/\{\{count\}\}/g, countFormatted);
  return label.replace(/累計[\d,]+名/, `累計${countFormatted}名`);
}
