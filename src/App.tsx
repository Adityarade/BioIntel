import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { SearchPage } from './components/SearchPage';
import { ExplorePage } from './components/ExplorePage';
import { KnowledgeGraphPage } from './components/KnowledgeGraphPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { AboutPage } from './components/AboutPage';
import { PaperModal } from './components/PaperModal';
import { DatasetManagerModal } from './components/DatasetManagerModal';
import { SearchHistoryDrawer } from './components/SearchHistoryDrawer';
import { dataService } from './services/dataService';
import { SearchFilters, SearchResultItem, Paper, SystemStats } from './types';
import { Dna, Shield, Github, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [exploreInitialSubTab, setExploreInitialSubTab] = useState<string>('genes');

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('BRCA1 breast cancer');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0);
  const [detectedQueryEntities, setDetectedQueryEntities] = useState<string[]>([]);

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>({
    entityType: 'All',
    year: 'All',
    rankingMethod: 'Hybrid',
    sortBy: 'Relevance',
    weights: {
      tfidf: 0.35,
      bm25: 0.35,
      semantic: 0.30
    }
  });

  // Modal & Drawer State
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState<boolean>(false);

  // Dynamic system stats
  const [stats, setStats] = useState<SystemStats>(dataService.getStats());

  // Run search
  const runSearch = useCallback((overrideQuery?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : searchQuery;
    if (!q.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      setDetectedQueryEntities([]);
      return;
    }

    const output = dataService.search(q, filters);
    setSearchResults(output.results);
    setTotalResults(output.total);
    setExecutionTimeMs(output.elapsedMs);
    setDetectedQueryEntities(output.queryEntities);
  }, [searchQuery, filters]);

  // Initial search on first load
  useEffect(() => {
    runSearch('BRCA1 breast cancer');
  }, []);

  const handleHomeSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
    runSearch(query);
  };

  const handleNavigateTab = (tab: string, subSection?: string) => {
    if (tab === 'explore' && subSection) {
      setExploreInitialSubTab(subSection);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDataChanged = () => {
    setStats(dataService.getStats());
    runSearch();
  };

  const handleSearchEntity = (term: string) => {
    setSearchQuery(term);
    setActiveTab('search');
    runSearch(term);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-cyan-100 selection:text-cyan-950">
      {/* 3-zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenDatasetManager={() => setIsDatasetModalOpen(true)}
        historyCount={dataService.searchHistory.length}
      />

      {/* Main Container Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <Home
            stats={stats}
            onSearch={handleHomeSearch}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {activeTab === 'search' && (
          <SearchPage
            query={searchQuery}
            setQuery={setSearchQuery}
            searchResults={searchResults}
            totalResults={totalResults}
            executionTimeMs={executionTimeMs}
            detectedQueryEntities={detectedQueryEntities}
            filters={filters}
            setFilters={setFilters}
            onExecuteSearch={runSearch}
            onViewPaper={(p) => setSelectedPaper(p)}
            onSelectEntityForExplore={(term) => {
              handleSearchEntity(term);
            }}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            genes={dataService.genes}
            diseases={dataService.diseases}
            proteins={dataService.proteins}
            drugs={dataService.drugs}
            papers={dataService.papers}
            initialSubTab={exploreInitialSubTab}
            onSearchEntity={handleSearchEntity}
            onViewPaper={(p) => setSelectedPaper(p)}
          />
        )}

        {activeTab === 'graph' && (
          <KnowledgeGraphPage
            relationships={dataService.relationships}
            onSearchEntity={handleSearchEntity}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage
            stats={stats}
            papers={dataService.papers}
            genes={dataService.genes}
            diseases={dataService.diseases}
            relationships={dataService.relationships}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Scientific Platform Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-900 flex items-center justify-center text-cyan-400">
              <Dna className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-900">BioIntel</span>
            <span className="text-slate-400">·</span>
            <span>Bioinformatics + Information Retrieval Laboratory Mini-Project</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>TF-IDF · Okapi BM25 · Semantic Cosine · Knowledge Graph</span>
            <span>·</span>
            <span className="font-mono text-slate-400">v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <PaperModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onSelectPaper={(p) => setSelectedPaper(p)}
        onSearchEntity={handleSearchEntity}
      />

      <DatasetManagerModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        onDataChanged={handleDataChanged}
      />

      <SearchHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={dataService.searchHistory}
        onSelectQuery={(q) => {
          setSearchQuery(q);
          setActiveTab('search');
          runSearch(q);
        }}
        onClearHistory={() => {
          dataService.clearHistory();
          setStats(dataService.getStats());
        }}
      />
    </div>
  );
}
