import React, { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const LOCAL_LOGO_URLS = {
  dark: '/brand/artbar-logo-dark.png',
  light: '/brand/artbar-logo-light.png',
} as const;

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const { content } = useContent();
  const configuredLogoUrl =
    variant === 'light' ? content.images.logoLight : content.images.logoDark;
  const fallbackLogoUrl = LOCAL_LOGO_URLS[variant];
  const [imgSrc, setImgSrc] = useState(configuredLogoUrl || fallbackLogoUrl);

  useEffect(() => {
    setImgSrc(configuredLogoUrl || fallbackLogoUrl);
  }, [configuredLogoUrl, fallbackLogoUrl]);

  const hasHeightClass = className.includes('h-');
  const imgClasses = hasHeightClass
    ? "w-auto object-contain"
    : "h-6 md:h-8 w-auto object-contain transition-all duration-300";

  return (
    <div className={`flex items-center ${className}`}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Artbar Tokyo"
          className={imgClasses}
          onError={() => {
            if (imgSrc !== fallbackLogoUrl) {
              setImgSrc(fallbackLogoUrl);
              return;
            }

            setImgSrc('');
          }}
        />
      ) : (
        <div className={`flex items-center gap-1 font-sans font-bold text-xl tracking-tight ${variant === 'light' ? 'text-white' : 'text-artbar-navy'}`}>
          <span>ar<span className="text-artbar-taupe">+</span>bar</span>
        </div>
      )}
    </div>
  );
};
