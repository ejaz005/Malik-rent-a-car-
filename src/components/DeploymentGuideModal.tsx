import React from 'react';
import { 
  X, 
  Globe, 
  Server, 
  Edit3, 
  CheckCircle2, 
  FileCode, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-5 sm:p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Owner & Developer Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Hosting on {SITE_CONFIG.domain} & Updating Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Step-by-step instructions for pointing your domain and editing cars, prices, and photos without coding skills.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: How to edit cars, prices, text */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Edit3 className="w-4 h-4" />
              <span>1. How to Edit Cars, Prices & Photos (Non-Developer Friendly)</span>
            </div>
            <p>
              All website content, car rates, phone numbers, and tour itineraries are stored in a single organized configuration file:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300">
              📁 /src/data/config.ts
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Change Rates:</strong> Search for <code className="text-white">pricePerDay: 16000</code> and adjust the number.</li>
              <li><strong>Add / Replace Car Photos:</strong> Place your photo inside <code className="text-white">/public/assets/</code> and set <code className="text-white">image: '/assets/your-car.jpg'</code> or paste an image URL.</li>
              <li><strong>Edit Phone Numbers:</strong> Search for <code className="text-white">SITE_CONFIG.primaryPhone</code> and enter your numbers.</li>
              <li><strong>Update Tour Packages:</strong> Scroll to <code className="text-white">TOUR_PACKAGES</code> to edit days, pricing, or included perks.</li>
            </ul>
          </div>

          {/* Section 2: Hosting on depayalotours.com */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Server className="w-4 h-4" />
              <span>2. Hosting & Pointing Domain (depayalotours.com)</span>
            </div>
            <p>
              To host this site on your custom domain with free SSL (https):
            </p>
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <p className="font-bold text-white text-xs">Option A: Cloud Run / Vercel / Netlify (Recommended)</p>
                <ol className="list-decimal pl-5 mt-1 space-y-1 text-slate-400 text-xs">
                  <li>Deploy this project with 1 click to Vercel or Cloud Run.</li>
                  <li>In your domain registrar (GoDaddy, Namecheap, etc.) where <strong>depayalotours.com</strong> is registered:</li>
                  <li>Add a <strong>CNAME Record</strong>: Host <code className="text-white">www</code> ➔ Points to <code className="text-white">cname.vercel-dns.com</code> (or Cloud Run URL).</li>
                  <li>Add an <strong>A Record</strong>: Host <code className="text-white">@</code> ➔ Points to your server IP.</li>
                </ol>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <p className="font-bold text-white text-xs">Option B: Standard VPS / Node.js cPanel</p>
                <ol className="list-decimal pl-5 mt-1 space-y-1 text-slate-400 text-xs">
                  <li>Run <code className="text-white">npm run build</code> to generate the optimized production package.</li>
                  <li>Start the server with <code className="text-white">npm start</code> (runs <code className="text-white">tsx server.ts</code> on port 3000 / 80).</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Section 3: Gemini API Key for Photo Advisor */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. AI Photo Advisor Configuration</span>
            </div>
            <p className="text-slate-400">
              The AI Terrain and Car Photo Inspector uses Google's <code className="text-white">gemini-4-argon</code> model. AI Studio automatically injects your <code className="text-white">GEMINI_API_KEY</code> at runtime. In external hosting, define <code className="text-white">GEMINI_API_KEY</code> in your environment variables.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Got It, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
