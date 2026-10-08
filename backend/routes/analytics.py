from typing import Dict, Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.database.connection import get_db
from backend.models.database_models import PaperModel, GeneModel, DiseaseModel, ProteinModel, DrugModel, RelationshipModel, SearchHistoryModel
from backend.schemas.api_schemas import StatsResponse

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/stats", response_model=StatsResponse)
def get_system_stats(db: Session = Depends(get_db)):
    from backend.routes.search import inverted_index
    token_count = len(inverted_index.index) if inverted_index else 1250
    
    return StatsResponse(
        total_papers=db.query(PaperModel).count(),
        total_genes=db.query(GeneModel).count(),
        total_diseases=db.query(DiseaseModel).count(),
        total_proteins=db.query(ProteinModel).count(),
        total_drugs=db.query(DrugModel).count(),
        total_relationships=db.query(RelationshipModel).count(),
        total_indexed_tokens=token_count
    )

@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    # 1. Papers by Year
    year_rows = db.query(PaperModel.year, func.count(PaperModel.id)).group_by(PaperModel.year).order_by(PaperModel.year).all()
    papers_by_year = [{"year": str(r[0]), "count": r[1]} for r in year_rows]

    # 2. Entity Distribution
    entity_counts = [
        {"entity": "Genes", "count": db.query(GeneModel).count(), "color": "#2563eb"},
        {"entity": "Diseases", "count": db.query(DiseaseModel).count(), "color": "#06b6d4"},
        {"entity": "Proteins", "count": db.query(ProteinModel).count(), "color": "#10b981"},
        {"entity": "Drugs", "count": db.query(DrugModel).count(), "color": "#f59e0b"},
        {"entity": "Papers", "count": db.query(PaperModel).count(), "color": "#8b5cf6"}
    ]

    # 3. Top Gene Frequencies
    genes = db.query(GeneModel).limit(10).all()
    top_genes = []
    for g in genes:
        cnt = db.query(PaperModel).filter(
            (PaperModel.abstract.ilike(f"%{g.symbol}%")) | (PaperModel.title.ilike(f"%{g.symbol}%"))
        ).count()
        top_genes.append({"symbol": g.symbol, "name": g.name, "occurrences": cnt})
    top_genes.sort(key=lambda x: x["occurrences"], reverse=True)

    # 4. Top Disease Categories
    disease_cat_rows = db.query(DiseaseModel.category, func.count(DiseaseModel.id)).group_by(DiseaseModel.category).all()
    disease_categories = [{"category": r[0] or "General", "count": r[1]} for r in disease_cat_rows]

    # 5. Top Relationship Types
    rel_rows = db.query(RelationshipModel.relationship_type, func.count(RelationshipModel.id)).group_by(RelationshipModel.relationship_type).all()
    relationship_types = [{"type": r[0], "count": r[1]} for r in rel_rows]

    # 6. Recent Searches
    recent_searches = db.query(SearchHistoryModel).order_by(SearchHistoryModel.created_at.desc()).limit(8).all()
    history = [{"query": s.query, "results_count": s.results_count, "ranking_method": s.ranking_method, "time": s.created_at.isoformat()} for s in recent_searches]

    return {
        "papers_by_year": papers_by_year,
        "entity_distribution": entity_counts,
        "top_genes": top_genes[:8],
        "disease_categories": disease_categories,
        "relationship_types": relationship_types,
        "recent_searches": history
    }
