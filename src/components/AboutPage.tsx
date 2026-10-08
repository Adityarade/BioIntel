import React, { useState } from 'react';
import {
  BookOpen, Dna, Search, Layers, Cpu, Database, CheckCircle2,
  HelpCircle, ChevronDown, ChevronUp, Code, ArrowRight
} from 'lucide-react';
import { BiomedicalIREngine } from '../services/irEngine';
import { dataService } from '../services/dataService';

export const AboutPage: React.FC = () => {
  const [testTerm, setTestTerm] = useState('brca1');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Live lookup in real inverted index
  const postings = dataService.irEngine.index.getPostings(testTerm);
  const df = dataService.irEngine.index.getDocumentFrequency(testTerm);
  const N = dataService.irEngine.index.numDocs;
  const idf = N > 0 ? (Math.log((N - df + 0.5) / (df + 0.5) + 1.0)).toFixed(4) : "0.0000";

  const vivaQuestions = [
    {
      q: "What is an Inverted Index and why is it essential for biomedical search?",
      a: "An Inverted Index is a dictionary-like data structure that maps vocabulary terms to postings lists containing document IDs and term frequencies. Instead of scanning entire document texts linearly (O(N) time), an inverted index allows looking up candidate documents in O(1) dictionary time, making large-scale biomedical literature search computationally feasible."
    },
    {
      q: "How does BM25 improve over classical TF-IDF?",
      a: "Classical TF-IDF suffers from two key drawbacks: linear or sub-linear term frequency unboundedness and vulnerability to document length bias. Okapi BM25 introduces term frequency saturation (where repeated occurrences yield diminishing returns bounded by k1=1.5) and document length normalization (via parameter b=0.75), which penalizes excessively long documents that might match query terms purely by chance."
    },
    {
      q: "How does BioIntel's Hybrid Ranking function?",
      a: "BioIntel normalizes scores from three complementary retrieval channels to [0, 1] and computes a weighted composite: Score = 0.35 * TF-IDF + 0.35 * BM25 + 0.30 * Semantic Similarity. TF-IDF measures exact lexical cosine relevance, BM25 provides length-calibrated probabilistic scoring, and Semantic Similarity handles medical synonyms and related terms (e.g., mapping 'dementia' to 'Alzheimer's')."
    },
    {
      q: "How is Biological Entity Recognition handled in BioIntel?",
      a: "A curated domain dictionary and tokenizer scan abstracts for Gene symbols (e.g. BRCA1, TP53), Diseases (e.g. Breast Cancer, Glioblastoma), UniProt Proteins, and FDA Drugs. Multi-word patterns are matched with priority to avoid fragmentation, and entities are highlighted in the UI with direct links to knowledge graph relationships."
    },
    {
      q: "What is the difference between Bioinformatics and Information Retrieval in this lab project?",
      a: "Bioinformatics is the computational study and representation of biological data (genomic sequences, protein structures, disease pathways, and molecular mechanisms). Information Retrieval is the science of searching, indexing, and ranking unstructured text collections according to user queries. BioIntel bridges both fields by applying IR algorithms directly to structured and unstructured biomedical repositories."
    }
  ];

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono">
          <span>BIOINFORMATICS & IR LAB VIVA DEMONSTRATION</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          About BioIntel Platform
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          BioIntel was engineered for the Bioinformatics + Information Retrieval laboratory to demonstrate how modern search engines, tokenizers, inverted indices, and biomedical entity extractors operate together.
        </p>
      </div>

      {/* Two Pillars Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
            <Dna className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Pillar 1: Bioinformatics</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bioinformatics focuses on storing, analyzing, and discovering knowledge in biological datasets. BioIntel models:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li><strong>Genes:</strong> HUGO gene nomenclature, chromosome loci, DNA repair functions.</li>
            <li><strong>Diseases:</strong> MeSH-indexed oncology, neurological, and metabolic conditions.</li>
            <li><strong>Proteins:</strong> UniProt accession numbers, cellular localizations, molecular masses.</li>
            <li><strong>Biological Relationships:</strong> Multi-relational edges (expresses, inhibits, treats).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-900 flex items-center justify-center">
            <Search className="w-5 h-5 text-cyan-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Pillar 2: Information Retrieval</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Information Retrieval is the discipline of indexing, querying, and ranking collections of text documents:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li><strong>Tokenization & Normalization:</strong> Preserving biomedical hyphenated terms.</li>
            <li><strong>Inverted Index:</strong> Constant-time posting lookup for rapid candidate retrieval.</li>
            <li><strong>Okapi BM25:</strong> Length-normalized probabilistic relevance ranking ($k_1=1.5, b=0.75$).</li>
            <li><strong>Hybrid Multi-Channel Scoring:</strong> Combined TF-IDF, BM25, and semantic vectors.</li>
          </ul>
        </div>
      </div>

      {/* Interactive Inverted Index Inspector (Live Viva Tool) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-900" />
              Live Inverted Index & Postings Inspector
            </h2>
            <p className="text-xs text-slate-500">
              Type any vocabulary word to inspect its actual internal postings list, document frequency (df), and Robertson-Sparck Jones IDF.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={testTerm}
              onChange={(e) => setTestTerm(e.target.value.toLowerCase().trim())}
              placeholder="e.g. brca1, cancer, kinase"
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
          <div>
            <span className="text-slate-400 block text-[11px]">Term</span>
            <span className="text-base font-bold text-blue-900">{testTerm || '—'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Document Frequency (df)</span>
            <span className="text-base font-bold text-cyan-900">{df} of {N} documents</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Computed BM25 IDF</span>
            <span className="text-base font-bold text-emerald-900">{idf}</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <span className="font-semibold text-slate-700">Internal Postings List ({testTerm} &rarr; [doc_id: term_frequency]):</span>
          {postings.size === 0 ? (
            <p className="text-slate-400 italic text-xs">Term not found in the current indexed vocabulary.</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded border border-slate-200 font-mono text-[11px]">
              {Array.from(postings.entries()).map(([docId, freq]) => (
                <span key={docId} className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-800">
                  Doc #{docId}: <strong className="text-blue-900">{freq} times</strong>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Architecture Diagram (Required in Prompt) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Project Architecture</h2>
        <div className="bg-slate-900 text-cyan-300 p-6 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <pre>{`
                 USER SEARCH INTERFACE
                          │
                          ▼
            React + Vite Frontend (Tailwind CSS)
                          │
                          ▼
            FastAPI REST API / TypeScript IR Engine
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   NLP Service        IR Engine        Bio Engine
   (Named Entity     (TF-IDF + BM25    (Genomic & Disease
    Extraction)       Ranking)          Knowledge Graph)
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
            Normalized Hybrid Ranker
        Score = 0.35*TFIDF + 0.35*BM25 + 0.30*Semantic
                          │
                          ▼
            Database / Persistent Storage
         (PostgreSQL Schema / SQLite / Seed CSVs)
          `}</pre>
        </div>
      </div>

      {/* College Viva Q&A Guide */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-600" />
            Viva Voce & Lab Exam Preparation Guide
          </h2>
          <p className="text-xs text-slate-500">
            Frequently asked questions by professors during bioinformatics and information retrieval examinations.
          </p>
        </div>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-3.5 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
