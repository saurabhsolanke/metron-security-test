import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Sparkles, 
  X, 
  Activity, 
  Key
} from 'lucide-react';

interface GoldenRuleBannerProps {
  theme?: 'dark' | 'light';
}

interface GoldenRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const GoldenRuleBanner = ({ theme = 'dark' }: GoldenRuleBannerProps) => {
  const isLight = theme === 'light';

  return (
    <div className={`relative mb-8 overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-colors ${
      isLight
        ? 'border-blue-200 bg-gradient-to-br from-white via-blue-50/50 to-red-50/30 text-slate-900 shadow-blue-500/5'
        : 'border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/40 text-slate-100 shadow-2xl'
    }`}>
      {/* Background Decorative Laser Glows */}
      <div className={`absolute top-0 right-0 -z-10 h-72 w-72 rounded-full blur-[90px] pointer-events-none ${
        isLight ? 'bg-blue-400/20' : 'bg-indigo-600/15'
      }`} />
      <div className={`absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full blur-[80px] pointer-events-none ${
        isLight ? 'bg-red-400/15' : 'bg-cyan-500/10'
      }`} />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-3xl">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold mb-3 shadow-inner ${
            isLight
              ? 'text-[#0047FF] bg-blue-50 border-blue-200'
              : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/40'
          }`}>
            <Sparkles className="h-3.5 w-3.5" />
            The Golden Rule of Enterprise Cybersecurity
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            "Never Trust, Always Verify — Zero Trust Architecture"
          </h2>

          <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Every incoming event, endpoint access, and cloud workload must be explicitly authenticated, authorized under least-privilege control, and continuously validated across all 8 security domains.
          </p>
        </div>

        {/* Telemetry Metrics Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
          <div className={`flex items-center gap-3 rounded-2xl border p-3 shadow-inner ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className={`rounded-xl p-2 border ${
              isLight ? 'bg-blue-50 border-blue-200 text-[#0047FF]' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
            }`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>100% Zero Trust</div>
              <div className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Explicit Verification</div>
            </div>
          </div>

          <div className={`flex items-center gap-3 rounded-2xl border p-3 shadow-inner ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className={`rounded-xl p-2 border ${
              isLight ? 'bg-red-50 border-red-200 text-[#FF4D3D]' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}>
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>5.4M ops/sec</div>
              <div className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Real-Time Telemetry</div>
            </div>
          </div>

          <div className={`flex items-center gap-3 rounded-2xl border p-3 shadow-inner ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className={`rounded-xl p-2 border ${
              isLight ? 'bg-blue-50 border-blue-200 text-[#0047FF]' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            }`}>
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>SOC2 & ISO</div>
              <div className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Continuous Compliance</div>
            </div>
          </div>

          <div className={`flex items-center gap-3 rounded-2xl border p-3 shadow-inner ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className={`rounded-xl p-2 border ${
              isLight ? 'bg-red-50 border-red-200 text-[#FF4D3D]' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
            }`}>
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Defense in Depth</div>
              <div className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>8 Pillar Alignment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoldenRuleModal = ({ isOpen, onClose, theme = 'dark' }: GoldenRuleModalProps) => {
  const isLight = theme === 'light';

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in ${
      isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
    }`}>
      <div className={`relative w-full max-w-2xl overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900/95 border-indigo-500/40 text-slate-100'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-inner ${
              isLight ? 'bg-blue-50 border-blue-200 text-[#0047FF]' : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                isLight ? 'text-[#0047FF] bg-blue-50 border-blue-200' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
              }`}>
                Core Cybersecurity Charter
              </span>
              <h3 className={`text-2xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>The Golden Rule Matrix</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`rounded-xl p-2 transition-colors ${
              isLight ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 my-6 text-xs sm:text-sm">
          <div className={`p-4 rounded-2xl border ${
            isLight ? 'bg-blue-50/50 border-blue-100' : 'bg-indigo-950/30 border-indigo-500/20'
          }`}>
            <h4 className={`font-bold mb-1 flex items-center gap-2 text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Key className={`w-4 h-4 ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`} /> 1. Explicit Verification (Zero Trust)
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Always authenticate and authorize based on all available data points, including user identity, location, device health, service or workload, data classification, and anomalies.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isLight ? 'bg-red-50/40 border-red-100' : 'bg-indigo-950/30 border-indigo-500/20'
          }`}>
            <h4 className={`font-bold mb-1 flex items-center gap-2 text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Lock className={`w-4 h-4 ${isLight ? 'text-[#FF4D3D]' : 'text-cyan-400'}`} /> 2. Least-Privilege Access
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA), risk-based adaptive policies, and data protection to protect both data and productivity.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isLight ? 'bg-blue-50/50 border-blue-100' : 'bg-indigo-950/30 border-indigo-500/20'
          }`}>
            <h4 className={`font-bold mb-1 flex items-center gap-2 text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Eye className={`w-4 h-4 ${isLight ? 'text-[#0047FF]' : 'text-emerald-400'}`} /> 3. Assume Breach & Continuous Telemetry
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Minimize blast radius and segment access. Verify end-to-end encryption and use analytics to get visibility, drive threat detection, and improve defenses across all 8 security categories.
            </p>
          </div>
        </div>

        <div className={`flex justify-end pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition-all ${
              isLight ? 'bg-[#0047FF] hover:bg-blue-700 shadow-blue-500/25' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
            }`}
          >
            Acknowledge Charter
          </button>
        </div>
      </div>
    </div>
  );
};
