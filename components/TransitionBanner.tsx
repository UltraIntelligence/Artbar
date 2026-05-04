'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const DISMISSED_KEY = 'artbar_transition_banner_dismissed_v1';

export const TransitionBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const { lang } = useContent();

  useEffect(() => {
    setHasMounted(true);
    try {
      setIsDismissed(window.localStorage.getItem(DISMISSED_KEY) === '1');
    } catch {
      setIsDismissed(false);
    }
  }, []);

  if (!hasMounted || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      window.localStorage.setItem(DISMISSED_KEY, '1');
    } catch {}
  };

  const isJp = lang === 'jp';
  const prefix = isJp
    ? '5月5日以前のご予約：変更・キャンセルは'
    : 'Booked before May 5? For changes or cancellations, email';
  const suffix = isJp
    ? 'まで（クラス24時間前まで）'
    : ' (at least 24h before class)';
  const dismissLabel = isJp ? '閉じる' : 'Dismiss';

  return (
    <div className="bg-artbar-navy text-white text-xs sm:text-sm">
      <div className="relative max-w-[1400px] mx-auto px-10 py-2 flex items-center justify-center">
        <p className="text-center leading-snug">
          {prefix}{' '}
          <a
            href="mailto:tokyo@artbar.co.jp"
            className="underline underline-offset-2 hover:no-underline font-medium whitespace-nowrap"
          >
            tokyo@artbar.co.jp
          </a>
          {suffix}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={dismissLabel}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
