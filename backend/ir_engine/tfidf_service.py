import math
from typing import Dict, List, Tuple
from collections import Counter
from backend.ir_engine.inverted_index import InvertedIndex

class TFIDFService:
    def __init__(self, index: InvertedIndex):
        self.index = index
        self.doc_tfidf_vectors: Dict[int, Dict[str, float]] = {}
        self.doc_vector_norms: Dict[int, float] = {}
        self._build_vectors()

    def _build_vectors(self):
        """Precompute TF-IDF vectors and norms for all documents."""
        N = self.index.num_docs
        if N == 0:
            return

        for doc_id, tokens in self.index.doc_tokens.items():
            freqs = Counter(tokens)
            doc_len = len(tokens)
            vec: Dict[str, float] = {}
            norm_sq = 0.0

            for term, count in freqs.items():
                df = self.index.get_document_frequency(term)
                # Augmented TF to prevent bias toward longer documents
                tf = count / doc_len if doc_len > 0 else 0
                # Smooth IDF
                idf = math.log((N + 1) / (df + 1)) + 1.0
                weight = tf * idf
                vec[term] = weight
                norm_sq += weight * weight

            self.doc_tfidf_vectors[doc_id] = vec
            self.doc_vector_norms[doc_id] = math.sqrt(norm_sq) if norm_sq > 0 else 1.0

    def score_query(self, query_tokens: List[str]) -> Dict[int, float]:
        """Compute Cosine Similarity between query TF-IDF vector and documents."""
        scores: Dict[int, float] = {}
        if not query_tokens or self.index.num_docs == 0:
            return scores

        N = self.index.num_docs
        q_freqs = Counter(query_tokens)
        q_len = len(query_tokens)
        
        q_vec: Dict[str, float] = {}
        q_norm_sq = 0.0

        for term, count in q_freqs.items():
            df = self.index.get_document_frequency(term)
            if df == 0:
                continue
            tf = count / q_len
            idf = math.log((N + 1) / (df + 1)) + 1.0
            weight = tf * idf
            q_vec[term] = weight
            q_norm_sq += weight * weight

        q_norm = math.sqrt(q_norm_sq)
        if q_norm == 0.0:
            return scores

        candidates = self.index.get_candidate_docs(query_tokens)
        for doc_id in candidates:
            doc_vec = self.doc_tfidf_vectors.get(doc_id, {})
            dot_product = 0.0
            for term, q_weight in q_vec.items():
                if term in doc_vec:
                    dot_product += q_weight * doc_vec[term]

            doc_norm = self.doc_vector_norms.get(doc_id, 1.0)
            cosine_sim = dot_product / (q_norm * doc_norm) if (q_norm * doc_norm) > 0 else 0.0
            scores[doc_id] = min(max(cosine_sim, 0.0), 1.0)

        return scores
