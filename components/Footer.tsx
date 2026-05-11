'use client';

import React from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';
import { JpText } from './JpText';
import { stripJpSentinel } from '../lib/jp-attr';
import { useContent } from '../context/ContentContext';
import { ARTBAR_BOOKING_URL, LOCATIONS, SOCIAL_PROFILES } from '../constants';
import { localizeHrefForLanguage } from '../lib/locale-routing';
import { locationPath } from '../lib/location-pages';
import { trackBookingClick } from '../lib/analytics';

// lucide-react has no TikTok icon (brand icons are deprecated upstream); inline SVG keeps the row consistent.
const TikTokIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24Z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { site, lang, jpCopy } = useContent();
  const currentYear = new Date().getFullYear();
  const socialIconClass = 'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-sm transition-all hover:bg-artbar-taupe';
  const footerLinkClass = 'inline-flex min-h-[44px] min-w-[44px] items-center py-2 hover:text-white hover:translate-x-1 transition-all';
  const footerMetaLinkClass = 'inline-flex min-h-[44px] min-w-[44px] items-center px-1 hover:text-white transition-colors';
  const href = (path: string) => localizeHrefForLanguage(path, lang);

  return (
    <>
      <footer className="grain bg-artbar-navy pt-24 pb-[max(2rem,env(safe-area-inset-bottom,0px))] mt-0 text-white rounded-t-[var(--radius-feature)] mx-0 md:mx-2 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

            <div className="md:col-span-5">
              <div className="mb-8">
                <Logo variant="light" />
              </div>
              <p className="text-artbar-light-taupe/80 leading-relaxed mb-10 max-w-md font-light">
                <JpText>{site.footer.tagline}</JpText>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_PROFILES.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label={lang === 'en' ? 'Instagram' : stripJpSentinel(jpCopy.ui.footer.instagramLabel)}
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={SOCIAL_PROFILES.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label={lang === 'en' ? 'Facebook' : stripJpSentinel(jpCopy.ui.footer.facebookLabel)}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={SOCIAL_PROFILES.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
                <a
                  href={SOCIAL_PROFILES.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="mailto:tokyo@artbar.co.jp"
                  className={socialIconClass}
                  aria-label={lang === 'en' ? 'Email Artbar Tokyo' : stripJpSentinel(jpCopy.ui.footer.emailLabel)}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-artbar-taupe" /> <JpText>{site.footer.locations}</JpText>
              </h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                {LOCATIONS.map((loc) => (
                  <li key={loc.id}>
                    <Link
                      href={href(locationPath(loc.id))}
                      className={footerLinkClass}
                    >
                      {lang === 'en' ? loc.nameEn.replace(/^Artbar\s*/i, '') : loc.nameJp.replace(/^Artbar\s*/i, '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6"><JpText>{site.footer.explore}</JpText></h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><a href={ARTBAR_BOOKING_URL} onClick={() => trackBookingClick('footer')} className={footerLinkClass}><JpText>{site.nav.schedule}</JpText></a></li>
                <li><Link href={href('/team-building')} className={footerLinkClass}><JpText>{site.nav.teamBuilding}</JpText></Link></li>
                <li><Link href={href('/private-parties')} className={footerLinkClass}><JpText>{site.nav.privateParties}</JpText></Link></li>
                <li><Link href={href('/instructors')} className={footerLinkClass}><JpText>{site.nav.instructors}</JpText></Link></li>
                <li><Link href={href('/guides')} className={footerLinkClass}><JpText>{lang === 'en' ? 'Guides' : 'ガイド'}</JpText></Link></li>
                <li><Link href={href('/blog')} className={footerLinkClass}><JpText>{site.nav.blog}</JpText></Link></li>
              </ul>
            </div>

             <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6"><JpText>{site.footer.support}</JpText></h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href={href('/contact')} className={footerLinkClass}><JpText>{site.nav.contact}</JpText></Link></li>
                <li><Link href={href('/contact')} className={footerLinkClass}><JpText>{lang === 'en' ? 'FAQ' : jpCopy.ui.footer.faq}</JpText></Link></li>
                <li><Link href={href('/contact')} className={footerLinkClass}><JpText>{lang === 'en' ? 'Careers' : jpCopy.ui.footer.careers}</JpText></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col gap-3 md:flex-row md:justify-between md:items-center text-xs text-artbar-light-taupe/60 font-light tracking-wide">
            <p className="cursor-default text-center md:text-left">{`© ${currentYear} Artbar Tokyo · Paint and Wine Art Studio · All rights reserved`}</p>
            <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-5 md:justify-end">
              <Link href={href('/privacy-policy')} className={footerMetaLinkClass}><JpText>{site.footer.privacy}</JpText></Link>
              <Link href={href('/terms-of-service')} className={footerMetaLinkClass}><JpText>{site.footer.terms}</JpText></Link>
              <Link href={href('/specified-commercial-transactions')} className={footerMetaLinkClass}><JpText>{site.footer.commercial}</JpText></Link>
              <span className="inline-flex min-h-[44px] items-center px-1"><JpText>{site.footer.company}</JpText></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
