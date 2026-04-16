'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';

export const NotFound: React.FC = () => {
  const { lang, jpCopy } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const copy = {
    title: lang === 'en' ? 'Page Not Found' : jpCopy.ui.notFound.title,
    body:
      lang === 'en'
        ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
        : jpCopy.ui.notFound.body,
    cta: lang === 'en' ? 'Back to Home' : jpCopy.ui.notFound.cta,
  };

  return (
    <div className="grain relative min-h-screen flex flex-col items-center justify-center bg-artbar-bg text-center px-6 py-24 overflow-hidden">
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-[min(120vw,720px)] h-auto text-artbar-taupe opacity-[0.06]"
        viewBox="0 0 400 200"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M20 140 Q 80 40 160 100 T 320 60 Q 360 50 380 90 L 360 120 Q 300 100 220 130 T 60 150 Q 40 155 20 140 Z"
        />
      </svg>
      <div className={`reveal relative z-10 max-w-lg ${visible ? 'visible' : ''}`}>
        <h1 className="text-[8rem] md:text-[12rem] font-heading font-heavy text-artbar-taupe mb-2 select-none leading-none opacity-90">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-artbar-navy mb-6">{copy.title}</h2>
        <p className="text-artbar-gray text-lg mb-10 max-w-md mx-auto leading-relaxed">{copy.body}</p>
        <Link href="/">
          <Button variant="primary" size="cta" className="shadow-lg hover:bg-artbar-taupe">
            {copy.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};
