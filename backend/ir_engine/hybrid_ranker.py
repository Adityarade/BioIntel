from typing import Dict, List, Tuple, Any
from backend.ir_engine.inverted_index import InvertedIndex
from backend.ir_engine.tfidf_service import TFIDFService
from backend.ir_engine.bm25_service import BM25Service
from backend.ir_engine.semantic_service import SemanticSearchService
from backend.ir_engine.tokenizer import tokenize

class HybridRanker:
    def __init__(
        self,
        index: InvertedIndex,
        tfidf_service: TFIDFService,
        bm25_service: BM25Service,
        semantic_service: SemanticSearchService,
        default_w_tfidf: float = 0.35,
        default_w_bm25: float = 0.35,
        default_w_semantic: float = 0.30
    ):
        self.index = index
        self.tfidf_service = tfidf_service
        self.bm25_service = bm25_service
        self.semantic_service = semantic_service
        self.w_tfidf = default_w_tfidf
        self.w_bm25 = default_w_bm25
        self.w_semantic = default_w_semantic

    def _normalize_scores(self, scores: Dict[int, float]) -> Dict[int, float]:
        if not scores:
            return {}
        max_val = max(scores.values())
        if max_val <= 0:
            return {k: 0.0 for k in scores}
        return {k: v / max_val for k, v in scores.items()}

    def rank(
        self,
        query: str,
        ranking_method: str = "Hybrid",
        w_tfidf: float = None,
        w_bm25: float = None,
        w_semantic: float = None
    ) -> List[Dict[str, Any]]:
        query_tokens = tokenize(query)
        if not query_tokens:
            return []

        w1 = self.w_tfidf if w_tfidf is None else w_tfidf
        w2 = self.w_bm25 if w_bm25 is None else w_bm25
        w3 = self.w_semantic if w_semantic is None else w_semantic
        total_w = w1 + w2 + w3 or 1.0
        w1, w2, w3 = w1 / total_w, w2 / total_w, w3 / total_w

        # Compute component scores
        tfidf_scores = self.tfidf_service.score_query(query_tokens)
        bm25_scores = self.bm25_service.score_query(query_tokens)
        semantic_scores = self.semantic_service.score_query(query_tokens)

        # Candidate union
        candidate_ids = set(tfidf_scores.keys()) | set(bm25_scores.keys()) | set(semantic_scores.keys())

        # Normalize
        norm_tfidf = self._normalize_scores(tfidf_scores)
        norm_bm25 = self._normalize_scores(bm25_scores)
        norm_semantic = self._normalize_scores(semantic_scores)

        results: List[Dict[str, Any]] = []

        for doc_id in candidate_ids:
            s_tf = norm_tfidf.get(doc_id, 0.0)
            s_bm = norm_bm25.get(doc_id, 0.0)
            s_sem = norm_semantic.get(doc_id, 0.0)

            if ranking_method == "TF-IDF":
                final_score = s_tf
            elif ranking_method == "BM25":
                final_score = s_bm
            elif ranking_method == "Semantic":
                final_score = s_sem
            else:  # Hybrid
                final_score = (w1 * s_tf) + (w2 * s_bm) + (w3 * s_sem)

            # Matched query terms in document
            doc_toks = set(self.index.doc_tokens.get(doc_id, []))
            matched = [t for t in query_tokens if t in doc_toks]

            results.append({
                "doc_id": doc_id,
                "relevance_score": round(final_score, 4),
                "tfidf_score": round(s_tf, 4),
                "bm25_score": round(s_bm, 4),
                "semantic_similarity": round(s_sem, 4),
                "matched_terms": matched,
                "formula": f"Final = ({w1:.2f} × {s_tf:.2f}) + ({w2:.2f} × {s_bm:.2f}) + ({w3:.2f} × {s_sem:.2f}) = {final_score:.2f}"
            })

        results.sort(key=lambda x: x["relevance_score"], reverse=True)
        return results
