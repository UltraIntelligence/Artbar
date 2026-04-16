'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Image as ImageIcon,
  Download,
  Loader2,
  Mail,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { Button } from './ui/Button';
import { ARTBAR_TOKYO_EMAIL } from '../constants';

type HandoffState = 'idle' | 'packaging' | 'ready';

export const PetSketcher: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadNote, setUploadNote] = useState<string | null>(null);
  const [handoffState, setHandoffState] = useState<HandoffState>('idle');
  const [handoffMessage, setHandoffMessage] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetHandoffState = () => {
    setHandoffState('idle');
    setHandoffMessage(null);
  };

  const sanitizeForFileName = (value: string) =>
    value
      .trim()
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 'guest';

  const formatClassDateForDisplay = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const buildReferenceCode = () => {
    const datePart = classDate || 'date-tbd';
    const studentPart = sanitizeForFileName(studentName);
    const petPart = sanitizeForFileName(petName);
    return `PYP-${datePart}-${studentPart}-${petPart}`.toUpperCase();
  };

  const getDownloadDetails = () => {
    const mimeMatch = generatedImage?.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
    const mimeType = mimeMatch?.[1] || 'image/png';
    const extension = mimeType.includes('jpeg') ? 'jpg' : mimeType.split('/')[1] || 'png';
    const referenceCode = buildReferenceCode();

    return {
      fileName: `${referenceCode}-artbar-pet-sketch.${extension}`,
      summaryFileName: `${referenceCode}-artbar-class-details.txt`,
      mimeType,
      referenceCode,
    };
  };

  const buildEmailSubject = () => {
    const dateLabel = classDate || 'DATE-TBD';
    return `[PaintYourPet][${dateLabel}][${studentName.trim() || 'Guest'}][${petName.trim() || 'Pet'}][${buildReferenceCode()}]`;
  };

  const buildClassSummary = () => {
    const dateLabel = formatClassDateForDisplay(classDate) || 'Not provided';
    const locationLabel = classLocation.trim() || 'Not provided';
    const notesLabel = bookingNotes.trim() || 'None';
    const { referenceCode, fileName } = getDownloadDetails();

    return `Paint Your Pet class handoff
Reference: ${referenceCode}
Student name: ${studentName.trim()}
Student email: ${studentEmail.trim()}
Pet name: ${petName.trim()}
Class date: ${dateLabel}
Studio/location: ${locationLabel}
Notes: ${notesLabel}
Sketch file: ${fileName}
Destination inbox: ${ARTBAR_TOKYO_EMAIL}`;
  };

  const validateHandoffFields = () => {
    if (!generatedImage) return 'Please generate a sketch first.';
    if (!studentName.trim()) return 'Please add the student name.';
    if (!studentEmail.trim()) return 'Please add the student email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail.trim())) {
      return 'Please add a valid student email.';
    }
    if (!petName.trim()) return 'Please add the pet name.';
    if (!classDate.trim()) return 'Please add the class date.';
    return null;
  };

  const downloadTextFile = (text: string, fileName: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadImageFile = () => {
    if (!generatedImage) return;
    const { fileName } = getDownloadDetails();
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyReference = async () => {
    const code = buildReferenceCode();
    try {
      await navigator.clipboard.writeText(code);
      setHandoffMessage(`Reference copied: ${code}`);
    } catch (error) {
      console.error('Reference copy failed', error);
      setHandoffMessage(`Reference: ${code}`);
    }
  };

  const openPrefilledEmail = () => {
    const body = `Hi Artbar team,

I'd like to use this sketch for my Paint Your Pet class.

${buildClassSummary()}

I have attached the sketch file.

Thank you!`;

    const mailto = `mailto:${ARTBAR_TOKYO_EMAIL}?subject=${encodeURIComponent(buildEmailSubject())}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const prepareEmailPackage = async (message?: string) => {
    const summary = buildClassSummary();
    const { summaryFileName } = getDownloadDetails();

    downloadImageFile();
    downloadTextFile(summary, summaryFileName);
    openPrefilledEmail();

    setHandoffState('ready');
    setHandoffMessage(
      message ||
        'Your sketch package is ready. We saved the sketch, saved the class details file, and opened a ready-to-send email to Artbar Tokyo.'
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';
    setErrorMessage(null);
    setUploadNote(null);
    resetHandoffState();

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a photo file such as JPG or PNG.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('That photo is too large. Please choose one under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setErrorMessage('We could not read that photo. Please try a JPG or PNG image.');
    };
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        setErrorMessage('We could not read that photo. Please try a different image.');
        return;
      }

      const img = new Image();
      img.onerror = () => {
        setErrorMessage('This photo format is not decoding cleanly here. Please try a JPG or PNG version.');
      };
      img.onload = () => {
        const MAX_SIZE = 1536;
        let width = img.width;
        let height = img.height;

        if (!width || !height) {
          setErrorMessage('That photo looks invalid. Please try a different image.');
          return;
        }

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setErrorMessage('Your browser could not prepare this image. Please try again.');
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImage(jpegDataUrl);
        setGeneratedImage(null);
        setUploadNote(
          file.type === 'image/jpeg'
            ? 'Photo ready.'
            : 'Photo converted for smoother sketch generation.'
        );
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const generateSketch = async () => {
    if (!image) return;
    setLoading(true);
    setErrorMessage(null);
    resetHandoffState();
    try {
      const base64Data = image.split(',')[1];
      const controller = new AbortController();
      // Keep the browser timeout slightly longer than the server timeout so the friendlier server message can win.
      const timeout = window.setTimeout(() => controller.abort(), 50000);

      const res = await fetch('/api/generate-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data }),
        signal: controller.signal,
      });

      window.clearTimeout(timeout);
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.error || 'We could not create the sketch right now.');
      }
      if (!payload?.imageBase64 || !payload?.mimeType) {
        throw new Error('The sketch came back incomplete. Please try again.');
      }

      setGeneratedImage(`data:${payload.mimeType};base64,${payload.imageBase64}`);
    } catch (error) {
      console.error('Sketch generation failed', error);
      const message =
        error instanceof Error && error.name === 'AbortError'
          ? 'The sketch took too long. Please try again with a simpler or smaller photo.'
          : error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const submitForClass = async () => {
    const validationError = validateHandoffFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!generatedImage) return;

    setErrorMessage(null);
    setHandoffState('packaging');
    setHandoffMessage('Preparing your sketch package...');
    await prepareEmailPackage();
  };

  const prepareValidatedEmailPackage = async () => {
    const validationError = validateHandoffFields();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage(null);
    await prepareEmailPackage();
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-artbar-taupe" size={32} /> Magic Sketch Preview
        </h2>
        <p className="text-artbar-gray max-w-lg mx-auto">
          Upload a photo of your pet to see how our AI envisions a simple canvas sketch.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              min-h-[16rem] border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group
              ${image ? 'border-artbar-taupe' : 'border-gray-200 hover:border-artbar-taupe/50 hover:bg-gray-50'}
            `}
          >
            {image ? (
              <img
                src={image}
                alt="Original Pet"
                className="block h-auto w-full max-h-[min(70vh,560px)] object-contain"
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

          {uploadNote && (
            <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {uploadNote}
            </p>
          )}
          {errorMessage && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="min-h-[16rem] rounded-[2rem] border border-gray-200 bg-gray-50 shadow-inner overflow-hidden flex items-center justify-center">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="AI Sketch"
                className="block h-auto w-full max-h-[min(70vh,560px)] object-contain"
              />
            ) : (
              <div className="text-center text-gray-300 px-6 py-12">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-heading font-bold uppercase tracking-widest text-xs">Sketch will appear here</p>
              </div>
            )}
          </div>

          {generatedImage && (
            <div className="flex flex-col gap-5">
              <a
                href={generatedImage}
                download={getDownloadDetails().fileName}
                className="inline-flex h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full border-2 border-artbar-navy bg-white px-4 text-sm font-heading font-bold tracking-wide text-artbar-navy transition-all hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-artbar-navy focus:ring-offset-2"
              >
                <Download size={16} className="shrink-0" aria-hidden />
                Save sketch
              </a>

              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm flex items-start gap-3">
                <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Like this version?</strong> Send it to Artbar with your class details so the team can match it to the right student and class day.
                </div>
              </div>

              <div className="rounded-2xl border border-artbar-navy/10 bg-artbar-bg/80 p-5 md:p-6 space-y-4">
                <div>
                  <h3 className="font-heading font-heavy text-artbar-navy text-lg mb-2">
                    Use this sketch for your Paint Your Pet class
                  </h3>
                  <p className="text-sm text-artbar-gray leading-relaxed">
                  Fill in the class details below, then press the main button. We will package the sketch with a clear reference, save the files, and open an email to Artbar so it is easy for you to send.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-student-name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Student name
                    </label>
                    <input
                      id="pet-sketch-student-name"
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        resetHandoffState();
                      }}
                      placeholder="e.g. Alex Tanaka"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                      autoComplete="name"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-student-email" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Student email
                    </label>
                    <input
                      id="pet-sketch-student-email"
                      type="email"
                      value={studentEmail}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                        resetHandoffState();
                      }}
                      placeholder="e.g. alex@example.com"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                      autoComplete="email"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-pet-name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Pet name
                    </label>
                    <input
                      id="pet-sketch-pet-name"
                      type="text"
                      value={petName}
                      onChange={(e) => {
                        setPetName(e.target.value);
                        resetHandoffState();
                      }}
                      placeholder="e.g. Luna"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                      autoComplete="off"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="pet-sketch-class-date" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Class date
                    </label>
                    <input
                      id="pet-sketch-class-date"
                      type="date"
                      value={classDate}
                      onChange={(e) => {
                        setClassDate(e.target.value);
                        resetHandoffState();
                      }}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                    />
                  </div>

                  <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="pet-sketch-location" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Studio or location <span className="font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      id="pet-sketch-location"
                      type="text"
                      value={classLocation}
                      onChange={(e) => {
                        setClassLocation(e.target.value);
                        resetHandoffState();
                      }}
                      placeholder="e.g. Ginza"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe"
                      autoComplete="off"
                    />
                  </div>

                  <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="pet-sketch-notes" className="mb-1 block text-xs font-bold uppercase tracking-wide text-artbar-gray">
                      Notes for Artbar <span className="font-normal normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="pet-sketch-notes"
                      value={bookingNotes}
                      onChange={(e) => {
                        setBookingNotes(e.target.value);
                        resetHandoffState();
                      }}
                      placeholder="e.g. Booking under a different name, two pets, special note"
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-artbar-navy placeholder:text-gray-400 focus:border-artbar-taupe focus:outline-none focus:ring-1 focus:ring-artbar-taupe resize-none"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-artbar-navy/10 bg-white px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-artbar-taupe">
                        Searchable reference
                      </p>
                      <p className="mt-1 text-sm font-heading font-bold text-artbar-navy break-all">
                        {buildReferenceCode()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void copyReference()}
                      className="inline-flex items-center gap-2 rounded-full border border-artbar-navy/15 px-3 py-1.5 text-xs font-semibold text-artbar-navy hover:bg-artbar-bg"
                    >
                      <Copy size={14} />
                      Copy
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-artbar-gray leading-relaxed">
                    This same reference is used in the file name, the email subject, and the handoff notes so the team can find the right student fast.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void submitForClass()}
                  disabled={handoffState === 'packaging'}
                  className="h-12 w-full gap-2 border-2 border-artbar-navy px-4 py-0 text-sm font-heading font-bold text-artbar-navy hover:bg-white"
                >
                  {handoffState === 'packaging' ? (
                    <>
                      <Loader2 size={16} className="animate-spin shrink-0" aria-hidden />
                      Preparing your package...
                    </>
                  ) : (
                    <>
                      <Mail size={16} className="shrink-0" aria-hidden />
                      Yes, use this for my class
                    </>
                  )}
                </Button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-artbar-navy/15 bg-white px-4 text-sm font-semibold text-artbar-navy hover:bg-gray-50"
                    onClick={() => void prepareValidatedEmailPackage()}
                  >
                    <Download size={16} className="shrink-0" aria-hidden />
                    Prepare email package
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-artbar-navy/15 bg-white px-4 text-sm font-semibold text-artbar-navy hover:bg-gray-50"
                    onClick={() => {
                      downloadTextFile(buildClassSummary(), getDownloadDetails().summaryFileName);
                      setHandoffMessage('Class details saved as a text file for backup.');
                    }}
                  >
                    <CheckCircle2 size={16} className="shrink-0" aria-hidden />
                    Save class details
                  </button>
                </div>

                {handoffMessage && (
                  <p
                    className={`rounded-xl px-4 py-3 text-sm ${
                      handoffState === 'ready'
                        ? 'border border-green-200 bg-green-50 text-green-800'
                        : 'border border-artbar-navy/10 bg-white text-artbar-navy'
                    }`}
                  >
                    {handoffMessage}
                  </p>
                )}
              </div>

              <p className="text-center text-xs text-gray-500">
                This package is prepared for you to send from your own email. We save the sketch, save the class details, and open a ready-made email to {ARTBAR_TOKYO_EMAIL}.
              </p>

              <button
                type="button"
                className="w-full text-center text-xs font-medium text-artbar-taupe underline underline-offset-2 hover:text-artbar-navy"
                onClick={() => {
                  setImage(null);
                  setGeneratedImage(null);
                  setErrorMessage(null);
                  setUploadNote(null);
                  setStudentName('');
                  setStudentEmail('');
                  setPetName('');
                  setClassDate('');
                  setClassLocation('');
                  setBookingNotes('');
                  resetHandoffState();
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
