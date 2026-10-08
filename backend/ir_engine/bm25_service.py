import math
from typing import Dict, List
from collections import Counter
from backend.ir_engine.inverted_index import InvertedIndex

class BM25Service:
    def __init__(self, index: InvertedIndex, k1: float = 1.5, b: float = 0.75):
        self.index = index
        self.k1 = k1
        self.b = b
        self.idf_cache: Dict[str, float] = {}
        self._precompute_idf()

    def _precompute_idf(self):
        N = self.index.num_docs
        for term in self.index.index.keys():
            df = self.index.get_document_frequency(term)
            # Robertson-Sparck Jones BM25 IDF formulation
            idf = math.log(1.0 + (N - df + 0.5) / (df + 0.5))
            self.idf_cache[term] = max(idf, 0.0)

    def score_query(self, query_tokens: List[str]) -> Dict[int, float]:
        scores: Dict[int, float] = {}
        if not query_tokens or self.index.num_docs == 0:
            return scores

        avgdl = self.index.avg_doc_length or 1.0
        candidates = self.index.get_candidate_docs(query_tokens)
        q_freqs = Counter(query_tokens)

        for doc_id in candidates:
            score = 0.0
            doc_len = self.index.doc_lengths.get(doc_id, 1)
            doc_postings = self.index.doc_tokens.get(doc_id, [])
            term_counts = Counter(doc_postings)

            for term, q_tf in q_freqs.items():
                if term not in term_counts:
                    continue
                tf = term_counts[term]
                idf = self.idf_cache.get(term, 0.0)
                
                # BM25 numerator and denominator
                num = tf * (self.k1 + 1.0)
                denom = tf + self.k1 * (1.0 - self.b + self.b * (doc_len / avgdl))
                score += idf * (num / denom)

            if score > 0:
                scores[doc_id] = score

        return scores
