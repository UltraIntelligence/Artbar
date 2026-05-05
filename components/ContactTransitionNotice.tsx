'use client';

import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

export const ContactTransitionNotice: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  if (!hasMounted) return null;

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-16 shadow-2xl"
      style={{
        background: '#053761',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(1.5rem)',
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Decorative brushstroke */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 400"
        className="absolute -right-16 -top-16 w-72 md:w-96 opacity-[0.06] pointer-events-none select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 340 C120 260 200 180 340 120 C420 80 520 60 580 40"
          stroke="#A39384"
          strokeWidth="80"
          strokeLinecap="round"
        />
        <path
          d="M20 200 C80 160 180 130 280 110 C380 90 480 95 560 120"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </svg>

      {/* Small paint dots decoration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="absolute left-6 bottom-6 w-20 opacity-[0.08] pointer-events-none select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="12" fill="#A39384" />
        <circle cx="55" cy="10" r="7" fill="white" />
        <circle cx="10" cy="55" r="9" fill="white" />
        <circle cx="45" cy="50" r="14" fill="#A39384" />
        <circle cx="80" cy="30" r="6" fill="white" />
        <circle cx="30" cy="85" r="8" fill="#A39384" />
        <circle cx="70" cy="75" r="10" fill="white" />
      </svg>

      {/* ── Welcome header ── */}
      <div className="relative z-10 text-center px-8 md:px-16 pt-10 pb-8">
        <span
          className="inline-flex items-center gap-2 text-xs font-heading font-bold tracking-[0.2em] uppercase mb-5"
          style={{ color: '#A39384' }}
        >
          <span style={{ width: 28, height: 1, background: '#A39384', display: 'inline-block' }} />
          New Website Launch
          <span style={{ width: 28, height: 1, background: '#A39384', display: 'inline-block' }} />
        </span>

        <h2
          className="font-heading font-bold leading-tight mb-1"
          style={{ color: '#F1EFEC', fontSize: 'clamp(1.25rem, 3.5vw, 2rem)', letterSpacing: '-0.01em' }}
        >
          Welcome to the New Artbar Website!
        </h2>
        <p
          className="font-sans mb-3"
          style={{ color: 'rgba(241,239,236,0.65)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
        >
          新しい Artbar ウェブサイトへようこそ！
        </p>

        <p className="text-sm md:text-base" style={{ color: 'rgba(241,239,236,0.8)' }}>
          Thank you for your patience during the transition.
        </p>
        <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(241,239,236,0.55)' }}>
          移行期間中のご不便をおかけして申し訳ございません。
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="relative z-10 mx-8 md:mx-16" style={{ height: 1, background: 'rgba(163,147,132,0.35)' }} />

      {/* ── Cancellation policy ── */}
      <div className="relative z-10 px-8 md:px-16 pt-7 pb-10">
        <div className="text-center mb-5">
          <p
            className="font-heading font-bold tracking-wide"
            style={{ color: '#A39384', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Ticket Cancellation Policy&ensp;／&ensp;チケットキャンセルポリシー
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Before May 5 */}
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{ background: 'rgba(163,147,132,0.15)', border: '1px solid rgba(163,147,132,0.3)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex-shrink-0 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{
                  width: 32, height: 32,
                  background: 'rgba(163,147,132,0.4)',
                  color: '#F1EFEC',
                }}
              >
                ①
              </span>
              <div>
                <p className="font-heading font-bold text-sm" style={{ color: '#F1EFEC' }}>
                  Tickets purchased before May 5th
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(241,239,236,0.55)' }}>
                  5月5日より前にご購入のチケット
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(241,239,236,0.85)' }}>
              Please contact us via this form if you wish to cancel your reservation.
            </p>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(241,239,236,0.5)' }}>
              キャンセルをご希望の場合は、こちらのフォームよりご連絡ください。
            </p>
          </div>

          {/* May 5 onwards */}
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex-shrink-0 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{
                  width: 32, height: 32,
                  background: 'rgba(255,255,255,0.15)',
                  color: '#F1EFEC',
                }}
              >
                ②
              </span>
              <div>
                <p className="font-heading font-bold text-sm" style={{ color: '#F1EFEC' }}>
                  Tickets purchased on or after May 5th
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(241,239,236,0.55)' }}>
                  5月5日以降にご購入のチケット
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(241,239,236,0.85)' }}>
              You can cancel directly from the link in your confirmation email.
            </p>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(241,239,236,0.5)' }}>
              予約確認メールのリンクから直接キャンセルが可能です。
            </p>
          </div>
        </div>

        {/* ── Email CTA ── */}
        <div className="mt-6 text-center">
          <a
            href="mailto:tokyo@artbar.co.jp"
            className="inline-flex items-center gap-2.5 rounded-full font-heading font-bold text-sm transition-all"
            style={{
              background: 'rgba(163,147,132,0.25)',
              border: '1px solid rgba(163,147,132,0.45)',
              color: '#F1EFEC',
              padding: '0.65rem 1.5rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(163,147,132,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(163,147,132,0.7)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(163,147,132,0.25)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(163,147,132,0.45)';
            }}
          >
            <Mail size={15} />
            Email us&ensp;·&ensp;tokyo@artbar.co.jp
          </a>
          <p className="text-xs mt-2" style={{ color: 'rgba(241,239,236,0.4)' }}>
            メールでのお問い合わせ
          </p>
        </div>
      </div>

    </div>
  );
};
