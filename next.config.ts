import path from 'path';
import type { NextConfig } from 'next';

/** Pin tracing root so a lockfile in a parent folder (e.g. ~/bun.lock) does not confuse Next. */
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
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
