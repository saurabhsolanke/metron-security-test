import metronLogo from '../assets/logo.svg';
import { Download, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isLight: boolean;
  toggleTheme: () => void;
  onExportJSON: () => void;
}

export const Header = ({ isLight, toggleTheme, onExportJSON }: HeaderProps) => {
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
      isLight 
        ? 'bg-[#0047FF] border-[#003ad6] text-white shadow-lg shadow-blue-500/10' 
        : 'bg-slate-950/80 border-slate-800/80 text-white'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <img src={metronLogo} alt="Metron Security" className="h-6 sm:h-7 w-auto object-contain" />

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-sm ${
              isLight
                ? 'border-blue-400 bg-white/10 text-white hover:bg-white/20'
                : 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
            }`}
            title="Toggle Light / Dark Theme"
          >
            {isLight ? (
              <>
                <Moon className="h-3.5 w-3.5 text-yellow-200" />
                <span className="hidden sm:inline">Dark Theme</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light Theme</span>
              </>
            )}
          </button>

          {/* Export JSON Button */}
          <button
            onClick={onExportJSON}
            className={`hidden sm:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-sm ${
              isLight
                ? 'border-blue-[#0047FF] bg-white text-[#0047FF] hover:bg-blue-50'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Download className="h-3.5 w-3.5" /> Export JSON
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;