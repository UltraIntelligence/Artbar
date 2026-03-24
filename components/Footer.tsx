'use client';

import React from 'react';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { site } = useContent();
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const openAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

  return (
    <>
      <footer className="bg-artbar-navy pt-24 pb-[max(2rem,env(safe-area-inset-bottom,0px))] mt-0 text-white rounded-t-[3rem] mx-0 md:mx-2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

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
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-artbar-taupe transition-all shadow-sm border border-white/10">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-artbar-taupe transition-all shadow-sm border border-white/10">
                  <Facebook size={18} />
                </a>
                <a href="mailto:tokyo@artbar.co.jp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-artbar-taupe transition-all shadow-sm border border-white/10">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                <MapPin size={18} className="text-artbar-taupe" /> {site.footer.locations}
              </h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Daikanyama</Link></li>
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Cat Street Harajuku</Link></li>
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Ginza</Link></li>
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Yokohama Motomachi</Link></li>
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Osaka</Link></li>
                <li><Link href="/locations" className="hover:text-white hover:translate-x-1 transition-all inline-block">Okinawa</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6">{site.footer.explore}</h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.schedule}</Link></li>
                <li><Link href="/paint-your-pet" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.paintYourPet}</Link></li>
                <li><Link href="/team-building" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.teamBuilding}</Link></li>
                <li><Link href="/private-parties" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.privateParties}</Link></li>
                <li><Link href="/instructors" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.instructors}</Link></li>
                <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.blog}</Link></li>
              </ul>
            </div>

             <div className="md:col-span-2">
              <h4 className="font-heading font-bold text-white text-lg mb-6">{site.footer.support}</h4>
              <ul className="space-y-3 text-artbar-light-taupe">
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">{site.nav.contact}</Link></li>
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Careers</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-artbar-light-taupe/60 font-light tracking-wide">
            <p className="cursor-default">
              <span
                onClick={openAdmin}
                className="hover:text-white cursor-pointer transition-colors"
                title="Admin Access"
              >
                ©
              </span>
              {` ${currentYear} Artbar Tokyo · Paint and Wine Art Studio · All rights reserved`}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">{site.footer.privacy}</Link>
              <Link href="#" className="hover:text-white transition-colors">{site.footer.terms}</Link>
              <Link href="#" className="hover:text-white transition-colors">{site.footer.commercial}</Link>
              <span>{site.footer.company}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
