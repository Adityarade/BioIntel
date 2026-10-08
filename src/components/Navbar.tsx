import React from 'react';
import { Dna, Search, Compass, Share2, BarChart2, Info, History, Database } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHistory: () => void;
  onOpenDatasetManager: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHistory,
  onOpenDatasetManager,
  historyCount
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'graph', label: 'Knowledge Graph', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-900 text-cyan-300 flex items-center justify-center shadow-sm group-hover:bg-blue-800 transition-colors">
            <Dna className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900">BioIntel</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/60">
              BIO · IR Engine
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-blue-900 bg-blue-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors relative"
            title="Search History"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="font-mono text-[10px] bg-blue-900 text-white rounded-full px-1.5 py-0.2 leading-tight">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenDatasetManager}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow-xs transition-colors whitespace-nowrap"
          >
            <Database className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Dataset & CSV</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50/80 px-4 py-2 flex items-center justify-around overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                isActive ? 'text-blue-900 bg-white font-semibold shadow-xs' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
