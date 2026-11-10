import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  Car, 
  Compass, 
  MessageCircle, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../data/config';

interface ImageAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRecommendedCar: () => void;
}

export const ImageAnalyzerModal: React.FC<ImageAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onBookRecommendedCar,
}) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [promptText, setPromptText] = useState(
    'Analyze this vehicle or mountain road in Northern Pakistan. Can a regular sedan pass through safely, or is a 4x4 Land Cruiser/Prado required? What are the key safety hazards?'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Sample photos from Gilgit-Baltistan and our Prado fleet
  const sampleImages = [
    {
      title: 'Toyota Prado TX/TZ 4x4',
      url: '/assets/aistudio/images__4__2a8814c6.jfif',
      prompt: 'Analyze this Toyota Prado. Is it suitable for long mountain journeys to Hunza, Skardu, and Khunjerab Pass?',
    },
    {
      title: 'Prado Interior & Cockpit',
      url: '/assets/aistudio/images__2__b66922dd.jfif',
      prompt: 'Analyze this Prado interior. Comment on passenger comfort, controls, and features for Northern Pakistan travel.',
    },
    {
      title: 'Classic Prado TZ 4WD',
      url: '/assets/aistudio/images_9e3e9388.jfif',
      prompt: 'Analyze this 4x4 Prado model. Can it navigate rocky tracks like Naltar Lakes and Babusar Pass?',
    },
    {
      title: 'Fairy Meadows Mountain Trail',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      prompt: 'Analyze this rugged mountain terrain. What vehicle class and driver skills are required here?',
    },
  ];

  const handleSelectSample = async (sample: typeof sampleImages[0]) => {
    setImagePreview(sample.url);
    setPromptText(sample.prompt);
    setAnalysisResult(null);
    setErrorMsg(null);

    // Fetch and convert image to base64
    try {
      const res = await fetch(sample.url);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.warn('Sample fetch note:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRunAnalysis = async () => {
    if (!imageBase64) {
      setErrorMsg('Please upload a photo or select one of the sample images above.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          prompt: promptText,
        }),
      });

      const data = await response.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
      } else if (data.error) {
        setErrorMsg(data.error);
      } else {
        setErrorMsg('Failed to analyze image. Please try again.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(err.message || 'Could not connect to analysis service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 p-5 sm:p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Close AI advisor modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>AI Mountain Terrain & Vehicle Inspector • Gemini 4 Argon</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Gilgit-Baltistan Route & Car Advisor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Upload a photo of a vehicle or mountain road in Northern Pakistan to analyze terrain safety, ground clearance, and 4WD requirements.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Sample quick selector */}
          <div>
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Sample Photo or Upload Your Own:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleImages.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`p-1.5 rounded-xl border text-left transition flex flex-col items-center gap-1.5 group ${
                    imagePreview === sample.url
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-16 object-cover rounded-lg"
                  />
                  <span className="text-[11px] font-semibold text-slate-300 group-hover:text-amber-400 truncate w-full text-center">
                    {sample.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload or Drop Area */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-5">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="vehicle-photo-upload"
              />

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-slate-950 h-44 flex items-center justify-center group">
                  <img
                    src={imagePreview}
                    alt="Uploaded photo for analysis"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs font-bold text-white transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Change Photo</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition flex flex-col items-center justify-center h-44"
                >
                  <Camera className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="text-xs font-bold text-white">Click to Upload Photo</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP up to 10MB</p>
                </div>
              )}
            </div>

            {/* Prompt input and action */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <label htmlFor="ai-prompt-input" className="block text-xs font-semibold text-slate-300 mb-1">
                  Analysis Question / Focus:
                </label>
                <textarea
                  id="ai-prompt-input"
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={handleRunAnalysis}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition hover:scale-101 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini 4 Argon is Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run Gemini 4 Argon Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error notice if any */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Analysis Result Display */}
          {analysisResult && (
            <div className="bg-slate-950 border border-indigo-900/60 rounded-2xl p-5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Gemini 4 Argon Mountain Assessment Report
                </span>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                  Model: gemini-4-argon
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2 max-h-60 overflow-y-auto pr-2">
                {analysisResult}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Want the right vehicle for this terrain?
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onBookRecommendedCar();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow transition hover:scale-102"
                >
                  <Car className="w-4 h-4" />
                  <span>Book Recommended 4x4 Prado</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
