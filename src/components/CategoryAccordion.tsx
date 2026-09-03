import { useState } from 'react';
import type { CategoryData } from '../data/platformsData';
import { getCategoryIcon } from './CyberOctagon';
import { 
  ChevronDown, 
  Search, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowUp,
  Copy,
  Check
} from 'lucide-react';

interface CategoryAccordionProps {
  categories: CategoryData[];
  selectedCategoryId: string | null;
  onToggleCategory: (id: string) => void;
  onSelectIntegration: (integrationName: string, categoryName: string) => void;
  searchQuery: string;
  theme?: 'dark' | 'light';
}

export const CategoryAccordion = ({
  categories,
  selectedCategoryId,
  onToggleCategory,
  onSelectIntegration,
  searchQuery,
  theme = 'dark',
}: CategoryAccordionProps) => {
  const [accordionSearch, setAccordionSearch] = useState<{ [key: string]: string }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isLight = theme === 'light';

  const handleCopyCategoryJSON = (cat: CategoryData, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(cat, null, 2));
    setCopiedId(cat.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToOctagonWheel = () => {
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-3 my-6 sm:hidden">
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className={`text-sm font-extrabold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <Layers className={`w-4 h-4 ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`} />
          Security Domains Accordion
        </h3>
        <button
          onClick={scrollToOctagonWheel}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-all ${
            isLight
              ? 'bg-blue-50 text-[#0047FF] border-blue-200 active:scale-95'
              : 'bg-indigo-950/80 text-indigo-300 border-indigo-800 active:scale-95'
          }`}
        >
          <ArrowUp className="w-3 h-3" /> Octagon Wheel
        </button>
      </div>

      {categories.map((cat) => {
        const isExpanded = selectedCategoryId === cat.id;
        const currentSearch = accordionSearch[cat.id] || '';
        
        const filteredIntegrations = cat.integrations.filter((item) =>
          item.toLowerCase().includes(currentSearch.toLowerCase()) ||
          (searchQuery && item.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        return (
          <div
            key={cat.id}
            id={`accordion-${cat.id}`}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
              isExpanded
                ? isLight
                  ? 'border-[#0047FF] bg-white ring-1 ring-blue-500/20'
                  : 'border-indigo-500/60 bg-slate-900/90 ring-1 ring-indigo-500/30'
                : isLight
                  ? 'border-slate-200 bg-white hover:border-slate-300'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
            }`}
          >
            {/* Accordion Header Bar */}
            <button
              onClick={() => onToggleCategory(cat.id)}
              className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border shrink-0 ${
                  isExpanded
                    ? isLight
                      ? 'bg-[#0047FF] border-[#0047FF] text-white'
                      : 'bg-indigo-600 border-indigo-500 text-white'
                    : isLight
                      ? 'bg-blue-50 border-blue-200 text-[#0047FF]'
                      : 'bg-slate-900 border-slate-800 text-indigo-400'
                }`}>
                  {getCategoryIcon(cat.id, "w-4 h-4")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {cat.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {cat.integrations.length}
                    </span>
                  </div>
                  <p className={`text-[10px] line-clamp-1 mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {cat.description}
                  </p>
                </div>
              </div>

              <ChevronDown className={`w-4 h-4 transition-transform duration-300 shrink-0 ${
                isExpanded ? 'rotate-180 text-indigo-400' : isLight ? 'text-slate-400' : 'text-slate-500'
              }`} />
            </button>

            {/* Accordion Expanded Body */}
            {isExpanded && (
              <div className={`p-3.5 border-t space-y-3 animate-fade-in ${
                isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800/80 bg-slate-950/50'
              }`}>
                {/* Domain Tagline */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`inline-flex items-center gap-1 font-semibold ${
                    isLight ? 'text-[#0047FF]' : 'text-indigo-400'
                  }`}>
                    <Sparkles className="w-3 h-3" /> Configured Platform Integrations
                  </span>
                  <span className={`font-mono flex items-center gap-1 ${
                    isLight ? 'text-emerald-600' : 'text-emerald-400'
                  }`}>
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>

                {/* Internal Search within Category */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
                    isLight ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="text"
                    placeholder={`Search inside ${cat.name}...`}
                    value={currentSearch}
                    onChange={(e) => setAccordionSearch({ ...accordionSearch, [cat.id]: e.target.value })}
                    className={`w-full rounded-xl border py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 transition-all ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0047FF] focus:ring-blue-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>

                {/* Integration Grid Items */}
                {filteredIntegrations.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-3">No integrations match query</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1 max-h-64 overflow-y-auto pr-1">
                    {filteredIntegrations.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => onSelectIntegration(item, cat.name)}
                        className={`group flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all active:scale-95 ${
                          isLight
                            ? 'bg-white border-slate-200 hover:border-[#0047FF] hover:bg-blue-50/50'
                            : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate pr-1">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-lg font-bold text-[10px] border shrink-0 ${
                            isLight
                              ? 'bg-blue-50 border-blue-200 text-[#0047FF]'
                              : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                          }`}>
                            {item.charAt(0)}
                          </div>
                          <span className={`text-[11px] font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                            {item}
                          </span>
                        </div>
                        <ExternalLink className={`w-3 h-3 shrink-0 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Action Bar with Scroll to Octagon Button */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-200/50 dark:border-slate-800/50">
                  <button
                    onClick={scrollToOctagonWheel}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      isLight
                        ? 'border-blue-200 bg-blue-50 text-[#0047FF] hover:bg-blue-100'
                        : 'border-indigo-800 bg-indigo-950/70 text-indigo-300 hover:bg-indigo-900'
                    }`}
                  >
                    <ArrowUp className="w-3 h-3" /> Back to Octagon
                  </button>

                  <button
                    onClick={(e) => handleCopyCategoryJSON(cat, e)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {copiedId === cat.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copiedId === cat.id ? 'Copied' : 'JSON'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
