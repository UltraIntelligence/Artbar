'use client';

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { JpText } from '../components/JpText';
import { stripJpSentinel } from '../lib/jp-attr';
import { ContactTransitionNotice } from '../components/ContactTransitionNotice';

export const Contact: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    subject: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '', // honeypot — must stay empty
  });
  const { site, lang, localizedCopy } = useContent();
  const mainReveal = useScrollReveal();

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error ?? null);
        setStatus('err');
        return;
      }
      setStatus('ok');
      setForm({ subject: '', name: '', email: '', phone: '', message: '', company: '' });
    } catch {
      setStatus('err');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const contactCopy = localizedCopy.ui.contact;
  const subjects = contactCopy.subjectOptions.map((item) => ({
    value: item.value,
    label: stripJpSentinel(item.label),
  }));
  const faqs = localizedCopy.faqs;
  const sendingLabels = {
    en: 'Sending…',
    jp: '送信中…',
  } as const;

  const copy = {
    subjectLabel: contactCopy.subjectLabel,
    nameLabel: contactCopy.nameLabel,
    namePlaceholder: stripJpSentinel(contactCopy.namePlaceholder),
    emailLabel: contactCopy.emailLabel,
    emailPlaceholder: stripJpSentinel(contactCopy.emailPlaceholder),
    phoneLabel: contactCopy.phoneLabel,
    messageLabel: contactCopy.messageLabel,
    messagePh: stripJpSentinel(contactCopy.messagePlaceholder),
    send: contactCopy.send,
    sent: contactCopy.sent,
    failed: contactCopy.failed,
  };

  return (
    <div className="grain relative pt-40 pb-20 bg-artbar-bg min-h-screen">
      <div
        ref={mainReveal.ref}
        className={`reveal max-w-[1000px] mx-auto px-6 md:px-10 ${mainReveal.isVisible ? 'visible' : ''}`}
      >
        
        {/* Transition notice */}
        <ContactTransitionNotice />

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-artbar-taupe font-heading font-bold tracking-widest text-sm uppercase mb-4 block"><JpText>{site.contactPage.badge}</JpText></span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heavy text-artbar-navy mb-8"><JpText>{site.contactPage.title}</JpText></h1>
          <div className="bg-white p-8 rounded-[2rem] max-w-3xl mx-auto shadow-sm">
            <p className="text-artbar-gray leading-relaxed mb-4">
              <JpText>{site.contactPage.notice1}</JpText>
            </p>
            <p className="text-artbar-navy leading-relaxed font-medium">
              <JpText>{site.contactPage.notice2}</JpText>
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-heading font-bold text-artbar-navy mb-10 px-4 border-l-4 border-artbar-taupe"><JpText>{site.contactPage.faqTitle}</JpText></h2>
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
                    <JpText>{faq.question}</JpText>
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
                    <JpText>{faq.answer}</JpText>
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
            <h2 className="text-3xl font-heading font-bold text-artbar-navy mb-8 text-center"><JpText>{site.contactPage.formTitle}</JpText></h2>
            {status === 'ok' && (
              <p className="text-center text-artbar-navy mb-6 text-base"><JpText>{copy.sent}</JpText></p>
            )}
            {status === 'err' && (
              <p className="text-center text-red-700 mb-6 text-base">
                {errorMessage ? errorMessage : <JpText>{copy.failed}</JpText>}
              </p>
            )}
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from real users; bots fill it. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={updateField('company')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  <JpText>{copy.subjectLabel}</JpText>
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none appearance-none text-artbar-navy text-base"
                  required
                  value={form.subject}
                  onChange={updateField('subject')}
                >
                  {subjects.map((s, i) => (
                    <option key={s.value || 'placeholder'} value={s.value} disabled={i === 0 && s.value === ''}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    <JpText>{copy.nameLabel}</JpText>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder={copy.namePlaceholder}
                    required
                    value={form.name}
                    onChange={updateField('name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                    <JpText>{copy.emailLabel}</JpText>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                    placeholder={copy.emailPlaceholder}
                    required
                    value={form.email}
                    onChange={updateField('email')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  <JpText>{copy.phoneLabel}</JpText>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none"
                  placeholder="090-1234-5678"
                  required
                  value={form.phone}
                  onChange={updateField('phone')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-heading font-bold text-artbar-navy mb-2 tracking-wide">
                  <JpText>{copy.messageLabel}</JpText>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl bg-artbar-bg border-2 border-transparent focus:bg-white focus:border-artbar-taupe focus:ring-0 transition-colors outline-none resize-none text-base"
                  placeholder={copy.messagePh}
                  value={form.message}
                  onChange={updateField('message')}
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="cta"
                  disabled={status === 'sending'}
                  className="w-full min-w-0 shadow-xl shadow-navy-900/10 md:w-auto md:min-w-[12.5rem] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <JpText>{status === 'sending' ? sendingLabels[lang] : copy.send}</JpText> <Send size={18} />
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
