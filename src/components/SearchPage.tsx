import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, ChevronDown, ChevronUp, ExternalLink,
  BookOpen, Sparkles, HelpCircle, Dna, Activity, Layers, Pill,
  CheckCircle2, RefreshCw, X
} from 'lucide-react';
import { SearchResultItem, SearchFilters, Paper, DetectedEntity } from '../types';
import { BIOMEDICAL_VOCABULARY } from '../services/entityExtractor';

interface SearchPageProps {
  query: string;
  setQuery: (q: string) => void;
  searchResults: SearchResultItem[];
  totalResults: number;
  executionTimeMs: number;
  detectedQueryEntities: string[];
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onExecuteSearch: (q?: string) => void;
  onViewPaper: (paper: Paper) => void;
  onSelectEntityForExplore?: (entityName: string, entityType: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  query,
  setQuery,
  searchResults,
  totalResults,
  executionTimeMs,
  detectedQueryEntities,
  filters,
  setFilters,
  onExecuteSearch,
  onViewPaper,
  onSelectEntityForExplore
}) => {
  const [expandedWhyDocId, setExpandedWhyDocId] = useState<number | null>(null);
  const [showWeightSliders, setShowWeightSliders] = useState<boolean>(false);

  const sampleQueries = [
    "BRCA1 breast cancer",
    "insulin resistance diabetes",
    "APOE Alzheimer's",
    "EGFR cancer",
    "DNA repair genes"
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSearch();
  };

  const handleSuggestionClick = (sq: string) => {
    setQuery(sq);
    onExecuteSearch(sq);
  };

  const toggleWhy = (docId: number) => {
    setExpandedWhyDocId(prev => (prev === docId ? null : docId));
  };

  const renderHighlightedSnippet = (text: string, entities: DetectedEntity[], matchedTerms: string[]) => {
    if (!text) return null;
    const snippet = text.length > 280 ? text.substring(0, 280) + '...' : text;

    // Simple word boundary highlight for matched query terms and entities
    const words = snippet.split(/(\s+)/);
    const matchedLower = new Set(matchedTerms.map(t => t.toLowerCase()));

    return (
      <p className="text-sm text-slate-700 leading-relaxed">
        {words.map((word, wIdx) => {
          const cleanWord = word.toLowerCase().replace(/[^a-z0-9-]/g, '');
          const isMatched = cleanWord && matchedLower.has(cleanWord);
          
          if (isMatched) {
            return (
              <span key={wIdx} className="bg-yellow-100 text-yellow-900 font-semibold px-0.5 rounded">
                {word}
              </span>
            );
          }

          // Check if it matches any entity
          const entMatch = entities.find(e => e.text.toLowerCase() === cleanWord);
          if (entMatch) {
            const style = BIOMEDICAL_VOCABULARY[entMatch.type];
            return (
              <span
                key={wIdx}
                className="font-medium underline decoration-dotted cursor-pointer"
                style={{ color: style.color }}
                title={`${entMatch.type}: ${entMatch.canonical || entMatch.text}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectEntityForExplore) {
                    onSelectEntityForExplore(entMatch.canonical || entMatch.text, entMatch.type);
                  }
                }}
              >
                {word}
              </span>
            );
          }

          return word;
        })}
      </p>
    );
  };

  return (
    <div className="space-y-6 py-6">
      {/* Search Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biomedical queries (e.g. 'BRCA1 breast cancer', 'APOE Alzheimer')..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Quick query recommendation chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Suggestions:</span>
          {sampleQueries.map((sq) => (
            <button
              key={sq}
              onClick={() => handleSuggestionClick(sq)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-md border border-slate-200/80 transition-colors cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Detected Query Entities Ribbon */}
        {detectedQueryEntities.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Detected Query Entities:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {detectedQueryEntities.map((ent, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-[11px]"
                >
                  {ent}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Controls & Parameter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Entity Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Entity:</span>
            <select
              value={filters.entityType}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, entityType: e.target.value }));
                onExecuteSearch();
              }}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="GENE">Gene</option>
              <option value="DISEASE">Disease</option>
              <option value="PROTEIN">Protein</option>
              <option value="DRUG">Drug</option>
            </select>
          </div>

          {/* Publication Year Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Year:</span>
            <select
              value={filters.year}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, year: e.target.value }));
                onExecuteSearch();
              }}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Ranking Method Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Ranking Model:</span>
            <select
              value={filters.rankingMethod}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, rankingMethod: e.target.value as any }));
                onExecuteSearch();
              }}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-semibold text-blue-900 focus:outline-none cursor-pointer"
            >
              <option value="Hybrid">Hybrid (TF-IDF + BM25 + Semantic)</option>
              <option value="BM25">Okapi BM25</option>
              <option value="TF-IDF">TF-IDF Cosine</option>
              <option value="Semantic">Semantic Concept Similarity</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, sortBy: e.target.value as any }));
                onExecuteSearch();
              }}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Relevance">Relevance</option>
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Sliders toggle */}
        {filters.rankingMethod === 'Hybrid' && (
          <button
            type="button"
            onClick={() => setShowWeightSliders(!showWeightSliders)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-900 px-2 py-1 rounded bg-slate-50 border border-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Tune Hybrid Weights</span>
            {showWeightSliders ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Hybrid Weight Fine-Tuning Drawer */}
      {showWeightSliders && filters.rankingMethod === 'Hybrid' && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-700 font-semibold">
            <span>Hybrid Formula Weights (Normalized dynamically to 100%)</span>
            <span className="font-mono text-slate-500">
              w_tfidf: {filters.weights.tfidf} · w_bm25: {filters.weights.bm25} · w_sem: {filters.weights.semantic}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>TF-IDF Weight</span>
                <span className="font-mono">{filters.weights.tfidf}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={filters.weights.tfidf}
                onChange={(e) => {
                  setFilters(prev => ({
                    ...prev,
                    weights: { ...prev.weights, tfidf: parseFloat(e.target.value) }
                  }));
                  onExecuteSearch();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>BM25 Weight</span>
                <span className="font-mono">{filters.weights.bm25}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={filters.weights.bm25}
                onChange={(e) => {
                  setFilters(prev => ({
                    ...prev,
                    weights: { ...prev.weights, bm25: parseFloat(e.target.value) }
                  }));
                  onExecuteSearch();
                }}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Semantic Weight</span>
                <span className="font-mono">{filters.weights.semantic}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={filters.weights.semantic}
                onChange={(e) => {
                  setFilters(prev => ({
                    ...prev,
                    weights: { ...prev.weights, semantic: parseFloat(e.target.value) }
                  }));
                  onExecuteSearch();
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          <span className="font-semibold text-slate-900 font-mono text-sm tabular-nums">
            {totalResults}
          </span>{' '}
          biomedical results retrieved
          {query && <span> for &ldquo;<strong className="text-slate-800">{query}</strong>&rdquo;</span>}
        </div>
        <div className="font-mono text-slate-400">
          Latency: <span className="text-slate-700">{executionTimeMs} ms</span> · Engine: {filters.rankingMethod}
        </div>
      </div>

      {/* Search Results List */}
      {searchResults.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching research papers found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search terms, relaxing entity/year filters, or trying one of the suggested biomedical queries above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((paper) => {
            const isWhyExpanded = expandedWhyDocId === paper.id;
            const relevancePct = Math.round(paper.relevanceScore * 100);

            // Group detected entities by type
            const geneEntities = Array.from(new Set(paper.detectedEntities.filter(e => e.type === 'GENE').map(e => e.canonical || e.text)));
            const diseaseEntities = Array.from(new Set(paper.detectedEntities.filter(e => e.type === 'DISEASE').map(e => e.canonical || e.text)));
            const drugEntities = Array.from(new Set(paper.detectedEntities.filter(e => e.type === 'DRUG').map(e => e.canonical || e.text)));

            return (
              <div
                key={paper.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all space-y-4"
              >
                {/* Header & Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3
                      onClick={() => onViewPaper(paper)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-900 cursor-pointer transition-colors leading-snug"
                    >
                      {paper.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{paper.authors}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-800">{paper.journal}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-600">{paper.year}</span>
                      {paper.doi && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-400 text-[11px]">{paper.doi}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Relevance Score Pill */}
                  <div className="shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-mono text-xs font-bold">
                      <span>Relevance:</span>
                      <span className="text-sm">{relevancePct}%</span>
                    </div>
                  </div>
                </div>

                {/* Abstract with Entity Highlight & Match Highlighting */}
                <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-100">
                  {renderHighlightedSnippet(paper.abstract, paper.detectedEntities, paper.whyThisResult?.matchedTerms || [])}
                </div>

                {/* Matched Concepts & Detected Biological Entities */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Entities:</span>
                  {geneEntities.slice(0, 4).map((g, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[11px]"
                    >
                      <Dna className="w-2.5 h-2.5 text-blue-600" />
                      {g}
                    </span>
                  ))}
                  {diseaseEntities.slice(0, 3).map((d, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium text-[11px]"
                    >
                      <Activity className="w-2.5 h-2.5 text-cyan-600" />
                      {d}
                    </span>
                  ))}
                  {drugEntities.slice(0, 2).map((dr, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium text-[11px]"
                    >
                      <Pill className="w-2.5 h-2.5 text-amber-600" />
                      {dr}
                    </span>
                  ))}
                </div>

                {/* Footer Actions & 'Why this result?' Toggle */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewPaper(paper)}
                      className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Paper</span>
                    </button>
                    <button
                      onClick={() => toggleWhy(paper.id)}
                      className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-800" />
                      <span>Why this result?</span>
                      {isWhyExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono">
                    ID #{paper.id} · Indexed in BioIntel
                  </div>
                </div>

                {/* 'Why this result?' Collapsible Panel (College Viva Feature) */}
                {isWhyExpanded && paper.whyThisResult && (
                  <div className="mt-3 p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        Information Retrieval Scoring Breakdown
                      </span>
                      <span className="font-mono text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                        Final Score: {paper.whyThisResult.finalRelevance}
                      </span>
                    </div>

                    {/* Matched Terms */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-slate-600 font-medium">Matched Query Terms:</span>
                      {paper.whyThisResult.matchedTerms.length > 0 ? (
                        paper.whyThisResult.matchedTerms.map((t, idx) => (
                          <span key={idx} className="font-mono bg-white text-slate-900 px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic">Semantic expansion match</span>
                      )}
                    </div>

                    {/* Mathematical Score Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <span className="text-[11px] text-slate-500 block uppercase font-mono">TF-IDF Score</span>
                        <span className="text-base font-bold font-mono text-blue-900">
                          {paper.whyThisResult.tfidfScore.toFixed(3)}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <span className="text-[11px] text-slate-500 block uppercase font-mono">BM25 Score</span>
                        <span className="text-base font-bold font-mono text-cyan-800">
                          {paper.whyThisResult.bm25Score.toFixed(3)}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <span className="text-[11px] text-slate-500 block uppercase font-mono">Semantic Sim</span>
                        <span className="text-base font-bold font-mono text-emerald-800">
                          {paper.whyThisResult.semanticSimilarity.toFixed(3)}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-blue-300 bg-blue-50/50">
                        <span className="text-[11px] text-blue-800 block uppercase font-mono">Final Relevance</span>
                        <span className="text-base font-bold font-mono text-blue-950">
                          {(paper.whyThisResult.finalRelevance * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Formula Explanation string */}
                    <div className="pt-1 text-[11px] font-mono text-slate-600 bg-white/80 p-2 rounded border border-slate-200">
                      <strong>Algorithm Calculation:</strong> {paper.whyThisResult.formula}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
