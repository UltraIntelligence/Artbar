import path from 'path';
import type { NextConfig } from 'next';

// Report-only first: browsers report violations but don't block. After two weeks of clean
// production data we can tighten this and switch to enforcing Content-Security-Policy.
const CSP_REPORT_ONLY = [
  `default-src 'self'`,
  // Next.js boot scripts and JSON-LD blocks are inline; 'unsafe-inline' / 'unsafe-eval' are
  // required until we adopt nonce-based CSP via middleware.
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com`,
  // Tailwind injects inline style attributes; Google Fonts CSS is loaded by ThemeInjector.
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' data: blob: https:`,
  `font-src 'self' data: https://fonts.gstatic.com`,
  // Supabase reads are server-side only today; keeping the host whitelisted keeps the door open
  // for the copy-admin UI if it ever fetches client-side.
  `connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com`,
  // Google Maps embed iframes on /locations.
  `frame-src https://www.google.com https://maps.google.com`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  // upgrade-insecure-requests is ignored by browsers when delivered in a report-only policy;
  // re-add when promoting this header to Content-Security-Policy (enforcing).
].join('; ');

const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
];

/** Pin tracing root so a lockfile in a parent folder (e.g. ~/bun.lock) does not confuse Next. */
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [{ source: '/(.*)', headers: SECURITY_HEADERS }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'toolandtea.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'artbar.co.jp' },
      { protocol: 'https', hostname: 'www.artbar.co.jp' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
    // Avoid Sharp-based optimization in dev — reduces crashes on macOS (malloc / bad free) when
    // assets 404 or during heavy Fast Refresh; production builds still optimize images.
    ...(process.env.NODE_ENV === 'development' ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
