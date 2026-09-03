import { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';

interface IntegrationDetailModalProps {
  integration: string | null;
  categoryName?: string;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const IntegrationDetailModal = ({
  integration,
  categoryName,
  onClose,
  theme = 'dark',
}: IntegrationDetailModalProps) => {
  const [copied, setCopied] = useState(false);

  const isLight = theme === 'light';

  if (!integration) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(integration);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-fade-in ${
      isLight ? 'bg-slate-900/30' : 'bg-slate-950/70'
    }`}>
      <div className={`relative w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-slate-900 border-slate-700/60 text-slate-100'
      }`}>
        {/* Glow accent header */}
        <div className={`absolute -top-16 -right-16 h-32 w-32 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-blue-500/15' : 'bg-indigo-500/15'
        }`} />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl font-bold text-lg sm:text-xl shadow-inner border shrink-0 ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-[#0047FF]'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}>
              {integration.charAt(0)}
            </div>
            <div>
              <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isLight
                  ? 'text-[#0047FF] bg-blue-50 border-blue-200'
                  : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
              }`}>
                <Sparkles className="w-3 h-3" />
                {categoryName || 'Integration'}
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold mt-0.5 sm:mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{integration}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`rounded-xl p-1.5 transition-colors shrink-0 ${
              isLight ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div className={`rounded-xl border p-3.5 sm:p-4 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
          }`}>
            <h4 className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>Integration Details</h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Native ecosystem connector allowing seamless log ingest, posture monitoring, threat detection, and telemetry aggregation for <span className={`font-semibold ${isLight ? 'text-[#0047FF]' : 'text-indigo-300'}`}>{integration}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            <div className={`rounded-xl border p-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
            }`}>
              <span className={`text-[10px] sm:text-xs block ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Status</span>
              <span className={`inline-flex items-center gap-1.5 font-medium mt-0.5 ${
                isLight ? 'text-emerald-600' : 'text-emerald-400'
              }`}>
                <ShieldCheck className="w-4 h-4" /> Ready to Connect
              </span>
            </div>
            <div className={`rounded-xl border p-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
            }`}>
              <span className={`text-[10px] sm:text-xs block ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Sync Type</span>
              <span className={`font-medium mt-0.5 block ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Bi-directional REST / Webhook</span>
            </div>
          </div>
        </div>

        <div className={`mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all active:scale-95 ${
              isLight
                ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 hover:text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Name'}
          </button>

          <button
            onClick={onClose}
            className={`flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-medium rounded-xl text-white shadow-lg transition-all active:scale-95 ${
              isLight
                ? 'bg-[#0047FF] hover:bg-blue-700 shadow-blue-500/25'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
            }`}
          >
            <span>Close View</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
