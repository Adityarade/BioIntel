import time
from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.database_models import PaperModel, SearchHistoryModel
from backend.schemas.api_schemas import SearchRequest, SearchResponse, PaperResponse, WhyThisResult, DetectedEntity

router = APIRouter(prefix="/search", tags=["Search"])

# Globals set by main.py lifecycle
inverted_index = None
hybrid_ranker = None
entity_extractor = None

def init_search_engine(index, ranker, extractor):
    global inverted_index, hybrid_ranker, entity_extractor
    inverted_index = index
    hybrid_ranker = ranker
    entity_extractor = extractor

@router.post("", response_model=SearchResponse)
def execute_search(req: SearchRequest, db: Session = Depends(get_db)):
    start_time = time.time()
    
    # Extract entities in user query
    query_entities = entity_extractor.extract_entities(req.query) if entity_extractor else []
    
    # Run hybrid IR ranking
    ranked_docs = []
    if hybrid_ranker:
        ranked_docs = hybrid_ranker.rank(
            query=req.query,
            ranking_method=req.ranking_method or "Hybrid",
            w_tfidf=req.weight_tfidf,
            w_bm25=req.weight_bm25,
            w_semantic=req.weight_semantic
        )

    # Fetch papers from DB or memory
    doc_map = {r["doc_id"]: r for r in ranked_docs}
    candidate_ids = list(doc_map.keys())

    query_db = db.query(PaperModel).filter(PaperModel.id.in_(candidate_ids))

    # Apply year filter
    if req.year_filter:
        query_db = query_db.filter(PaperModel.year == req.year_filter)

    papers = query_db.all()

    # Apply entity filter if specified
    filtered_results = []
    for paper in papers:
        ir_info = doc_map.get(paper.id, {})
        # Extract entities from paper abstract and title
        full_text = f"{paper.title}. {paper.abstract}"
        doc_entities = entity_extractor.extract_entities(full_text) if entity_extractor else []

        if req.entity_filter and req.entity_filter != "All":
            entity_types_in_doc = {e["type"] for e in doc_entities}
            if req.entity_filter.upper() not in entity_types_in_doc:
                continue

        # Format Why This Result
        score_val = ir_info.get("relevance_score", 0.0)
        why = WhyThisResult(
            matched_terms=ir_info.get("matched_terms", []),
            tfidf_score=ir_info.get("tfidf_score", 0.0),
            bm25_score=ir_info.get("bm25_score", 0.0),
            semantic_similarity=ir_info.get("semantic_similarity", 0.0),
            final_relevance=score_val,
            detected_entities=[e["text"] for e in doc_entities[:8]],
            formula_explanation=ir_info.get("formula", "")
        )

        p_resp = PaperResponse(
            id=paper.id,
            title=paper.title,
            authors=paper.authors,
            year=paper.year,
            journal=paper.journal,
            abstract=paper.abstract,
            keywords=paper.keywords,
            doi=paper.doi,
            relevance_score=score_val,
            why_this_result=why,
            detected_entities=[
                DetectedEntity(
                    text=e["text"],
                    type=e["type"],
                    start=e["start"],
                    end=e["end"]
                ) for e in doc_entities
            ]
        )
        filtered_results.append(p_resp)

    # Sorting
    if req.sort_by == "Newest":
        filtered_results.sort(key=lambda x: x.year, reverse=True)
    elif req.sort_by == "Oldest":
        filtered_results.sort(key=lambda x: x.year)
    else:  # Relevance
        filtered_results.sort(key=lambda x: x.relevance_score or 0.0, reverse=True)

    elapsed_ms = (time.time() - start_time) * 1000

    # Persist in search history
    try:
        hist_entry = SearchHistoryModel(
            query=req.query,
            results_count=len(filtered_results),
            ranking_method=req.ranking_method or "Hybrid"
        )
        db.add(hist_entry)
        db.commit()
    except Exception:
        db.rollback()

    return SearchResponse(
        query=req.query,
        total_results=len(filtered_results),
        results=filtered_results,
        detected_query_entities=[
            DetectedEntity(
                text=e["text"],
                type=e["type"],
                start=e["start"],
                end=e["end"]
            ) for e in query_entities
        ],
        execution_time_ms=round(elapsed_ms, 2),
        ranking_method=req.ranking_method or "Hybrid"
    )

@router.get("", response_model=SearchResponse)
def search_get(
    q: str = Query(..., description="Search query"),
    entity_filter: Optional[str] = "All",
    year_filter: Optional[int] = None,
    ranking_method: Optional[str] = "Hybrid",
    sort_by: Optional[str] = "Relevance",
    db: Session = Depends(get_db)
):
    req = SearchRequest(
        query=q,
        entity_filter=entity_filter,
        year_filter=year_filter,
        ranking_method=ranking_method,
        sort_by=sort_by
    )
    return execute_search(req, db)
