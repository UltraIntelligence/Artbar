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

const LEGACY_CONTENT_STORAGE_KEY = 'artbar_content_v5';
const LEGACY_ARTBAR_LOGO_URL_PATTERN =
  /^https?:\/\/artbar\.co\.jp\/wp-content\/uploads\/ArtBar-Logo_new/i;

let hasMigratedLegacyLogoUrls = false;

function sanitizeConfiguredLogoUrl(
  configuredLogoUrl: string | undefined,
  fallbackLogoUrl: string
) {
  if (!configuredLogoUrl || LEGACY_ARTBAR_LOGO_URL_PATTERN.test(configuredLogoUrl)) {
    return fallbackLogoUrl;
  }

  return configuredLogoUrl;
}

function migrateLegacyStoredLogoUrls() {
  if (typeof window === 'undefined' || hasMigratedLegacyLogoUrls) {
    return;
  }

  hasMigratedLegacyLogoUrls = true;

  try {
    const storedContent = window.localStorage.getItem(LEGACY_CONTENT_STORAGE_KEY);
    if (!storedContent) {
      return;
    }

    const parsedContent = JSON.parse(storedContent) as {
      images?: {
        logoDark?: string;
        logoLight?: string;
      };
    };

    if (!parsedContent?.images) {
      return;
    }

    let changed = false;
    const nextContent = {
      ...parsedContent,
      images: {
        ...parsedContent.images,
      },
    };

    if (
      nextContent.images.logoDark &&
      LEGACY_ARTBAR_LOGO_URL_PATTERN.test(nextContent.images.logoDark)
    ) {
      nextContent.images.logoDark = LOCAL_LOGO_URLS.dark;
      changed = true;
    }

    if (
      nextContent.images.logoLight &&
      LEGACY_ARTBAR_LOGO_URL_PATTERN.test(nextContent.images.logoLight)
    ) {
      nextContent.images.logoLight = LOCAL_LOGO_URLS.light;
      changed = true;
    }

    if (changed) {
      window.localStorage.setItem(
        LEGACY_CONTENT_STORAGE_KEY,
        JSON.stringify(nextContent)
      );
    }
  } catch {
    // Ignore malformed or inaccessible browser storage and fall back to bundled assets.
  }
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const { content, lang, jpCopy } = useContent();
  const configuredLogoUrl =
    variant === 'light' ? content.images.logoLight : content.images.logoDark;
  const fallbackLogoUrl = LOCAL_LOGO_URLS[variant];
  const [imgSrc, setImgSrc] = useState(
    sanitizeConfiguredLogoUrl(configuredLogoUrl, fallbackLogoUrl)
  );

  useEffect(() => {
    migrateLegacyStoredLogoUrls();
    setImgSrc(sanitizeConfiguredLogoUrl(configuredLogoUrl, fallbackLogoUrl));
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
          alt={lang === 'en' ? 'Artbar Tokyo' : jpCopy.ui.footer.logoAlt}
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
