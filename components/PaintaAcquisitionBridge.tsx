'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  ACQUISITION_STORAGE_KEY,
  captureAcquisition,
  newestAcquisition,
  readAcquisition,
  rememberAcquisition,
  withAcquisition,
  type Acquisition,
} from '@/lib/painta-acquisition';

/** Carries the first-site acquisition to Painta without customer identifiers. */
export function PaintaAcquisitionBridge(): null {
  const pathname = usePathname();
  const firstDocumentCapture = useRef(true);
  const inMemory = useRef<Acquisition | null>(null);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(ACQUISITION_STORAGE_KEY);
    } catch {
      /* Restricted storage must not block booking. */
    }
    const acquisition = captureAcquisition(
      new URL(window.location.href),
      document.referrer,
      newestAcquisition(readAcquisition(raw), readAcquisition(JSON.stringify(inMemory.current))),
      Date.now(),
      firstDocumentCapture.current,
    );
    inMemory.current = acquisition;
    rememberAcquisition(acquisition);
    firstDocumentCapture.current = false;
    try {
      if (acquisition) {
        window.localStorage.setItem(ACQUISITION_STORAGE_KEY, JSON.stringify(acquisition));
      } else {
        window.localStorage.removeItem(ACQUISITION_STORAGE_KEY);
      }
    } catch {
      /* Current URL tags still work when storage is unavailable. */
    }

    const decorate = (): void => {
      document
        .querySelectorAll<HTMLAnchorElement | HTMLIFrameElement>('a[href], iframe[src]')
        .forEach((element) => {
          const attribute = element instanceof HTMLAnchorElement ? 'href' : 'src';
          const original = element.getAttribute(attribute);
          if (!original) {
            return;
          }
          const decorated = withAcquisition(original, readAcquisition(JSON.stringify(acquisition)));
          if (decorated !== original) {
            element.setAttribute(attribute, decorated);
          }
        });
    };
    decorate();
    const observer = new MutationObserver(decorate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href', 'src'],
    });
    // Cover links inserted or changed immediately before navigation.
    document.addEventListener('click', decorate, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', decorate, true);
    };
  }, [pathname]);

  return null;
}
