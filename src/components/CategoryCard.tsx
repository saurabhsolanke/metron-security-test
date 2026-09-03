import type { CategoryData } from '../data/platformsData';
import { getCategoryIcon } from './CyberOctagon';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryData;
  searchQuery: string;
  onSelectIntegration: (integration: string, categoryName: string) => void;
  theme?: 'dark' | 'light';
}

export const CategoryCard = ({
  category,
  searchQuery,
  onSelectIntegration,
  theme = 'dark',
}: CategoryCardProps) => {
  const isLight = theme === 'light';

  const filteredIntegrations = category.integrations.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filteredIntegrations.length === 0) {
    return null;
  }

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 shadow-sm ${
      isLight
        ? 'border-slate-200 bg-white hover:border-[#0047FF] hover:shadow-xl hover:shadow-blue-500/10'
        : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5'
    }`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isLight ? 'bg-gradient-to-r from-[#0047FF] to-[#FF4D3D]' : `bg-gradient-to-r ${category.badgeColor}`
      }`} />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-inner group-hover:scale-105 transition-transform ${
              isLight 
                ? 'bg-blue-50 border-blue-200 text-[#0047FF]' 
                : 'bg-slate-800/80 border-slate-700/50 text-indigo-400'
            }`}>
              {getCategoryIcon(category.id, "w-5 h-5")}
            </div>
            <div>
              <h3 className={`font-bold text-lg transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-[#0047FF]' : 'text-white group-hover:text-indigo-300'
              }`}>
                {category.name}
              </h3>
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {category.integrations.length} Integrations
              </span>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold border ${
            isLight
              ? 'bg-slate-100 text-slate-700 border-slate-200'
              : 'bg-slate-800/80 text-slate-300 border-slate-700/60'
          }`}>
            {filteredIntegrations.length} match{filteredIntegrations.length === 1 ? '' : 'es'}
          </span>
        </div>

        {/* Description */}
        <p className={`text-xs mb-5 line-clamp-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {category.description}
        </p>

        {/* Integrations List */}
        <div className="flex flex-wrap gap-1.5">
          {filteredIntegrations.map((item, idx) => {
            const isMatched = searchQuery && item.toLowerCase().includes(searchQuery.toLowerCase());
            return (
              <button
                key={idx}
                onClick={() => onSelectIntegration(item, category.name)}
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 cursor-pointer border ${
                  isMatched
                    ? isLight
                      ? 'bg-blue-100 text-[#0047FF] border-blue-300 font-bold'
                      : 'bg-indigo-500/20 text-indigo-200 border-indigo-500/40 ring-1 ring-indigo-500/30'
                    : isLight
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-[#0047FF] hover:border-blue-200'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs transition-colors ${
        isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/60 text-slate-400 group-hover:text-slate-200'
      }`}>
        <span className={`font-medium ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>Category ID: #{category.id}</span>
        <span className={`flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform ${
          isLight ? 'text-[#0047FF]' : 'text-indigo-400'
        }`}>
          Explore category <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
