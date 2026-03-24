import path from 'path';
import type { NextConfig } from 'next';

/** Pin tracing root so a lockfile in a parent folder (e.g. ~/bun.lock) does not confuse Next. */
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'toolandtea.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
