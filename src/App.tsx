import { useState, useMemo } from 'react';
import { platformCategories, type CategoryData } from './data/platformsData';
import { CyberOctagon, getCategoryIcon } from './components/CyberOctagon';
import { IntegrationSidePanel } from './components/IntegrationSidePanel';
import { GoldenRuleModal } from './components/GoldenRuleBanner';
import { CategoryCard } from './components/CategoryCard';
import { IntegrationDetailModal } from './components/IntegrationDetailModal';
import metronLogo from './assets/logo.svg';
import { 
  Search, 
  Grid, 
  List, 
  Download, 
  Activity,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  
  // Selected Category for the big Octagon Matrix Wheel
  const [selectedCategoryForOctagon, setSelectedCategoryForOctagon] = useState<CategoryData | null>(null);

  // Selected Integration state for In-Page Details Side Panel
  const [selectedIntegrationForPanel, setSelectedIntegrationForPanel] = useState<{ name: string; category: string } | null>(null);

  const [isGoldenRuleModalOpen, setIsGoldenRuleModalOpen] = useState(false);
  const [selectedIntegrationModal, setSelectedIntegrationModal] = useState<string | null>(null);
  const [selectedIntegrationModalCat, setSelectedIntegrationModalCat] = useState<string>('');
  const [viewMode, setViewMode] = useState<'octagon' | 'grid' | 'table'>('octagon');

  const isLight = theme === 'light';

  // Stats calculation
  const totalIntegrations = useMemo(() => {
    return platformCategories.reduce((acc, cat) => acc + cat.integrations.length, 0);
  }, []);

  // Filtered categories based on search and category filter
  const filteredCategories = useMemo(() => {
    return platformCategories.filter((cat) => {
      const matchesCategory = selectedCategoryFilter === 'all' || cat.id === selectedCategoryFilter;
      if (!matchesCategory) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return cat.name.toLowerCase().includes(q) || cat.integrations.some((i) => i.toLowerCase().includes(q));
    });
  }, [searchQuery, selectedCategoryFilter]);

  const handleSelectCategory = (category: CategoryData | null) => {
    setSelectedCategoryForOctagon(category);
    // Selecting a category does NOT open the side panel — keeps Octagon BIG!
    setSelectedIntegrationForPanel(null);
  };

  const handleSelectIntegration = (integrationName: string, categoryName: string) => {
    if (window.innerWidth < 640) {
      setSelectedIntegrationModal(integrationName);
      setSelectedIntegrationModalCat(categoryName);
    } else {
      // ON DESKTOP: Clicking an integration opens the Integration Details Side Panel!
      setSelectedIntegrationForPanel({ name: integrationName, category: categoryName });
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(platformCategories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "platform_integrations.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Background Decorative Ambient Glows */}
      <div className={`fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full blur-[140px] pointer-events-none ${
        isLight ? 'bg-blue-300/30' : 'bg-indigo-600/10'
      }`} />
      <div className={`fixed top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full blur-[140px] pointer-events-none ${
        isLight ? 'bg-red-300/20' : 'bg-cyan-500/10'
      }`} />

      {/* Header Bar */}
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
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
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
              onClick={handleExportJSON}
              className={`hidden sm:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-sm ${
                isLight
                  ? 'border-blue-400 bg-white text-[#0047FF] hover:bg-blue-50'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Download className="h-3.5 w-3.5" /> Export JSON
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        
        {/* Controls: Search Bar & View Mode Switcher */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Global Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search across 8 security domains & integrations (e.g., Wiz, Splunk, Okta, Qualys)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-all shadow-inner ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0047FF] focus:ring-blue-500/20'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className={`flex items-center gap-1 rounded-xl border p-1 self-start md:self-auto ${
              isLight ? 'border-slate-300 bg-white shadow-sm' : 'border-slate-800 bg-slate-900/80'
            }`}>
              <button
                onClick={() => setViewMode('octagon')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'octagon'
                    ? isLight ? 'bg-[#0047FF] text-white shadow' : 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Activity className="h-3.5 w-3.5 inline mr-1" /> Octagon Radar
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? isLight ? 'bg-[#0047FF] text-white shadow' : 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="h-3.5 w-3.5 inline mr-1" /> Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? isLight ? 'bg-[#0047FF] text-white shadow' : 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="h-3.5 w-3.5 inline mr-1" /> Table
              </button>
            </div>
          </div>

          {/* Quick-Access Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                handleSelectCategory(null);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap border ${
                selectedCategoryFilter === 'all' && !selectedCategoryForOctagon
                  ? isLight ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-sm' : 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : isLight ? 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              All Domains
            </button>
            {platformCategories.map((cat) => {
              const isSelected = selectedCategoryForOctagon?.id === cat.id || selectedCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryFilter(cat.id);
                    handleSelectCategory(cat);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap border ${
                    isSelected
                      ? isLight ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-sm' : 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : isLight ? 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {getCategoryIcon(cat.id, "w-3.5 h-3.5")}
                  <span>{cat.name}</span>
                  <span className="ml-1 text-[10px] opacity-75 font-mono">({cat.integrations.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode: BIG Octagon Matrix (Full Width stage, Side Panel appears ONLY on Integration Click) */}
        {viewMode === 'octagon' && (
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-start transition-all duration-500 ease-in-out">
              
              {/* Octagon Main Container (Full width when no integration is clicked) */}
              <div className={`w-full rounded-3xl border p-4 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out ${
                selectedIntegrationForPanel ? 'lg:w-[61.8%] shrink-0' : 'w-full'
              } ${
                isLight ? 'bg-white border-slate-200 shadow-slate-200/60' : 'bg-slate-900/40 border-slate-800/80 shadow-2xl'
              }`}>
                <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedCategoryForOctagon ? `${selectedCategoryForOctagon.name} Ecosystem` : '8-Pillar Security Integration Wheel'}
                  </h2>
                  <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {selectedCategoryForOctagon 
                      ? `Click any perimeter integration node to view its technical specs side panel.` 
                      : 'Click any domain on the Octagon matrix to place it in the center and display all its integrations.'}
                  </p>
                </div>

                {/* Big Cyber Octagon Visual */}
                <CyberOctagon
                  categories={platformCategories}
                  selectedCategory={selectedCategoryForOctagon}
                  onSelectCategory={handleSelectCategory}
                  onSelectIntegration={handleSelectIntegration}
                  searchQuery={searchQuery}
                  onOpenGoldenRuleModal={() => setIsGoldenRuleModalOpen(true)}
                  theme={theme}
                />

                {/* SUMMARY DOMAIN GRID (Shown when no category is selected) */}
                {!selectedCategoryForOctagon && (
                  <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 transition-all duration-300">
                    {platformCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat)}
                        className={`group flex items-center justify-between p-3 rounded-2xl border transition-all text-left shadow-sm ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 hover:border-[#0047FF] hover:bg-blue-50/50'
                            : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-indigo-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-xl border group-hover:scale-105 transition-transform ${
                            isLight ? 'bg-white border-slate-200 text-[#0047FF]' : 'bg-slate-900 border-slate-800 text-indigo-400'
                          }`}>
                            {getCategoryIcon(cat.id, "w-4 h-4")}
                          </div>
                          <div>
                            <div className={`text-xs font-bold transition-colors ${
                              isLight ? 'text-slate-900 group-hover:text-[#0047FF]' : 'text-white group-hover:text-indigo-300'
                            }`}>
                              {cat.name}
                            </div>
                            <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {cat.integrations.length} integrations
                            </div>
                          </div>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all ${
                          isLight ? 'text-slate-400 group-hover:text-[#0047FF]' : 'text-slate-600 group-hover:text-indigo-400'
                        }`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Integration Specs Side Panel (Appears ONLY when an Integration is clicked) */}
              {selectedIntegrationForPanel && (
                <div className="hidden sm:block w-full lg:w-[38.2%] shrink-0 animate-fade-in transition-all duration-300">
                  <IntegrationSidePanel
                    integrationName={selectedIntegrationForPanel.name}
                    categoryName={selectedIntegrationForPanel.category}
                    onClose={() => setSelectedIntegrationForPanel(null)}
                    theme={theme}
                  />
                </div>
              )}

            </div>
          </div>
        )}

        {/* View Mode: Card Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                searchQuery={searchQuery}
                onSelectIntegration={handleSelectIntegration}
                theme={theme}
              />
            ))}
          </div>
        )}

        {/* View Mode: Table View */}
        {viewMode === 'table' && (
          <div className={`overflow-x-auto rounded-3xl border shadow-xl backdrop-blur-xl transition-colors ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <table className="w-full text-left text-sm">
              <thead className={`text-xs font-semibold uppercase tracking-wider border-b ${
                isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-950/90 text-slate-400 border-slate-800'
              }`}>
                <tr>
                  <th className="px-6 py-4">Security Domain</th>
                  <th className="px-6 py-4">Integrations Ecosystem ({totalIntegrations})</th>
                  <th className="px-6 py-4 text-right">Count</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {filteredCategories.map((cat) => {
                  const matches = cat.integrations.filter((i) =>
                    !searchQuery || i.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  if (matches.length === 0) return null;
                  return (
                    <tr key={cat.id} className={`transition-colors ${
                      isLight ? 'hover:bg-blue-50/40' : 'hover:bg-slate-800/40'
                    }`}>
                      <td className={`px-6 py-4 font-semibold whitespace-nowrap ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                            isLight ? 'bg-blue-50 border-blue-200 text-[#0047FF]' : 'bg-slate-900 border-slate-800 text-indigo-400'
                          }`}>
                            {getCategoryIcon(cat.id, "w-4 h-4")}
                          </div>
                          {cat.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {matches.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelectIntegration(item, cat.name)}
                              className={`rounded-md px-2 py-0.5 text-xs border transition-colors ${
                                isLight
                                  ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0047FF] hover:text-[#0047FF]'
                                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-indigo-500 hover:text-white'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-right font-mono text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {matches.length}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleSelectCategory(cat)}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                            isLight
                              ? 'bg-blue-50 text-[#0047FF] border-blue-200 hover:bg-[#0047FF] hover:text-white'
                              : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                          }`}
                        >
                          View Domain
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="my-16 text-center">
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <Search className="h-6 w-6" />
            </div>
            <h3 className={`mt-4 text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>No integrations found</h3>
            <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              No security domains matched your search query "<span className={`font-semibold ${isLight ? 'text-[#0047FF]' : 'text-indigo-400'}`}>{searchQuery}</span>".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryFilter('all');
              }}
              className={`mt-4 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-colors shadow-lg ${
                isLight ? 'bg-[#0047FF] hover:bg-blue-700 shadow-blue-500/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
              }`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Golden Rule Modal */}
      <GoldenRuleModal
        isOpen={isGoldenRuleModalOpen}
        onClose={() => setIsGoldenRuleModalOpen(false)}
        theme={theme}
      />

      {/* Integration Detail Inspection Modal (Mobile) */}
      <IntegrationDetailModal
        integration={selectedIntegrationModal}
        categoryName={selectedIntegrationModalCat}
        onClose={() => setSelectedIntegrationModal(null)}
        theme={theme}
      />
    </div>
  );
}
