'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ACQUISITION_STORAGE_KEY,
  acquisitionTagSignature,
  captureAcquisition,
  newestAcquisition,
  readAcquisition,
  readRememberedAcquisition,
  rememberAcquisition,
  rememberedAcquisitionTagSignature,
  withAcquisition,
} from '@/lib/painta-acquisition';

/** Carries campaign fields and external referral origin to Painta. */
export function PaintaAcquisitionBridge(): null {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const restoringHistory = useRef<string | null>(null);

  useEffect(() => {
    const restore = (): void => {
      restoringHistory.current = window.location.href;
      let raw: string | null = null;
      try {
        raw = window.localStorage.getItem(ACQUISITION_STORAGE_KEY);
      } catch {
        /* History navigation must also work when storage is restricted. */
      }
      const acquisition = newestAcquisition(
        readAcquisition(raw),
        readRememberedAcquisition(),
      );
      rememberAcquisition(acquisition);
    };
    window.addEventListener('popstate', restore, true);
    return () => window.removeEventListener('popstate', restore, true);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const initialize = (): (() => void) => {
      let raw: string | null = null;
      try {
        raw = window.localStorage.getItem(ACQUISITION_STORAGE_KEY);
      } catch {
        /* Restricted storage must not block booking. */
      }
      const landing = new URL(window.location.href);
      const tags = acquisitionTagSignature(landing);
      const previousTags = rememberedAcquisitionTagSignature();
      const stored = newestAcquisition(readAcquisition(raw), readRememberedAcquisition());
      let acquisition = restoringHistory.current === landing.href || previousTags === tags
        ? stored
        : captureAcquisition(landing, document.referrer, stored, Date.now(), previousTags === null);
      restoringHistory.current = null;
      rememberAcquisition(acquisition);
      try {
        if (acquisition) {
          window.localStorage.setItem(ACQUISITION_STORAGE_KEY, JSON.stringify(acquisition));
        } else {
          window.localStorage.removeItem(ACQUISITION_STORAGE_KEY);
        }
      } catch {
        /* Current URL tags still work when storage is unavailable. */
      }

      const selector =
        'a[href^="https://booking.artbar.co.jp" i], iframe[src^="https://booking.artbar.co.jp" i]';
      const decorateElement = (element: Element): void => {
        const attribute = element instanceof HTMLAnchorElement ? 'href' : 'src';
        const original = element.getAttribute(attribute);
        if (!original) {
          return;
        }
        const decorated = withAcquisition(original, readAcquisition(JSON.stringify(acquisition)));
        if (decorated !== original) {
          element.setAttribute(attribute, decorated);
        }
      };
      const decorateTree = (root: Element): void => {
        if (root.matches(selector)) {
          decorateElement(root);
        }
        root.querySelectorAll(selector).forEach(decorateElement);
      };
      decorateTree(document.body);
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          if (
            record.type === 'attributes' &&
            record.target instanceof Element &&
            record.target.matches(selector)
          ) {
            decorateElement(record.target);
          }
          for (const node of record.addedNodes) {
            if (node instanceof Element) {
              decorateTree(node);
            }
          }
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['href', 'src'],
      });
      // Cover links inserted or changed immediately before navigation.
      const decorateClick = (event: MouseEvent): void => {
        if (!(event.target instanceof Element)) {
          return;
        }
        const anchor = event.target.closest('a[href^="https://booking.artbar.co.jp" i]');
        if (anchor) {
          decorateElement(anchor);
        }
      };
      document.addEventListener('click', decorateClick, true);
      const updateFromStorage = (event: StorageEvent): void => {
        if (event.key !== ACQUISITION_STORAGE_KEY) {
          return;
        }
        acquisition = newestAcquisition(
          readAcquisition(event.newValue),
          readAcquisition(JSON.stringify(acquisition)),
        );
        rememberAcquisition(acquisition);
        decorateTree(document.body);
      };
      window.addEventListener('storage', updateFromStorage);
      return () => {
        observer.disconnect();
        document.removeEventListener('click', decorateClick, true);
        window.removeEventListener('storage', updateFromStorage);
      };
    };
    // Next can flush effects inside its popstate listener. Let every listener
    // finish before distinguishing history restoration from a new campaign.
    const timer = window.setTimeout(() => { cleanup = initialize(); }, 0);
    return () => {
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [pathname, search]);

  return null;
}
