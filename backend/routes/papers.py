from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.database_models import PaperModel
from backend.schemas.api_schemas import PaperResponse, DetectedEntity

router = APIRouter(prefix="/papers", tags=["Papers"])

# References to NLP and IR services
entity_extractor = None
tfidf_service = None

def init_paper_services(extractor, tfidf):
    global entity_extractor, tfidf_service
    entity_extractor = extractor
    tfidf_service = tfidf

@router.get("", response_model=List[PaperResponse])
def get_papers(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    year: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(PaperModel)
    if year:
        query = query.filter(PaperModel.year == year)
    papers = query.offset(skip).limit(limit).all()

    results = []
    for p in papers:
        full_text = f"{p.title}. {p.abstract}"
        ents = entity_extractor.extract_entities(full_text) if entity_extractor else []
        results.append(PaperResponse(
            id=p.id,
            title=p.title,
            authors=p.authors,
            year=p.year,
            journal=p.journal,
            abstract=p.abstract,
            keywords=p.keywords,
            doi=p.doi,
            detected_entities=[
                DetectedEntity(
                    text=e["text"],
                    type=e["type"],
                    start=e["start"],
                    end=e["end"]
                ) for e in ents
            ]
        ))
    return results

@router.get("/{paper_id}", response_model=PaperResponse)
def get_paper_by_id(paper_id: int, db: Session = Depends(get_db)):
    paper = db.query(PaperModel).filter(PaperModel.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Biomedical paper not found")

    full_text = f"{paper.title}. {paper.abstract}"
    ents = entity_extractor.extract_entities(full_text) if entity_extractor else []

    return PaperResponse(
        id=paper.id,
        title=paper.title,
        authors=paper.authors,
        year=paper.year,
        journal=paper.journal,
        abstract=paper.abstract,
        keywords=paper.keywords,
        doi=paper.doi,
        detected_entities=[
            DetectedEntity(
                text=e["text"],
                type=e["type"],
                start=e["start"],
                end=e["end"]
            ) for e in ents
        ]
    )

@router.get("/{paper_id}/related", response_model=List[PaperResponse])
def get_related_papers(paper_id: int, top_k: int = 5, db: Session = Depends(get_db)):
    target = db.query(PaperModel).filter(PaperModel.id == paper_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Paper not found")

    if not tfidf_service:
        return []

    # Query using target keywords or title tokens
    from backend.ir_engine.tokenizer import tokenize
    query_tokens = tokenize(f"{target.title} {target.keywords or ''}")
    scores = tfidf_service.score_query(query_tokens)

    # Exclude self
    scores.pop(paper_id, None)

    sorted_doc_ids = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
    related_ids = [d[0] for d in sorted_doc_ids]

    related_papers = db.query(PaperModel).filter(PaperModel.id.in_(related_ids)).all()
    score_map = dict(sorted_doc_ids)

    results = []
    for p in related_papers:
        full_text = f"{p.title}. {p.abstract}"
        ents = entity_extractor.extract_entities(full_text) if entity_extractor else []
        results.append(PaperResponse(
            id=p.id,
            title=p.title,
            authors=p.authors,
            year=p.year,
            journal=p.journal,
            abstract=p.abstract,
            keywords=p.keywords,
            doi=p.doi,
            relevance_score=round(score_map.get(p.id, 0.0), 4),
            detected_entities=[
                DetectedEntity(
                    text=e["text"],
                    type=e["type"],
                    start=e["start"],
                    end=e["end"]
                ) for e in ents
            ]
        ))
    results.sort(key=lambda x: x.relevance_score or 0.0, reverse=True)
    return results
