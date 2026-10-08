from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class DetectedEntity(BaseModel):
    text: str
    type: str  # GENE, DISEASE, PROTEIN, DRUG
    start: int
    end: int
    metadata: Optional[Dict[str, Any]] = None

class WhyThisResult(BaseModel):
    matched_terms: List[str]
    tfidf_score: float
    bm25_score: float
    semantic_similarity: float
    final_relevance: float
    detected_entities: List[str]
    formula_explanation: str

class PaperResponse(BaseModel):
    id: int
    title: str
    authors: str
    year: int
    journal: str
    abstract: str
    keywords: Optional[str] = None
    doi: Optional[str] = None
    relevance_score: Optional[float] = None
    why_this_result: Optional[WhyThisResult] = None
    detected_entities: Optional[List[DetectedEntity]] = None

    class Config:
        from_attributes = True

class SearchRequest(BaseModel):
    query: str
    entity_filter: Optional[str] = "All"
    year_filter: Optional[int] = None
    ranking_method: Optional[str] = "Hybrid"  # TF-IDF, BM25, Semantic, Hybrid
    sort_by: Optional[str] = "Relevance"      # Relevance, Newest, Oldest
    weight_tfidf: Optional[float] = 0.35
    weight_bm25: Optional[float] = 0.35
    weight_semantic: Optional[float] = 0.30
    page: Optional[int] = 1
    page_size: Optional[int] = 10

class SearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[PaperResponse]
    detected_query_entities: List[DetectedEntity]
    execution_time_ms: float
    ranking_method: str

class GeneResponse(BaseModel):
    id: int
    symbol: str
    name: str
    chromosome: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    functions: Optional[str] = None
    associated_diseases: Optional[str] = None
    paper_count: Optional[int] = 0

    class Config:
        from_attributes = True

class DiseaseResponse(BaseModel):
    id: int
    name: str
    category: Optional[str] = None
    mesh_id: Optional[str] = None
    description: Optional[str] = None
    associated_genes: Optional[str] = None
    primary_manifestations: Optional[str] = None
    paper_count: Optional[int] = 0

    class Config:
        from_attributes = True

class ProteinResponse(BaseModel):
    id: int
    name: str
    uniprot_id: Optional[str] = None
    gene_symbol: Optional[str] = None
    molecular_mass_kda: Optional[float] = None
    cellular_localization: Optional[str] = None
    function: Optional[str] = None
    associated_diseases: Optional[str] = None

    class Config:
        from_attributes = True

class DrugResponse(BaseModel):
    id: int
    name: str
    brand_name: Optional[str] = None
    drug_class: Optional[str] = None
    target_entities: Optional[str] = None
    indication: Optional[str] = None
    mechanism_of_action: Optional[str] = None

    class Config:
        from_attributes = True

class RelationshipResponse(BaseModel):
    id: int
    source_type: str
    source_name: str
    relationship_type: str
    target_type: str
    target_name: str
    confidence: float
    evidence: Optional[str] = None

    class Config:
        from_attributes = True

class SearchHistoryResponse(BaseModel):
    id: int
    query: str
    results_count: int
    ranking_method: str
    created_at: datetime

    class Config:
        from_attributes = True

class StatsResponse(BaseModel):
    total_papers: int
    total_genes: int
    total_diseases: int
    total_proteins: int
    total_drugs: int
    total_relationships: int
    total_indexed_tokens: int
