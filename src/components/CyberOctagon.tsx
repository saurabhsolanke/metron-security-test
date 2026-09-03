import { useState, useMemo } from 'react';
import type { CategoryData } from '../data/platformsData';
import { 
  ShieldAlert, 
  Cloud, 
  MailCheck, 
  Cpu, 
  Server, 
  Workflow, 
  Database, 
  Lock,
  Shield,
  Layers,
  Sparkles,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface CyberOctagonProps {
  categories: CategoryData[];
  selectedCategory: CategoryData | null;
  onSelectCategory: (category: CategoryData | null) => void;
  onSelectIntegration?: (integrationName: string, categoryName: string) => void;
  searchQuery: string;
  onOpenGoldenRuleModal: () => void;
  theme?: 'dark' | 'light';
}

export const getCategoryIcon = (id: string, className: string = "w-5 h-5") => {
  switch (id) {
    case 'threat-intel': return <ShieldAlert className={className} />;
    case 'cspm': return <Cloud className={className} />;
    case 'email-security': return <MailCheck className={className} />;
    case 'cnapp': return <Cpu className={className} />;
    case 'it-ops': return <Server className={className} />;
    case 'soar': return <Workflow className={className} />;
    case 'siem': return <Database className={className} />;
    case 'cloud-security': return <Lock className={className} />;
    default: return <Layers className={className} />;
  }
};

export const CyberOctagon = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectIntegration,
  searchQuery,
  onOpenGoldenRuleModal,
  theme = 'dark',
}: CyberOctagonProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isLight = theme === 'light';

  // Dynamic Geometry Canvas Setup
  const size = 640;
  const center = size / 2; // 320

  // MODE 1: Category Overview Mode (8 Security Pillars)
  // MODE 2: Focused Category Mode (Selected Category in Center, ALL its integrations on Perimeter Circle)
  const isFocusedMode = Boolean(selectedCategory);
  
  const perimeterCount = isFocusedMode 
    ? (selectedCategory?.integrations.length || 8)
    : categories.length;

  // Base Uniform Circular Orbit Radius
  const radius = isFocusedMode ? 205 : 190; 
  const innerRadius = 110; 
  const outerRadius = 275;

  // UNIFORM CIRCULAR POINT ENGINE: Computes all vertex points along a single, smooth circular orbit
  const points = useMemo(() => {
    const stepAngle = (360 / Math.max(perimeterCount, 1)) * (Math.PI / 180);

    return Array.from({ length: perimeterCount }).map((_, i) => {
      const angle = i * stepAngle - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, angle };
    });
  }, [perimeterCount, center, radius]);

  // Polygon string for N-gon grid
  const polygonPointsStr = useMemo(() => {
    return points.map(p => `${p.x},${p.y}`).join(' ');
  }, [points]);

  const handleIntegrationClick = (integrationName: string) => {
    if (onSelectIntegration && selectedCategory) {
      onSelectIntegration(integrationName, selectedCategory.name);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full sm:my-6 px-1 sm:px-0 overflow-hidden">
      {/* Background Radar Ambient Glow */}
      <div className="relative w-full max-w-[380px] xs:max-w-[480px] sm:max-w-[660px] md:max-w-[760px] lg:max-w-[820px] aspect-square flex items-center justify-center">
        {/* Glow behind center core */}
        <div className={`absolute h-44 w-44 sm:h-80 sm:w-80 rounded-full blur-3xl animate-pulse pointer-events-none ${
          isLight ? 'bg-blue-400/25' : 'bg-indigo-600/20'
        }`} />
        <div className={`absolute h-72 w-72 sm:h-[450px] sm:w-[450px] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none ${
          isLight ? 'bg-red-400/20' : 'bg-cyan-500/15'
        }`} />

        {/* SVG Circular Dynamic Radar Graphic */}
        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          className={`w-full h-full select-none ${
            isLight ? 'drop-shadow-[0_0_20px_rgba(0,71,255,0.15)]' : 'drop-shadow-[0_0_30px_rgba(99,102,241,0.25)]'
          }`}
        >
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLight ? "#60a5fa" : "#818cf8"} stopOpacity="0.5" />
              <stop offset="50%" stopColor={isLight ? "#93c5fd" : "#a855f7"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isLight ? "#38bdf8" : "#38bdf8"} stopOpacity="0.5" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Radar Circles */}
          <circle cx={center} cy={center} r={outerRadius} fill="none" stroke={isLight ? "#e2e8f0" : "#1e293b"} strokeWidth="1" strokeDasharray="5 7" />
          <circle cx={center} cy={center} r={innerRadius} fill="none" stroke={isLight ? "#cbd5e1" : "#334155"} strokeWidth="1" strokeDasharray="4 5" opacity="0.6" />

          {/* Main Primary Circular Orbit Path */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill={isLight ? "rgba(248, 250, 252, 0.35)" : "rgba(15, 23, 42, 0.35)"}
            stroke={isLight ? "#cbd5e1" : "#334155"}
            strokeWidth="1.5"
            strokeDasharray={isFocusedMode ? "4 4" : "none"}
            className="transition-all duration-500"
          />

          {/* Regular Polygon Connecting Ring */}
          {!isFocusedMode && (
            <polygon
              points={polygonPointsStr}
              fill="none"
              stroke={isLight ? "#93c5fd" : "#475569"}
              strokeWidth="1"
              opacity="0.5"
            />
          )}

          {/* Radiating Spoke Lines from Center Core to Circular Perimeter Nodes */}
          {points.map((p, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <g key={`spoke-${i}`}>
                <line
                  x1={center}
                  y1={center}
                  x2={p.x}
                  y2={p.y}
                  stroke={isFocusedMode || isHovered ? (isLight ? "#93c5fd" : "#818cf8") : (isLight ? "#f1f5f9" : "#1e293b")}
                  strokeWidth={isFocusedMode || isHovered ? "1.5" : "1"}
                  strokeDasharray={isFocusedMode || isHovered ? "none" : "3 3"}
                  opacity={isFocusedMode || isHovered ? "0.75" : "0.35"}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Center Hub */}
        {!selectedCategory ? (
          /* Overview Mode: Zero Trust Core in Center */
          <button
            onClick={onOpenGoldenRuleModal}
            className={`absolute z-20 flex flex-col items-center justify-center h-24 w-24 sm:h-40 sm:w-40 rounded-full border-2 transition-all duration-300 group cursor-pointer ${
              isLight 
                ? 'border-[#0047FF] bg-white shadow-[0_0_25px_rgba(0,71,255,0.25)] hover:scale-105 hover:border-[#FF4D3D]' 
                : 'border-indigo-500/50 bg-slate-900/90 shadow-[0_0_30px_rgba(99,102,241,0.4)] backdrop-blur-xl hover:scale-105 hover:border-indigo-400'
            }`}
            title="Click to view The Golden Rule of Cybersecurity"
          >
            <div className={`relative flex h-8 w-8 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-xl transition-shadow ${
              isLight
                ? 'bg-gradient-to-tr from-[#0047FF] to-[#FF4D3D] shadow-blue-500/30'
                : 'bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-indigo-500/50'
            }`}>
              <Shield className="h-4 w-4 sm:h-7 sm:w-7 animate-pulse" />
            </div>
            <span className={`mt-1 sm:mt-1.5 text-[9px] sm:text-xs font-black tracking-widest uppercase ${
              isLight ? 'text-slate-900 group-hover:text-[#0047FF]' : 'text-slate-200 group-hover:text-indigo-300'
            }`}>
              Zero Trust
            </span>
            <span className={`text-[8px] sm:text-[10px] font-bold flex items-center gap-1 ${
              isLight ? 'text-[#FF4D3D]' : 'text-emerald-400'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full animate-ping ${isLight ? 'bg-[#FF4D3D]' : 'bg-emerald-400'}`} /> Core Hub
            </span>
          </button>
        ) : (
          /* Focused Category Mode: Selected Category in Center Core */
          <div className={`absolute z-20 flex flex-col items-center justify-center h-28 w-28 sm:h-44 sm:w-44 rounded-full border-2 p-2 text-center transition-all duration-300 shadow-2xl animate-fade-in ${
            isLight
              ? 'border-[#0047FF] bg-white text-slate-900 shadow-blue-500/25 ring-4 ring-blue-500/10'
              : 'border-indigo-400 bg-slate-900/95 text-white shadow-indigo-500/50 backdrop-blur-xl ring-4 ring-indigo-500/20'
          }`}>
            <div className={`flex h-7 w-7 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border mb-1 shadow-md ${
              isLight ? 'bg-[#0047FF] border-[#0047FF] text-white' : 'bg-indigo-600 border-indigo-500 text-white'
            }`}>
              {getCategoryIcon(selectedCategory.id, "w-4 h-4 sm:w-6 sm:h-6")}
            </div>
            <span className="text-[11px] sm:text-sm font-black leading-tight line-clamp-1 max-w-[110px] sm:max-w-[130px]">
              {selectedCategory.name}
            </span>
            <span className={`text-[9px] sm:text-xs font-mono font-bold mt-0.5 ${isLight ? 'text-[#0047FF]' : 'text-indigo-300'}`}>
              {selectedCategory.integrations.length} Integrations
            </span>

            {/* Back to All Security Pillars Button */}
            <button
              onClick={() => onSelectCategory(null)}
              className={`mt-1.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold border transition-all active:scale-95 shadow-md ${
                isLight
                  ? 'bg-red-50 text-[#FF4D3D] border-red-200 hover:bg-red-100'
                  : 'bg-indigo-950 text-indigo-300 border-indigo-800 hover:bg-indigo-900 hover:text-white'
              }`}
              title="Return to 8-Pillar Overview"
            >
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> All Pillars
            </button>
          </div>
        )}

        {/* Vertices Nodes Mode 1: 8 Category Pillars (When selectedCategory is null) */}
        {!selectedCategory && points.map((p, i) => {
          const cat = categories[i];
          if (!cat) return null;

          const isHovered = hoveredIndex === i;
          const hasMatch = searchQuery && (
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.integrations.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          const style = {
            left: `${(p.x / size) * 100}%`,
            top: `${(p.y / size) * 100}%`,
            transform: 'translate(-50%, -50%)',
          };

          return (
            <div
              key={cat.id}
              style={style}
              onClick={() => onSelectCategory(cat)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`absolute z-30 flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                isHovered ? 'scale-115' : ''
              }`}
            >
              <div 
                className={`relative flex h-9 w-9 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
                  isHovered
                    ? isLight
                      ? 'border-[#0047FF] bg-[#0047FF] text-white shadow-[0_0_20px_rgba(0,71,255,0.45)] ring-4 ring-blue-400/50'
                      : 'border-indigo-400 bg-indigo-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] ring-4 ring-indigo-500/50'
                    : hasMatch
                    ? isLight
                      ? 'border-[#FF4D3D] bg-red-50 text-[#FF4D3D] animate-bounce'
                      : 'border-amber-400/80 bg-amber-950/40 text-amber-300 animate-bounce'
                    : isLight
                      ? 'border-slate-200 bg-white text-[#0047FF] hover:border-[#0047FF]'
                      : 'border-slate-700/80 bg-slate-900/90 text-slate-300 hover:border-slate-500'
                }`}
              >
                {getCategoryIcon(cat.id, "w-4 h-4 sm:w-7 sm:h-7")}
                
                <span className={`absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 flex h-4 w-4 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[9px] sm:text-xs font-black border shadow-md ${
                  isLight
                    ? 'bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}>
                  {cat.integrations.length}
                </span>
              </div>

              <div 
                className={`mt-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-center backdrop-blur-md transition-all duration-200 max-w-[85px] sm:max-w-[145px] ${
                  isHovered
                    ? isLight
                      ? 'bg-[#0047FF] text-white font-black shadow-lg'
                      : 'bg-indigo-950/95 text-indigo-200 border border-indigo-800 font-black shadow-lg'
                    : isLight
                      ? 'bg-white/95 text-slate-800 text-[10px] sm:text-sm font-bold border border-slate-200 shadow-sm'
                      : 'bg-slate-950/90 text-slate-200 text-[10px] sm:text-sm font-semibold border border-slate-800'
                }`}
              >
                <span className="text-[10px] sm:text-sm tracking-tight truncate block">
                  {cat.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Vertices Nodes Mode 2: ALL Integrations as Sleek Unified Capsule Pills along Circular Orbit */}
        {selectedCategory && selectedCategory.integrations.map((item, i) => {
          const p = points[i];
          if (!p) return null;

          const isHovered = hoveredIndex === i;

          const style = {
            left: `${(p.x / size) * 100}%`,
            top: `${(p.y / size) * 100}%`,
            transform: 'translate(-50%, -50%)',
          };

          return (
            <div
              key={`${item}-${i}`}
              style={style}
              onClick={() => handleIntegrationClick(item)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`absolute z-30 cursor-pointer transition-all duration-300 ${
                isHovered ? 'scale-115 z-40' : 'hover:scale-105'
              }`}
            >
              {/* Unified Capsule Integration Pill (Icon + Name in 1 container) */}
              <div className={`flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-md ${
                isHovered
                  ? isLight
                    ? 'border-[#0047FF] bg-[#0047FF] text-white shadow-lg ring-2 ring-blue-400/40'
                    : 'border-indigo-400 bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500/40'
                  : isLight
                    ? 'border-slate-300 bg-white/95 text-slate-900 hover:border-[#0047FF] shadow-sm'
                    : 'border-slate-700 bg-slate-900/95 text-slate-100 hover:border-indigo-500 shadow-sm'
              }`}>
                {/* Integration Letter Avatar Badge */}
                <div className={`flex h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full font-black text-[9px] xs:text-[10px] sm:text-xs shrink-0 ${
                  isHovered
                    ? 'bg-white text-[#0047FF]'
                    : isLight 
                      ? 'bg-blue-50 text-[#0047FF] border border-blue-200' 
                      : 'bg-slate-800 text-indigo-300 border border-slate-700'
                }`}>
                  {item.charAt(0)}
                </div>

                {/* Integration Full Name */}
                <span className="text-[8px] xs:text-[9.5px] sm:text-xs font-bold whitespace-nowrap tracking-tight">
                  {item}
                </span>

                {/* Green Verified Checkmark */}
                <CheckCircle2 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                  isHovered ? 'text-white' : 'text-emerald-500'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status Bar */}
      {!selectedCategory ? (
        <div className={`mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm border rounded-full px-5 py-2 shadow-sm text-center transition-all ${
          isLight ? 'bg-white text-slate-700 border-slate-200' : 'bg-slate-900/80 text-slate-300 border-slate-800'
        }`}>
          <Sparkles className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`} />
          <span>Click any security domain to move it to the center and display all its integrations</span>
        </div>
      ) : (
        <div className={`mt-4 sm:mt-6 flex items-center justify-between gap-4 text-xs sm:text-sm border rounded-full px-5 py-2 shadow-sm ${
          isLight ? 'bg-white text-slate-700 border-slate-200' : 'bg-slate-900/90 text-slate-300 border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className={`font-black ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`}>
              {selectedCategory.name} Ecosystem
            </span>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-bold ${
              isLight ? 'bg-blue-50 text-[#0047FF] border-blue-200' : 'bg-indigo-950 text-indigo-300 border-indigo-800'
            }`}>
              {selectedCategory.integrations.length} Integrations Arrayed
            </span>
          </div>

          <button
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border transition-all active:scale-95 shadow-sm ${
              isLight
                ? 'bg-red-50 text-[#FF4D3D] border-red-200 hover:bg-red-100'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to 8 Pillars
          </button>
        </div>
      )}
    </div>
  );
};
