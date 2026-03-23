import React from 'react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/ui/Button';
import { PetSketcher } from '../components/PetSketcher';
import { CheckCircle, Upload, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PaintYourPet: React.FC = () => {
  const { site, lang } = useContent();
  const content = site.paintYourPet;

  return (
    <div className="pt-32 pb-20 bg-artbar-bg min-h-screen">
      <SEO 
        title={content.title}
        description={content.subtitle}
        slug="/paint-your-pet"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">Artbar Original Program</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-6">{content.title}</h1>
          <p className="text-lg md:text-xl text-artbar-gray max-w-3xl mx-auto leading-relaxed">
            {content.desc}
          </p>
        </div>

        {/* Real Example Section */}
        <div className="mb-24 text-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white rotate-[-3deg]">
                 <img src="https://www.toolandtea.com/placeholder.svg?height=600&width=600&text=Original+Photo" alt="Original Dog" className="w-full h-full object-cover" />
                 <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-artbar-navy">Original Photo</span>
                 </div>
              </div>
              <ArrowRight size={32} className="text-artbar-taupe rotate-90 md:rotate-0" />
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white rotate-[3deg] bg-white">
                 <img src="https://www.toolandtea.com/placeholder.svg?height=600&width=600&text=Canvas+Sketch" alt="Canvas Sketch" className="w-full h-full object-contain p-6" />
                 <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="bg-artbar-navy px-3 py-1 rounded-full text-xs font-bold text-white">Canvas Sketch</span>
                 </div>
              </div>
           </div>
           <p className="mt-8 text-artbar-gray text-sm italic max-w-md mx-auto">
              {lang === 'en' 
                ? "*Our artists prepare a professional sketch like this on your canvas before you arrive!" 
                : "※アーティストが事前にキャンバスにこのような下書きを用意してお待ちしています！"}
           </p>
        </div>

        {/* AI Tool Section */}
        <div className="mb-24">
           <PetSketcher />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 items-stretch">
           
           {/* Left Column: How it Works */}
           <div className="h-full">
               <div className="bg-artbar-navy text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden h-full flex flex-col">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Upload size={140} />
                    </div>
                    <h3 className="text-3xl font-heading font-bold mb-8 relative z-10">
                      {lang === 'en' ? 'How Artbar works' : 'Artbarの楽しみ方'}
                    </h3>
                    <div className="space-y-8 relative z-10 flex-grow">
                        {content.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-artbar-taupe flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                                <div>
                                    <p className="font-bold text-lg mb-1">{step.title}</p>
                                    <p className="text-sm text-artbar-light-taupe/90 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
               </div>
           </div>

           {/* Right Column: Pricing */}
           <div className="h-full">
               <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-lg h-full flex flex-col">
                   <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-2 block">Price</span>
                   <div className="text-5xl font-heading font-heavy text-artbar-navy mb-8">{content.pricing.price}</div>
                   <ul className="space-y-6 mb-10 flex-grow">
                      {content.pricing.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-artbar-navy font-medium text-lg">
                             <CheckCircle size={24} className="text-green-500" /> {item}
                          </li>
                      ))}
                   </ul>
                   <Button onClick={() => window.location.href = '/#schedule'} className="w-full bg-artbar-taupe text-white hover:bg-opacity-90 border-none rounded-2xl py-5 text-lg shadow-md mt-auto">
                      {site.nav.book}
                   </Button>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};