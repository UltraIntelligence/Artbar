'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';

export const Instructors: React.FC = () => {
  const { content, site, lang } = useContent();

  return (
    <div className="pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-6">{site.instructorsPage.title}</h1>
          <p className="text-lg md:text-xl text-artbar-gray max-w-3xl mx-auto">
            {site.instructorsPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {content.instructors.map((instructor, index) => (
            <div key={index} className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              {/* Header Art Background */}
              <div className="h-56 relative overflow-hidden bg-artbar-bg">
                 <div className="absolute inset-0 bg-artbar-navy/10"></div>
                 <img 
                   src={instructor.artworkImage} 
                   alt={`${instructor.name}'s Art`}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              
              <div className="px-8 pb-10 relative flex-grow flex flex-col">
                 <div className="relative -mt-16 mb-6 flex justify-between items-end">
                    <div className="w-32 h-32 rounded-full border-[6px] border-white overflow-hidden shadow-md bg-white">
                       <img 
                         src={instructor.profileImage} 
                         alt={instructor.name}
                         className="w-full h-full object-cover"
                       />
                    </div>
                    
                     <span className="bg-artbar-bg text-artbar-navy text-xs font-heading font-bold px-4 py-2 rounded-full mb-2 inline-block border border-artbar-taupe/20">
                        {instructor.languages}
                     </span>
                 </div>

                 <div>
                    <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                       <h3 className="text-2xl font-heading font-bold text-artbar-navy">{instructor.name}</h3>
                    </div>
                    <p className="text-sm font-bold text-artbar-taupe uppercase tracking-wider mb-4">
                        {lang === 'en' ? instructor.roleEn : instructor.roleJp}
                    </p>
                    <p className="text-artbar-gray leading-relaxed text-sm md:text-base">
                      {lang === 'en' ? instructor.descEn : instructor.descJp}
                    </p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};