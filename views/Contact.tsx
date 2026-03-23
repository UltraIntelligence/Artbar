import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { content, site } = useContent();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block">{site.contactPage.badge}</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-8">{site.contactPage.title}</h1>
          <div className="bg-white p-8 rounded-[2rem] max-w-3xl mx-auto shadow-sm">
            <p className="text-artbar-gray leading-relaxed mb-4">
              {site.contactPage.notice1}
            </p>
            <p className="text-artbar-navy leading-relaxed font-medium">
              {site.contactPage.notice2}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-heading font-bold text-artbar-navy mb-10 px-4 border-l-4 border-artbar-taupe">{site.contactPage.faqTitle}</h2>
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-white rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white shadow-md border-transparent' : 'bg-white/60 hover:bg-white'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className={`font-heading font-bold text-lg pr-8 ${openIndex === index ? 'text-artbar-navy' : 'text-artbar-navy/70'}`}>
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-artbar-taupe">
                    {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </span>
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-artbar-gray leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-artbar-taupe/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 -left-20 w-64 h-64 bg-artbar-navy/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="bg-white border border-white shadow-xl rounded-[3rem] p-6 md:p-16 relative z-10">
            <h2 className="text-3xl font-heading font-bold text-artbar-navy mb-8 text-center">{site.contactPage.formTitle}</h2>
            <form className="space-y-8">
              <div>
                <label htmlFor="subject" className="block text-sm font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  Subject (必須 | Required)
                </label>
                <select 
                  id="subject" 
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none appearance-none text-artbar-navy"
                  required
                >
                  <option value="">Select a subject...</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="private">Private Party</option>
                  <option value="cancellation">Cancellation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    お名前 | Name (必須 | Required)
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder="Artbar Taro"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    メールアドレス | Email (必須 | Required)
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder="hello@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  Phone number (必須 | Required)
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                  placeholder="090-1234-5678"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  内容 | Message
                </label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px] bg-artbar-navy text-white hover:bg-opacity-90 shadow-xl shadow-navy-900/10">
                  <span className="flex items-center gap-2">
                    Send Message <Send size={18} />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};