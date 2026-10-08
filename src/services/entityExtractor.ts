import { DetectedEntity, EntityType } from '../types';

export const BIOMEDICAL_VOCABULARY: Record<EntityType, { names: string[]; color: string; bg: string; border: string }> = {
  GENE: {
    names: [
      "BRCA1", "BRCA2", "TP53", "EGFR", "APOE4", "APOE", "TNF", "KRAS", "PTEN", "INS",
      "VEGFA", "IL6", "AKT1", "MTOR", "MYC", "ERBB2", "HER2", "BRAF", "MAPT", "SNCA",
      "CFTR", "ESR1", "PCSK9", "CTNNB1", "PIK3CA", "MLH1", "MSH2", "PALB2", "ATM",
      "ATR", "JAK2", "BCL2", "CD274", "PD-L1", "PD-1", "MDM2", "TREM2", "ALK", "FGFR"
    ],
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.1)",
    border: "rgba(37, 99, 235, 0.3)"
  },
  DISEASE: {
    names: [
      "Breast Cancer", "Ovarian Cancer", "Alzheimer's Disease", "Alzheimer Disease", "Alzheimer",
      "Type 2 Diabetes", "Diabetes", "Colorectal Cancer", "Non-Small Cell Lung Cancer", "Lung Cancer",
      "Glioblastoma", "Parkinson's Disease", "Parkinson Disease", "Parkinson", "Atherosclerosis",
      "Rheumatoid Arthritis", "Cutaneous Melanoma", "Melanoma", "Cystic Fibrosis", "Renal Cell Carcinoma",
      "Burkitt Lymphoma", "Frontotemporal Dementia", "Pancreatic Cancer", "Polycythemia Vera",
      "Endometrial Cancer", "Chronic Lymphocytic Leukemia", "Acute Myeloid Leukemia", "Leukemia",
      "Lymphoma", "Coronary Artery Disease", "Heart Failure", "Ataxia-Telangiectasia", "Lynch Syndrome"
    ],
    color: "#0891b2",
    bg: "rgba(8, 145, 178, 0.1)",
    border: "rgba(8, 145, 178, 0.3)"
  },
  PROTEIN: {
    names: [
      "Tumor Protein P53", "p53", "Amyloid-beta", "Amyloid-Beta", "Tau", "Alpha-Synuclein",
      "Insulin", "Tumor Necrosis Factor Alpha", "TNF-alpha", "Interleukin-6", "IL-6",
      "Epidermal Growth Factor Receptor", "Vascular Endothelial Growth Factor A", "VEGF",
      "Beta-Catenin", "K-Ras GTPase", "Phosphatase and Tensin Homolog", "Proprotein Convertase",
      "PCSK9 Protein", "Estrogen Receptor Alpha", "ER-alpha", "Janus Kinase 2", "BCL-2"
    ],
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.1)",
    border: "rgba(5, 150, 105, 0.3)"
  },
  DRUG: {
    names: [
      "Olaparib", "Osimertinib", "Trastuzumab", "Metformin", "Semaglutide", "Pembrolizumab",
      "Sotorasib", "Palbociclib", "Vemurafenib", "Adalimumab", "Tocilizumab", "Venetoclax",
      "Evolocumab", "Ivacaftor", "Lecanemab", "Donanemab", "Bevacizumab", "Elacestrant",
      "Alpelisib", "PARP inhibitor", "tyrosine kinase inhibitor", "checkpoint inhibitor"
    ],
    color: "#d97706",
    bg: "rgba(217, 119, 6, 0.1)",
    border: "rgba(217, 119, 6, 0.3)"
  }
};

export class EntityExtractor {
  private compiledPatterns: { regex: RegExp; type: EntityType; canonical: string }[] = [];

  constructor() {
    this.compilePatterns();
  }

  private compilePatterns() {
    const list: { name: string; type: EntityType }[] = [];
    (Object.keys(BIOMEDICAL_VOCABULARY) as EntityType[]).forEach(type => {
      BIOMEDICAL_VOCABULARY[type].names.forEach(name => {
        list.push({ name, type });
      });
    });

    // Sort longer terms first to match greedy multi-word entities
    list.sort((a, b) => b.name.length - a.name.length);

    this.compiledPatterns = list.map(item => ({
      regex: new RegExp(`\\b${item.name.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')}\\b`, 'gi'),
      type: item.type,
      canonical: item.name
    }));
  }

  public extractEntities(text: string): DetectedEntity[] {
    if (!text) return [];

    const results: DetectedEntity[] = [];
    const occupiedSpans: [number, number][] = [];

    for (const pattern of this.compiledPatterns) {
      pattern.regex.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.regex.exec(text)) !== null) {
        const start = match.index;
        const end = match.index + match[0].length;

        const isOverlapping = occupiedSpans.some(
          ([s, e]) => (start >= s && start < e) || (end > s && end <= e)
        );

        if (!isOverlapping) {
          occupiedSpans.push([start, end]);
          results.push({
            text: match[0],
            type: pattern.type,
            start,
            end,
            canonical: pattern.canonical
          });
        }
      }
    }

    return results.sort((a, b) => a.start - b.start);
  }
}

export const entityExtractorInstance = new EntityExtractor();
