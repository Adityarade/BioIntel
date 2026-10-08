import { Paper, SearchResultItem, WhyThisResult, RankingWeights, SearchFilters } from '../types';
import { tokenize } from './tokenizer';
import { entityExtractorInstance } from './entityExtractor';

// Semantic synonym relations
const BIOMEDICAL_SEMANTIC_MAP: Record<string, Record<string, number>> = {
  "cancer": { "oncology": 0.95, "malignancy": 0.92, "tumor": 0.90, "carcinoma": 0.88, "neoplasm": 0.86, "metastasis": 0.80 },
  "tumor": { "cancer": 0.90, "neoplasm": 0.92, "carcinoma": 0.85, "oncology": 0.84 },
  "brca1": { "dna-repair": 0.95, "homologous-recombination": 0.94, "breast-cancer": 0.96, "parp": 0.88 },
  "brca2": { "dna-repair": 0.94, "rad51": 0.92, "breast-cancer": 0.95, "ovarian-cancer": 0.93 },
  "tp53": { "p53": 0.99, "tumor-suppressor": 0.95, "apoptosis": 0.92, "dna-damage": 0.90 },
  "egfr": { "tyrosine-kinase": 0.95, "osimertinib": 0.92, "lung-cancer": 0.94, "erbb": 0.89 },
  "kras": { "gtpase": 0.95, "sotorasib": 0.92, "colorectal-cancer": 0.93, "mapk": 0.88 },
  "alzheimer": { "dementia": 0.96, "neurodegeneration": 0.94, "amyloid": 0.95, "tau": 0.92, "apoe": 0.90 },
  "apoe": { "alzheimer": 0.90, "lipoprotein": 0.92, "cholesterol": 0.88, "amyloid-beta": 0.89 },
  "parkinson": { "neurodegeneration": 0.94, "dopamine": 0.93, "alpha-synuclein": 0.95, "lewy-bodies": 0.92 },
  "dementia": { "alzheimer": 0.96, "cognitive-decline": 0.93, "neurodegeneration": 0.91 },
  "diabetes": { "insulin": 0.96, "hyperglycemia": 0.94, "glucose": 0.93, "metformin": 0.91, "metabolic": 0.90 },
  "insulin": { "diabetes": 0.96, "glucose": 0.95, "pancreatic": 0.90, "insulin-resistance": 0.97 },
  "metformin": { "diabetes": 0.91, "ampk": 0.94, "glucose": 0.89, "gluconeogenesis": 0.88 },
  "inflammation": { "cytokine": 0.92, "tnf": 0.90, "il6": 0.91, "autoimmune": 0.88, "rheumatoid": 0.85 },
  "arthritis": { "rheumatoid": 0.95, "inflammation": 0.91, "synovial": 0.92, "joint": 0.90, "tnf": 0.89 },
  "atherosclerosis": { "cardiovascular": 0.94, "cholesterol": 0.93, "ldl": 0.92, "pcsk9": 0.90, "heart": 0.88 }
};

export class InvertedIndex {
  // term -> { docId: count }
  public index: Map<string, Map<number, number>> = new Map();
  public docLengths: Map<number, number> = new Map();
  public docTokens: Map<number, string[]> = new Map();
  public papers: Map<number, Paper> = new Map();
  public numDocs: number = 0;
  public avgDocLength: number = 0;

  public clear() {
    this.index.clear();
    this.docLengths.clear();
    this.docTokens.clear();
    this.papers.clear();
    this.numDocs = 0;
    this.avgDocLength = 0;
  }

  public addDocument(paper: Paper) {
    const fullText = `${paper.title} ${paper.abstract} ${paper.keywords || ''}`;
    const tokens = tokenize(fullText);

    this.papers.set(paper.id, paper);
    this.docLengths.set(paper.id, tokens.length);
    this.docTokens.set(paper.id, tokens);

    const counts: Map<string, number> = new Map();
    for (const t of tokens) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }

    for (const [term, freq] of counts.entries()) {
      if (!this.index.has(term)) {
        this.index.set(term, new Map());
      }
      this.index.get(term)!.set(paper.id, freq);
    }

    this.numDocs = this.docLengths.size;
    let totalLen = 0;
    for (const len of this.docLengths.values()) {
      totalLen += len;
    }
    this.avgDocLength = this.numDocs > 0 ? totalLen / this.numDocs : 0;
  }

  public getDocumentFrequency(term: string): number {
    return this.index.get(term.toLowerCase())?.size || 0;
  }

  public getPostings(term: string): Map<number, number> {
    return this.index.get(term.toLowerCase()) || new Map();
  }

  public getCandidateDocs(tokens: string[]): Set<number> {
    const set = new Set<number>();
    for (const t of tokens) {
      const postings = this.getPostings(t);
      for (const docId of postings.keys()) {
        set.add(docId);
      }
    }
    return set;
  }
}

export class BiomedicalIREngine {
  public index: InvertedIndex = new InvertedIndex();
  private docTfidfVectors: Map<number, Map<string, number>> = new Map();
  private docVectorNorms: Map<number, number> = new Map();
  private bm25IdfCache: Map<string, number> = new Map();

  constructor(papers?: Paper[]) {
    if (papers && papers.length > 0) {
      this.buildIndex(papers);
    }
  }

  public buildIndex(papers: Paper[]) {
    this.index.clear();
    this.docTfidfVectors.clear();
    this.docVectorNorms.clear();
    this.bm25IdfCache.clear();

    for (const p of papers) {
      this.index.addDocument(p);
    }

    const N = this.index.numDocs;
    if (N === 0) return;

    // Precompute TF-IDF
    for (const [docId, tokens] of this.index.docTokens.entries()) {
      const counts: Map<string, number> = new Map();
      for (const t of tokens) counts.set(t, (counts.get(t) || 0) + 1);

      const docLen = tokens.length || 1;
      const vec: Map<string, number> = new Map();
      let normSq = 0;

      for (const [term, count] of counts.entries()) {
        const df = this.index.getDocumentFrequency(term);
        const tf = count / docLen;
        const idf = Math.log((N + 1) / (df + 1)) + 1.0;
        const weight = tf * idf;
        vec.set(term, weight);
        normSq += weight * weight;
      }

      this.docTfidfVectors.set(docId, vec);
      this.docVectorNorms.set(docId, Math.sqrt(normSq) || 1.0);
    }

    // Precompute BM25 IDF
    for (const term of this.index.index.keys()) {
      const df = this.index.getDocumentFrequency(term);
      const idf = Math.log(1.0 + (N - df + 0.5) / (df + 0.5));
      this.bm25IdfCache.set(term, Math.max(idf, 0));
    }
  }

  public scoreTFIDF(queryTokens: string[]): Map<number, number> {
    const scores = new Map<number, number>();
    const N = this.index.numDocs;
    if (N === 0 || queryTokens.length === 0) return scores;

    const qCounts: Map<string, number> = new Map();
    for (const t of queryTokens) qCounts.set(t, (qCounts.get(t) || 0) + 1);

    const qLen = queryTokens.length;
    const qVec: Map<string, number> = new Map();
    let qNormSq = 0;

    for (const [term, count] of qCounts.entries()) {
      const df = this.index.getDocumentFrequency(term);
      if (df === 0) continue;
      const tf = count / qLen;
      const idf = Math.log((N + 1) / (df + 1)) + 1.0;
      const w = tf * idf;
      qVec.set(term, w);
      qNormSq += w * w;
    }

    const qNorm = Math.sqrt(qNormSq);
    if (qNorm === 0) return scores;

    const candidates = this.index.getCandidateDocs(queryTokens);
    for (const docId of candidates) {
      const docVec = this.docTfidfVectors.get(docId) || new Map();
      let dot = 0;

      for (const [term, qw] of qVec.entries()) {
        const dw = docVec.get(term);
        if (dw !== undefined) {
          dot += qw * dw;
        }
      }

      const dNorm = this.docVectorNorms.get(docId) || 1.0;
      const cosine = dot / (qNorm * dNorm);
      if (cosine > 0) {
        scores.set(docId, Math.min(Math.max(cosine, 0), 1));
      }
    }

    return scores;
  }

  public scoreBM25(queryTokens: string[], k1: number = 1.5, b: number = 0.75): Map<number, number> {
    const scores = new Map<number, number>();
    const N = this.index.numDocs;
    if (N === 0 || queryTokens.length === 0) return scores;

    const avgdl = this.index.avgDocLength || 1.0;
    const candidates = this.index.getCandidateDocs(queryTokens);

    const qCounts: Map<string, number> = new Map();
    for (const t of queryTokens) qCounts.set(t, (qCounts.get(t) || 0) + 1);

    for (const docId of candidates) {
      let score = 0;
      const docLen = this.index.docLengths.get(docId) || 1;
      const tokens = this.index.docTokens.get(docId) || [];

      const docFreqs: Map<string, number> = new Map();
      for (const t of tokens) docFreqs.set(t, (docFreqs.get(t) || 0) + 1);

      for (const term of qCounts.keys()) {
        const tf = docFreqs.get(term);
        if (!tf) continue;

        const idf = this.bm25IdfCache.get(term) || 0;
        const num = tf * (k1 + 1.0);
        const denom = tf + k1 * (1.0 - b + b * (docLen / avgdl));
        score += idf * (num / denom);
      }

      if (score > 0) {
        scores.set(docId, score);
      }
    }

    return scores;
  }

  public scoreSemantic(queryTokens: string[]): Map<number, number> {
    const scores = new Map<number, number>();
    if (queryTokens.length === 0) return scores;

    for (const [docId, tokens] of this.index.docTokens.entries()) {
      const tokenSet = new Set(tokens);
      let semanticMatches = 0;
      let totalQueryTerms = queryTokens.length;

      for (const q of queryTokens) {
        if (tokenSet.has(q)) {
          semanticMatches += 1.0;
          continue;
        }

        // Semantic synonym expansion
        let bestSim = 0;
        if (BIOMEDICAL_SEMANTIC_MAP[q]) {
          for (const [relTerm, weight] of Object.entries(BIOMEDICAL_SEMANTIC_MAP[q])) {
            if (tokenSet.has(relTerm)) {
              bestSim = Math.max(bestSim, weight);
            }
          }
        }

        for (const docTerm of tokenSet) {
          if (BIOMEDICAL_SEMANTIC_MAP[docTerm] && BIOMEDICAL_SEMANTIC_MAP[docTerm][q]) {
            bestSim = Math.max(bestSim, BIOMEDICAL_SEMANTIC_MAP[docTerm][q]);
          }
        }

        semanticMatches += bestSim * 0.85;
      }

      if (semanticMatches > 0) {
        const sim = Math.min(semanticMatches / totalQueryTerms, 1.0);
        scores.set(docId, sim);
      }
    }

    return scores;
  }

  private normalizeMap(map: Map<number, number>): Map<number, number> {
    let max = 0;
    for (const val of map.values()) {
      if (val > max) max = val;
    }
    const res = new Map<number, number>();
    for (const [k, v] of map.entries()) {
      res.set(k, max > 0 ? v / max : 0);
    }
    return res;
  }

  public search(
    query: string,
    filters?: Partial<SearchFilters>
  ): { results: SearchResultItem[]; queryEntities: string[]; total: number; elapsedMs: number } {
    const startTime = performance.now();
    const queryTokens = tokenize(query);

    const queryEntities = entityExtractorInstance.extractEntities(query).map(e => e.text);

    if (queryTokens.length === 0) {
      return { results: [], queryEntities, total: 0, elapsedMs: 0 };
    }

    const weights: RankingWeights = filters?.weights || { tfidf: 0.35, bm25: 0.35, semantic: 0.30 };
    const totalW = weights.tfidf + weights.bm25 + weights.semantic || 1.0;
    const w1 = weights.tfidf / totalW;
    const w2 = weights.bm25 / totalW;
    const w3 = weights.semantic / totalW;

    const rankingMethod = filters?.rankingMethod || 'Hybrid';

    const tfidfScores = this.scoreTFIDF(queryTokens);
    const bm25Scores = this.scoreBM25(queryTokens);
    const semanticScores = this.scoreSemantic(queryTokens);

    const normTfidf = this.normalizeMap(tfidfScores);
    const normBm25 = this.normalizeMap(bm25Scores);
    const normSemantic = this.normalizeMap(semanticScores);

    const candidateIds = new Set([
      ...normTfidf.keys(),
      ...normBm25.keys(),
      ...normSemantic.keys()
    ]);

    let results: SearchResultItem[] = [];

    for (const docId of candidateIds) {
      const paper = this.index.papers.get(docId);
      if (!paper) continue;

      // Filter by year if specified
      if (filters?.year && filters.year !== 'All') {
        if (paper.year.toString() !== filters.year) continue;
      }

      const sTf = normTfidf.get(docId) || 0;
      const sBm = normBm25.get(docId) || 0;
      const sSem = normSemantic.get(docId) || 0;

      let finalScore = 0;
      if (rankingMethod === 'TF-IDF') {
        finalScore = sTf;
      } else if (rankingMethod === 'BM25') {
        finalScore = sBm;
      } else if (rankingMethod === 'Semantic') {
        finalScore = sSem;
      } else {
        finalScore = (w1 * sTf) + (w2 * sBm) + (w3 * sSem);
      }

      // Detect entities in full paper
      const fullText = `${paper.title}. ${paper.abstract}`;
      const docEntities = entityExtractorInstance.extractEntities(fullText);

      // Filter by entity type if specified
      if (filters?.entityType && filters.entityType !== 'All') {
        const types = new Set(docEntities.map(e => e.type));
        if (!types.has(filters.entityType as any)) continue;
      }

      const docToks = new Set(this.index.docTokens.get(docId) || []);
      const matched = queryTokens.filter(t => docToks.has(t));

      const whyThisResult: WhyThisResult = {
        matchedTerms: Array.from(new Set(matched)),
        tfidfScore: Number(sTf.toFixed(4)),
        bm25Score: Number(sBm.toFixed(4)),
        semanticSimilarity: Number(sSem.toFixed(4)),
        finalRelevance: Number(finalScore.toFixed(4)),
        detectedEntities: Array.from(new Set(docEntities.map(e => e.text))).slice(0, 8),
        formula: `Final = (${w1.toFixed(2)} × ${sTf.toFixed(2)}) + (${w2.toFixed(2)} × ${sBm.toFixed(2)}) + (${w3.toFixed(2)} × ${sSem.toFixed(2)}) = ${(finalScore * 100).toFixed(1)}%`
      };

      results.push({
        ...paper,
        relevanceScore: Number(finalScore.toFixed(4)),
        whyThisResult,
        detectedEntities: docEntities
      });
    }

    // Sort
    const sortBy = filters?.sortBy || 'Relevance';
    if (sortBy === 'Newest') {
      results.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'Oldest') {
      results.sort((a, b) => a.year - b.year);
    } else {
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    const elapsedMs = Number((performance.now() - startTime).toFixed(2));
    return {
      results,
      queryEntities,
      total: results.length,
      elapsedMs
    };
  }

  public getRelatedPapers(paperId: number, topK: number = 4): SearchResultItem[] {
    const target = this.index.papers.get(paperId);
    if (!target) return [];

    const queryTokens = tokenize(`${target.title} ${target.keywords || ''}`);
    const scores = this.scoreTFIDF(queryTokens);
    scores.delete(paperId);

    const sortedDocIds = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK);

    return sortedDocIds.map(([id, sim]) => {
      const p = this.index.papers.get(id)!;
      const fullText = `${p.title}. ${p.abstract}`;
      const docEntities = entityExtractorInstance.extractEntities(fullText);
      return {
        ...p,
        relevanceScore: Number(sim.toFixed(4)),
        detectedEntities: docEntities,
        whyThisResult: {
          matchedTerms: [],
          tfidfScore: Number(sim.toFixed(4)),
          bm25Score: 0,
          semanticSimilarity: 0,
          finalRelevance: Number(sim.toFixed(4)),
          detectedEntities: docEntities.map(e => e.text).slice(0, 5),
          formula: `TF-IDF Cosine Similarity = ${(sim * 100).toFixed(1)}%`
        }
      };
    });
  }
}
