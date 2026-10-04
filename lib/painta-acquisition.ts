/** Keep acquisition separate from navigation within Artbar's own website. */
export const ACQUISITION_STORAGE_KEY = 'artbar.painta.acquisition.v1';
export const ACQUISITION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const BOOKING_ORIGIN = 'https://booking.artbar.co.jp';

export interface Acquisition {
  capturedAt: string;
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>;
  referrer: string | null;
}

let browserAcquisition: Acquisition | null = null;

/** Both candidates have already passed expiry and shape validation. */
export function newestAcquisition(
  first: Acquisition | null,
  second: Acquisition | null,
): Acquisition | null {
  if (!first) {
    return second;
  }
  if (!second) {
    return first;
  }
  return Date.parse(first.capturedAt) > Date.parse(second.capturedAt) ? first : second;
}

export function rememberAcquisition(acquisition: Acquisition | null): void {
  browserAcquisition = acquisition;
}

/** Buttons navigate in code rather than using an anchor, so decorate at click time. */
export function withBrowserAcquisition(href: string): string {
  if (typeof window === 'undefined') {
    return href;
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(ACQUISITION_STORAGE_KEY);
  } catch {
    /* Use current-document evidence if storage is blocked. */
  }
  const stored = newestAcquisition(
    readAcquisition(raw),
    readAcquisition(JSON.stringify(browserAcquisition)),
  );
  const acquisition = captureAcquisition(
    new URL(window.location.href),
    '',
    stored,
    Date.now(),
    false,
  );
  return withAcquisition(href, acquisition);
}

function externalOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.hostname === 'artbar.co.jp' ||
      url.hostname.endsWith('.artbar.co.jp')
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export function readAcquisition(raw: string | null, now = Date.now()): Acquisition | null {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!value || typeof value !== 'object') {
      return null;
    }
    const record = value as Record<string, unknown>;
    if (typeof record.capturedAt !== 'string' || !record.utm || typeof record.utm !== 'object') {
      return null;
    }
    const age = now - Date.parse(record.capturedAt);
    if (!Number.isFinite(age) || age < 0 || age > ACQUISITION_TTL_MS) {
      return null;
    }
    const utm: Acquisition['utm'] = {};
    for (const key of UTM_KEYS) {
      const item = (record.utm as Record<string, unknown>)[key];
      if (typeof item === 'string' && item.trim()) {
        utm[key] = item.trim().slice(0, 100);
      }
    }
    const referrer = typeof record.referrer === 'string' ? externalOrigin(record.referrer) : null;
    return Object.keys(utm).length || referrer
      ? { capturedAt: record.capturedAt, utm, referrer }
      : null;
  } catch {
    return null;
  }
}

export function captureAcquisition(
  url: URL,
  referrer: string,
  stored: Acquisition | null,
  now = Date.now(),
  captureReferrer = true,
): Acquisition | null {
  const utm: Acquisition['utm'] = {};
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)?.trim();
    if (value) {
      utm[key] = value.slice(0, 100);
    }
  }
  if (Object.keys(utm).length) {
    // SPA rerenders/buttons reuse the original click; a fresh tagged document is a new touch.
    if (stored && UTM_KEYS.every((key) => stored.utm[key] === utm[key]) && !captureReferrer) {
      return stored;
    }
    return { capturedAt: new Date(now).toISOString(), utm, referrer: externalOrigin(referrer) };
  }
  const origin = captureReferrer ? externalOrigin(referrer) : null;
  return origin ? { capturedAt: new Date(now).toISOString(), utm, referrer: origin } : stored;
}

export function withAcquisition(href: string, acquisition: Acquisition | null): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.origin !== BOOKING_ORIGIN) {
    return href;
  }
  // Preserve independent campaign links when no first-site acquisition is known.
  const source = url.searchParams.get('utm_source');
  const internalCampaign =
    (url.searchParams.get('utm_medium') === 'iframe' &&
      ['painta-embed', 'artbar-theme-page', 'artbar-location-page'].includes(source ?? '')) ||
    (!source && url.searchParams.get('utm_campaign') === 'home-sessions');
  if (acquisition || internalCampaign || url.searchParams.has('painta_acquisition_at')) {
    // Expired forwarded tags must not become a fresh campaign after removing their time.
    for (const key of UTM_KEYS) {
      url.searchParams.delete(key);
    }
  }
  url.searchParams.delete('painta_acquisition_at');
  url.searchParams.delete('painta_acquisition_referrer');
  if (acquisition) {
    for (const key of UTM_KEYS) {
      const value = acquisition.utm[key];
      if (value) {
        url.searchParams.set(key, value);
      }
    }
    url.searchParams.set('painta_acquisition_at', acquisition.capturedAt);
    if (acquisition.referrer) {
      url.searchParams.set('painta_acquisition_referrer', acquisition.referrer);
    }
  }
  return url.toString();
}
