import { useEffect, useRef, useState } from 'react';

type UseScrollRevealOptions = {
  /**
   * Intersection ratio required before `isVisible` flips. Default `0` means any overlap
   * counts — safer on mobile than 0.15, where tall blocks could fail to reach 15% visible.
   */
  threshold?: number;
};

/**
 * Drives `.reveal` / `.reveal-stagger` + `.visible` in `app/globals.css`.
 * Uses `threshold: 0` by default and a short layout pass to catch targets already in
 * the viewport on first paint (common iOS/Safari gap with IntersectionObserver alone).
 */
export function useScrollReveal(options?: UseScrollRevealOptions) {
  const threshold = options?.threshold ?? 0;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const markVisible = () => {
      if (done) return;
      done = true;
      setIsVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible();
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);

    const syncIfAlreadyInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        markVisible();
        observer.unobserve(el);
      }
    };

    let cancelled = false;
    const raf1 = requestAnimationFrame(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        syncIfAlreadyInView();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}
