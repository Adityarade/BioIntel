import React, { useState } from 'react';
import {
  Dna, Activity, Layers, Pill, Search, ExternalLink,
  BookOpen, ArrowRight, X, ChevronRight, Hash, ShieldCheck
} from 'lucide-react';
import { Gene, Disease, Protein, Drug, Paper } from '../types';

interface ExplorePageProps {
  genes: Gene[];
  diseases: Disease[];
  proteins: Protein[];
  drugs: Drug[];
  papers: Paper[];
  initialSubTab?: string;
  onSearchEntity: (query: string) => void;
  onViewPaper: (paper: Paper) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  genes,
  diseases,
  proteins,
  drugs,
  papers,
  initialSubTab = 'genes',
  onSearchEntity,
  onViewPaper
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'genes' | 'diseases' | 'proteins' | 'drugs'>(
    (initialSubTab as any) || 'genes'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);

  // Filter lists based on search
  const filteredGenes = genes.filter(g =>
    g.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.associatedDiseases && g.associatedDiseases.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDiseases = diseases.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.category && d.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.associatedGenes && d.associatedGenes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredProteins = proteins.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.geneSymbol && p.geneSymbol.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.associatedDiseases && p.associatedDiseases.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDrugs = drugs.filter(dr =>
    dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dr.brandName && dr.brandName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (dr.indication && dr.indication.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper to find papers mentioning this entity
  const getLinkedPapers = (term: string) => {
    const t = term.toLowerCase();
    return papers.filter(p =>
      p.title.toLowerCase().includes(t) ||
      p.abstract.toLowerCase().includes(t) ||
      (p.keywords && p.keywords.toLowerCase().includes(t))
    ).slice(0, 5);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Top Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Biomedical Knowledge Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse annotated genes, diseases, proteins, and therapeutics mapped to research documents.
          </p>
        </div>

        {/* Search within explorer */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Filter ${activeSubTab}...`}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Segmented Sub-Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl max-w-fit">
        {[
          { id: 'genes', label: 'Genes', count: genes.length, icon: Dna },
          { id: 'diseases', label: 'Diseases', count: diseases.length, icon: Activity },
          { id: 'proteins', label: 'Proteins', count: proteins.length, icon: Layers },
          { id: 'drugs', label: 'Therapeutic Drugs', count: drugs.length, icon: Pill },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setSelectedEntity(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-blue-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. GENES EXPLORER */}
      {activeSubTab === 'genes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGenes.map((gene) => {
            const linked = getLinkedPapers(gene.symbol);
            return (
              <div
                key={gene.id}
                onClick={() => setSelectedEntity({ type: 'GENE', data: gene, linked })}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-blue-900 font-mono group-hover:text-blue-700">
                      {gene.symbol}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Chr {gene.chromosome}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{gene.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {gene.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Associated Diseases:</span>
                    <span className="font-medium text-slate-800 line-clamp-1">
                      {gene.associatedDiseases || 'None listed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-medium">
                      {linked.length} linked publications
                    </span>
                    <span className="text-blue-900 font-medium group-hover:underline flex items-center">
                      View Details <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. DISEASES EXPLORER */}
      {activeSubTab === 'diseases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiseases.map((disease) => {
            const linked = getLinkedPapers(disease.name);
            return (
              <div
                key={disease.id}
                onClick={() => setSelectedEntity({ type: 'DISEASE', data: disease, linked })}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-800">
                      {disease.name}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                      {disease.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {disease.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Driver Genes:</span>
                    <span className="font-mono font-medium text-blue-900 line-clamp-1">
                      {disease.associatedGenes}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono bg-cyan-50 text-cyan-900 px-2 py-0.5 rounded font-medium">
                      {linked.length} linked publications
                    </span>
                    <span className="text-cyan-800 font-medium group-hover:underline flex items-center">
                      View Details <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. PROTEINS EXPLORER */}
      {activeSubTab === 'proteins' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProteins.map((protein) => {
            const linked = getLinkedPapers(protein.name);
            return (
              <div
                key={protein.id}
                onClick={() => setSelectedEntity({ type: 'PROTEIN', data: protein, linked })}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                      {protein.name}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {protein.uniprotId}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>Gene: <strong className="font-mono text-blue-900">{protein.geneSymbol}</strong></span>
                    <span>·</span>
                    <span>{protein.molecularMassKda} kDa</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {protein.function}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">
                    Localization: {protein.cellularLocalization?.split(',')[0]}
                  </span>
                  <span className="text-emerald-800 font-medium group-hover:underline flex items-center">
                    Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. DRUGS EXPLORER */}
      {activeSubTab === 'drugs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrugs.map((drug) => {
            const linked = getLinkedPapers(drug.name);
            return (
              <div
                key={drug.id}
                onClick={() => setSelectedEntity({ type: 'DRUG', data: drug, linked })}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800">
                      {drug.name}
                    </h3>
                    {drug.brandName && (
                      <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {drug.brandName}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 block">Class: {drug.drugClass}</span>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {drug.mechanismOfAction}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Indication:</span>
                    <span className="font-medium text-slate-800 line-clamp-1">{drug.indication}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">Targets: {drug.targetEntities}</span>
                    <span className="text-amber-800 font-medium group-hover:underline flex items-center">
                      Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Slide-over / Modal for Selected Entity */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {selectedEntity.type} Record
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedEntity.data.symbol || selectedEntity.data.name}
                </h2>
                {selectedEntity.data.name && selectedEntity.data.symbol && (
                  <p className="text-xs text-slate-500 font-medium">{selectedEntity.data.name}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Entity Attributes Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              {selectedEntity.data.chromosome && (
                <div>
                  <span className="text-slate-400 block font-mono">Chromosome Locus</span>
                  <span className="font-semibold text-slate-900">{selectedEntity.data.chromosome}</span>
                </div>
              )}
              {selectedEntity.data.type && (
                <div>
                  <span className="text-slate-400 block font-mono">Type</span>
                  <span className="font-semibold text-slate-900">{selectedEntity.data.type}</span>
                </div>
              )}
              {selectedEntity.data.uniprotId && (
                <div>
                  <span className="text-slate-400 block font-mono">UniProt Accession</span>
                  <span className="font-semibold text-blue-900 font-mono">{selectedEntity.data.uniprotId}</span>
                </div>
              )}
              {selectedEntity.data.molecularMassKda && (
                <div>
                  <span className="text-slate-400 block font-mono">Molecular Mass</span>
                  <span className="font-semibold text-slate-900">{selectedEntity.data.molecularMassKda} kDa</span>
                </div>
              )}
              {selectedEntity.data.cellularLocalization && (
                <div>
                  <span className="text-slate-400 block font-mono">Localization</span>
                  <span className="font-semibold text-slate-900">{selectedEntity.data.cellularLocalization}</span>
                </div>
              )}
              {selectedEntity.data.drugClass && (
                <div>
                  <span className="text-slate-400 block font-mono">Pharmacological Class</span>
                  <span className="font-semibold text-slate-900">{selectedEntity.data.drugClass}</span>
                </div>
              )}
            </div>

            {/* Description / Function / Mechanism */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-900 block">Biological Overview & Function:</span>
              <p className="text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                {selectedEntity.data.description || selectedEntity.data.functions || selectedEntity.data.mechanismOfAction || selectedEntity.data.function}
              </p>
            </div>

            {/* Associated Relationships */}
            {(selectedEntity.data.associatedDiseases || selectedEntity.data.associatedGenes || selectedEntity.data.indication) && (
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-900 block">Associated Conditions / Targets:</span>
                <p className="text-slate-700 font-medium">
                  {selectedEntity.data.associatedDiseases || selectedEntity.data.associatedGenes || selectedEntity.data.indication}
                </p>
              </div>
            )}

            {/* Linked Research Publications */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Indexed Research Papers ({selectedEntity.linked.length})
                </span>
                <button
                  onClick={() => {
                    const term = selectedEntity.data.symbol || selectedEntity.data.name;
                    setSelectedEntity(null);
                    onSearchEntity(term);
                  }}
                  className="text-xs font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Search literature for &ldquo;{selectedEntity.data.symbol || selectedEntity.data.name}&rdquo;</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {selectedEntity.linked.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No indexed papers directly mention this term.</p>
              ) : (
                <div className="space-y-2">
                  {selectedEntity.linked.map((p: Paper) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedEntity(null);
                        onViewPaper(p);
                      }}
                      className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 cursor-pointer transition-colors"
                    >
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {p.authors} ({p.year}) · {p.journal}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
