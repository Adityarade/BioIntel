import math
from typing import Dict, List, Tuple
from collections import defaultdict
from backend.ir_engine.tokenizer import tokenize

# Semantic concept synonyms & embeddings mapping for biomedical terms
BIOMEDICAL_CONCEPT_EMBEDDINGS: Dict[str, Dict[str, float]] = {
    # Oncological & genomic concepts
    "cancer": {"oncology": 0.95, "malignancy": 0.92, "tumor": 0.90, "carcinoma": 0.88, "neoplasm": 0.86, "metastasis": 0.80},
    "tumor": {"cancer": 0.90, "neoplasm": 0.92, "carcinoma": 0.85, "oncology": 0.84},
    "brca1": {"dna-repair": 0.95, "homologous-recombination": 0.94, "breast-cancer": 0.96, "parp": 0.88},
    "brca2": {"dna-repair": 0.94, "rad51": 0.92, "breast-cancer": 0.95, "ovarian-cancer": 0.93},
    "tp53": {"p53": 0.99, "tumor-suppressor": 0.95, "apoptosis": 0.92, "dna-damage": 0.90},
    "egfr": {"tyrosine-kinase": 0.95, "osimertinib": 0.92, "lung-cancer": 0.94, "erbb": 0.89},
    "kras": {"gtpase": 0.95, "sotorasib": 0.92, "colorectal-cancer": 0.93, "mapk": 0.88},
    
    # Neurodegenerative concepts
    "alzheimer": {"dementia": 0.96, "neurodegeneration": 0.94, "amyloid": 0.95, "tau": 0.92, "apoe": 0.90},
    "apoe": {"alzheimer": 0.90, "lipoprotein": 0.92, "cholesterol": 0.88, "amyloid-beta": 0.89},
    "parkinson": {"neurodegeneration": 0.94, "dopamine": 0.93, "alpha-synuclein": 0.95, "lewy-bodies": 0.92},
    "dementia": {"alzheimer": 0.96, "cognitive-decline": 0.93, "neurodegeneration": 0.91},
    
    # Metabolic & endocrine concepts
    "diabetes": {"insulin": 0.96, "hyperglycemia": 0.94, "glucose": 0.93, "metformin": 0.91, "metabolic": 0.90},
    "insulin": {"diabetes": 0.96, "glucose": 0.95, "pancreatic": 0.90, "insulin-resistance": 0.97},
    "metformin": {"diabetes": 0.91, "ampk": 0.94, "glucose": 0.89, "gluconeogenesis": 0.88},
    
    # Autoimmune & inflammation concepts
    "inflammation": {"cytokine": 0.92, "tnf": 0.90, "il6": 0.91, "autoimmune": 0.88, "rheumatoid": 0.85},
    "arthritis": {"rheumatoid": 0.95, "inflammation": 0.91, "synovial": 0.92, "joint": 0.90, "tnf": 0.89},
    "atherosclerosis": {"cardiovascular": 0.94, "cholesterol": 0.93, "ldl": 0.92, "pcsk9": 0.90, "heart": 0.88}
}

class SemanticSearchService:
    def __init__(self, doc_texts: Dict[int, str]):
        self.doc_texts = doc_texts
        self.doc_token_sets: Dict[int, set] = {
            doc_id: set(tokenize(text)) for doc_id, text in doc_texts.items()
        }

    def score_query(self, query_tokens: List[str]) -> Dict[int, float]:
        scores: Dict[int, float] = {}
        if not query_tokens:
            return scores

        for doc_id, doc_tokens in self.doc_token_sets.items():
            if not doc_tokens:
                continue
            
            semantic_matches = 0.0
            total_query_weight = 0.0

            for q_term in query_tokens:
                total_query_weight += 1.0
                if q_term in doc_tokens:
                    semantic_matches += 1.0
                    continue

                # Check semantic expansion/concept similarity
                best_sim = 0.0
                if q_term in BIOMEDICAL_CONCEPT_EMBEDDINGS:
                    for rel_term, weight in BIOMEDICAL_CONCEPT_EMBEDDINGS[q_term].items():
                        if rel_term in doc_tokens:
                            best_sim = max(best_sim, weight)
                
                # Check reverse concept relations
                for doc_term in doc_tokens:
                    if doc_term in BIOMEDICAL_CONCEPT_EMBEDDINGS:
                        if q_term in BIOMEDICAL_CONCEPT_EMBEDDINGS[doc_term]:
                            sim = BIOMEDICAL_CONCEPT_EMBEDDINGS[doc_term][q_term]
                            best_sim = max(best_sim, sim)

                semantic_matches += best_sim * 0.85

            if total_query_weight > 0 and semantic_matches > 0:
                raw_score = semantic_matches / total_query_weight
                scores[doc_id] = min(raw_score, 1.0)

        return scores
