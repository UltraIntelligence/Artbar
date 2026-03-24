'use client';

import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Download, Loader2, Mail } from 'lucide-react';
import { Button } from './ui/Button';
import { ARTBAR_TOKYO_EMAIL } from '../constants';

export const PetSketcher: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  /** Used in the “Email for class” subject line (optional). */
  const [petNameForEmail, setPetNameForEmail] = useState('');
  const [classDateForEmail, setClassDateForEmail] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const buildSketchEmailSubject = () => {
    const name = petNameForEmail.trim();
    const dateRaw = classDateForEmail.trim();
    let datePart = dateRaw;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
      const d = new Date(`${dateRaw}T12:00:00`);
      if (!Number.isNaN(d.getTime())) {
        datePart = d.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
    }
    let subject = '[My Pet!]';
    if (name) subject += ` [${name}]`;
    if (datePart) subject += ` {${datePart}}`;
    if (!name && !dateRaw) subject += ' Paint Your Pet class';
    return subject;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Normalize image to JPEG and resize if too large (max 1536px)
          // This fixes "Unsupported MIME type" errors (e.g. AVIF) and improves speed
          const MAX_SIZE = 1536; 
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          // Draw white background first (for transparent PNGs)
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to standard JPEG format supported by Gemini API
            const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setImage(jpegDataUrl);
            setGeneratedImage(null);
            setPetNameForEmail('');
            setClassDateForEmail('');
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSketch = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const res = await fetch('/api/generate-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data }),
      });
      if (!res.ok) throw new Error('API error');
      const { imageBase64, mimeType } = await res.json();
      setGeneratedImage(`data:${mimeType};base64,${imageBase64}`);
    } catch (error) {
      console.error('Sketch generation failed', error);
      alert('Something went wrong. Please check your connection or try a smaller image.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Browsers cannot attach files via mailto: alone.
   * Where supported, Web Share attaches the sketch to Mail / Gmail / etc.
   * Otherwise we save the file and open a pre-filled email so the user can attach it.
   */
  const emailSketchForClass = async () => {
    if (!generatedImage) return;

    const fileName = 'artbar-pet-sketch.png';
    const subject = buildSketchEmailSubject();
    const shareText = `Sketch for my Paint Your Pet class at Artbar Tokyo. (${subject})`;

    try {
      const res = await fetch(generatedImage);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: blob.type || 'image/png' });

      if (
        typeof navigator !== 'undefined' &&
        navigator.share &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: subject,
          text: shareText,
        });
        return;
      }
    } catch (err) {
      const e = err as Error;
      if (e?.name === 'AbortError') return;
    }

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    const body = `Hi Artbar team,

I'm planning to join a Paint Your Pet session and I've attached my AI sketch reference.\n\nIf your mail app doesn’t let you attach automatically, please add the file "${fileName}" from your Downloads (or Files) folder — I just saved it.\n\nThank you!`;

    const mailto = `mailto:${ARTBAR_TOKYO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => {
      window.location.href = mailto;
    }, 400);
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-artbar-taupe" size={32} /> Magic Sketch Preview
        </h2>
        <p className="text-artbar-gray max-w-lg mx-auto">
          Upload a photo of your pet to see how our AI envisions a simple canvas sketch!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Upload Side */}
        <div className="flex flex-col gap-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              h-80 border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group
              ${image ? 'border-artbar-taupe' : 'border-gray-200 hover:border-artbar-taupe/50 hover:bg-gray-50'}
            `}
          >
            {image ? (
              <img
                src={image}
                alt="Original Pet"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="text-center p-6 text-gray-400 group-hover:text-artbar-navy transition-colors">
                <Upload size={48} className="mx-auto mb-4" />
                <p className="font-heading font-bold uppercase tracking-wider text-sm">Click to Upload Photo</p>
                <p className="text-xs mt-2 opacity-60">JPG, PNG, HEIC, AVIF</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              aria-label="Upload pet photo"
              onChange={handleFileUpload}
            />
          </div>
          
          <Button 
            onClick={generateSketch} 
            disabled={!image || loading}
            className="w-full bg-artbar-navy text-white hover:bg-artbar-taupe border-none py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Sketching...</span>
            ) : (
                <span className="flex items-center gap-2"><Sparkles size={18} /> Generate Line Art</span>
            )}
          </Button>
        </div>

        {/* Result Side */}
        <div className="flex flex-col gap-6">
           <div className="h-80 border border-gray-200 rounded-[2rem] bg-gray-50 flex items-center justify-center relative overflow-hidden shadow-inner">
              {generatedImage ? (
                 <img
                   src={generatedImage}
                   alt="AI Sketch"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
              ) : (
                 <div className="text-center text-gray-300">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="font-heading font-bold uppercase tracking-widest text-xs">Sketch will appear here</p>
                 </div>
              )}
           </div>

           {generatedImage && (
             <div className="flex flex-col gap-4">
                 <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm flex items-start gap-3">
                    <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                    <strong>Look good?</strong> This is the style we aim for in class!
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-email-name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Pet name <span className="font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      id="pet-sketch-email-name"
                      type="text"
                      value={petNameForEmail}
                      onChange={(e) => setPetNameForEmail(e.target.value)}
                      placeholder="e.g. Luna"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                      autoComplete="off"
                    />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-email-date" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Class date <span className="font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      id="pet-sketch-email-date"
                      type="date"
                      value={classDateForEmail}
                      onChange={(e) => setClassDateForEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Email subject: <span className="font-medium text-artbar-navy">{buildSketchEmailSubject()}</span>
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
                  <a
                    href={generatedImage}
                    download="artbar-pet-sketch.png"
                    className="inline-flex h-10 w-full min-w-0 items-center justify-center gap-2 rounded-full border-2 border-artbar-navy bg-white px-4 text-sm font-heading font-bold tracking-wide text-artbar-navy transition-all hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-artbar-navy focus:ring-offset-2 whitespace-nowrap"
                  >
                    <Download size={16} className="shrink-0" aria-hidden />
                    Save image
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void emailSketchForClass()}
                    className="h-10 w-full min-w-0 gap-2 border-2 border-gray-300 px-4 py-0 text-sm text-artbar-gray hover:bg-gray-50"
                    title="Opens email to Artbar. On phones you can often attach the sketch automatically; on desktop you may need to attach the saved file."
                  >
                    <Mail size={16} className="shrink-0" aria-hidden />
                    Email for class
                  </Button>
                </div>
                <p className="text-center text-xs text-gray-500">
                  Sends to {ARTBAR_TOKYO_EMAIL}. On phones, share may attach the sketch; on computers, we save the file and open your mail — attach it if needed.
                </p>
                <button
                  type="button"
                  className="w-full text-center text-xs font-medium text-artbar-taupe underline underline-offset-2 hover:text-artbar-navy"
                  onClick={() => {
                    setImage(null);
                    setGeneratedImage(null);
                    setPetNameForEmail('');
                    setClassDateForEmail('');
                  }}
                >
                  Clear and start over
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};