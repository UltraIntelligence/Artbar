import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  ACQUISITION_TTL_MS,
  captureAcquisition,
  newestAcquisition,
  readAcquisition,
  rememberAcquisition,
  withAcquisition,
  withBrowserAcquisition,
} from '../lib/painta-acquisition';

const now = Date.parse('2026-10-04T10:00:00Z');
const landing = new URL(
  'https://artbar.co.jp/?utm_source=google&utm_medium=cpc&utm_campaign=001234',
);

test('paid landing survives direct internal navigation and booking handoff', () => {
  const captured = captureAcquisition(
    landing,
    'https://www.google.com/search?q=private',
    null,
    now,
  );
  assert.ok(captured);
  assert.equal(captured.referrer, 'https://www.google.com');
  const next = captureAcquisition(
    new URL('https://artbar.co.jp/themes/paint-pouring'),
    'https://www.google.com/search?q=private',
    captured,
    now + 1000,
    false,
  );
  assert.deepEqual(next, captured);
  const link = new URL(
    withAcquisition(
      'https://booking.artbar.co.jp/embed/artbar-tokyo/upcoming?category=paint-pouring&locale=ja&utm_source=artbar-theme-page&utm_medium=iframe&utm_campaign=paint-pouring',
      next,
    ),
  );
  assert.equal(link.searchParams.get('utm_campaign'), '001234');
  assert.equal(link.searchParams.get('utm_medium'), 'cpc');
  assert.equal(link.searchParams.get('category'), 'paint-pouring');
  assert.equal(link.searchParams.get('locale'), 'ja');
  assert.equal(link.searchParams.get('painta_acquisition_at'), captured.capturedAt);
  assert.equal(link.searchParams.get('painta_acquisition_referrer'), 'https://www.google.com');
  assert.ok(!link.href.includes('private'));
});

test('direct navigation and same-tag rerenders do not renew expiry', () => {
  const captured = captureAcquisition(landing, '', null, now);
  assert.ok(captured);
  assert.deepEqual(captureAcquisition(landing, '', captured, now + 1000, false), captured);
  assert.equal(readAcquisition(JSON.stringify(captured), now + ACQUISITION_TTL_MS + 1), null);
});

test('genuine later campaign clicks replace the previous acquisition', () => {
  const previous = captureAcquisition(landing, '', null, now);
  const next = captureAcquisition(
    new URL('https://artbar.co.jp/?utm_source=ig&utm_medium=paid'),
    'https://l.instagram.com',
    previous,
    now + 1000,
  );
  assert.equal(next?.utm.utm_source, 'ig');
  assert.equal(next?.capturedAt, new Date(now + 1000).toISOString());
});

test('a new same-campaign document with stripped referrer has a new capture time', () => {
  const previous = captureAcquisition(landing, 'https://www.google.com', null, now);
  const next = captureAcquisition(landing, '', previous, now + 1000);
  assert.equal(next?.capturedAt, new Date(now + 1000).toISOString());
  assert.equal(next?.referrer, null);
  assert.equal(next?.utm.utm_campaign, '001234');
});

test('organic referral remains a referral, with no invented paid campaign', () => {
  const acquisition = captureAcquisition(
    new URL('https://artbar.co.jp/'),
    'https://www.google.com/search?q=private',
    null,
    now,
  );
  assert.deepEqual(acquisition?.utm, {});
  assert.equal(acquisition?.referrer, 'https://www.google.com');
  const url = new URL(
    withAcquisition('https://booking.artbar.co.jp/gift-certificates', acquisition),
  );
  assert.equal(url.pathname, '/gift-certificates');
  assert.equal(url.searchParams.get('utm_source'), null);
});

test('unknown origin strips navigation tags rather than labeling direct traffic', () => {
  const acquisition = captureAcquisition(
    new URL('https://artbar.co.jp/'),
    'https://booking.artbar.co.jp/',
    null,
    now,
  );
  assert.equal(acquisition, null);
  assert.equal(
    new URL(
      withAcquisition(
        'https://booking.artbar.co.jp/?utm_source=painta-embed&utm_medium=iframe',
        acquisition,
      ),
    ).searchParams.get('utm_source'),
    null,
  );
});

test('independent partner tags survive an unknown origin', () => {
  const href =
    'https://booking.artbar.co.jp/themes/paint-pouring?utm_source=partner&utm_medium=referral&utm_campaign=001234&locale=ja';
  const url = new URL(withAcquisition(href, null));
  assert.equal(url.searchParams.get('utm_source'), 'partner');
  assert.equal(url.searchParams.get('utm_campaign'), '001234');
  assert.equal(url.searchParams.get('locale'), 'ja');
});

test('an expired forwarded link cannot restart its campaign window', () => {
  const url = new URL(
    withAcquisition(
      'https://booking.artbar.co.jp/?utm_source=google&utm_medium=cpc&painta_acquisition_at=2026-08-01T00%3A00%3A00Z',
      null,
    ),
  );
  assert.equal(url.searchParams.get('utm_source'), null);
  assert.equal(url.searchParams.get('painta_acquisition_at'), null);
});

test('internal navigation preserves newer memory after a failed storage write', () => {
  const old = captureAcquisition(landing, '', null, now);
  const current = captureAcquisition(
    new URL('https://artbar.co.jp/?utm_source=ig&utm_medium=paid'),
    '',
    old,
    now + 1000,
  );
  assert.ok(old);
  assert.ok(current);
  const next = captureAcquisition(
    new URL('https://artbar.co.jp/themes/paint-pouring'),
    '',
    newestAcquisition(
      readAcquisition(JSON.stringify(old), now + 2000),
      readAcquisition(JSON.stringify(current), now + 2000),
    ),
    now + 2000,
    false,
  );
  assert.equal(next?.utm.utm_source, 'ig');
  assert.equal(next?.capturedAt, current.capturedAt);
});

test('buttons use newer memory when older storage is readable but writes fail', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousNow = Date.now;
  Date.now = () => now + 2000;
  const old = captureAcquisition(landing, '', null, now);
  const current = captureAcquisition(
    new URL('https://artbar.co.jp/?utm_source=ig&utm_medium=paid'),
    '',
    old,
    now + 1000,
  );
  rememberAcquisition(current);
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { href: 'https://artbar.co.jp/themes/paint-pouring' },
      localStorage: {
        getItem: () => JSON.stringify(old),
        setItem: () => {
          throw new Error('quota exhausted');
        },
      },
    },
  });
  try {
    const url = new URL(withBrowserAcquisition('https://booking.artbar.co.jp/'));
    assert.equal(url.searchParams.get('utm_source'), 'ig');
    assert.equal(url.searchParams.get('painta_acquisition_at'), current?.capturedAt);
  } finally {
    Date.now = previousNow;
    rememberAcquisition(null);
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow);
    } else {
      Reflect.deleteProperty(globalThis, 'window');
    }
  }
});

test('only the exact Tokyo booking origin is decorated', () => {
  const acquisition = captureAcquisition(landing, '', null, now);
  for (const href of [
    'https://tickets.artbar.co.jp/',
    'https://booking.artbar.co.jp.evil.example/',
    'mailto:tokyo@artbar.co.jp',
    '/contact',
  ]) {
    assert.equal(withAcquisition(href, acquisition), href);
  }
});

test('malformed, future and expired stored evidence is rejected', () => {
  assert.equal(readAcquisition('broken', now), null);
  assert.equal(
    readAcquisition(
      JSON.stringify({
        capturedAt: new Date(now + 1000).toISOString(),
        utm: { utm_source: 'google' },
      }),
      now,
    ),
    null,
  );
  assert.equal(
    readAcquisition(
      JSON.stringify({
        capturedAt: new Date(now).toISOString(),
        utm: {},
        referrer: 'javascript:alert(1)',
      }),
      now,
    ),
    null,
  );
});

test('code-driven buttons retain acquisition when browser storage is blocked', () => {
  const acquisition = captureAcquisition(landing, '', null, now);
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const clock = Date.now;
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { href: 'https://artbar.co.jp/themes/paint-pouring' },
      localStorage: {
        getItem: () => {
          throw new Error('blocked');
        },
      },
    },
  });
  Date.now = () => now + 1000;
  try {
    rememberAcquisition(acquisition);
    const url = new URL(withBrowserAcquisition('https://booking.artbar.co.jp/'));
    assert.equal(url.searchParams.get('utm_campaign'), '001234');
    assert.equal(url.searchParams.get('painta_acquisition_at'), acquisition?.capturedAt);
  } finally {
    rememberAcquisition(null);
    Date.now = clock;
    if (descriptor) Object.defineProperty(globalThis, 'window', descriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
