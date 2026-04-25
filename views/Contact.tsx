'use client';

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Contact: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const { content, site, lang, jpCopy } = useContent();
  const mainReveal = useScrollReveal();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const subjectLabelsEn = {
    '': 'Select a subject...',
    general: 'General Inquiry',
    booking: 'Booking',
    private: 'Private Party',
    instructor: 'Instructor Inquiry',
    cancellation: 'Cancellation',
    other: 'Other',
  } as const;
  const subjects = jpCopy.ui.contact.subjectOptions.map((item) => ({
    value: item.value,
    en: subjectLabelsEn[item.value as keyof typeof subjectLabelsEn] ?? 'Other',
    jp: item.label,
  }));
  const faqs = lang === 'jp' ? jpCopy.faqs : content.faqs;

  const copy = {
    subjectLabel: lang === 'en' ? 'Subject (required)' : jpCopy.ui.contact.subjectLabel,
    nameLabel: lang === 'en' ? 'Name (required)' : jpCopy.ui.contact.nameLabel,
    namePlaceholder: lang === 'en' ? 'Artbar Taro' : jpCopy.ui.contact.namePlaceholder,
    emailLabel: lang === 'en' ? 'Email (required)' : jpCopy.ui.contact.emailLabel,
    emailPlaceholder: lang === 'en' ? 'hello@example.com' : jpCopy.ui.contact.emailPlaceholder,
    phoneLabel: lang === 'en' ? 'Phone (required)' : jpCopy.ui.contact.phoneLabel,
    messageLabel: lang === 'en' ? 'Message' : jpCopy.ui.contact.messageLabel,
    messagePh: lang === 'en' ? 'How can we help you?' : jpCopy.ui.contact.messagePlaceholder,
    send: lang === 'en' ? 'Send Message' : jpCopy.ui.contact.send,
    sent: lang === 'en' ? 'Message sent! We will get back to you soon.' : jpCopy.ui.contact.sent,
    failed: lang === 'en' ? 'Failed to send. Please try again or email us directly.' : jpCopy.ui.contact.failed,
  };

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div
        ref={mainReveal.ref}
        className={`reveal max-w-[1000px] mx-auto px-6 md:px-10 ${mainReveal.isVisible ? 'visible' : ''}`}
      >
        
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
            {faqs.map((faq, index) => (
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

        <div className="relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-artbar-taupe/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 -left-20 w-64 h-64 bg-artbar-navy/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="bg-white border border-white shadow-xl rounded-[3rem] p-6 md:p-16 relative z-10">
            <h2 className="text-3xl font-heading font-bold text-artbar-navy mb-8 text-center">{site.contactPage.formTitle}</h2>
            {status === 'ok' && (
              <p className="text-center text-artbar-navy mb-6 text-base">{copy.sent}</p>
            )}
            {status === 'err' && (
              <p className="text-center text-red-700 mb-6 text-base">{copy.failed}</p>
            )}
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus('ok');
              }}
            >
              <div>
                <label htmlFor="subject" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  {copy.subjectLabel}
                </label>
                <select 
                  id="subject" 
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none appearance-none text-artbar-navy text-base"
                  required
                >
                  {subjects.map((s, i) => (
                    <option key={s.value || 'placeholder'} value={s.value} disabled={i === 0 && s.value === ''}>
                      {lang === 'en' ? s.en : s.jp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    {copy.nameLabel}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder={copy.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    {copy.emailLabel}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder={copy.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  {copy.phoneLabel}
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
                <label htmlFor="message" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  {copy.messageLabel}
                </label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none resize-none text-base"
                  placeholder={copy.messagePh}
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="cta"
                  className="w-full min-w-0 shadow-xl shadow-navy-900/10 md:w-auto md:min-w-[12.5rem]"
                >
                  <span className="flex items-center gap-2">
                    {copy.send} <Send size={18} />
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
