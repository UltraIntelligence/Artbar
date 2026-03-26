'use client';

import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/ui/Button';
import { Save, RotateCcw, Check, Plus, Trash2, Image as ImageIcon, ChevronDown, ChevronUp, Layout, Users, MapPin, Newspaper, Settings, Briefcase, PartyPopper, BookOpen, Wand2, Sparkles, Loader2, X, RotateCcw as Reload, AlertCircle, Edit3 } from 'lucide-react';
import { ContentData } from '../types';
// --- Types & Helpers ---

const updateNested = (obj: any, path: string[], value: any): any => {
  const clone = (item: any) => Array.isArray(item) ? [...item] : { ...item };
  const newObj = clone(obj);
  let current = newObj;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (current[key] === undefined) {
      current[key] = {};
    }
    current[key] = clone(current[key]);
    current = current[key];
  }
  current[path[path.length - 1]] = value;
  return newObj;
};

const getNested = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
};

// Helper to clean Markdown code blocks AND conversational text from AI response
const cleanJson = (text: string) => {
  // 1. Try Markdown code block extraction
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) return match[1];
  
  // 2. Try finding the JSON object directly (from first { to last })
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return text.substring(firstBrace, lastBrace + 1);
  }
  
  // 3. Fallback
  return text;
};

// --- Components ---

interface EditorProps {
  label: string;
  path: string[];
  multiline?: boolean;
  className?: string;
  type?: string;
  localContent: ContentData;
  updateField: (path: string[], value: any) => void;
}

const BilingualInput: React.FC<EditorProps> = ({ label, path, multiline = false, className = '', localContent, updateField }) => {
  const enPath = ['en', ...path];
  const jpPath = ['jp', ...path];
  const valEn = getNested(localContent, enPath) || '';
  const valJp = getNested(localContent, jpPath) || '';

  return (
    <div className={`mb-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-artbar-taupe/20 transition-colors ${className}`}>
      <label className="block text-xs font-bold text-artbar-gray uppercase tracking-wider mb-3 flex items-center gap-2">
        {label}
      </label>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <span className="text-[10px] text-artbar-taupe font-bold mb-1 block uppercase tracking-widest">English</span>
          {multiline ? (
            <textarea 
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm h-32 transition-all shadow-sm"
              value={valEn}
              onChange={(e) => updateField(enPath, e.target.value)}
            />
          ) : (
            <input 
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm transition-all shadow-sm"
              value={valEn}
              onChange={(e) => updateField(enPath, e.target.value)}
            />
          )}
        </div>
        <div>
          <span className="text-[10px] text-artbar-taupe font-bold mb-1 block uppercase tracking-widest">Japanese</span>
          {multiline ? (
             <textarea 
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm h-32 transition-all shadow-sm"
              value={valJp}
              onChange={(e) => updateField(jpPath, e.target.value)}
            />
          ) : (
            <input 
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm transition-all shadow-sm"
              value={valJp}
              onChange={(e) => updateField(jpPath, e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const RawInput: React.FC<EditorProps> = ({ label, path, multiline = false, type = "text", localContent, updateField }) => {
  const val = getNested(localContent, path) || '';
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-artbar-gray uppercase tracking-wider mb-2">{label}</label>
      {multiline ? (
          <textarea 
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm h-32 shadow-sm transition-all"
          value={val}
          onChange={(e) => updateField(path, e.target.value)}
          />
      ) : (
          <input 
          type={type}
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm shadow-sm transition-all"
          value={val}
          onChange={(e) => updateField(path, e.target.value)}
          />
      )}
    </div>
  );
};

const FontSelect: React.FC<{ label: string; path: string[]; localContent: ContentData; updateField: (path: string[], value: any) => void }> = ({ label, path, localContent, updateField }) => {
  const field = path[path.length - 1];
  const defaultFont = field === 'heading' ? 'Poppins' : 'Noto Sans JP';
  const val = getNested(localContent, path) || defaultFont;
  const FONT_OPTIONS = [
    { label: 'Poppins (heading default)', value: 'Poppins' },
    { label: 'Noto Sans JP (body default)', value: 'Noto Sans JP' },
    { label: 'Montserrat', value: 'Montserrat' },
    { label: 'Raleway', value: 'Raleway' },
    { label: 'Jost', value: 'Jost' },
    { label: 'Josefin Sans', value: 'Josefin Sans' },
    { label: 'Hiragino Kaku Gothic (JP system)', value: 'Hiragino Kaku Gothic ProN' },
    { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
    { label: 'Oswald (Strong/Tall)', value: 'Oswald' },
    { label: 'Bebas Neue (Bold Caps)', value: 'Bebas Neue' },
    { label: 'Lato (Friendly Sans)', value: 'Lato' },
    { label: 'Open Sans (Neutral)', value: 'Open Sans' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-artbar-gray uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <select 
            className="w-full p-3 pl-4 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none text-sm appearance-none bg-white cursor-pointer shadow-sm"
            value={val}
            onChange={(e) => updateField(path, e.target.value)}
        >
            {FONT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

// --- Improved Image Input with Robust AI Generation ---
const ImageInput: React.FC<{ label: string; path: string[]; localContent: ContentData; updateField: (path: string[], value: any) => void }> = ({ label, path, localContent, updateField }) => {
  const val = getNested(localContent, path) || '';
  const [showGen, setShowGen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '16:9'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedPreview(null);
    setError(null);

    try {
      const res = await fetch('/api/generate-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio }),
      });
      if (!res.ok) throw new Error('API error');
      const { imageBase64, mimeType } = await res.json();
      if (imageBase64) {
        setGeneratedPreview(`data:${mimeType};base64,${imageBase64}`);
      } else {
        setError("The model generated text instead of an image. Try refining your prompt.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
         <label className="block text-xs font-bold text-artbar-gray uppercase tracking-wider">{label}</label>
         <button 
           onClick={() => { setShowGen(!showGen); setGeneratedPreview(null); setError(null); }}
           className={`text-[10px] font-bold flex items-center gap-1 transition-all uppercase tracking-wider px-3 py-1 rounded-full ${showGen ? 'bg-artbar-navy text-white' : 'bg-artbar-taupe/10 text-artbar-taupe hover:bg-artbar-taupe hover:text-white'}`}
         >
           <Wand2 size={12} /> {showGen ? 'Close AI Tool' : 'Generate with AI'}
         </button>
      </div>

      {showGen && (
        <div className="mb-4 p-5 bg-gradient-to-br from-white to-gray-50 border border-artbar-taupe/30 rounded-2xl shadow-lg animate-in slide-in-from-top-2 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-artbar-navy via-artbar-taupe to-artbar-navy"></div>
           
           {!generatedPreview ? (
             <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold text-artbar-gray uppercase mb-2">Image Style & Prompt</label>
                    <textarea
                    className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-artbar-taupe/20 focus:border-artbar-taupe outline-none resize-none h-24"
                    placeholder="Describe the image (e.g., 'Oil painting of a wine glass and canvas, cozy warm lighting')..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    autoFocus
                    />
                </div>
                
                <div>
                    <label className="block text-[10px] font-bold text-artbar-gray uppercase mb-2">Aspect Ratio</label>
                    <div className="flex gap-2">
                        <button onClick={() => setAspectRatio('1:1')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${aspectRatio === '1:1' ? 'bg-artbar-navy text-white border-artbar-navy' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                            Square (1:1)
                        </button>
                        <button onClick={() => setAspectRatio('16:9')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${aspectRatio === '16:9' ? 'bg-artbar-navy text-white border-artbar-navy' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                            Landscape (16:9)
                        </button>
                         <button onClick={() => setAspectRatio('3:4')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${aspectRatio === '3:4' ? 'bg-artbar-navy text-white border-artbar-navy' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                            Portrait (3:4)
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <Button 
                  onClick={generateImage} 
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-artbar-navy to-artbar-taupe hover:opacity-90 text-white border-none h-10 text-sm flex items-center justify-center rounded-xl shadow-md"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin mr-2" /> : <Sparkles size={16} className="mr-2" />}
                  {isGenerating ? 'Dreaming up image...' : 'Generate Image'}
                </Button>
             </div>
           ) : (
             <div className="flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <img src={generatedPreview} alt="AI Generated" className="max-h-[300px] w-auto object-contain shadow-sm" />
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setGeneratedPreview(null)} variant="outline" className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-xl">
                        <RotateCcw size={14} className="mr-2" /> Discard
                    </Button>
                    <Button 
                        onClick={() => {
                            updateField(path, generatedPreview);
                            setGeneratedPreview(null);
                            setShowGen(false);
                        }} 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white border-none rounded-xl shadow-md"
                    >
                        <Check size={14} className="mr-2" /> Accept & Use
                    </Button>
                </div>
             </div>
           )}
        </div>
      )}

      <div className="flex gap-4 items-start p-3 bg-white rounded-2xl border border-gray-200 hover:border-artbar-taupe/30 transition-all shadow-sm">
        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 relative group-hover:shadow-md transition-all">
           {val && (val.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || val.includes('picsum') || val.includes('http') || val.startsWith('data:image')) ? (
              <img src={val} alt="Preview" className="w-full h-full object-cover" />
           ) : (
              <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={24}/></div>
           )}
        </div>
        <div className="flex-grow">
          <input 
            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-0 focus:border-artbar-taupe outline-none text-sm font-mono text-gray-600 mb-2 bg-transparent"
            value={val}
            onChange={(e) => updateField(path, e.target.value)}
            placeholder="https://... or data:image/..."
          />
          <p className="text-[10px] text-gray-400 font-medium">
             Paste a URL or use the AI Generator above.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Magic Blog Writer Component ---
interface MagicWriterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: any) => void;
}

const MagicBlogWriter: React.FC<MagicWriterProps> = ({ isOpen, onClose, onApply }) => {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("Elevated & Sophisticated");
    const [isGenerating, setIsGenerating] = useState(false);
    const [preview, setPreview] = useState<any>(null);

    const generate = async () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        setPreview(null);

        try {
            const prompt = `You are a creative writer for Artbar Tokyo, an art and wine experience studio. Write a bilingual (English and Japanese) blog article about the following topic with a ${tone} tone.\n\nTopic: ${topic}\n\nReturn a JSON object with fields: titleEn, titleJp, bodyEn, bodyJp, excerpt.`;
            const res = await fetch('/api/ai-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            if (data.text) {
                const cleanText = cleanJson(data.text);
                setPreview(JSON.parse(cleanText));
            }
        } catch (e) {
            console.error("Magic Writer Error", e);
            alert("Failed to generate content. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-artbar-navy/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-artbar-navy to-artbar-blue p-6 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Wand2 size={20} />
                        </div>
                        <div>
                            <h3 className="font-heading font-heavy text-xl">Gemini Magic Writer</h3>
                            <p className="text-white/70 text-xs">AI-Powered Blog Editor</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><X size={18}/></button>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-y-auto p-8">
                    {!preview ? (
                        <div className="max-w-xl mx-auto space-y-8 py-10">
                            <div className="text-center space-y-2">
                                <h4 className="text-2xl font-bold text-artbar-navy">What should we write about?</h4>
                                <p className="text-artbar-gray">Enter a topic, and Gemini will draft a bilingual article for you.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-artbar-gray uppercase mb-2">Topic / Keywords</label>
                                    <input 
                                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-artbar-taupe outline-none transition-colors"
                                        placeholder="e.g. 'Why art is good for stress relief'"
                                        value={topic}
                                        onChange={e => setTopic(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-artbar-gray uppercase mb-2">Tone of Voice</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Elevated & Sophisticated', 'Playful & Fun', 'Professional & Corporate'].map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`p-3 rounded-xl border text-sm font-bold transition-all ${tone === t ? 'bg-artbar-navy text-white border-artbar-navy shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button 
                                onClick={generate}
                                disabled={isGenerating || !topic.trim()}
                                className="w-full py-4 text-lg bg-gradient-to-r from-artbar-navy to-artbar-taupe text-white border-none rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all"
                            >
                                {isGenerating ? <span className="flex items-center gap-2"><Loader2 className="animate-spin"/> Writing magic...</span> : <span className="flex items-center gap-2"><Sparkles className="fill-current"/> Generate Draft</span>}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8 h-full">
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <h4 className="text-xs font-bold text-artbar-taupe uppercase tracking-widest mb-4">English Preview</h4>
                                    <h2 className="text-2xl font-heading font-bold text-artbar-navy mb-2">{preview.titleEn}</h2>
                                    <p className="text-sm text-artbar-gray italic mb-4">{preview.excerptEn}</p>
                                    <div className="prose prose-sm max-w-none text-gray-600 h-64 overflow-y-auto pr-2 custom-scrollbar" dangerouslySetInnerHTML={{__html: preview.contentEn}}></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <h4 className="text-xs font-bold text-artbar-taupe uppercase tracking-widest mb-4">Japanese Preview</h4>
                                    <h2 className="text-2xl font-heading font-bold text-artbar-navy mb-2">{preview.titleJp}</h2>
                                    <p className="text-sm text-artbar-gray italic mb-4">{preview.excerptJp}</p>
                                    <div className="prose prose-sm max-w-none text-gray-600 h-64 overflow-y-auto pr-2 custom-scrollbar" dangerouslySetInnerHTML={{__html: preview.contentJp}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {preview && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                        <Button onClick={() => setPreview(null)} variant="ghost" className="text-gray-500 hover:text-artbar-navy">
                            <RotateCcw size={16} className="mr-2"/> Try Again
                        </Button>
                        <div className="flex gap-4">
                             <Button onClick={onClose} variant="outline" className="border-gray-300 text-gray-600">
                                Cancel
                            </Button>
                            <Button onClick={() => { onApply(preview); onClose(); setPreview(null); setTopic(""); }} className="bg-artbar-navy text-white border-none shadow-lg px-8">
                                <Check size={16} className="mr-2"/> Apply Content
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Array Managers ---

interface DataArrayManagerProps {
  label: string;
  path: string[];
  itemTemplate: any;
  renderItem: (item: any, index: number) => React.ReactNode;
  localContent: ContentData;
  updateField: (path: string[], value: any) => void;
  getItemTitle?: (item: any) => React.ReactNode;
}

const DataArrayManager: React.FC<DataArrayManagerProps> = ({ label, path, itemTemplate, renderItem, localContent, updateField, getItemTitle }) => {
  const items = getNested(localContent, path) || [];
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  
  const addItem = () => {
    updateField(path, [...items, itemTemplate]);
    // Auto-expand the new item
    setExpandedIndices(prev => [...prev, items.length]);
  };

  const removeItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this item?")) return;
    const newItems = [...items];
    newItems.splice(index, 1);
    updateField(path, newItems);
    setExpandedIndices(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const moveItem = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
      e.stopPropagation();
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
      const newItems = [...items];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
      updateField(path, newItems);
      
      // Handle expanded state movement
      let newExpanded = [...expandedIndices];
      const isCurrentExpanded = newExpanded.includes(index);
      const isSwapExpanded = newExpanded.includes(swapIndex);
      
      if (isCurrentExpanded && !isSwapExpanded) {
          newExpanded = newExpanded.filter(i => i !== index);
          newExpanded.push(swapIndex);
      } else if (!isCurrentExpanded && isSwapExpanded) {
          newExpanded = newExpanded.filter(i => i !== swapIndex);
          newExpanded.push(index);
      }
      setExpandedIndices(newExpanded);
  };

  const toggleExpand = (index: number) => {
      setExpandedIndices(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
  };

  return (
    <div className="mb-8 border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <div className="bg-gray-50/80 backdrop-blur-sm p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
            <label className="font-heading font-bold text-artbar-navy text-lg flex items-center gap-2">
                <Layout size={20} className="text-artbar-taupe"/> {label} 
                <span className="bg-artbar-navy text-white text-xs px-2 py-0.5 rounded-full">{items.length}</span>
            </label>
            <Button onClick={addItem} size="sm" className="bg-artbar-navy text-white hover:bg-artbar-taupe border-none py-2 px-4 text-xs rounded-full shadow-md transition-all hover:scale-105">
                <Plus size={16} className="mr-1"/> Add New
            </Button>
        </div>
        <div className="p-6 space-y-4 bg-gray-50/30">
            {items.map((item: any, index: number) => {
                const isExpanded = expandedIndices.includes(index);
                const title = getItemTitle ? getItemTitle(item) : `Item ${index + 1}`;
                
                return (
                    <div key={index} className="border border-gray-200 rounded-2xl bg-white relative group hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div 
                            className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50 border-b border-gray-100' : 'hover:bg-gray-50'}`}
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-artbar-navy text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                                </div>
                                <div className="font-bold text-artbar-navy text-sm truncate max-w-[200px] md:max-w-md">
                                    {title}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <button onClick={(e) => moveItem(index, 'up', e)} className="p-2 rounded-md hover:bg-gray-200 text-gray-400 hover:text-artbar-navy transition-colors"><ChevronUp size={16}/></button>
                                <button onClick={(e) => moveItem(index, 'down', e)} className="p-2 rounded-md hover:bg-gray-200 text-gray-400 hover:text-artbar-navy transition-colors"><ChevronDown size={16}/></button>
                                <div className="w-px h-5 bg-gray-200 mx-2"></div>
                                <button onClick={(e) => removeItem(index, e)} className="p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                            </div>
                        </div>
                        
                        {isExpanded && (
                            <div className="p-6 animate-in slide-in-from-top-2">
                                {renderItem(item, index)}
                            </div>
                        )}
                    </div>
                );
            })}
            
            {items.length === 0 && (
                <div className="text-center py-12 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <Layout size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No items yet.</p>
                    <p className="text-gray-400 text-sm mt-1">Click "Add New" to get started.</p>
                </div>
            )}
        </div>
    </div>
  )
}

const Section: React.FC<{ title: string; id: string; isExpanded: boolean; onToggle: () => void; children: React.ReactNode }> = ({ title, id, isExpanded, onToggle, children }) => (
  <div className="mb-4">
      <button 
      onClick={onToggle}
      className={`w-full flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border transition-all duration-300 ${isExpanded ? 'border-artbar-navy ring-1 ring-artbar-navy/5 shadow-md' : 'border-gray-100 hover:border-artbar-taupe/30 hover:shadow'}`}
      >
      <span className="font-heading font-bold text-artbar-navy text-lg tracking-wide">{title}</span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-artbar-navy text-white' : 'bg-gray-100 text-gray-500'}`}>
         {isExpanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </div>
      </button>
      {isExpanded && (
          <div className="bg-white p-6 md:p-8 rounded-b-2xl shadow-sm border border-t-0 border-gray-100 -mt-4 pt-8 animate-in slide-in-from-top-2 relative z-0">
              {children}
          </div>
      )}
  </div>
);

// --- MAIN ADMIN COMPONENT ---

export const Admin: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [localContent, setLocalContent] = useState<ContentData>(content);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [message, setMessage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  // Magic Writer Modal State
  const [magicWriterOpen, setMagicWriterOpen] = useState(false);
  const [magicWriterTargetIndex, setMagicWriterTargetIndex] = useState<number | null>(null);

  // Sync
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = () => {
    updateContent(localContent);
    setMessage("Changes saved successfully!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will discard all your edits and return to the original defaults.")) {
      resetContent();
      window.location.reload();
    }
  };

  const updateField = (path: string[], value: any) => {
    setLocalContent(prev => updateNested(prev, path, value));
  };
  
  const toggleSection = (id: string) => setExpandedSection(prev => prev === id ? null : id);

  const applyMagicContent = (data: any) => {
      if (magicWriterTargetIndex === null) return;
      const index = magicWriterTargetIndex;
      const basePath = ['blog', index.toString()];

      setLocalContent(prev => {
        let next = prev;
        next = updateNested(next, [...basePath, 'titleEn'], data.titleEn);
        next = updateNested(next, [...basePath, 'titleJp'], data.titleJp);
        next = updateNested(next, [...basePath, 'excerptEn'], data.excerptEn);
        next = updateNested(next, [...basePath, 'excerptJp'], data.excerptJp);
        next = updateNested(next, [...basePath, 'contentEn'], data.contentEn);
        next = updateNested(next, [...basePath, 'contentJp'], data.contentJp);
        // Auto-slug
        const slug = data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        next = updateNested(next, [...basePath, 'slug'], slug);
        return next;
      });
  };

  // --- RENDERERS ---

  const renderHomeEditor = () => (
    <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><Layout size={32} className="text-artbar-taupe" /> Home Page</h2>
        
        <Section title="Hero Section" id="hero" isExpanded={expandedSection === 'hero'} onToggle={() => toggleSection('hero')}>
            <BilingualInput localContent={localContent} updateField={updateField} label="Badge Text" path={['home', 'hero', 'badge']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Main Title" path={['home', 'hero', 'title']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Title Highlight" path={['home', 'hero', 'titleHighlight']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Subtitle" path={['home', 'hero', 'subtitle']} multiline />
            <div className="grid grid-cols-2 gap-4">
                <BilingualInput localContent={localContent} updateField={updateField} label="Book session CTA" path={['home', 'hero', 'ctaSchedule']} />
                <BilingualInput localContent={localContent} updateField={updateField} label="Private Button" path={['home', 'hero', 'ctaPrivate']} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <BilingualInput localContent={localContent} updateField={updateField} label="LINE CTA (Chat With Us)" path={['home', 'hero', 'ctaLineChat']} />
                <BilingualInput localContent={localContent} updateField={updateField} label="Find themes CTA" path={['home', 'hero', 'ctaFindPainting']} />
            </div>
             <div className="grid grid-cols-2 gap-4 mt-4">
                <BilingualInput localContent={localContent} updateField={updateField} label="Rating score (e.g. 4.8)" path={['home', 'hero', 'ratingScore']} />
                <BilingualInput localContent={localContent} updateField={updateField} label="Rating label (e.g. Average rating / 平均評価)" path={['home', 'hero', 'ratingSource']} />
            </div>
            <p className="text-xs text-artbar-gray mt-2 mb-1">
              Guest totals on the home page are calculated automatically (100,457 on 2026-03-24 JST, then +45 per Tokyo calendar day). Suffix lines below still apply; the number fields are reference only.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <BilingualInput localContent={localContent} updateField={updateField} label="Guests number" path={['home', 'hero', 'guestsNumber']} />
                <BilingualInput localContent={localContent} updateField={updateField} label="Hero guest line (EN: suffix after the + count; JP: full line, use {{count}} for the formatted number)" path={['home', 'hero', 'guestsSuffix']} />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-artbar-gray">Hero Media</h4>
                <ImageInput localContent={localContent} updateField={updateField} label="Hero video — desktop (MP4)" path={['images', 'hero', 'video']} />
                <ImageInput localContent={localContent} updateField={updateField} label="Hero video — mobile (MP4)" path={['images', 'hero', 'videoMobile']} />
                <ImageInput localContent={localContent} updateField={updateField} label="Fallback Image" path={['images', 'hero', 'home']} />
            </div>
        </Section>

         <Section title="Concept Section" id="concept" isExpanded={expandedSection === 'concept'} onToggle={() => toggleSection('concept')}>
            <BilingualInput localContent={localContent} updateField={updateField} label="Established Text" path={['home', 'concept', 'est']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Main Title" path={['home', 'concept', 'title']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Paragraph 1" path={['home', 'concept', 'p1']} multiline />
            <div className="grid grid-cols-2 gap-4">
                 <BilingualInput localContent={localContent} updateField={updateField} label="Rating Label" path={['home', 'concept', 'ratingLabel']} />
                 <BilingualInput localContent={localContent} updateField={updateField} label="Guests count (badge)" path={['home', 'concept', 'guestsCount']} />
            </div>
            <p className="text-xs text-artbar-gray mt-2 mb-1">
              JP headline: use <code className="bg-gray-100 px-1 rounded">{'{{count}}'}</code> where the live total should appear (e.g. 累計{'{{count}}'}名以上…).
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
                 <BilingualInput localContent={localContent} updateField={updateField} label="Guests headline" path={['home', 'concept', 'guestsLabel']} />
            </div>
            <ImageInput localContent={localContent} updateField={updateField} label="Concept Image" path={['images', 'concept', 'main']} />
        </Section>
    </div>
  );

  const renderInstructorsEditor = () => (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><Users size={32} className="text-artbar-taupe" /> Instructors</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <BilingualInput localContent={localContent} updateField={updateField} label="Page Title" path={['instructorsPage', 'title']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Page Subtitle" path={['instructorsPage', 'subtitle']} />
        </div>
        
        <DataArrayManager 
            localContent={localContent} updateField={updateField}
            label="Instructors List"
            path={['instructors']}
            itemTemplate={{ id: 'new', name: 'New Instructor', roleEn: 'Instructor', roleJp: 'インストラクター', descEn: '', descJp: '', languages: 'English, Japanese', profileImage: '', artworkImage: '' }}
            getItemTitle={(item) => item.name || 'Unnamed Instructor'}
            renderItem={(item: any, index: number) => {
                const p = ['instructors', index.toString()];
                return (
                    <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-3 text-center">
                             <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 mx-auto border-4 border-white shadow-md relative group">
                                 {item.profileImage ? <img src={item.profileImage} className="w-full h-full object-cover" /> : <Users className="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
                             </div>
                             <div className="space-y-4">
                                <ImageInput localContent={localContent} updateField={updateField} label="Profile Photo" path={[...p, 'profileImage']} />
                                <ImageInput localContent={localContent} updateField={updateField} label="Background Art" path={[...p, 'artworkImage']} />
                             </div>
                        </div>
                        <div className="md:col-span-9 grid md:grid-cols-2 gap-6">
                            <RawInput localContent={localContent} updateField={updateField} label="Name" path={[...p, 'name']} />
                            <RawInput localContent={localContent} updateField={updateField} label="Languages" path={[...p, 'languages']} />
                            <RawInput localContent={localContent} updateField={updateField} label="Role (EN)" path={[...p, 'roleEn']} />
                            <RawInput localContent={localContent} updateField={updateField} label="Role (JP)" path={[...p, 'roleJp']} />
                            <div className="col-span-2 grid md:grid-cols-2 gap-6">
                                <RawInput localContent={localContent} updateField={updateField} label="Desc (EN)" path={[...p, 'descEn']} multiline />
                                <RawInput localContent={localContent} updateField={updateField} label="Desc (JP)" path={[...p, 'descJp']} multiline />
                            </div>
                        </div>
                    </div>
                );
            }}
        />
      </div>
  );

  const renderTeamBuildingEditor = () => (
    <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><Briefcase size={32} className="text-artbar-taupe" /> Team Building</h2>
        
         <Section title="Hero" id="tb-hero" isExpanded={expandedSection === 'tb-hero'} onToggle={() => toggleSection('tb-hero')}>
             <BilingualInput localContent={localContent} updateField={updateField} label="Badge" path={['teamBuilding', 'hero', 'badge']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Title" path={['teamBuilding', 'hero', 'title']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Highlight" path={['teamBuilding', 'hero', 'titleHighlight']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Subtitle" path={['teamBuilding', 'hero', 'subtitle']} multiline />
             <BilingualInput localContent={localContent} updateField={updateField} label="CTA Button" path={['teamBuilding', 'hero', 'cta']} />
             <div className="mt-8 pt-6 border-t border-gray-100">
                 <ImageInput localContent={localContent} updateField={updateField} label="Hero Image" path={['images', 'hero', 'teamBuilding']} />
             </div>
        </Section>
        
        <Section title="Value Proposition" id="tb-value" isExpanded={expandedSection === 'tb-value'} onToggle={() => toggleSection('tb-value')}>
             <BilingualInput localContent={localContent} updateField={updateField} label="Badge" path={['teamBuilding', 'valueProp', 'badge']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Title" path={['teamBuilding', 'valueProp', 'title']} multiline />
             <BilingualInput localContent={localContent} updateField={updateField} label="Paragraph 1" path={['teamBuilding', 'valueProp', 'p1']} multiline />
             <BilingualInput localContent={localContent} updateField={updateField} label="Paragraph 2" path={['teamBuilding', 'valueProp', 'p2']} multiline />
        </Section>
    </div>
  );

  const renderPrivatePartiesEditor = () => (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><PartyPopper size={32} className="text-artbar-taupe" /> Private Parties</h2>
        <Section title="Hero" id="pp-hero" isExpanded={expandedSection === 'pp-hero'} onToggle={() => toggleSection('pp-hero')}>
             <BilingualInput localContent={localContent} updateField={updateField} label="Badge" path={['privateParties', 'hero', 'badge']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Title" path={['privateParties', 'hero', 'title']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Highlight" path={['privateParties', 'hero', 'titleHighlight']} />
             <BilingualInput localContent={localContent} updateField={updateField} label="Subtitle" path={['privateParties', 'hero', 'subtitle']} multiline />
        </Section>
      </div>
  );

  const renderLocationsEditor = () => (
      <div className="animate-in fade-in duration-500">
         <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><MapPin size={32} className="text-artbar-taupe" /> Locations</h2>
         
         <DataArrayManager 
            localContent={localContent} updateField={updateField}
            label="Studio Locations"
            path={['locations']}
            itemTemplate={{ id: 'new', nameEn: 'New Studio', nameJp: 'New Studio', addressEn: '', addressJp: '', accessEn: '', accessJp: '', image: '' }}
            getItemTitle={(item) => item.nameEn || 'New Location'}
            renderItem={(item: any, index: number) => {
                const p = ['locations', index.toString()];
                return (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                             <ImageInput localContent={localContent} updateField={updateField} label="Studio Photo" path={[...p, 'image']} />
                             <RawInput localContent={localContent} updateField={updateField} label="ID (System)" path={[...p, 'id']} />
                        </div>
                        <div className="space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                <RawInput localContent={localContent} updateField={updateField} label="Name (EN)" path={[...p, 'nameEn']} />
                                <RawInput localContent={localContent} updateField={updateField} label="Name (JP)" path={[...p, 'nameJp']} />
                             </div>
                             <RawInput localContent={localContent} updateField={updateField} label="Address (EN)" path={[...p, 'addressEn']} multiline />
                             <RawInput localContent={localContent} updateField={updateField} label="Address (JP)" path={[...p, 'addressJp']} multiline />
                             <RawInput localContent={localContent} updateField={updateField} label="Access (EN)" path={[...p, 'accessEn']} multiline />
                             <RawInput localContent={localContent} updateField={updateField} label="Access (JP)" path={[...p, 'accessJp']} multiline />
                        </div>
                    </div>
                );
            }}
        />
      </div>
  );

  const renderMediaEditor = () => (
      <div className="animate-in fade-in duration-500">
         <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><Newspaper size={32} className="text-artbar-taupe" /> Press & Media</h2>
         <Section title="Media List" id="media-list" isExpanded={true} onToggle={() => {}}>
             <DataArrayManager 
                localContent={localContent} updateField={updateField}
                label="Media Features"
                path={['media']}
                itemTemplate={{ outlet: "New Outlet", date: "2024.01", image: "", logo: "" }}
                getItemTitle={(item) => item.outlet || 'New Outlet'}
                renderItem={(item: any, index: number) => {
                    const p = ['media', index.toString()];
                    return (
                        <div className="grid md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <ImageInput localContent={localContent} updateField={updateField} label="Cover Image" path={[...p, 'image']} />
                                <ImageInput localContent={localContent} updateField={updateField} label="Logo Image" path={[...p, 'logo']} />
                             </div>
                             <div className="space-y-4">
                                <RawInput localContent={localContent} updateField={updateField} label="Outlet Name" path={[...p, 'outlet']} />
                                <RawInput localContent={localContent} updateField={updateField} label="Date (YYYY.MM)" path={[...p, 'date']} />
                             </div>
                        </div>
                    );
                }}
            />
         </Section>
      </div>
  );

  const renderThemeEditor = () => (
      <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><Settings size={32} className="text-artbar-taupe" /> General Settings</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="font-bold text-xl mb-6 text-artbar-navy border-b border-gray-100 pb-4">Brand Logos</h3>
              <div className="grid md:grid-cols-2 gap-8">
                 <ImageInput localContent={localContent} updateField={updateField} label="Dark Logo (Sticky Nav / White Bg)" path={['images', 'logoDark']} />
                 <ImageInput localContent={localContent} updateField={updateField} label="Light Logo (Transparent Nav / Dark Bg)" path={['images', 'logoLight']} />
              </div>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
             <h3 className="font-bold text-xl mb-6 text-artbar-navy border-b border-gray-100 pb-4">Typography</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <FontSelect label="Heading Font" path={['theme', 'fonts', 'heading']} localContent={localContent} updateField={updateField} />
                <FontSelect label="Body Font" path={['theme', 'fonts', 'body']} localContent={localContent} updateField={updateField} />
             </div>
           </div>
      </div>
  );

  const renderBlogEditor = () => (
    <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl font-heading font-heavy text-artbar-navy mb-8 flex items-center gap-3"><BookOpen size={32} className="text-artbar-taupe" /> Blog & Journal</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <BilingualInput localContent={localContent} updateField={updateField} label="Page Title" path={['blogPage', 'title']} />
            <BilingualInput localContent={localContent} updateField={updateField} label="Page Subtitle" path={['blogPage', 'subtitle']} />
        </div>

        <DataArrayManager 
            localContent={localContent} updateField={updateField}
            label="Articles"
            path={['blog']}
            itemTemplate={{ 
                id: `post_${Date.now()}`, 
                slug: 'new-post', 
                published: false,
                image: '',
                date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
                tags: ['Art', 'Lifestyle'],
                titleEn: 'New Post Title',
                titleJp: '新しい記事',
                authorEn: 'Artbar Team',
                authorJp: 'Artbar Team',
                excerptEn: 'Short summary...',
                excerptJp: '短いサマリー...',
                contentEn: '<p>Content goes here...</p>',
                contentJp: '<p>ここに本文...</p>'
            }}
            getItemTitle={(item) => (
                <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${item.published ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span>{item.titleEn || 'Untitled Draft'}</span>
                    <span className="text-[10px] font-normal uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-500">{item.date}</span>
                </div>
            )}
            renderItem={(item: any, index: number) => {
                const p = ['blog', index.toString()];
                return (
                    <div>
                         {/* Magic Writer Trigger */}
                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="font-bold text-artbar-navy text-lg flex items-center gap-2"><Wand2 size={20} className="text-blue-500"/> Need Inspiration?</h4>
                                <p className="text-sm text-gray-600">Use our AI editor to draft a sophisticated bilingual article in seconds.</p>
                            </div>
                            <Button 
                                onClick={() => { setMagicWriterTargetIndex(index); setMagicWriterOpen(true); }}
                                className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm"
                            >
                                <Sparkles size={16} className="mr-2"/> Open Magic Writer
                            </Button>
                         </div>

                         <div className="grid md:grid-cols-12 gap-8">
                             <div className="md:col-span-4 space-y-6">
                                 <ImageInput localContent={localContent} updateField={updateField} label="Cover Image" path={[...p, 'image']} />
                                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                                     <RawInput localContent={localContent} updateField={updateField} label="Slug (URL)" path={[...p, 'slug']} />
                                     <RawInput localContent={localContent} updateField={updateField} label="Date (YYYY.MM.DD)" path={[...p, 'date']} />
                                     <div className="flex items-center gap-3 p-2">
                                         <input 
                                            type="checkbox" 
                                            checked={item.published} 
                                            onChange={(e) => updateField([...p, 'published'], e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-artbar-navy focus:ring-artbar-taupe"
                                         />
                                         <label className="text-sm font-bold text-artbar-navy uppercase tracking-wider">Published Status</label>
                                     </div>
                                 </div>
                             </div>
                             <div className="md:col-span-8 space-y-6">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <RawInput localContent={localContent} updateField={updateField} label="Title (EN)" path={[...p, 'titleEn']} />
                                    <RawInput localContent={localContent} updateField={updateField} label="Title (JP)" path={[...p, 'titleJp']} />
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                     <RawInput localContent={localContent} updateField={updateField} label="Author (EN)" path={[...p, 'authorEn']} />
                                     <RawInput localContent={localContent} updateField={updateField} label="Author (JP)" path={[...p, 'authorJp']} />
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                     <RawInput localContent={localContent} updateField={updateField} label="Excerpt (EN)" path={[...p, 'excerptEn']} multiline />
                                     <RawInput localContent={localContent} updateField={updateField} label="Excerpt (JP)" path={[...p, 'excerptJp']} multiline />
                                 </div>
                             </div>
                         </div>
                         <div className="mt-8 pt-8 border-t border-gray-100">
                             <p className="text-xs text-artbar-gray mb-4 uppercase font-bold tracking-widest flex items-center gap-2"><Layout size={14}/> Main Content (HTML Supported)</p>
                             <div className="grid md:grid-cols-2 gap-8">
                                 <div>
                                     <span className="text-[10px] uppercase font-bold text-artbar-taupe block mb-2">English Body</span>
                                     <textarea 
                                        className="w-full p-4 h-96 border border-gray-200 rounded-2xl font-mono text-sm leading-relaxed focus:ring-2 focus:ring-artbar-taupe/20 outline-none"
                                        placeholder="<p>Write English content here...</p>"
                                        value={item.contentEn}
                                        onChange={(e) => updateField([...p, 'contentEn'], e.target.value)}
                                     />
                                 </div>
                                  <div>
                                     <span className="text-[10px] uppercase font-bold text-artbar-taupe block mb-2">Japanese Body</span>
                                     <textarea 
                                        className="w-full p-4 h-96 border border-gray-200 rounded-2xl font-mono text-sm leading-relaxed focus:ring-2 focus:ring-artbar-taupe/20 outline-none"
                                        placeholder="<p>日本語の本文...</p>"
                                        value={item.contentJp}
                                        onChange={(e) => updateField([...p, 'contentJp'], e.target.value)}
                                     />
                                 </div>
                             </div>
                         </div>
                    </div>
                );
            }}
        />
        
        <MagicBlogWriter 
            isOpen={magicWriterOpen} 
            onClose={() => setMagicWriterOpen(false)} 
            onApply={applyMagicContent}
        />
    </div>
  );

  const TABS = [
      { id: 'home', label: 'Home Page', icon: Layout },
      { id: 'instructors', label: 'Instructors', icon: Users },
      { id: 'teambuilding', label: 'Team Building', icon: Briefcase },
      { id: 'parties', label: 'Private Parties', icon: PartyPopper },
      { id: 'locations', label: 'Locations', icon: MapPin },
      { id: 'blog', label: 'Blog & Journal', icon: BookOpen },
      { id: 'media', label: 'Press & Media', icon: Newspaper },
      { id: 'theme', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-32 pb-20 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-artbar-navy text-white rounded-xl flex items-center justify-center">
                <Settings size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-heading font-heavy text-artbar-navy">CMS Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, Admin.</p>
             </div>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
              <Button onClick={handleReset} variant="outline" className="flex-1 md:flex-none border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100">
                 <RotateCcw size={16} className="mr-2" /> Reset
              </Button>
              <Button onClick={handleSave} className="flex-1 md:flex-none bg-artbar-navy text-white hover:bg-artbar-taupe shadow-lg hover:shadow-xl px-8">
                 <Save size={16} className="mr-2" /> Save Changes
              </Button>
           </div>
        </div>

        {message && (
            <div className="fixed top-24 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center animate-in slide-in-from-top-4">
                <Check size={20} className="mr-2" /> {message}
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:w-72 bg-white rounded-[2rem] shadow-sm p-4 sticky top-32 flex-shrink-0 border border-gray-100 h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
               <nav className="space-y-1">
                  {TABS.map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)} 
                        className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-artbar-navy text-white shadow-md transform scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 hover:text-artbar-navy'}`}
                      >
                          <tab.icon size={18} className={activeTab === tab.id ? 'text-artbar-taupe' : 'opacity-70'} /> 
                          {tab.label}
                      </button>
                  ))}
               </nav>
               <div className="mt-8 px-6 pb-6 text-center">
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Storage Status</p>
                   <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                       <div className="bg-green-500 w-full h-full"></div>
                   </div>
                   <p className="text-[10px] text-gray-400 mt-2">Local Sync Active</p>
               </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-grow bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 p-8 md:p-12 w-full border border-gray-100 min-h-[80vh]">
                {activeTab === 'home' && renderHomeEditor()}
                {activeTab === 'instructors' && renderInstructorsEditor()}
                {activeTab === 'teambuilding' && renderTeamBuildingEditor()}
                {activeTab === 'parties' && renderPrivatePartiesEditor()}
                {activeTab === 'locations' && renderLocationsEditor()}
                {activeTab === 'media' && renderMediaEditor()}
                {activeTab === 'theme' && renderThemeEditor()}
                {activeTab === 'blog' && renderBlogEditor()}
            </div>
        </div>

      </div>
    </div>
  );
};