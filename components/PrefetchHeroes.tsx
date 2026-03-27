'use client';

import { useEffect } from 'react';

/**
 * After the page is idle, prefetch hero images for key pages so navigation
 * feels instant.  Targets the /_next/image optimised URLs that next/image
 * will request, so the browser has them cached before the user clicks.
 */
export function PrefetchHeroes({ srcs }: { srcs: string[] }) {
  useEffect(() => {
    const prefetch = () => {
      const w = window.innerWidth > 768 ? 1920 : 828;
      for (const src of srcs) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
        document.head.appendChild(link);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 2000);
    }
  }, [srcs]);

  return null;
}
