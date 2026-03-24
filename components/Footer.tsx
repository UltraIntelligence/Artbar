'use client';

import React from 'react';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { LOCATION_SHORT_LABELS } from '../constants';

export const Footer: React.FC = () => {
  const { site, lang } = useContent();
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const socialIconClass = 'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-sm transition-all hover:bg-artbar-taupe';
  const footerLinkClass = 'inline-flex min-h-[44px] min-w-[44px] items-center py-2 hover:text-white hover:translate-x-1 transition-all';
  const footerMetaLinkClass = 'inline-flex min-h-[44px] min-w-[44px] items-center px-1 hover:text-white transition-colors';

  const openAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

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
                {site.footer.tagline}
              </p>
              <div className="flex space-x-4">
                <a href="#" className={socialIconClass} aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className={socialIconClass} aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="mailto:tokyo@artbar.co.jp" className={socialIconClass} aria-label="Email Artbar Tokyo">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-artbar-taupe" /> {site.footer.locations}
              </h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                {LOCATION_SHORT_LABELS.map((loc) => (
                  <li key={loc.en}>
                    <Link
                      href="/locations"
                      className={footerLinkClass}
                    >
                      {loc[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6">{site.footer.explore}</h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href="/" className={footerLinkClass}>{site.nav.schedule}</Link></li>
                <li><Link href="/paint-your-pet" className={footerLinkClass}>{site.nav.paintYourPet}</Link></li>
                <li><Link href="/team-building" className={footerLinkClass}>{site.nav.teamBuilding}</Link></li>
                <li><Link href="/private-parties" className={footerLinkClass}>{site.nav.privateParties}</Link></li>
                <li><Link href="/instructors" className={footerLinkClass}>{site.nav.instructors}</Link></li>
                <li><Link href="/blog" className={footerLinkClass}>{site.nav.blog}</Link></li>
              </ul>
            </div>

             <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6">{site.footer.support}</h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href="/contact" className={footerLinkClass}>{site.nav.contact}</Link></li>
                <li><Link href="/contact" className={footerLinkClass}>FAQ</Link></li>
                <li><Link href="/contact" className={footerLinkClass}>Careers</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col gap-3 md:flex-row md:justify-between md:items-center text-xs text-artbar-light-taupe/60 font-light tracking-wide">
            <p className="cursor-default text-center md:text-left">
              <span
                onClick={openAdmin}
                className="inline-flex min-h-[44px] items-center hover:text-white cursor-pointer transition-colors"
                title="Admin Access"
              >
                ©
              </span>
              {` ${currentYear} Artbar Tokyo · Paint and Wine Art Studio · All rights reserved`}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-5 md:justify-end">
              <Link href="#" className={footerMetaLinkClass}>{site.footer.privacy}</Link>
              <Link href="#" className={footerMetaLinkClass}>{site.footer.terms}</Link>
              <Link href="#" className={footerMetaLinkClass}>{site.footer.commercial}</Link>
              <span className="inline-flex min-h-[44px] items-center px-1">{site.footer.company}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
