import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.database.connection import engine, Base, SessionLocal
from backend.models.database_models import PaperModel
from backend.ir_engine.inverted_index import InvertedIndex
from backend.ir_engine.tfidf_service import TFIDFService
from backend.ir_engine.bm25_service import BM25Service
from backend.ir_engine.semantic_service import SemanticSearchService
from backend.ir_engine.hybrid_ranker import HybridRanker
from backend.nlp.entity_extractor import EntityExtractor
from backend.routes import search, papers, entities, analytics, history

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BioIntel")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create DB tables
    logger.info("Initializing database tables...")
    Base.metadata.create_all(bind=engine)

    # Initialize IR Index
    logger.info("Building biomedical Inverted Index, TF-IDF, and BM25 models...")
    db = SessionLocal()
    try:
        all_papers = db.query(PaperModel).all()
        inv_index = InvertedIndex()
        doc_texts = {}

        for p in all_papers:
            full_text = f"{p.title} {p.abstract} {p.keywords or ''}"
            doc_texts[p.id] = full_text
            inv_index.add_document(p.id, full_text, {"title": p.title, "year": p.year})

        tfidf_svc = TFIDFService(inv_index)
        bm25_svc = BM25Service(inv_index, k1=settings.BM25_K1, b=settings.BM25_B)
        sem_svc = SemanticSearchService(doc_texts)
        ranker = HybridRanker(
            index=inv_index,
            tfidf_service=tfidf_svc,
            bm25_service=bm25_svc,
            semantic_service=sem_svc,
            default_w_tfidf=settings.WEIGHT_TFIDF,
            default_w_bm25=settings.WEIGHT_BM25,
            default_w_semantic=settings.WEIGHT_SEMANTIC
        )
        extractor = EntityExtractor()

        # Connect services to routers
        search.init_search_engine(inv_index, ranker, extractor)
        papers.init_paper_services(extractor, tfidf_svc)

        logger.info(f"BioIntel IR Engine initialized with {inv_index.num_docs} papers and {len(inv_index.index)} unique terms.")
    finally:
        db.close()

    yield
    logger.info("Shutting down BioIntel application...")

app = FastAPI(
    title="BioIntel API",
    description="Intelligent Biomedical Information Retrieval & Knowledge Discovery Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(search.router, prefix=settings.API_V1_STR)
app.include_router(papers.router, prefix=settings.API_V1_STR)
app.include_router(entities.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(history.router, prefix=settings.API_V1_STR)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BioIntel Biomedical IR Engine",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
