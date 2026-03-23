import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle, Briefcase, Users, Zap, Palette, Puzzle, Layers, Wine, Clock, MapPin, Coffee, ChevronLeft, ChevronRight, Quote, ArrowRight, Sparkles, Flame, Droplets } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const TeamBuilding: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { site, content } = useContent();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const CLIENT_LOGOS = [
    { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "GE", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/General_Electric_logo.svg" },
    { name: "Toyota", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Toyota_EU.svg" },
    { name: "L'Oreal", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg" },
    { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Takeda", url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Takeda_Pharmaceutical_Company_Logo.svg" },
    { name: "Sojitz", url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sojitz_Logo.svg" },
    { name: "Coca-Cola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" },
    { name: "STH Group", url: "" }, 
    { name: "Morrison Foerster", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Morrison_%26_Foerster_logo.svg/512px-Morrison_%26_Foerster_logo.svg.png" }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentElement;
    if (parent) {
      target.style.display = 'none';
      const textElement = document.createElement('span');
      textElement.innerText = name;
      textElement.className = "text-xs md:text-sm font-heading font-bold text-artbar-navy/40 uppercase tracking-widest text-center whitespace-nowrap group-hover:text-artbar-taupe transition-colors";
      parent.appendChild(textElement);
    }
  };

  return (
    <div className="w-full bg-artbar-bg">
      {/* Hero */}
      <div className="relative min-h-[60vh] md:min-h-[75vh] bg-artbar-navy flex items-center justify-center text-white mt-24 mx-4 md:m-4 md:mt-24 rounded-[2.5rem] overflow-hidden py-16 md:py-0">
        <img 
          src={content.images.hero.teamBuilding}
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt="Team building"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-artbar-navy/20 to-artbar-navy/90"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl w-full">
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-heading font-bold text-xs md:text-sm mb-6 md:mb-8 uppercase tracking-widest">
             {site.teamBuilding.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-heavy mb-6 md:mb-8 leading-tight tracking-tight">
            {site.teamBuilding.hero.title} <br className="hidden md:block"/><span className="text-artbar-taupe block md:inline">{site.teamBuilding.hero.titleHighlight}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl opacity-90 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {site.teamBuilding.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4 sm:px-0">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-artbar-taupe text-white hover:bg-opacity-90 border-none px-8 py-4 md:px-10 md:py-5 h-auto text-base md:text-lg rounded-full shadow-xl w-full sm:w-auto"
            >
               {site.teamBuilding.hero.cta}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        
        {/* Social Proof - Logos with Tinted Fallback */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-16">
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
             <p className="text-[10px] md:text-xs font-heading font-bold text-artbar-gray uppercase tracking-[0.4em] px-4">{site.teamBuilding.socialProof.title}</p>
             <div className="h-px bg-artbar-navy/10 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 items-center justify-items-center max-w-6xl mx-auto">
             {CLIENT_LOGOS.map((logo, i) => (
                <div key={i} className="w-full flex items-center justify-center h-10 md:h-12 px-4 group">
                  {logo.url ? (
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      onError={(e) => handleImageError(e, logo.name)}
                      className="max-h-full max-w-full object-contain transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100" 
                    />
                  ) : (
                    <span className="text-xs md:text-sm font-heading font-bold text-artbar-navy/40 group-hover:text-artbar-taupe transition-colors cursor-default uppercase tracking-widest whitespace-nowrap">
                      {logo.name}
                    </span>
                  )}
                </div>
             ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 mb-24 md:mb-32 shadow-sm border border-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
              <Briefcase size={400} />
           </div>

           <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                 <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase block">{site.teamBuilding.valueProp.badge}</span>
                 <h2 className="text-3xl md:text-6xl font-heading font-heavy text-artbar-navy leading-tight whitespace-pre-line">
                    {site.teamBuilding.valueProp.title}
                 </h2>
                 <div className="space-y-6 text-base md:text-lg text-artbar-gray leading-relaxed">
                    <p>{site.teamBuilding.valueProp.p1}</p>
                    <p>{site.teamBuilding.valueProp.p2}</p>
                 </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                 {site.teamBuilding.valueProp.benefits.map((item, i) => {
                    const icons = [Layers, Zap, Users, Briefcase];
                    const Icon = icons[i] || Layers;
                    return (
                        <div key={i} className="bg-artbar-bg p-6 md:p-8 rounded-[2rem] hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-artbar-taupe mb-4 shadow-sm">
                            <Icon size={24} />
                        </div>
                        <h4 className="font-heading font-bold text-artbar-navy text-xl mb-2">{item.title}</h4>
                        <p className="text-sm text-artbar-gray leading-relaxed">{item.desc}</p>
                        </div>
                    );
                 })}
              </div>
           </div>
        </div>

        {/* Activities */}
        <div className="mb-16">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-artbar-navy max-w-xl">{site.teamBuilding.activities.title}</h2>
             <p className="text-artbar-gray md:text-right max-w-md mt-4 md:mt-0">{site.teamBuilding.activities.subtitle}</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-6">
              {site.teamBuilding.activities.items.map((act, i) => {
                 const icons = [Puzzle, Users, Palette];
                 const Icon = icons[i] || Puzzle;
                 return (
                    <div key={i} className="group relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer">
                        <img 
                        src={`https://picsum.photos/seed/${i+50}/600/800`} 
                        alt={act.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-artbar-navy/90 via-artbar-navy/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white">
                            <Icon size={40} className="mb-6 text-artbar-taupe" />
                            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">{act.title}</h3>
                            <p className="text-white/80 leading-relaxed mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500">
                                {act.desc}
                            </p>
                            <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest group-hover:text-artbar-taupe transition-colors">
                                {act.link} <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* Specialty */}
        <div className="mb-24 md:mb-32">
           <div className="bg-artbar-taupe/10 border border-artbar-taupe/20 rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2">
                 <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-artbar-taupe" size={24} />
                    <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase">{site.teamBuilding.specialty.badge}</span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-heading font-heavy text-artbar-navy mb-4 whitespace-pre-line">
                    {site.teamBuilding.specialty.title}
                 </h3>
                 <p className="text-artbar-gray mb-8 max-w-md">
                    {site.teamBuilding.specialty.desc}
                 </p>
                 <div className="flex flex-wrap gap-3">
                    <span className="bg-white px-4 py-2 rounded-full text-artbar-navy font-bold text-sm border border-artbar-taupe/20 flex items-center gap-2"><Flame size={14} className="text-orange-400" /> Candle Making</span>
                    <span className="bg-white px-4 py-2 rounded-full text-artbar-navy font-bold text-sm border border-artbar-taupe/20 flex items-center gap-2"><Droplets size={14} className="text-blue-400" /> Resin Art</span>
                    <span className="bg-white px-4 py-2 rounded-full text-artbar-navy font-bold text-sm border border-artbar-taupe/20 flex items-center gap-2"><Palette size={14} className="text-purple-400" /> Alcohol Ink</span>
                 </div>
              </div>
              <div className="md:w-1/2 flex justify-end w-full">
                 <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-artbar-navy text-white hover:bg-artbar-taupe border-none py-4 px-8 text-lg rounded-2xl shadow-lg w-full md:w-auto"
                 >
                    {site.teamBuilding.specialty.cta}
                 </Button>
              </div>
           </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24 md:mb-32 relative bg-white border border-gray-200 rounded-[3rem] p-8 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5">
               <Quote size={200} className="text-artbar-navy" />
            </div>
            
            <div className="flex justify-between items-end mb-12 relative z-10">
               <h2 className="text-3xl md:text-4xl font-heading font-bold text-artbar-navy">{site.teamBuilding.testimonials.title}</h2>
               <div className="flex gap-2">
                  <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-artbar-bg text-artbar-navy transition-colors"><ChevronLeft size={20} /></button>
                  <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-artbar-navy text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"><ChevronRight size={20} /></button>
               </div>
            </div>
            
            <div className="relative z-10">
               <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-4 hide-scrollbar snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {content.teamBuildingTestimonials.map((t, i) => (
                    <div key={i} className="flex-shrink-0 w-[300px] md:w-[500px] snap-center">
                       <p className="text-artbar-navy text-lg md:text-2xl leading-relaxed mb-8 font-light italic">"{t.text}"</p>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-artbar-taupe rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">{t.author.charAt(0)}</div>
                          <p className="font-heading font-bold text-artbar-navy text-sm uppercase tracking-wider">{t.author}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
        </div>

        {/* Logistics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24 md:mb-32">
           <div className="bg-artbar-bg border border-artbar-light-taupe/30 p-8 md:p-12 rounded-[3rem]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-artbar-taupe shadow-sm"><Wine size={32} /></div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-artbar-navy mb-6">{site.teamBuilding.logistics.included.title}</h3>
              <p className="text-artbar-gray mb-8 text-base md:text-lg">{site.teamBuilding.logistics.included.desc}</p>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                 {site.teamBuilding.logistics.included.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-artbar-navy font-medium text-sm md:text-base">
                        <CheckCircle size={20} className="text-artbar-taupe flex-shrink-0" /> {item}
                    </div>
                 ))}
              </div>
              <div className="mt-8 pt-8 border-t border-artbar-light-taupe/30">
                 <h4 className="font-bold text-artbar-navy mb-2 flex items-center gap-2"><Coffee size={18}/> {site.teamBuilding.logistics.catering.title}</h4>
                 <p className="text-artbar-gray text-sm">{site.teamBuilding.logistics.catering.desc}</p>
              </div>
           </div>

           <div className="bg-artbar-bg border border-artbar-light-taupe/30 p-8 md:p-12 rounded-[3rem]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-artbar-blue shadow-sm"><MapPin size={32} /></div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-artbar-navy mb-6">{site.teamBuilding.logistics.locations.title}</h3>
              <p className="text-artbar-gray mb-8 text-base md:text-lg">{site.teamBuilding.logistics.locations.desc}</p>
              <div className="space-y-4">
                 <div className="bg-white p-4 rounded-xl flex justify-between items-center"><span className="font-heading font-bold text-artbar-navy text-sm md:text-base">Artbar Ginza</span><span className="text-xs md:text-sm bg-artbar-bg px-3 py-1 rounded-full text-artbar-navy">Max 30</span></div>
                 <div className="bg-white p-4 rounded-xl flex justify-between items-center"><span className="font-heading font-bold text-artbar-navy text-sm md:text-base">Artbar Cat Street Harajuku</span><span className="text-xs md:text-sm bg-artbar-bg px-3 py-1 rounded-full text-artbar-navy">Max 20</span></div>
                 <div className="bg-white p-4 rounded-xl flex justify-between items-center"><span className="font-heading font-bold text-artbar-navy text-sm md:text-base">Artbar Yokohama</span><span className="text-xs md:text-sm bg-artbar-bg px-3 py-1 rounded-full text-artbar-navy">Max 40</span></div>
                 <div className="bg-white p-4 rounded-xl flex justify-between items-center border border-artbar-taupe/30"><span className="font-heading font-bold text-artbar-navy text-sm md:text-base">Your Office / Offsite</span><span className="text-xs md:text-sm bg-artbar-taupe text-white px-3 py-1 rounded-full">15 - 100+ Guests</span></div>
              </div>
              <p className="text-center text-artbar-gray mt-6 text-sm">{site.teamBuilding.logistics.locations.note}</p>
           </div>
        </div>

        {/* Pricing */}
        <div className="bg-artbar-navy text-white rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-artbar-taupe font-bold tracking-widest uppercase text-sm mb-4 block">{site.teamBuilding.pricing.badge}</span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">{site.teamBuilding.pricing.title}</h2>
                <p className="text-lg text-artbar-light-taupe mb-10 leading-relaxed max-w-md">{site.teamBuilding.pricing.desc}</p>
              </div>
              <div className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm border border-white/10">
                <div className="flex flex-col gap-8">
                   <div className="flex justify-between items-end border-b border-white/10 pb-6">
                      <div><p className="font-heading font-bold text-xl md:text-2xl">{site.teamBuilding.pricing.packageTitle}</p><p className="text-sm text-artbar-light-taupe mt-1">{site.teamBuilding.pricing.packageSubtitle}</p></div>
                      <div className="text-right"><p className="text-3xl md:text-4xl font-heading font-bold">{site.teamBuilding.pricing.price}</p><p className="text-xs opacity-60">{site.teamBuilding.pricing.priceNote}</p></div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-sm"><span className="opacity-80">{site.teamBuilding.pricing.feeLabel}</span><span className="font-bold">{site.teamBuilding.pricing.feePrice}</span></div>
                      <div className="flex justify-between text-sm"><span className="opacity-80">{site.teamBuilding.pricing.offsiteLabel}</span><span className="font-bold">{site.teamBuilding.pricing.offsitePrice}</span></div>
                   </div>
                   <Button onClick={() => navigate('/contact')} className="w-full bg-artbar-taupe hover:bg-white hover:text-artbar-navy border-none py-5 rounded-xl font-bold text-lg transition-all mt-4">{site.teamBuilding.pricing.cta}</Button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};