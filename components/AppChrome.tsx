'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-24 font-sans text-artbar-navy selection:bg-artbar-taupe selection:text-white xl:pb-0">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
