import React from 'react';
import { useContent } from '../context/ContentContext';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const { content } = useContent();
  // If variant is 'light' (used on dark backgrounds), use logoLight.
  // If variant is 'dark' (used on light backgrounds), use logoDark.
  const logoUrl = variant === 'light' ? content.images.logoLight : content.images.logoDark;

  // Determine if a height class is explicitly passed. 
  // Default: h-6 (24px) on mobile, h-8 (32px) on desktop (~25% increase from h-6).
  const hasHeightClass = className.includes('h-');
  const imgClasses = hasHeightClass 
    ? "w-auto object-contain" 
    : "h-6 md:h-8 w-auto object-contain transition-all duration-300";

  return (
    <div className={`flex items-center ${className}`}>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt="Artbar Tokyo" 
          className={imgClasses}
        />
      ) : (
        <div className={`flex items-center gap-1 font-sans font-bold text-xl tracking-tight ${variant === 'light' ? 'text-white' : 'text-artbar-navy'}`}>
          <span>ar<span className="text-artbar-taupe">+</span>bar</span>
        </div>
      )}
    </div>
  );
};