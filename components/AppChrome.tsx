'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCopyAdminRoute = pathname.startsWith('/copy-admin');

  return (
    <div className="flex min-h-screen flex-col font-sans text-artbar-navy selection:bg-artbar-taupe selection:text-white">
      {isCopyAdminRoute ? null : <Navbar />}
      <main className="flex-grow">{children}</main>
      {isCopyAdminRoute ? null : <Footer />}
    </div>
  );
}
