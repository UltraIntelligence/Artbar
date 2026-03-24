'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';

export const NotFound: React.FC = () => {
  const { site } = useContent();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-artbar-bg text-center px-6">
      <h1 className="text-9xl font-heading font-heavy text-artbar-taupe mb-4 opacity-50 select-none">404</h1>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-artbar-navy mb-6">Page Not Found</h2>
      <p className="text-artbar-gray text-lg mb-10 max-w-md leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button variant="primary" size="cta" className="shadow-lg hover:bg-artbar-taupe">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};