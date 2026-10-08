from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.database_models import SearchHistoryModel
from backend.schemas.api_schemas import SearchHistoryResponse

router = APIRouter(prefix="/search-history", tags=["Search History"])

@router.get("", response_model=List[SearchHistoryResponse])
def get_search_history(limit: int = 20, db: Session = Depends(get_db)):
    return db.query(SearchHistoryModel).order_by(SearchHistoryModel.created_at.desc()).limit(limit).all()

@router.delete("")
def clear_search_history(db: Session = Depends(get_db)):
    db.query(SearchHistoryModel).delete()
    db.commit()
    return {"message": "Search history cleared successfully"}
