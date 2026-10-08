from typing import Dict, List, Set, Any
from collections import defaultdict
from backend.ir_engine.tokenizer import tokenize

class InvertedIndex:
    def __init__(self):
        # term -> {doc_id: term_frequency}
        self.index: Dict[str, Dict[int, int]] = defaultdict(dict)
        # doc_id -> total token count in document
        self.doc_lengths: Dict[int, int] = {}
        # doc_id -> list of original tokens
        self.doc_tokens: Dict[int, List[str]] = {}
        # doc_id -> metadata dictionary
        self.doc_metadata: Dict[int, Dict[str, Any]] = {}
        self.num_docs: int = 0
        self.avg_doc_length: float = 0.0

    def add_document(self, doc_id: int, text: str, metadata: Dict[str, Any] = None):
        tokens = tokenize(text)
        self.doc_lengths[doc_id] = len(tokens)
        self.doc_tokens[doc_id] = tokens
        self.doc_metadata[doc_id] = metadata or {}
        
        freqs: Dict[str, int] = defaultdict(int)
        for token in tokens:
            freqs[token] += 1
            
        for term, freq in freqs.items():
            self.index[term][doc_id] = freq

        self.num_docs = len(self.doc_lengths)
        if self.num_docs > 0:
            self.avg_doc_length = sum(self.doc_lengths.values()) / self.num_docs

    def get_postings(self, term: str) -> Dict[int, int]:
        """Return postings list {doc_id: term_frequency} for a term."""
        return self.index.get(term.lower(), {})

    def get_document_frequency(self, term: str) -> int:
        return len(self.index.get(term.lower(), {}))

    def get_candidate_docs(self, query_tokens: List[str]) -> Set[int]:
        candidates: Set[int] = set()
        for token in query_tokens:
            postings = self.get_postings(token)
            candidates.update(postings.keys())
        return candidates

    def clear(self):
        self.index.clear()
        self.doc_lengths.clear()
        self.doc_tokens.clear()
        self.doc_metadata.clear()
        self.num_docs = 0
        self.avg_doc_length = 0.0
