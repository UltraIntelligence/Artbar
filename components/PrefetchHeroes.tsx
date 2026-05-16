'use client';

import { useEffect } from 'react';

/**
 * After the page is idle, prefetch hero images for key pages so navigation
 * feels instant. In production this targets the /_next/image optimised URLs
 * that next/image will request. In development, next/image serves the public
 * URL directly, so prefetch that path to match local behavior.
 */
export function PrefetchHeroes({ srcs }: { srcs: string[] }) {
  useEffect(() => {
    const prefetch = () => {
      const w = window.innerWidth > 768 ? 1920 : 828;
      for (const src of srcs) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href =
          process.env.NODE_ENV === 'development'
            ? src
            : `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
        document.head.appendChild(link);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 2000);
    }
  }, [srcs]);

  return null;
}
