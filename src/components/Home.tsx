import React, { useState } from 'react';
import { Search, ArrowRight, Dna, Activity, FileText, Layers, Sparkles, Filter, Database, CheckCircle2 } from 'lucide-react';
import { SystemStats } from '../types';

interface HomeProps {
  stats: SystemStats;
  onSearch: (query: string) => void;
  onNavigateTab: (tab: string, subSection?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ stats, onSearch, onNavigateTab }) => {
  const [searchInput, setSearchInput] = useState('');

  const sampleQueries = [
    "BRCA1 breast cancer",
    "insulin resistance diabetes",
    "APOE Alzheimer's",
    "EGFR cancer",
    "DNA repair genes"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleSuggestionClick = (query: string) => {
    setSearchInput(query);
    onSearch(query);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white rounded-2xl p-8 sm:p-12 md:p-16 border border-slate-800 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            BIOINFORMATICS + INFORMATION RETRIEVAL LAB
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Intelligent Biomedical Search & Knowledge Discovery
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Search biomedical literature, discover biological entities, and explore relationships using modern information retrieval techniques.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search genes, diseases, proteins, drugs or research topics..."
                className="w-full pl-3 pr-4 py-3 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
            >
              <span>Search Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Example Suggestions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">Popular queries:</span>
            {sampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestionClick(q)}
                className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quantitative Statistics Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Research Papers', value: stats.totalPapers, sub: 'Peer-reviewed dataset', icon: FileText, color: 'text-blue-600' },
          { label: 'Genes', value: stats.totalGenes, sub: 'Genomic targets', icon: Dna, color: 'text-indigo-600' },
          { label: 'Diseases', value: stats.totalDiseases, sub: 'Pathological states', icon: Activity, color: 'text-cyan-600' },
          { label: 'Proteins', value: stats.totalProteins, sub: 'Functional molecules', icon: Layers, color: 'text-emerald-600' },
          { label: 'Indexed Terms', value: stats.totalIndexedTokens, sub: 'Inverted index tokens', icon: Database, color: 'text-amber-600' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
                  {item.value}
                </span>
                <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4 Feature Exploration Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Explore Biomedical Knowledge Base</h2>
          <span className="text-xs text-slate-500">Cross-domain biological entities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Explore Genes",
              desc: "Investigate BRCA1, TP53, EGFR, and chromosome loci with genomic functions and disease associations.",
              tag: `${stats.totalGenes} Genes`,
              tab: 'explore',
              sub: 'genes',
              accent: 'border-blue-200 bg-blue-50/40'
            },
            {
              title: "Explore Diseases",
              desc: "Browse oncology, neurodegenerative, and metabolic disorders linked to pathogenic mutations.",
              tag: `${stats.totalDiseases} Diseases`,
              tab: 'explore',
              sub: 'diseases',
              accent: 'border-cyan-200 bg-cyan-50/40'
            },
            {
              title: "Explore Proteins",
              desc: "Examine amino-acid masses, cellular localizations, and catalytic enzymes from UniProt records.",
              tag: `${stats.totalProteins} Proteins`,
              tab: 'explore',
              sub: 'proteins',
              accent: 'border-emerald-200 bg-emerald-50/40'
            },
            {
              title: "Search Research Papers",
              desc: "Run TF-IDF, BM25, and hybrid queries across 50+ annotated biomedical journal publications.",
              tag: `${stats.totalPapers} Papers`,
              tab: 'search',
              sub: '',
              accent: 'border-purple-200 bg-purple-50/40'
            }
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => onNavigateTab(card.tab, card.sub)}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {card.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-900 group-hover:text-blue-700">
                <span>Access Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How BioIntel Works Section (Required by User Prompt) */}
      <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Pipeline Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900">How BioIntel Works</h2>
          <p className="text-sm text-slate-600">
            The dual Bioinformatics + Information Retrieval architecture processing queries from raw text to ranked biological findings.
          </p>
        </div>

        {/* Linear IR Flowchart */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {[
            {
              step: "01",
              title: "User Query",
              desc: "Free-text input such as 'BRCA1 mutations associated with breast cancer'",
              color: "border-blue-500 bg-blue-50/50"
            },
            {
              step: "02",
              title: "Text Processing",
              desc: "Lowercasing, regex tokenization, stop-word removal, and biomedical normalization",
              color: "border-indigo-500 bg-indigo-50/50"
            },
            {
              step: "03",
              title: "Information Retrieval",
              desc: "Posting lookup in inverted index mapping terms to candidate document IDs",
              color: "border-cyan-500 bg-cyan-50/50"
            },
            {
              step: "04",
              title: "Relevance Ranking",
              desc: "Hybrid scoring: 0.35×TF-IDF + 0.35×BM25 + 0.30×Semantic Concept Similarity",
              color: "border-emerald-500 bg-emerald-50/50"
            },
            {
              step: "05",
              title: "Biomedical Results",
              desc: "Ranked papers with entity extraction (Genes, Diseases, Proteins, Drugs) and 'Why this result?'",
              color: "border-amber-500 bg-amber-50/50"
            }
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${step.color} flex flex-col justify-between space-y-3 relative`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-slate-800">{step.step}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">{step.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Inverted Index & Postings</span>
            Maintains dictionary of unique vocabulary words mapped to document IDs with frequency counts for sub-millisecond retrieval.
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Okapi BM25 & Document Length</span>
            Calibrated with $k_1=1.5$ and $b=0.75$, penalizing document verbosity while rewarding rare biomedical term specificity.
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Named Entity Recognition</span>
            Identifies Gene symbols, MeSH diseases, UniProt proteins, and FDA therapeutic drugs directly within paper abstracts.
          </div>
        </div>
      </section>
    </div>
  );
};
