import { useSyncExternalStore } from 'react';

const QUERY = '(min-width: 768px)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Mobile-first on server — matches Tailwind `md` breakpoint. */
function getServerSnapshot() {
  return false;
}

/**
 * Stable `min-width: 768px` for client-only layout decisions (hero video preload, etc.).
 * SSR snapshot is `false` so first paint matches mobile; desktop updates after hydrate.
 */
export function useMediaMinMd(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
