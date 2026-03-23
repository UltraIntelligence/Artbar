import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { site, lang, toggleLang } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;

  const navLinks = [
    { name: site.nav.schedule, path: '/', hash: '#schedule' },
    { name: site.nav.paintYourPet, path: '/paint-your-pet' },
    { name: site.nav.instructors, path: '/instructors' },
    { name: site.nav.teamBuilding, path: '/team-building' },
    { name: site.nav.privateParties, path: '/private-parties' },
    { name: site.nav.locations, path: '/locations' },
    { name: site.nav.blog, path: '/blog' },
  ];

  const getLinkActiveClass = (link: any, isActive: boolean, isMobile: boolean = false) => {
    let active = isActive;
    if (link.hash && location.hash === link.hash) {
        active = true;
    }
    if (link.path === '/blog' && location.pathname.startsWith('/blog')) {
        active = true;
    }

    if (isMobile) {
        return `text-3xl font-heading font-bold ${active ? 'text-artbar-taupe' : 'text-artbar-navy'} hover:text-artbar-taupe`;
    }

    // Shrink JP text size slightly (13px vs 15px) to prevent wrapping
    const fontSizeClass = lang === 'jp' ? "text-[13px]" : "text-[15px]";
    const base = `${fontSizeClass} font-heading font-bold transition-colors whitespace-nowrap `;
    
    if (isTransparent) {
      return base + "text-white hover:text-white/80";
    } else {
      return base + (active ? "text-artbar-taupe" : "text-artbar-navy hover:text-artbar-taupe");
    }
  };

  const handleBookClick = () => {
      if (location.pathname !== '/') {
          navigate('/#schedule');
      } else {
          window.location.hash = 'schedule';
      }
      setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isTransparent
          ? 'bg-transparent py-6 md:py-10 shadow-none' 
          : 'bg-artbar-bg/95 backdrop-blur-md shadow-sm py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex justify-between items-center">
        <RouterLink to="/" onClick={handleLogoClick} className="z-50 group relative">
          <Logo variant={isTransparent ? 'light' : 'dark'} />
        </RouterLink>

        {/* Desktop Nav: Tighter spacing for Japanese (space-x-4 vs space-x-6) */}
        <div className={`hidden xl:flex ${lang === 'jp' ? 'space-x-4' : 'space-x-6'} items-center`}>
          {navLinks.map((link) => (
            <RouterLink
              key={link.path + (link.hash || '')}
              to={link.path + (link.hash || '')}
              className={getLinkActiveClass(link, location.pathname === link.path && !link.hash)}
            >
              {link.name}
            </RouterLink>
          ))}
          
          <div className={`h-4 w-px mx-2 ${isTransparent ? 'bg-white/50' : 'bg-artbar-light-taupe'}`}></div>
          
          <button 
             onClick={toggleLang}
             className={`${isTransparent ? 'text-white' : 'text-artbar-navy'} hover:text-artbar-taupe font-heading font-bold text-sm flex items-center gap-1 uppercase w-8`}
          >
             {lang === 'en' ? 'JP' : 'EN'}
          </button>

          <button 
            onClick={handleBookClick}
            className="px-6 py-2.5 rounded-full font-heading font-bold transition-all bg-artbar-taupe text-white hover:bg-opacity-90 shadow-sm text-sm hover:scale-105 active:scale-95 pt-3 pb-2"
          >
            {site.nav.book}
          </button>
        </div>

        <div className="xl:hidden z-50 flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 ${isTransparent ? 'text-white' : 'text-artbar-navy'} transition-colors`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-artbar-bg z-40 flex flex-col pt-32 px-8 pb-10 overflow-y-auto h-screen animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.path + (link.hash || '')}
                  to={link.path + (link.hash || '')}
                  onClick={() => setIsOpen(false)}
                  className={getLinkActiveClass(link, location.pathname === link.path && !link.hash, true)}
                >
                  {link.name}
                </RouterLink>
              ))}
              
              <div className="h-px w-full bg-artbar-light-taupe my-2"></div>
               <button 
                 onClick={() => { toggleLang(); setIsOpen(false); }}
                 className="text-xl font-heading font-bold text-artbar-navy text-left flex items-center gap-2"
               >
                 <Globe size={20} /> {lang === 'en' ? '日本語' : 'English'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};