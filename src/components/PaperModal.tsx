import React from 'react';
import { X, BookOpen, ExternalLink, Dna, Activity, Layers, Pill, ArrowRight } from 'lucide-react';
import { Paper, SearchResultItem } from '../types';
import { dataService } from '../services/dataService';
import { BIOMEDICAL_VOCABULARY } from '../services/entityExtractor';

interface PaperModalProps {
  paper: Paper | null;
  onClose: () => void;
  onSelectPaper: (p: Paper) => void;
  onSearchEntity: (term: string) => void;
}

export const PaperModal: React.FC<PaperModalProps> = ({
  paper,
  onClose,
  onSelectPaper,
  onSearchEntity
}) => {
  if (!paper) return null;

  // Retrieve related papers using IR cosine similarity
  const relatedPapers = dataService.irEngine.getRelatedPapers(paper.id, 4);

  // Extract entities for the full abstract
  const fullText = `${paper.title}. ${paper.abstract}`;
  const entities = dataService.irEngine.index.papers.get(paper.id)
    ? dataService.irEngine.search(paper.title).results.find(r => r.id === paper.id)?.detectedEntities || []
    : [];

  const uniqueGenes = Array.from(new Set(entities.filter(e => e.type === 'GENE').map(e => e.canonical || e.text)));
  const uniqueDiseases = Array.from(new Set(entities.filter(e => e.type === 'DISEASE').map(e => e.canonical || e.text)));
  const uniqueProteins = Array.from(new Set(entities.filter(e => e.type === 'PROTEIN').map(e => e.canonical || e.text)));
  const uniqueDrugs = Array.from(new Set(entities.filter(e => e.type === 'DRUG').map(e => e.canonical || e.text)));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Biomedical Research Publication #{paper.id}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {paper.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="font-semibold text-slate-700">{paper.authors}</span>
              <span>·</span>
              <span className="font-medium text-slate-800">{paper.journal}</span>
              <span>·</span>
              <span className="font-mono text-slate-600">{paper.year}</span>
              {paper.doi && (
                <>
                  <span>·</span>
                  <span className="font-mono text-slate-400">DOI: {paper.doi}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Abstract
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {paper.abstract}
          </p>
        </div>

        {/* Keywords */}
        {paper.keywords && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Author Keywords
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {paper.keywords.split(',').map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  {kw.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Biological Entities Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Extracted Biological Entities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Genes */}
            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200/60 space-y-1.5">
              <div className="flex items-center gap-1 font-semibold text-blue-900">
                <Dna className="w-3.5 h-3.5 text-blue-600" />
                <span>Genes ({uniqueGenes.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {uniqueGenes.length > 0 ? (
                  uniqueGenes.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => { onClose(); onSearchEntity(g); }}
                      className="px-2 py-0.5 rounded bg-white text-blue-800 border border-blue-200 font-mono text-[11px] hover:bg-blue-100 cursor-pointer"
                    >
                      {g}
                    </button>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>

            {/* Diseases */}
            <div className="p-3 rounded-lg bg-cyan-50/50 border border-cyan-200/60 space-y-1.5">
              <div className="flex items-center gap-1 font-semibold text-cyan-900">
                <Activity className="w-3.5 h-3.5 text-cyan-600" />
                <span>Diseases ({uniqueDiseases.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {uniqueDiseases.length > 0 ? (
                  uniqueDiseases.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => { onClose(); onSearchEntity(d); }}
                      className="px-2 py-0.5 rounded bg-white text-cyan-800 border border-cyan-200 text-[11px] hover:bg-cyan-100 cursor-pointer"
                    >
                      {d}
                    </button>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>

            {/* Proteins */}
            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
              <div className="flex items-center gap-1 font-semibold text-emerald-900">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Proteins ({uniqueProteins.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {uniqueProteins.length > 0 ? (
                  uniqueProteins.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => { onClose(); onSearchEntity(p); }}
                      className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 text-[11px] hover:bg-emerald-100 cursor-pointer"
                    >
                      {p}
                    </button>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>

            {/* Drugs */}
            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/60 space-y-1.5">
              <div className="flex items-center gap-1 font-semibold text-amber-900">
                <Pill className="w-3.5 h-3.5 text-amber-600" />
                <span>Therapeutics ({uniqueDrugs.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {uniqueDrugs.length > 0 ? (
                  uniqueDrugs.map((dr, i) => (
                    <button
                      key={i}
                      onClick={() => { onClose(); onSearchEntity(dr); }}
                      className="px-2 py-0.5 rounded bg-white text-amber-800 border border-amber-200 text-[11px] hover:bg-amber-100 cursor-pointer"
                    >
                      {dr}
                    </button>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 15: Related Research (Cosine Similarity) */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Related Research (IR Cosine Similarity)
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Top Semantic Matches</span>
          </div>

          <div className="space-y-2">
            {relatedPapers.map((rp) => (
              <div
                key={rp.id}
                onClick={() => onSelectPaper(rp)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/90 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5 max-w-lg">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 line-clamp-1">
                    {rp.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {rp.authors} ({rp.year}) · {rp.journal}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {Math.round(rp.relevanceScore * 100)}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
