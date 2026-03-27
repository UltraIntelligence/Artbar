import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
  /** Start loading before the block enters view (px or %). */
  rootMargin?: string;
};

/**
 * Flips to `true` once the element is near or inside the viewport — for lazy video preload.
 */
export function useNearViewport<T extends HTMLElement>(options?: Options): {
  ref: RefObject<T | null>;
  near: boolean;
} {
  const { rootMargin = '480px' } = options ?? {};
  const marginPx = Math.max(0, parseInt(String(rootMargin), 10) || 480);
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;

    const mark = () => {
      setNear(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mark();
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);

    const syncIfAlreadyNear = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const margin = marginPx;
      if (rect.top < vh + margin && rect.bottom > -margin) {
        mark();
        observer.disconnect();
      }
    };

    syncIfAlreadyNear();
    requestAnimationFrame(syncIfAlreadyNear);

    return () => observer.disconnect();
  }, [near, rootMargin, marginPx]);

  return { ref, near };
}
