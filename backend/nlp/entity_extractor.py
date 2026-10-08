import re
from typing import List, Dict, Any, Tuple

# Curated biomedical entity dictionary
BIOMEDICAL_DICTIONARY = {
    "GENE": [
        "BRCA1", "BRCA2", "TP53", "EGFR", "APOE", "APOE4", "TNF", "KRAS", "PTEN", "INS",
        "VEGFA", "IL6", "AKT1", "MTOR", "MYC", "ERBB2", "HER2", "BRAF", "MAPT", "SNCA",
        "CFTR", "ESR1", "PCSK9", "CTNNB1", "PIK3CA", "MLH1", "MSH2", "PALB2", "ATM",
        "ATR", "JAK2", "BCL2", "CD274", "PD-L1", "PD-1", "MDM2", "TREM2", "ALK", "FGFR"
    ],
    "DISEASE": [
        "Breast Cancer", "Ovarian Cancer", "Alzheimer's Disease", "Alzheimer Disease", "Alzheimer",
        "Type 2 Diabetes", "Diabetes", "Colorectal Cancer", "Non-Small Cell Lung Cancer", "Lung Cancer",
        "Glioblastoma", "Parkinson's Disease", "Parkinson Disease", "Parkinson", "Atherosclerosis",
        "Rheumatoid Arthritis", "Cutaneous Melanoma", "Melanoma", "Cystic Fibrosis", "Renal Cell Carcinoma",
        "Burkitt Lymphoma", "Frontotemporal Dementia", "Pancreatic Cancer", "Polycythemia Vera",
        "Endometrial Cancer", "Chronic Lymphocytic Leukemia", "Acute Myeloid Leukemia", "Leukemia",
        "Lymphoma", "Coronary Artery Disease", "Heart Failure", "Ataxia-Telangiectasia", "Lynch Syndrome"
    ],
    "PROTEIN": [
        "Tumor Protein P53", "p53", "Amyloid-beta", "Amyloid-Beta", "Tau", "Alpha-Synuclein",
        "Insulin", "Tumor Necrosis Factor Alpha", "TNF-alpha", "Interleukin-6", "IL-6",
        "Epidermal Growth Factor Receptor", "Vascular Endothelial Growth Factor A", "VEGF",
        "Beta-Catenin", "K-Ras GTPase", "Phosphatase and Tensin Homolog", "Proprotein Convertase",
        "PCSK9 Protein", "Estrogen Receptor Alpha", "ER-alpha", "Janus Kinase 2", "BCL-2"
    ],
    "DRUG": [
        "Olaparib", "Osimertinib", "Trastuzumab", "Metformin", "Semaglutide", "Pembrolizumab",
        "Sotorasib", "Palbociclib", "Vemurafenib", "Adalimumab", "Tocilizumab", "Venetoclax",
        "Evolocumab", "Ivacaftor", "Lecanemab", "Donanemab", "Bevacizumab", "Elacestrant",
        "Alpelisib", "PARP inhibitor", "tyrosine kinase inhibitor", "checkpoint inhibitor"
    ]
}

class EntityExtractor:
    def __init__(self):
        self.entity_patterns: List[Tuple[re.Pattern, str, str]] = []
        self._compile_patterns()

    def _compile_patterns(self):
        for ent_type, names in BIOMEDICAL_DICTIONARY.items():
            for name in names:
                # Word boundary matching with case-insensitive flag
                pattern = re.compile(rf'\b{re.escape(name)}\b', re.IGNORECASE)
                self.entity_patterns.append((pattern, ent_type, name))

    def extract_entities(self, text: str) -> List[Dict[str, Any]]:
        """Extract biological entities with offsets, preventing nested duplicates."""
        if not text:
            return []

        extracted = []
        occupied_spans = []

        # Sort patterns by length descending so longer terms match first (e.g. 'Type 2 Diabetes' before 'Diabetes')
        sorted_patterns = sorted(self.entity_patterns, key=lambda x: len(x[2]), reverse=True)

        for pattern, ent_type, canonical_name in sorted_patterns:
            for match in pattern.finditer(text):
                start, end = match.span()
                matched_str = match.group()

                # Check overlap
                overlap = any(
                    (start >= s and start < e) or (end > s and end <= e)
                    for s, e in occupied_spans
                )
                if not overlap:
                    occupied_spans.append((start, end))
                    extracted.append({
                        "text": matched_str,
                        "type": ent_type,
                        "start": start,
                        "end": end,
                        "canonical": canonical_name
                    })

        extracted.sort(key=lambda x: x["start"])
        return extracted
