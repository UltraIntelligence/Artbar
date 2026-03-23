import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Download, Loader2, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

export const PetSketcher: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
              <img src={image} alt="Original Pet" className="absolute inset-0 w-full h-full object-contain bg-gray-50" />
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
                   className="w-full h-full object-contain p-4" 
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
                <div className="flex gap-3">
                     <a href={generatedImage} download="artbar-pet-sketch.png" className="flex-1">
                        <Button variant="outline" className="w-full border-gray-300">
                            <Download size={16} className="mr-2"/> Save Image
                        </Button>
                     </a>
                     <Button onClick={() => { setImage(null); setGeneratedImage(null); }} variant="ghost" className="text-gray-500">
                        <RotateCcw size={16} className="mr-2"/> Start Over
                     </Button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};