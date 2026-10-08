import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BioIntel"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./biointel.db")
    DATASET_DIR: str = os.getenv("DATASET_DIR", os.path.join(os.path.dirname(__file__), "..", "dataset"))
    
    # Information Retrieval Ranking default weights
    WEIGHT_TFIDF: float = 0.35
    WEIGHT_BM25: float = 0.35
    WEIGHT_SEMANTIC: float = 0.30
    
    BM25_K1: float = 1.5
    BM25_B: float = 0.75

    class Config:
        case_sensitive = True

settings = Settings()
