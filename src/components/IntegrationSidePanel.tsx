import { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Copy, 
  Check, 
  Activity, 
  Code2, 
  Lock, 
  Radio
} from 'lucide-react';

interface IntegrationSidePanelProps {
  integrationName: string;
  categoryName: string;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const IntegrationSidePanel = ({
  integrationName,
  categoryName,
  onClose,
  theme = 'dark',
}: IntegrationSidePanelProps) => {
  const [copied, setCopied] = useState(false);

  const isLight = theme === 'light';

  const handleCopyConfig = () => {
    const configSnippet = {
      connector: integrationName,
      domain: categoryName,
      status: "Ready",
      protocol: "REST_WEBHOOK",
      auth: "OAuth2_API_Key",
      telemetry: "Realtime_Logs_And_Alerts",
      verified: true
    };
    navigator.clipboard.writeText(JSON.stringify(configSnippet, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
      isLight
        ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
        : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-2xl backdrop-blur-2xl'
    }`}>
      {/* Top Gradient Bar */}
      <div className={`h-2 w-full ${
        isLight ? 'bg-gradient-to-r from-[#0047FF] via-indigo-500 to-[#FF4D3D]' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400'
      }`} />

      {/* Header Section */}
      <div className={`p-5 sm:p-6 border-b ${isLight ? 'border-slate-100 bg-slate-50/70' : 'border-slate-800/80 bg-slate-950/50'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border font-black text-xl shadow-lg shrink-0 ${
              isLight
                ? 'bg-[#0047FF] border-blue-600 text-white shadow-blue-500/20'
                : 'bg-gradient-to-tr from-indigo-600 to-violet-500 border-indigo-400 text-white shadow-indigo-500/30'
            }`}>
              {integrationName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                  isLight
                    ? 'text-[#0047FF] bg-blue-50 border-blue-200'
                    : 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20'
                }`}>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Integration Specs
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  #{categoryName.toLowerCase().replace(/\s+/g, '-')}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {integrationName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`rounded-xl p-2 transition-colors shrink-0 ${
              isLight ? 'text-slate-400 hover:bg-slate-200 hover:text-slate-800' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Close Details Panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Body / Specs List */}
      <div className="p-5 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
        
        {/* Description Banner */}
        <div className={`p-4 rounded-2xl border ${
          isLight ? 'bg-blue-50/60 border-blue-100 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
        }`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
            isLight ? 'text-[#0047FF]' : 'text-indigo-400'
          }`}>
            <Activity className="w-3.5 h-3.5" /> Integration Purpose
          </h4>
          <p className="text-xs leading-relaxed">
            Native cybersecurity connector enabling automated event ingestion, real-time threat telemetry aggregation, and bi-directional posture management for <span className="font-bold">{integrationName}</span> within <span className="font-bold">{categoryName}</span>.
          </p>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
          }`}>
            <span className={`text-[10px] block font-mono ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>STATUS</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-500 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Ready
            </span>
          </div>

          <div className={`p-3 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
          }`}>
            <span className={`text-[10px] block font-mono ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>SYNC PROTOCOL</span>
            <span className={`font-bold mt-1 block ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              REST / Webhook API
            </span>
          </div>

          <div className={`p-3 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
          }`}>
            <span className={`text-[10px] block font-mono ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>AUTHENTICATION</span>
            <span className={`font-bold mt-1 flex items-center gap-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Lock className="w-3 h-3 text-blue-500" /> OAuth2 / API Key
            </span>
          </div>

          <div className={`p-3 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
          }`}>
            <span className={`text-[10px] block font-mono ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>LATENCY</span>
            <span className={`font-bold mt-1 flex items-center gap-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" /> &lt; 50ms Realtime
            </span>
          </div>
        </div>

        {/* Payload Sample Code Box */}
        <div className={`rounded-2xl border overflow-hidden ${
          isLight ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-slate-950 text-slate-200 border-slate-800'
        }`}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" /> connector_config.json
            </span>
            <span className="text-emerald-400">active</span>
          </div>
          <pre className="p-3 text-[11px] font-mono overflow-x-auto text-indigo-200 leading-relaxed">
{`{
  "connector": "${integrationName}",
  "domain": "${categoryName}",
  "telemetry": "Realtime_Logs",
  "status": "Ready",
  "verified": true
}`}
          </pre>
        </div>

      </div>

      {/* Footer Action Buttons */}
      <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
        isLight ? 'border-slate-200 bg-slate-50/80' : 'border-slate-800 bg-slate-950/80'
      }`}>
        <button
          onClick={handleCopyConfig}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
            isLight
              ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
              : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied Specs!' : 'Copy Config JSON'}
        </button>

        <button
          onClick={onClose}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold text-white transition-colors shadow-md ${
            isLight ? 'bg-[#0047FF] hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
};
