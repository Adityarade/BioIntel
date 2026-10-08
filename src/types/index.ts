export type EntityType = 'GENE' | 'DISEASE' | 'PROTEIN' | 'DRUG';

export interface DetectedEntity {
  text: string;
  type: EntityType;
  start: number;
  end: number;
  canonical?: string;
  description?: string;
}

export interface Paper {
  id: number;
  title: string;
  authors: string;
  year: number;
  journal: string;
  abstract: string;
  keywords?: string;
  doi?: string;
}

export interface WhyThisResult {
  matchedTerms: string[];
  tfidfScore: number;
  bm25Score: number;
  semanticSimilarity: number;
  finalRelevance: number;
  detectedEntities: string[];
  formula: string;
}

export interface SearchResultItem extends Paper {
  relevanceScore: number;
  whyThisResult: WhyThisResult;
  detectedEntities: DetectedEntity[];
}

export interface Gene {
  id: number;
  symbol: string;
  name: string;
  chromosome?: string;
  type?: string;
  description?: string;
  functions?: string;
  associatedDiseases?: string;
  paperCount?: number;
}

export interface Disease {
  id: number;
  name: string;
  category?: string;
  meshId?: string;
  description?: string;
  associatedGenes?: string;
  primaryManifestations?: string;
  paperCount?: number;
}

export interface Protein {
  id: number;
  name: string;
  uniprotId?: string;
  geneSymbol?: string;
  molecularMassKda?: number;
  cellularLocalization?: string;
  function?: string;
  associatedDiseases?: string;
}

export interface Drug {
  id: number;
  name: string;
  brandName?: string;
  drugClass?: string;
  targetEntities?: string;
  indication?: string;
  mechanismOfAction?: string;
}

export interface Relationship {
  id: number;
  sourceType: string;
  sourceName: string;
  relationshipType: string;
  targetType: string;
  targetName: string;
  confidence: number;
  evidence?: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  resultsCount: number;
  rankingMethod: string;
  timestamp: number;
}

export interface RankingWeights {
  tfidf: number;
  bm25: number;
  semantic: number;
}

export interface SearchFilters {
  entityType: string;
  year: string;
  rankingMethod: 'Hybrid' | 'BM25' | 'TF-IDF' | 'Semantic';
  sortBy: 'Relevance' | 'Newest' | 'Oldest';
  weights: RankingWeights;
}

export interface SystemStats {
  totalPapers: number;
  totalGenes: number;
  totalDiseases: number;
  totalProteins: number;
  totalDrugs: number;
  totalRelationships: number;
  totalIndexedTokens: number;
}
