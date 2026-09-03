import { useState } from 'react';
import type { CategoryData } from '../data/platformsData';
import { getCategoryIcon } from './CyberOctagon';
import { 
  X, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface CategorySidePanelProps {
  category: CategoryData;
  onClose: () => void;
  onSelectIntegration: (integrationName: string, categoryName: string) => void;
  theme?: 'dark' | 'light';
}

export const CategorySidePanel = ({
  category,
  onClose,
  onSelectIntegration,
  theme = 'dark',
}: CategorySidePanelProps) => {
  const [panelSearch, setPanelSearch] = useState('');
  const [copiedExport, setCopiedExport] = useState(false);

  const isLight = theme === 'light';

  const filteredIntegrations = category.integrations.filter((item) =>
    item.toLowerCase().includes(panelSearch.toLowerCase())
  );

  const handleCopyCategoryJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(category, null, 2));
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div className={`w-full rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
      isLight
        ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
        : 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-2xl backdrop-blur-xl'
    }`}>
      {/* Top Accent Line */}
      <div className={`h-1.5 w-full ${isLight ? 'bg-gradient-to-r from-[#0047FF] via-blue-500 to-[#FF4D3D]' : `bg-gradient-to-r ${category.badgeColor}`}`} />

      {/* Header Section */}
      <div className={`p-5 sm:p-6 border-b ${isLight ? 'border-slate-100 bg-slate-50/60' : 'border-slate-800/80 bg-slate-950/40'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-inner shrink-0 ${
              isLight 
                ? 'bg-blue-50 border-blue-200 text-[#0047FF]' 
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}>
              {getCategoryIcon(category.id, "w-6 h-6")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                  isLight 
                    ? 'text-[#0047FF] bg-blue-50 border-blue-200' 
                    : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                }`}>
                  <Sparkles className="w-3 h-3" /> Selected Domain
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
                  #{category.id}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {category.name}
              </h3>
            </div>
          </div>

          {/* Close Sidebar Panel Button */}
          <button
            onClick={onClose}
            className={`rounded-xl p-2 transition-colors shrink-0 ${
              isLight ? 'text-slate-400 hover:bg-slate-200 hover:text-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Deselect category"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {category.description}
        </p>

        {/* In-Panel Search */}
        <div className="relative mt-3.5">
          <Search className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type="text"
            placeholder={`Search ${category.name} integrations...`}
            value={panelSearch}
            onChange={(e) => setPanelSearch(e.target.value)}
            className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 transition-all shadow-inner ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#0047FF] focus:ring-blue-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {panelSearch && (
            <button
              onClick={() => setPanelSearch('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase ${
                isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-400 hover:text-white'
              }`}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Panel Integrations List */}
      <div className="p-5 sm:p-6 space-y-3 max-h-[460px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
        <div className={`flex items-center justify-between text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
            <Layers className={`w-3.5 h-3.5 ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`} />
            Integrations ({filteredIntegrations.length} / {category.integrations.length})
          </span>
          <span className={`text-[10px] font-mono flex items-center gap-1 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </span>
        </div>

        {filteredIntegrations.length === 0 ? (
          <div className={`py-8 text-center border border-dashed rounded-2xl p-4 ${
            isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-800 bg-slate-950/50'
          }`}>
            <Search className={`w-6 h-6 mx-auto mb-1.5 ${isLight ? 'text-slate-400' : 'text-slate-600'}`} />
            <p className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>No integrations match "{panelSearch}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
            {filteredIntegrations.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectIntegration(item, category.name)}
                className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm ${
                  isLight
                    ? 'bg-slate-50/80 border-slate-200 hover:border-[#0047FF] hover:shadow-blue-500/10 hover:bg-blue-50/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold text-xs border group-hover:scale-105 transition-transform ${
                      isLight
                        ? 'bg-blue-50 border-blue-200 text-[#0047FF]'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    }`}>
                      {item.charAt(0)}
                    </div>
                    <span className={`font-bold text-xs transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-[#0047FF]' : 'text-slate-100 group-hover:text-indigo-300'
                    }`}>
                      {item}
                    </span>
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 transition-colors ${
                    isLight ? 'text-slate-400 group-hover:text-[#0047FF]' : 'text-slate-500 group-hover:text-indigo-400'
                  }`} />
                </div>

                <div className={`flex items-center justify-between text-[10px] pt-1.5 border-t ${
                  isLight ? 'border-slate-200/80 text-slate-500' : 'border-slate-800/60 text-slate-400'
                }`}>
                  <span className={`inline-flex items-center gap-1 font-mono ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                  <span className={`font-medium px-1.5 py-0.2 rounded border ${
                    isLight ? 'bg-white text-slate-600 border-slate-200' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    REST / API
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
        isLight ? 'border-slate-200 bg-slate-50/80' : 'border-slate-800 bg-slate-950/80'
      }`}>
        <button
          onClick={handleCopyCategoryJSON}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isLight
              ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedExport ? 'Copied JSON!' : 'Export Category JSON'}
        </button>

        <button
          onClick={onClose}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-colors shadow ${
            isLight
              ? 'bg-[#0047FF] hover:bg-blue-700'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          Close Sidebar
        </button>
      </div>
    </div>
  );
};
