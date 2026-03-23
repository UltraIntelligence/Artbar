import React, { useState, useEffect } from 'react';
import { Wine, Star, Calendar, Palette, Heart, ArrowRight, Quote, ShieldCheck, Newspaper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { content, site, lang } = useContent();
  const navigate = useNavigate();
  const theme = content.theme.typography;
  
  // Testimonial cycling logic
  const [activeIndex, setActiveIndex] = useState(0);
  const topTestimonials = site.home.testimonials.items.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [topTestimonials.length]);

  // Icon mapping helper
  const getStepIcon = (index: number) => {
    const icons = [Calendar, Wine, Palette, Heart];
    return icons[index] || Calendar;
  };

  const REGULAR_LOGOS = [
    { name: "Coca-Cola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "L'Oreal", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg" },
    { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Bloomberg", url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Bloomberg_logo.svg" },
    { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Morrison Foerster", url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Morrison_%26_Foerster_logo.svg" },
    { name: "GE", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/General_Electric_logo.svg" },
    { name: "LUMINE", url: "https://artbar.co.jp/wp-content/uploads/Lumine_logo.svg" }
  ];

  // Structured Data for Organization (Brand)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Artbar Tokyo",
    "url": "https://artbar.co.jp",
    "logo": "https://artbar.co.jp/logo.png",
    "sameAs": [
      "https://www.facebook.com/artbartokyo",
      "https://www.instagram.com/artbartokyo"
    ]
  };

  return (
    <div className="w-full bg-artbar-bg">
      <style>{`
        @keyframes star-pop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.3) rotate(5deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .animate-star {
          animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          display: inline-block;
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s infinite ease-in-out;
        }

        /* Glassy Sheen Animation */
        @keyframes sheen {
          0% { transform: translateX(-120%) skewX(-20deg); }
          15% { transform: translateX(250%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-sheen {
          position: relative;
          overflow: hidden;
        }
        .animate-sheen::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          transform: translateX(-120%) skewX(-20deg);
          animation: sheen 5s infinite ease-in-out;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
      
      <SEO 
        title={lang === 'en' ? "Paint & Sip Studio" : "ペイント＆シップ スタジオ"}
        description={site.home.hero.subtitle}
        schema={orgSchema}
      />

      {/* Hero Section */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 md:m-4 md:rounded-[2.5rem] overflow-hidden bg-artbar-navy">
          {content.images.hero.video ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
              poster={content.images.hero.home}
            >
              <source src={content.images.hero.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full relative">
               <img 
                src={content.images.hero.home} 
                alt="Artbar Experience" 
                className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105" 
               />
               <div className="absolute inset-0 bg-artbar-navy/30"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-20 max-w-[1400px] mx-auto text-center">
            <div className="max-w-5xl flex flex-col items-center pt-16 md:pt-20">
              
              <span className="animate-sheen inline-flex items-center justify-center text-center pt-2 pb-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading font-bold mb-20 md:mb-32 tracking-widest uppercase text-[9px] md:text-sm">
                {site.home.hero.badge}
              </span>
              
              <h1 className="font-heading font-heavy text-white mb-6 md:mb-10 leading-tight tracking-tighter drop-shadow-lg flex flex-col items-center">
                <span className={`${theme.heroTitle} block`}>{site.home.hero.title}</span>
                <span className={`${theme.heroTitle} block text-artbar-taupe mt-1 md:mt-0`}>{site.home.hero.titleHighlight}</span>
              </h1>
              
              <div className="w-full max-w-2xl mx-auto px-2">
                <h2 className={`${theme.bodyLarge} text-white/90 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md px-4 whitespace-pre-line text-sm md:text-xl`}>
                  {site.home.hero.subtitle}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-colors cursor-default">
                   <div className="flex text-yellow-400 gap-0.5">
                     <Star className="animate-star" style={{ animationDelay: '600ms' }} fill="currentColor" size={12} />
                     <Star className="animate-star" style={{ animationDelay: '700ms' }} fill="currentColor" size={12} />
                     <Star className="animate-star" style={{ animationDelay: '800ms' }} fill="currentColor" size={12} />
                     <Star className="animate-star" style={{ animationDelay: '900ms' }} fill="currentColor" size={12} />
                     <Star className="animate-star" style={{ animationDelay: '1000ms' }} fill="currentColor" size={12} />
                   </div>
                   <span className="text-white font-bold text-[10px] md:text-sm ml-1">{site.home.hero.rating}</span>
                </div>
                
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-colors cursor-default">
                   <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                          <img 
                              key={i} 
                              className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/50 object-cover animate-star" 
                              style={{ animationDelay: `${1100 + (i * 100)}ms` }}
                              src={`https://picsum.photos/seed/avatar${i}/100`} 
                              alt="Guest" 
                          />
                      ))}
                   </div>
                   <span className="text-white font-bold text-[10px] md:text-sm">{site.home.hero.guests}</span>
                </div>
              </div>
              
              <div className="flex justify-center items-center w-full px-4 sm:px-0 mb-8">
                <Button 
                    onClick={() => window.location.hash = 'schedule'}
                    size="lg" 
                    className="animate-pulse-soft bg-artbar-taupe hover:bg-opacity-90 text-white border-none text-lg md:text-xl px-10 py-4 md:px-16 md:py-5 h-auto rounded-full shadow-[0_10px_40px_-10px_rgba(163,147,132,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(163,147,132,0.7)] w-full sm:w-auto max-w-[320px] sm:max-w-none pt-5 pb-4 flex items-center justify-center transition-all duration-300 transform"
                >
                  {site.home.hero.ctaSchedule}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="relative z-20 px-4 md:px-10">
        <div className="max-w-5xl mx-auto -mt-10 md:-mt-24 -translate-y-px">
          
          {/* Centered High-Impact Review Card (Horizontal Cycling Animation) */}
          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.18)] flex flex-col items-center text-center relative overflow-hidden group mb-12 min-h-[340px] md:min-h-[400px] justify-center">
            {topTestimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 p-8 md:p-14 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : idx < activeIndex 
                      ? 'opacity-0 -translate-x-full pointer-events-none'
                      : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '100ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '200ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '300ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '400ms' }} />
                    <Star size={18} fill="currentColor" className="animate-star md:w-5 md:h-5" style={{ animationDelay: '500ms' }} />
                </div>

                <div className="relative mb-8">
                    <Quote size={40} className="text-artbar-taupe/10 absolute -top-4 -left-4 md:-top-6 md:-left-10 md:w-16 md:h-16" />
                    <p className="text-lg md:text-3xl font-heading font-normal text-artbar-navy leading-snug max-w-xl relative z-10 px-4">
                      "{testimonial.text}"
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-artbar-bg rounded-full flex items-center justify-center text-artbar-navy font-heading font-heavy text-base md:text-lg mb-3 shadow-inner">
                        {testimonial.author.charAt(0)}
                    </div>
                    <p className="font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-[0.15em]">{testimonial.author}</p>
                    {testimonial.role && <p className="text-[9px] md:text-[10px] text-artbar-taupe font-bold uppercase tracking-[0.1em] mt-0.5">{testimonial.role}</p>}
                </div>
              </div>
            ))}

            {/* Pagination dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
               {topTestimonials.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => setActiveIndex(i)}
                   className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-artbar-taupe' : 'w-1 bg-gray-200 hover:bg-gray-300'}`}
                 />
               ))}
            </div>
          </div>

          {/* Standardized Corporate Logo Grid */}
          <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="bg-artbar-navy py-5 text-center">
               <h3 className="font-heading font-heavy text-white text-[10px] md:text-xs tracking-[0.4em] uppercase">Meet Our Regulars</h3>
            </div>
            <div className="p-10 md:p-20 flex flex-col items-center">
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16 items-center justify-items-center mb-16">
                  {REGULAR_LOGOS.map((logo, i) => (
                    <div key={i} className="w-full flex items-center justify-center h-12 md:h-20 max-w-[160px] md:max-w-[200px] px-2">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="max-h-[60%] max-w-[80%] object-contain transition-all duration-700 opacity-100 grayscale-0 filter drop-shadow-sm" 
                        style={{ 
                          transform: logo.name === 'Coca-Cola' || logo.name === 'Netflix' ? 'scale(0.9)' : 'scale(1)' 
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const span = document.createElement('span');
                            span.innerText = logo.name;
                            span.className = "font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-widest text-center leading-tight opacity-70";
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>
                  ))}
               </div>
               
               <Button 
                  onClick={() => navigate('/team-building')}
                  size="lg"
                  className="bg-artbar-taupe hover:bg-opacity-90 text-white border-none rounded-full px-12 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
               >
                  Book Team Building
                  <ArrowRight size={18} />
               </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Concept Section - Refined for better balance */}
      <section className="py-24 md:py-64 bg-artbar-bg overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Massive Centered Heading */}
            <h2 className="text-[2.25rem] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-heading font-heavy text-artbar-navy leading-[1] md:leading-[0.85] tracking-tighter whitespace-pre-line mb-12 md:mb-24 flex flex-col items-center">
               <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-lg uppercase mb-4 md:mb-8 opacity-80">
                 {site.home.concept.est}
               </span>
               {site.home.concept.title}
            </h2>

            {/* High impact centered collage */}
            <div className="relative w-full max-w-6xl aspect-[16/9] mb-16 md:mb-24 rounded-[3rem] md:rounded-[5.5rem] overflow-hidden shadow-2xl group">
               <img 
                 src={content.images.concept.main} 
                 alt="Artbar Lifestyle" 
                 className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/40 via-transparent to-transparent"></div>
               
               {/* Detail Floating Image Overlay */}
               <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-20 w-32 h-32 md:w-80 md:h-80 rounded-[2rem] md:rounded-[4.5rem] overflow-hidden border-[8px] md:border-[24px] border-artbar-bg shadow-2xl hidden sm:block">
                  <img src={content.images.concept.detail} alt="Art Detail" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
               </div>

               {/* Centered Rating Overlay - SHRUNKEN FOR BETTER FOCUS */}
               <div className="absolute bottom-6 left-6 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 bg-white/90 backdrop-blur-xl p-3 md:p-8 rounded-2xl md:rounded-[4rem] shadow-xl border border-white/50 flex flex-col items-center animate-pulse-soft pointer-events-none min-w-[100px] md:min-w-[200px]">
                  <div className="text-2xl md:text-6xl font-heading font-heavy text-artbar-navy leading-none tracking-tighter mb-1 md:mb-3">4.8</div>
                  <div className="flex text-yellow-500 gap-0.5 md:gap-1.5 mb-2 md:mb-6">
                     {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={10} className="md:w-5 md:h-5" />)}
                  </div>
                  <p className="text-[6px] md:text-[10px] font-heavy text-artbar-navy uppercase tracking-[0.3em] opacity-90 text-center">
                    {site.home.concept.ratingLabel}
                  </p>
               </div>
            </div>

            {/* Bold Paragraph Copy - NORMAL SIZED */}
            <div className="max-w-4xl mx-auto space-y-12">
               <p className="text-artbar-navy text-lg md:text-2xl leading-relaxed md:leading-relaxed font-normal">
                 {site.home.concept.p1}
               </p>

               {/* Social Proof centered stats */}
               <div className="flex flex-col items-center gap-8">
                  <div className="flex -space-x-5 md:-space-x-8">
                      {[1,2,3,4,5,6].map(i => (
                        <img key={i} className="w-14 h-14 md:w-24 md:h-24 rounded-full border-[3px] md:border-[6px] border-white shadow-xl object-cover" src={`https://picsum.photos/seed/trust${i}/150`} alt="Artbar Guest" />
                      ))}
                      <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-[3px] md:border-[6px] border-white bg-artbar-navy text-white flex items-center justify-center text-xs md:text-xl font-bold shadow-xl">50k+</div>
                  </div>
                  <div className="text-center">
                     <p className="text-artbar-navy font-heading font-bold text-2xl md:text-4xl mb-3">{site.home.concept.guestsLabel}</p>
                     <p className="text-[10px] md:text-base font-bold text-artbar-taupe uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                        <ShieldCheck size={20} className="text-green-600" /> Professional Bilingual Instruction Provided
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

       {/* How It Works */}
       <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[2.5rem] md:rounded-[3rem]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-20">
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-6`}>{site.home.howItWorks.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.howItWorks.subtitle}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {site.home.howItWorks.steps.map((step, index) => {
              const Icon = getStepIcon(index);
              return (
                <div key={index} className="group relative bg-artbar-bg p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-artbar-navy transition-all duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white text-artbar-taupe flex items-center justify-center mb-6 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <Icon size={24} className="md:w-7 md:h-7" />
                  </div>
                  <h3 className={`${theme.cardTitle} font-heading font-bold mb-3 text-artbar-navy group-hover:text-white transition-colors text-lg md:text-2xl`}>{step.title}</h3>
                  <p className={`${theme.body} text-artbar-gray group-hover:text-white/80 transition-colors leading-relaxed text-sm md:text-base`}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-16 md:py-32 bg-artbar-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-6xl font-heading font-heavy text-artbar-navy mb-4 tracking-tight leading-none">{site.home.themes.title}</h2>
              <p className={`${theme.bodyLarge} text-artbar-gray max-w-lg text-sm md:text-xl`}>
                {site.home.themes.subtitle}
              </p>
            </div>
            <Button 
                onClick={() => window.location.hash = 'schedule'}
                className="rounded-full px-8 py-2 bg-artbar-taupe text-white hover:bg-opacity-90 border-none w-full md:w-auto text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest h-11 pt-3 shadow-md transition-all hover:scale-105"
            >
              {site.home.themes.cta}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {site.home.themes.items.map((themeItem, index) => {
              const slug = themeItem.title.toLowerCase().replace(/ /g, '-').replace('!', '');
              return (
                <Link 
                  key={index} 
                  to={`/themes/${slug}`}
                  className="group relative h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <img 
                    src={themeItem.image} 
                    alt={themeItem.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy via-artbar-navy/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-10 w-full">
                    <h3 className="text-lg md:text-3xl font-heading font-bold text-white mb-2 leading-tight tracking-tight">{themeItem.title}</h3>
                    <p className="text-white/80 text-[9px] md:text-sm font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {themeItem.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-32 bg-white mx-4 md:mx-6 rounded-[2.5rem] md:rounded-[3rem]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
           <div className="text-center mb-12 md:mb-20">
             <h2 className={`${theme.sectionTitle} font-heading font-heavy text-artbar-navy mb-4`}>{site.home.features.title}</h2>
             <p className={`${theme.bodyLarge} text-artbar-gray max-w-2xl mx-auto text-sm md:text-xl`}>
               {site.home.features.subtitle}
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {site.home.features.items.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-full h-56 md:h-64 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 shadow-sm relative">
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-artbar-navy/10 group-hover:bg-transparent transition-colors"></div>
                   </div>
                   <h3 className="text-xl md:text-2xl font-heading font-bold text-artbar-navy mb-3 md:mb-4">{feature.title}</h3>
                   <p className="text-artbar-gray leading-relaxed text-sm md:text-base">
                     {feature.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Bottom Testimonials Grid */}
      <section className="py-16 md:py-32 bg-artbar-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
             <h2 className="text-xl md:text-3xl font-heading font-heavy text-artbar-navy text-center px-4 uppercase tracking-widest">{site.home.testimonials.title}</h2>
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {site.home.testimonials.items.map((item, index) => (
              <div key={index} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 relative flex flex-col h-full">
                 <div className="absolute top-6 right-6 md:top-8 md:right-8 text-artbar-taupe opacity-20">
                    <Heart size={32} md:size={40} fill="currentColor" />
                 </div>
                 <div className="flex items-center gap-1.5 text-yellow-400 mb-6">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                 </div>
                 <p className="text-artbar-navy text-base md:text-lg leading-relaxed mb-8 font-light italic flex-grow">
                   "{item.text}"
                 </p>
                 <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-artbar-bg rounded-full flex items-center justify-center text-artbar-navy font-bold text-sm md:text-lg">
                        {item.author.charAt(0)}
                    </div>
                    <div>
                        <p className="font-heading font-bold text-artbar-navy text-[10px] md:text-sm uppercase tracking-wide">{item.author}</p>
                        {item.role && <p className="text-[9px] md:text-xs text-artbar-taupe font-bold uppercase tracking-wider">{item.role}</p>}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In Section - GALLERY STYLE */}
      <section className="py-24 md:py-48 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
             <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">Media Coverage</span>
             <h2 className="text-4xl md:text-7xl font-heading font-heavy text-artbar-navy tracking-tight">As Seen In</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-10">
             {content.media.map((item, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                   {/* Background Image (Main) */}
                   <img 
                      src={item.image} 
                      alt={item.outlet}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                      onError={(e) => (e.target as HTMLImageElement).src = `https://picsum.photos/seed/media${i}/600/800`}
                   />
                   
                   {/* Dark Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/90 via-artbar-navy/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                   
                   {/* Foreground Content */}
                   <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 transform transition-transform duration-500 group-hover:scale-105">
                         <div className="h-10 md:h-12 w-full flex items-center justify-center mb-2">
                            {item.logo ? (
                               <img 
                                 src={item.logo} 
                                 alt={item.outlet} 
                                 className="max-h-full max-w-full object-contain"
                                 onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                               />
                            ) : (
                               <span className="text-[10px] font-bold text-artbar-navy uppercase tracking-widest">{item.outlet}</span>
                            )}
                         </div>
                         <span className="text-[10px] md:text-[11px] font-mono text-artbar-taupe font-bold tracking-widest block border-t border-gray-100 pt-2">
                            {item.date}
                         </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto bg-artbar-navy rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl">
           <img 
              src={content.images.cta || "https://picsum.photos/seed/artbarcta/1920/600"} 
              alt="Artbar Studio" 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-artbar-navy/95 via-artbar-navy/80 to-artbar-navy/40"></div>
           
           <div className="relative z-10 px-8 py-12 md:p-32 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 text-center md:text-left">
              <div className="max-w-2xl">
                 <span className="text-artbar-taupe font-heading font-bold tracking-widest text-[10px] md:text-sm uppercase mb-4 block">{site.home.cta.badge}</span>
                 <h2 className="text-3xl md:text-7xl font-heading font-heavy text-white mb-6 leading-tight">
                   {site.home.cta.title}
                 </h2>
                 <p className="text-base md:text-xl text-artbar-light-taupe/90 font-light max-w-lg leading-relaxed">
                   {site.home.cta.subtitle}
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                 <Button 
                   onClick={() => window.location.hash = 'schedule'}
                   className="bg-artbar-taupe text-white hover:bg-opacity-90 border-none px-10 py-4 md:py-5 text-base md:text-lg rounded-full shadow-xl w-full sm:w-auto min-w-[200px] pt-5 pb-4"
                 >
                   {site.home.cta.btnBook}
                 </Button>
                 <Button 
                   onClick={() => window.location.href = '#/contact'}
                   variant="outline"
                   className="border-white text-white hover:bg-white hover:text-artbar-navy px-10 py-4 md:py-5 text-base md:text-lg rounded-full w-full sm:w-auto min-w-[200px] pt-5 pb-4"
                 >
                   {site.home.cta.btnContact}
                 </Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};