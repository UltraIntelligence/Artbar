import path from 'path';
import type { NextConfig } from 'next';

const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Avoid Sharp-based optimization in dev — reduces crashes on macOS (malloc / bad free) when
    // assets 404 or during heavy Fast Refresh; production builds still optimize images.
    ...(process.env.NODE_ENV === 'development' ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
