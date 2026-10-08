import { Paper, Gene, Disease, Protein, Drug, Relationship } from '../types';

export const SEED_PAPERS: Paper[] = [
  {
    id: 1,
    title: "BRCA1 and BRCA2 Germline Mutations in Familial Breast Cancer and Ovarian Cancer Risk",
    authors: "Narod SA, Offit K, Couch FJ",
    year: 2023,
    journal: "The New England Journal of Medicine",
    abstract: "Inherited germline mutations in BRCA1 and BRCA2 genes significantly elevate susceptibility to breast cancer and epithelial ovarian cancer. We analyzed DNA repair deficiency, homologous recombination mechanisms, and clinical outcomes across 4,500 carrier families. PARP inhibitor therapies show remarkable efficacy in tumors with homologous recombination deficiency.",
    keywords: "BRCA1, BRCA2, breast cancer, ovarian cancer, DNA repair, PARP inhibitor, homologous recombination",
    doi: "10.1056/NEJMra2208123"
  },
  {
    id: 2,
    title: "Mechanisms of EGFR Tyrosine Kinase Inhibitor Resistance in Non-Small Cell Lung Cancer",
    authors: "Sharma SV, Bell DW, Settleman J, Haber DA",
    year: 2022,
    journal: "Nature Reviews Cancer",
    abstract: "Epidermal growth factor receptor (EGFR) mutations drive a significant subset of non-small cell lung cancer cases. Although first-line tyrosine kinase inhibitors like Osimertinib produce high response rates, secondary mutations such as T790M and MET amplification inevitably mediate acquired drug resistance. Targetable downstream pathways include MAPK and PI3K-AKT signaling.",
    keywords: "EGFR, lung cancer, tyrosine kinase, Osimertinib, MET, T790M, MAPK, PI3K",
    doi: "10.1038/nrc.2022.45"
  },
  {
    id: 3,
    title: "APOE4 Allele and Amyloid-Beta Deposition in Pathogenesis of Alzheimer's Disease",
    authors: "Holtzman DM, Herz J, Bu G",
    year: 2024,
    journal: "Neuron",
    abstract: "The Apolipoprotein E epsilon 4 (APOE4) allele represents the most prominent genetic risk factor for sporadic late-onset Alzheimer's disease. APOE isoforms differential modulate clearance and aggregation of amyloid-beta peptides in the brain parenchyma and cerebrovasculature. Tau neurofibrillary tangles and microglial neuroinflammation correlate closely with APOE4-dependent synaptic degradation.",
    keywords: "APOE, Alzheimer disease, amyloid-beta, Tau, neuroinflammation, neurodegeneration",
    doi: "10.1016/j.neuron.2024.01.015"
  },
  {
    id: 4,
    title: "Molecular Characterization and Therapeutic Vulnerabilities of TP53 Mutations in Human Cancers",
    authors: "Freed-Pastor WA, Prives C",
    year: 2023,
    journal: "Cell",
    abstract: "Tumor protein p53 encoded by the TP53 gene orchestrates cellular responses to DNA damage, oncogenic stress, and hypoxia by enforcing cell cycle arrest, senescence, or apoptosis. Missense mutations in TP53 not only abrogate wild-type tumor suppressor capability but often confer oncogenic gain-of-function activities promoting invasion, chemoresistance, and metabolic reprogramming.",
    keywords: "TP53, p53, tumor suppressor, apoptosis, DNA damage, cancer genomics, senescence",
    doi: "10.1016/j.cell.2023.03.022"
  },
  {
    id: 5,
    title: "Insulin Resistance, Adipokines, and Metabolic Dysfunction in Type 2 Diabetes Pathogenesis",
    authors: "Kahn SE, Cooper ME, Del Prato S",
    year: 2023,
    journal: "The Lancet",
    abstract: "Type 2 diabetes arises from a progressive deterioration of pancreatic beta-cell insulin secretion coupled with peripheral insulin resistance in skeletal muscle, liver, and adipose tissue. Pro-inflammatory cytokines including TNF and IL6 disrupt insulin receptor substrate signaling. Metformin and GLP-1 receptor agonists enhance insulin sensitivity and protect cardiovascular health.",
    keywords: "insulin, insulin resistance, Type 2 diabetes, TNF, IL6, Metformin, GLP-1",
    doi: "10.1016/S0140-6736(23)00412-9"
  },
  {
    id: 6,
    title: "Targeting the KRAS G12C Oncogene in Colorectal Cancer and Pancreatic Ductal Adenocarcinoma",
    authors: "Canon J, Rex K, Saiki AY, Cox AD",
    year: 2024,
    journal: "Cancer Discovery",
    abstract: "KRAS was long deemed an undruggable oncogene in human malignancies. Novel covalent inhibitors targeting the switch-II pocket of KRAS G12C, such as Sotorasib and Adagrasib, demonstrate substantial clinical response in colorectal cancer and non-small cell lung cancer. Combination therapies inhibiting upstream EGFR or downstream MEK prevent compensatory reactivation.",
    keywords: "KRAS, colorectal cancer, pancreatic cancer, Sotorasib, EGFR, MEK, mutation",
    doi: "10.1158/2159-8290.CD-23-1180"
  },
  {
    id: 7,
    title: "PTEN Phosphatase Loss and PI3K/AKT/mTOR Hyperactivation in Glioblastoma and Prostate Cancer",
    authors: "Carracedo A, Pandolfi PP",
    year: 2022,
    journal: "Nature Reviews Molecular Cell Biology",
    abstract: "The PTEN tumor suppressor lipid phosphatase dephosphorylates PIP3 to PIP2, directly opposing PI3K kinase signaling. Loss or epigenetic silencing of PTEN leads to hyperactivation of AKT1 and mTOR kinase, fostering tumor cell survival, energetic glycolysis, and angiogenesis in glioblastoma and prostate cancer. Dual PI3K/mTOR inhibitors offer prospective therapeutic synergy.",
    keywords: "PTEN, PI3K, AKT1, mTOR, glioblastoma, prostate cancer, phosphatase",
    doi: "10.1038/s41580-022-00465-9"
  },
  {
    id: 8,
    title: "VEGFA-Mediated Angiogenesis and Anti-VEGF Therapy Resistance in Colorectal and Renal Cancers",
    authors: "Ferrara N, Adamis AP",
    year: 2023,
    journal: "Cellular and Molecular Life Sciences",
    abstract: "Vascular endothelial growth factor A (VEGFA) plays an indispensable role in pathological tumor angiogenesis and vascular permeability. Monoclonal antibodies such as Bevacizumab neutralize circulating VEGFA to inhibit microvascular vessel sprouts in metastatic colorectal and renal cell carcinomas. Compensatory upregulation of FGF and angiopoietin pathways drives acquired refractory vascularization.",
    keywords: "VEGFA, angiogenesis, Bevacizumab, colorectal cancer, renal cancer, vascularization",
    doi: "10.1007/s00018-023-04810-w"
  },
  {
    id: 9,
    title: "Inflammatory Cytokines TNF-alpha and Interleukin-6 in Rheumatoid Arthritis Pathophysiology",
    authors: "McInnes IB, Schett G",
    year: 2024,
    journal: "New England Journal of Medicine",
    abstract: "Chronic autoimmune synovial inflammation in rheumatoid arthritis is mediated by an aberrant cytokine cascade dominated by Tumor Necrosis Factor alpha (TNF) and Interleukin-6 (IL6). These mediators stimulate osteoclastogenesis, cartilage breakdown, and systemic inflammation. Biologic agents including Adalimumab (anti-TNF) and Tocilizumab (anti-IL6R) confer robust disease remission.",
    keywords: "TNF, IL6, rheumatoid arthritis, Adalimumab, Tocilizumab, inflammation, autoimmune",
    doi: "10.1056/NEJMra2305141"
  },
  {
    id: 10,
    title: "Tau Pathology, MAPT Splicing Variants, and Frontotemporal Dementia with Neurodegeneration",
    authors: "Ghetti B, Oblak AL, Gao FP, Holtzman DM",
    year: 2023,
    journal: "Acta Neuropathologica",
    abstract: "Microtubule-associated protein tau (encoded by MAPT) stabilizes axonal microtubules. Hyperphosphorylation and abnormal alternative splicing of MAPT result in toxic oligomers and paired helical filaments characteristic of frontotemporal lobar degeneration and Alzheimer's disease. Biomarkers measuring plasma p-tau217 enable early diagnosis before severe cognitive loss.",
    keywords: "MAPT, Tau, neurodegeneration, Alzheimer disease, frontotemporal dementia, microtubules",
    doi: "10.1007/s00401-023-02598-y"
  },
  {
    id: 11,
    title: "HER2/neu (ERBB2) Overexpression and Antibody-Drug Conjugates in Metastatic Breast Cancer",
    authors: "Modi S, Saura C, Yamashita T, Slamon DJ",
    year: 2023,
    journal: "Journal of Clinical Oncology",
    abstract: "Human epidermal growth factor receptor 2 (HER2, encoded by ERBB2) amplification defines approximately 15-20% of invasive breast carcinomas. Next-generation antibody-drug conjugates such as Trastuzumab deruxtecan deliver cytotoxic topoisomerase I inhibitors directly into HER2-positive and HER2-low malignant cells, dramatically prolonging progression-free survival.",
    keywords: "HER2, ERBB2, breast cancer, Trastuzumab, antibody-drug conjugate, targeted therapy",
    doi: "10.1200/JCO.22.02980"
  },
  {
    id: 12,
    title: "Targeted BRAF V600E and MEK Inhibition in Advanced Cutaneous Melanoma",
    authors: "Flaherty KT, Robert C, Hersey P",
    year: 2022,
    journal: "Lancet Oncology",
    abstract: "Activating mutations in the BRAF kinase domain, specifically BRAF V600E, constitutively trigger the mitogen-activated protein kinase (MAPK) cascade in cutaneous melanoma. Dual targeted regimens combining Vemurafenib or Dabrafenib with MEK inhibitors such as Trametinib effectively suppress tumor proliferation, delaying resistance emergence through reactivation loops.",
    keywords: "BRAF, melanoma, Vemurafenib, Trametinib, MAPK, oncogene, skin cancer",
    doi: "10.1016/S1470-2045(22)00219-5"
  },
  {
    id: 13,
    title: "Alpha-Synuclein Aggregation and Dopaminergic Neuron Vulnerability in Parkinson's Disease",
    authors: "Poewe W, Seppi K, Tanner CM, Halliday GM",
    year: 2023,
    journal: "Nature Reviews Disease Primers",
    abstract: "Parkinson's disease is pathologically distinguished by the progressive loss of substantia nigra dopaminergic neurons and intracellular accumulation of Lewy bodies comprised of aggregated alpha-synuclein (encoded by the SNCA gene). Mitochondrial dysfunction, lysosomal impairment, and neuroinflammatory responses promote alpha-synuclein cell-to-cell propagation across brain circuits.",
    keywords: "SNCA, alpha-synuclein, Parkinson disease, dopamine, neurodegeneration, Lewy bodies",
    doi: "10.1038/s41572-023-00445-2"
  },
  {
    id: 14,
    title: "CFTR Channel Mutations and Ion Transport Correction in Cystic Fibrosis",
    authors: "Rowe SM, Miller S, Sorscher EJ",
    year: 2024,
    journal: "New England Journal of Medicine",
    abstract: "Cystic fibrosis is an autosomal recessive disorder caused by mutations in the cystic fibrosis transmembrane conductance regulator (CFTR) gene, leading to defective chloride and bicarbonate epithelial transport. Triple combination CFTR modulators (Elexacaftor, Tezacaftor, Ivacaftor) restore trafficking and gating of the common delta-F508 mutant channel, improving pulmonary function.",
    keywords: "CFTR, cystic fibrosis, Ivacaftor, chloride transport, lung disease, genetic disorder",
    doi: "10.1056/NEJMra2311029"
  },
  {
    id: 15,
    title: "Estrogen Receptor Alpha (ESR1) Mutations and Endocrine Therapy Resistance in Breast Cancer",
    authors: "Jeselsohn R, Buchwalter G, De Angelis C, Brown M",
    year: 2023,
    journal: "Nature Reviews Clinical Oncology",
    abstract: "Activating point mutations in the ligand-binding domain of ESR1 (estrogen receptor alpha) frequently emerge in metastatic hormone receptor-positive breast cancer following aromatase inhibitor therapy. These mutations cause constitutive, ligand-independent transcription. Novel selective estrogen receptor degraders (SERDs) such as Elacestrant effectively degrade mutant ESR1 proteins.",
    keywords: "ESR1, breast cancer, estrogen receptor, Elacestrant, endocrine therapy, resistance",
    doi: "10.1038/s41571-023-00742-1"
  },
  {
    id: 16,
    title: "Atherosclerosis Pathophysiology, LDL Cholesterol, and Proprotein Convertase PCSK9 Inhibition",
    authors: "Libby P, Buring JE, Badimon L, Hansson GK",
    year: 2024,
    journal: "Circulation",
    abstract: "Atherosclerosis is an inflammatory disease of the arterial wall initiated by subendothelial retention and oxidation of low-density lipoprotein (LDL) particles. PCSK9 binds hepatic LDL receptors to promote lysosomal degradation. Monoclonal antibodies targeting PCSK9 (Evolocumab, Alirocumab) dramatically lower circulating LDL-C levels and reduce ischemic cardiovascular events.",
    keywords: "PCSK9, atherosclerosis, LDL cholesterol, cardiovascular disease, Evolocumab, inflammation",
    doi: "10.1161/CIRCULATIONAHA.123.064500"
  },
  {
    id: 17,
    title: "Wnt/Beta-Catenin Signaling and APC Inactivation in Colorectal Carcinoma Genesis",
    authors: "Clevers H, Nusse R",
    year: 2023,
    journal: "Cell Stem Cell",
    abstract: "The canonical Wnt signaling cascade regulates stem cell maintenance and tissue homeostasis. Loss-of-function mutations in the APC tumor suppressor gene or activating mutations in CTNNB1 (beta-catenin) prevent beta-catenin degradation by the destruction complex. Nuclear accumulation of beta-catenin activates oncogenic transcription factors MYC and CCND1 to drive colorectal adenocarcinoma.",
    keywords: "CTNNB1, APC, colorectal cancer, Wnt signaling, beta-catenin, MYC, oncogenesis",
    doi: "10.1016/j.stem.2023.05.008"
  },
  {
    id: 18,
    title: "MYC Oncogene Deregulation and Metabolic Vulnerabilities in B-Cell Lymphomas",
    authors: "Dang CV, Le A, Gao P",
    year: 2022,
    journal: "Blood",
    abstract: "The MYC proto-oncogene encodes a basic helix-loop-helix leucine zipper transcription factor that coordinates cell proliferation, ribosome biogenesis, and metabolic fuel switching toward glutaminolysis and aerobic glycolysis. Chromosomal translocations in Burkitt lymphoma dysregulate MYC expression, sensitizing tumors to synthetic lethal inhibitors of glutaminase and CDK9.",
    keywords: "MYC, lymphoma, transcription factor, glycolysis, metabolism, oncogene",
    doi: "10.1182/blood.2022016541"
  },
  {
    id: 19,
    title: "PIK3CA Mutations and PI3K Alpha Inhibitors in Advanced Hormone Receptor Breast Cancer",
    authors: "André F, Ciruelos E, Rubovszky G, Baselga J",
    year: 2023,
    journal: "Lancet Oncology",
    abstract: "Activating mutations in the catalytic subunit alpha of phosphoinositide 3-kinase (PIK3CA) occur in 40% of HR+/HER2- breast cancers. The alpha-specific PI3K inhibitor Alpelisib combined with Fulvestrant significantly prolongs progression-free survival in patients with PIK3CA-mutated tumors who previously received endocrine therapy, though hyperglycemia requires active clinical management.",
    keywords: "PIK3CA, breast cancer, Alpelisib, PI3K, AKT, endocrine therapy, mutation",
    doi: "10.1016/S1470-2045(23)00115-4"
  },
  {
    id: 20,
    title: "DNA Mismatch Repair Deficiency, Microsatellite Instability, and Immune Checkpoint Blockade",
    authors: "Le DT, Durham JN, Smith KN, Diaz LA",
    year: 2023,
    journal: "Science",
    abstract: "Defects in DNA mismatch repair (dMMR) genes including MLH1, MSH2, MSH6, and PMS2 impair repair of replication errors, leading to microsatellite instability (MSI-High) and neoantigen load in colorectal and endometrial cancers. High mutational burden induces dense tumor-infiltrating lymphocytes responsive to PD-1 checkpoint inhibitors such as Pembrolizumab.",
    keywords: "MLH1, MSH2, DNA repair, microsatellite instability, Pembrolizumab, colorectal cancer, immunotherapy",
    doi: "10.1126/science.aao2890"
  },
  {
    id: 21,
    title: "CDK4/6 Inhibitors and Cell Cycle Arrest in Estrogen Receptor-Positive Breast Cancer",
    authors: "Finn RS, Martin M, Rugo HS, Slamon DJ",
    year: 2022,
    journal: "New England Journal of Medicine",
    abstract: "Cyclin-dependent kinases 4 and 6 (CDK4/6) govern the G1-to-S cell cycle checkpoint by phosphorylating the retinoblastoma (RB1) tumor suppressor. Selective CDK4/6 inhibitors such as Palbociclib, Ribociclib, and Abemaciclib induce durable cell cycle arrest and synergize with endocrine therapy in advanced estrogen receptor-positive metastatic breast cancer.",
    keywords: "CDK4, CDK6, RB1, breast cancer, Palbociclib, Ribociclib, cell cycle",
    doi: "10.1056/NEJMoa2200214"
  },
  {
    id: 22,
    title: "PARP Inhibitors and Synthetic Lethality in Homologous Recombination-Deficient Ovarian Cancer",
    authors: "Lord CJ, Ashworth A",
    year: 2023,
    journal: "Nature",
    abstract: "Synthetic lethality exploits genetic vulnerabilities in tumor cells. Cells harboring inactivating mutations in BRCA1 or BRCA2 rely heavily on poly(ADP-ribose) polymerase (PARP) for single-strand break repair. PARP inhibitors trap PARP1 at DNA lesions, converting single-strand breaks into lethal double-strand breaks during replication in homologous recombination-deficient ovarian cancers.",
    keywords: "BRCA1, BRCA2, PARP, Olaparib, ovarian cancer, synthetic lethality, DNA repair",
    doi: "10.1038/s41586-023-05991-2"
  },
  {
    id: 23,
    title: "GLP-1 Receptor Agonism and SGLT2 Inhibition in Diabetic Kidney Disease Progression",
    authors: "Perkovic V, Jardine MJ, Neal B, Wheeler DC",
    year: 2024,
    journal: "Lancet Diabetes & Endocrinology",
    abstract: "Diabetic kidney disease represents the principal cause of end-stage renal failure worldwide. Semaglutide (GLP-1 receptor agonist) and Dapagliflozin (SGLT2 inhibitor) attenuate renal hyperfiltration, reduce albuminuria, dampen tubulointerstitial inflammation, and protect vascular endothelial integrity in patients suffering from Type 2 diabetes and hypertension.",
    keywords: "Semaglutide, Dapagliflozin, Type 2 diabetes, kidney disease, insulin, albuminuria",
    doi: "10.1016/S2213-8587(24)00032-1"
  },
  {
    id: 24,
    title: "Microglial Activation and Neuroinflammatory Signaling in Alzheimer's Disease",
    authors: "Heneka MT, Carson MJ, El Khoury J, Landreth GE",
    year: 2023,
    journal: "Nature Reviews Neuroscience",
    abstract: "Microglia undergo distinct transcriptional transitions toward disease-associated microglia (DAM) phenotypes during Alzheimer's disease development. Dysfunctional TREM2 signaling and sustained NLRP3 inflammasome activation accelerate amyloid-beta seeding and tau hyperphosphorylation, exacerbating neuronal synaptic pruning and cognitive deterioration.",
    keywords: "TREM2, Alzheimer disease, amyloid-beta, neuroinflammation, microglia, Tau",
    doi: "10.1038/nrn.2023.21"
  },
  {
    id: 25,
    title: "ALK Gene Rearrangements and Targeted Tyrosine Kinase Inhibitors in Lung Adenocarcinoma",
    authors: "Shaw AT, Bauer TM, de Marinis F, Solomon BJ",
    year: 2024,
    journal: "Journal of Thoracic Oncology",
    abstract: "Chromosomal inversions generating the EML4-ALK fusion oncogene define a distinct molecular subset of non-small cell lung cancer. Third-generation ALK inhibitors including Lorlatinib penetrate the blood-brain barrier and overcome compound resistance mutations that arise after Crizotinib and Alectinib treatment, yielding sustained intracranial tumor regression.",
    keywords: "ALK, lung cancer, Lorlatinib, tyrosine kinase, EML4-ALK, oncogene",
    doi: "10.1016/j.jtho.2023.12.008"
  },
  {
    id: 26,
    title: "ATM and ATR Kinases in the DNA Damage Response and Cancer Therapeutic Targets",
    authors: "Blackford AN, Jackson SP",
    year: 2023,
    journal: "Nature Reviews Molecular Cell Biology",
    abstract: "The ataxia telangiectasia mutated (ATM) and ATM-and-Rad3-related (ATR) kinases are central orchestrators of eukaryotic DNA damage responses. ATM responds predominantly to DNA double-strand breaks, phosphorylating p53, CHK2, and H2AX. Selective small-molecule ATR inhibitors induce replication catastrophe in tumors harboring ATM or p53 loss.",
    keywords: "ATM, ATR, TP53, DNA repair, DNA damage, cancer therapeutics, kinase",
    doi: "10.1038/s41580-023-00624-x"
  },
  {
    id: 27,
    title: "JAK-STAT Signaling Aberrations in Myeloproliferative Neoplasms and Ruxolitinib Therapy",
    authors: "Vannucchi AM, Harrison CN",
    year: 2023,
    journal: "Blood",
    abstract: "Somatic gain-of-function mutations in the JAK2 kinase (specifically JAK2 V617F) or CALR driver genes disrupt negative regulatory loops, causing constitutive JAK-STAT signaling in polycythemia vera, essential thrombocythemia, and primary myelofibrosis. The JAK1/JAK2 inhibitor Ruxolitinib ameliorates splenomegaly and reduces constitutional inflammatory symptoms.",
    keywords: "JAK2, STAT, Ruxolitinib, myeloproliferative neoplasm, leukemia, hematology",
    doi: "10.1182/blood.2023020084"
  },
  {
    id: 28,
    title: "Metformin Action on Mitochondrial Complex I and AMP-Activated Protein Kinase (AMPK)",
    authors: "Viollet B, Guigas B, Sanz Garcia N, Leclerc J",
    year: 2022,
    journal: "Endocrine Reviews",
    abstract: "Metformin remains the primary oral pharmacotherapy for Type 2 diabetes. Its cellular mechanisms involve mild, reversible inhibition of mitochondrial respiratory chain complex I, leading to an elevated AMP-to-ATP ratio and activation of AMP-activated protein kinase (AMPK). Activated AMPK suppresses hepatic gluconeogenesis and augments muscle glucose uptake.",
    keywords: "Metformin, AMPK, Type 2 diabetes, insulin, mitochondria, gluconeogenesis",
    doi: "10.1210/endrev/bnac018"
  },
  {
    id: 29,
    title: "PD-L1 Expression, Tumor Mutational Burden, and Checkpoint Inhibitors in Non-Small Cell Lung Cancer",
    authors: "Reck M, Rodríguez-Abreu D, Robinson AG, Brahmer JR",
    year: 2023,
    journal: "Lancet Oncology",
    abstract: "Programmed death-ligand 1 (PD-L1, CD274) binds PD-1 on activated cytotoxic T cells to transmit inhibitory immune signals. First-line monotherapy with Pembrolizumab or Atezolizumab prolongs overall survival in advanced non-small cell lung cancer with tumor proportion scores of 50% or higher, especially in the absence of EGFR and ALK alterations.",
    keywords: "PD-L1, CD274, lung cancer, Pembrolizumab, immunotherapy, checkpoint inhibitor",
    doi: "10.1016/S1470-2045(23)00290-1"
  },
  {
    id: 30,
    title: "Bcl-2 Inhibition with Venetoclax in Relapsed Chronic Lymphocytic Leukemia and AML",
    authors: "DiNardo CD, Jonas BA, Pullarkat V, Wei AH",
    year: 2023,
    journal: "New England Journal of Medicine",
    abstract: "The anti-apoptotic protein BCL2 confers survival advantages upon hematologic malignancies by sequestering pro-apoptotic BH3-only proteins. Venetoclax acts as an orally bioavailable BH3-mimetic that selectively displaces BIM from BCL2, rapidly triggering mitochondrial outer membrane permeabilization and apoptosis in chronic lymphocytic leukemia and acute myeloid leukemia.",
    keywords: "BCL2, Venetoclax, leukemia, apoptosis, Bcl-2, hematology, chemotherapy",
    doi: "10.1056/NEJMoa2212390"
  },
  {
    id: 31,
    title: "Apolipoprotein E Isoforms and Cerebrovascular Amyloid Angiopathy in Aging Brains",
    authors: "Greenberg SM, Bacskai BJ, Hernandez-Guillamon M",
    year: 2024,
    journal: "Lancet Neurology",
    abstract: "Cerebral amyloid angiopathy (CAA) is characterized by vascular deposition of amyloid-beta within cortical and leptomeningeal arteries, frequently leading to lobar intracerebral hemorrhage and cognitive decline. The APOE epsilon 4 allele escalates vascular amyloid burden, whereas the rare protective APOE Christchurch mutation mitigates neurodegeneration.",
    keywords: "APOE, Alzheimer disease, amyloid-beta, cerebral amyloid angiopathy, neurovascular",
    doi: "10.1016/S1474-4422(24)00080-6"
  },
  {
    id: 32,
    title: "Fibroblast Growth Factor Receptor (FGFR) Genetic Alterations in Cholangiocarcinoma and Bladder Cancer",
    authors: "Loriot Y, Necchi A, Park SH, Garcia-Donas J",
    year: 2023,
    journal: "Nature Reviews Clinical Oncology",
    abstract: "Activating FGFR2 gene fusions and FGFR3 point mutations generate ligand-independent receptor dimerization in intrahepatic cholangiocarcinoma and urothelial bladder carcinomas. Selective oral pan-FGFR tyrosine kinase inhibitors such as Pemigatinib and Erdafitinib exhibit significant antitumor responses in pretreated patients harboring documented FGFR alterations.",
    keywords: "FGFR2, FGFR3, cholangiocarcinoma, bladder cancer, Pemigatinib, tyrosine kinase",
    doi: "10.1038/s41571-023-00812-4"
  },
  {
    id: 33,
    title: "Cardiovascular Risk Reduction with SGLT2 Inhibitors: Mechanisms Beyond Glycemic Control",
    authors: "Packer M, Anker SD, Butler J, Filippatos G",
    year: 2022,
    journal: "Circulation",
    abstract: "Sodium-glucose cotransporter 2 (SGLT2) inhibitors like Empagliflozin and Dapagliflozin were initially engineered for glycemic control in Type 2 diabetes. Large outcome trials demonstrate marked reductions in cardiovascular mortality and heart failure hospitalizations irrespective of baseline glycated hemoglobin, attributable to osmotic diuresis, improved myocardial energetics, and diminished arterial stiffness.",
    keywords: "SGLT2, Empagliflozin, Dapagliflozin, heart failure, Type 2 diabetes, cardiovascular",
    doi: "10.1161/CIRCULATIONAHA.122.059800"
  },
  {
    id: 34,
    title: "Interleukin-1 Beta Neutralization and Atheroprotection in Coronary Artery Disease",
    authors: "Ridker PM, Everett BM, Thuren T, MacFadyen JG",
    year: 2023,
    journal: "European Heart Journal",
    abstract: "Atherosclerosis represents an innate immune-mediated vascular disease driven by cholesterol crystal activation of the NLRP3 inflammasome and interleukin-1 beta (IL1B) release. In the landmark CANTOS study, the anti-IL-1B monoclonal antibody Canakinumab significantly lowered recurrent cardiovascular events without altering lipid levels, proving the inflammatory hypothesis of atherothrombosis.",
    keywords: "IL1B, atherosclerosis, Canakinumab, inflammation, cardiovascular disease, NLRP3",
    doi: "10.1093/eurheartj/ehad340"
  },
  {
    id: 35,
    title: "Targeting Epigenetic Regulators: EZH2 and Histone Methylation in Epithelioid Sarcoma and Lymphoma",
    authors: "Italiano A, Soria JC, Toulmonde M, Michot JM",
    year: 2023,
    journal: "Lancet Oncology",
    abstract: "Enhancer of zeste homolog 2 (EZH2) serves as the catalytic subunit of the polycomb repressive complex 2 (PRC2), catalyzing trimethylation of histone H3 at lysine 27 (H3K27me3) to repress gene transcription. EZH2 gain-of-function mutations or loss of INI1 drive tumorigenesis. Tazemetostat, an oral selective EZH2 inhibitor, induces clinical remissions in follicular lymphoma and epithelioid sarcoma.",
    keywords: "EZH2, epigenetics, sarcoma, lymphoma, Tazemetostat, histone methylation",
    doi: "10.1016/S1470-2045(23)00041-0"
  },
  {
    id: 36,
    title: "DNA Repair Gene PALB2 Mutations and Inherited Susceptibility to Breast and Pancreatic Cancer",
    authors: "Antoniou AC, Casadei S, Heikkinen T, Barrowdale D",
    year: 2023,
    journal: "New England Journal of Medicine",
    abstract: "Partner and localizer of BRCA2 (encoded by PALB2) bridges BRCA1 and BRCA2 at sites of DNA double-strand breaks during homologous recombination repair. Truncating PALB2 mutations confer substantial lifetime risks of breast cancer and familial pancreatic ductal adenocarcinoma, comparable to BRCA2 mutations, and confer sensitivity to platinum chemotherapy and PARP inhibitors.",
    keywords: "PALB2, BRCA1, BRCA2, DNA repair, breast cancer, pancreatic cancer, homologous recombination",
    doi: "10.1056/NEJMoa2208912"
  },
  {
    id: 37,
    title: "NOTCH1 Signaling Mutations and T-Cell Acute Lymphoblastic Leukemia Pathobiology",
    authors: "Weng AP, Ferrando AA, Lee W, Morris JP",
    year: 2022,
    journal: "Genes & Development",
    abstract: "Activating mutations in the NOTCH1 heterodimerization or PEST domains occur in over 60% of pediatric and adult T-cell acute lymphoblastic leukemia (T-ALL) patients. Deregulated NOTCH1 signaling drives expression of downstream target genes including MYC, HES1, and DTX1. Gamma-secretase inhibitors prevent cleavage of active intracellular NOTCH, though gastrointestinal toxicity warrants combination strategies.",
    keywords: "NOTCH1, leukemia, MYC, T-ALL, oncogene, transcription factor",
    doi: "10.1101/gad.220194"
  },
  {
    id: 38,
    title: "Targeting the Complement Cascade in Paroxysmal Nocturnal Hemoglobinuria and Glomerulopathy",
    authors: "Hillmen P, Szer J, Weitz I, Röth A",
    year: 2024,
    journal: "New England Journal of Medicine",
    abstract: "Paroxysmal nocturnal hemoglobinuria (PNH) is an acquired clonal hematopoietic stem cell disorder causing deficiency of GPI-anchored complement regulatory proteins CD55 and CD59. Uncontrolled terminal complement C5 activation results in severe intravascular hemolysis and thrombosis. Monoclonal antibodies against C5 (Eculizumab, Ravulizumab) and proximal C3 inhibitors effectively normalize hemoglobin levels.",
    keywords: "C5, C3, complement, Eculizumab, hematology, hemolysis, autoimmune",
    doi: "10.1056/NEJMra2309110"
  },
  {
    id: 39,
    title: "Vascular Endothelial Growth Factor Receptor Tyrosine Kinase Inhibitors in Renal Cell Carcinoma",
    authors: "Choueiri TK, Powles T, Burotto M, Escudier B",
    year: 2023,
    journal: "New England Journal of Medicine",
    abstract: "Inactivation of the von Hippel-Lindau (VHL) tumor suppressor gene leads to constitutive stabilization of hypoxia-inducible factor (HIF) and downstream overexpression of VEGFA in clear cell renal cell carcinoma. Multikinase inhibitors targeting VEGFR (Cabozantinib, Lenvatinib, Axitinib) combined with immune checkpoint inhibitors have established new standards of care for first-line metastatic renal carcinoma.",
    keywords: "VEGFR, VEGFA, VHL, renal cancer, Cabozantinib, tyrosine kinase, angiogenesis",
    doi: "10.1056/NEJMoa2301980"
  },
  {
    id: 40,
    title: "Tumor Necrosis Factor Receptor-Associated Factors (TRAFs) in NF-kB Activation and Autoimmunity",
    authors: "Xie P, Bishop GA",
    year: 2023,
    journal: "Frontiers in Immunology",
    abstract: "Tumor necrosis factor receptor-associated factors (TRAF proteins) transduce signals from the TNF receptor superfamily and Toll-like receptors to drive NF-kB and MAPK activation. Aberrant TRAF2 and TRAF6 signaling perpetuates chronic tissue inflammation in rheumatoid arthritis, systemic lupus erythematosus, and inflammatory bowel disease. Small molecule TRAF antagonists are under active preclinical development.",
    keywords: "TNF, TRAF, rheumatoid arthritis, NF-kB, autoimmune, inflammation",
    doi: "10.3389/fimmu.2023.1189201"
  },
  {
    id: 41,
    title: "Amyloid Precursor Protein (APP) Cleavage and Beta-Secretase 1 (BACE1) in Alzheimer's Pathogenesis",
    authors: "Vassar R, Kuhn PH, Haass C, Lichtenthaler SF",
    year: 2023,
    journal: "Journal of Neurochemistry",
    abstract: "Sequential proteolytic cleavage of the amyloid precursor protein (APP) by beta-site APP cleaving enzyme 1 (BACE1) and gamma-secretase yields neurotoxic amyloid-beta 42 peptides. While familial early-onset Alzheimer's disease mutations cluster near the APP cleavage site, therapeutic BACE1 small molecule inhibitors caused unexpected cognitive worsening, shifting therapeutic focus toward immunoclearance antibodies like Lecanemab.",
    keywords: "APP, BACE1, amyloid-beta, Alzheimer disease, Lecanemab, neurodegeneration",
    doi: "10.1111/jnc.15810"
  },
  {
    id: 42,
    title: "Targeting HER3 (ERBB3) and NRG1 Fusions in Solid Tumors and Targeted Therapy Resistance",
    authors: "Haikala HM, Jänne PA",
    year: 2024,
    journal: "Cancer Cell",
    abstract: "HER3 (ERBB3) lacks intrinsic kinase activity but functions as an indispensable heterodimerization partner for EGFR and HER2, potently activating the PI3K-AKT survival axis. NRG1 gene rearrangements create chimeric proteins that stimulate HER3 phosphorylation. Patritumab deruxtecan, an anti-HER3 antibody-drug conjugate, achieves clinical responses in EGFR-mutant lung cancer resistant to osimertinib.",
    keywords: "ERBB3, HER3, EGFR, HER2, lung cancer, breast cancer, PI3K",
    doi: "10.1016/j.ccell.2024.01.002"
  },
  {
    id: 43,
    title: "Interleukin-6 Signaling in Cytokine Release Syndrome and Sepsis Induced Organ Failure",
    authors: "Kang S, Tanaka T, Narazaki M, Kishimoto T",
    year: 2023,
    journal: "Immunity",
    abstract: "Hyperactivation of Interleukin-6 (IL6) trans-signaling via soluble IL-6 receptor (sIL-6R) and gp130 mediates endothelial barrier disruption and hypercoagulability during cytokine release syndrome (CRS) in CAR-T cell immunotherapy and severe sepsis. Blockade with Tocilizumab or Sarilumab swiftly reverses systemic hypotension and respiratory distress.",
    keywords: "IL6, cytokine release syndrome, Tocilizumab, inflammation, autoimmune, sepsis",
    doi: "10.1016/j.immuni.2023.03.011"
  },
  {
    id: 44,
    title: "DNA Polymerase Epsilon (POLE) Proofreading Mutations and Hypermutation in Endometrial Cancer",
    authors: "Church DN, Stelloo E, Nout RA, Bosse T",
    year: 2023,
    journal: "Lancet Oncology",
    abstract: "Somatic exonuclease domain mutations in POLE compromise the proofreading capability of DNA polymerase epsilon, resulting in ultra-hypermutated genomes characterized by thousands of single-nucleotide variants in endometrial carcinoma and colorectal cancer. Paradoxically, POLE-mutant tumors exhibit exceptionally favorable prognoses and robust immunogenicity due to elevated neoantigen expression.",
    keywords: "POLE, DNA repair, endometrial cancer, hypermutation, immunotherapy, colorectal cancer",
    doi: "10.1016/S1470-2045(23)00155-5"
  },
  {
    id: 45,
    title: "Role of Gut Microbiota in Short-Chain Fatty Acids Production and Insulin Sensitivity",
    authors: "Cani PD, Van Hul M, Lefort C, Depommier C",
    year: 2023,
    journal: "Nature Reviews Gastroenterology & Hepatology",
    abstract: "The human intestinal microbiota synthesizes short-chain fatty acids (acetate, propionate, butyrate) through fermentation of dietary fibers. These metabolites stimulate G-protein coupled receptors GPR41 and GPR43, promoting GLP-1 secretion and systemic insulin sensitivity while reducing adipose tissue inflammation in obesity and Type 2 diabetes models.",
    keywords: "insulin resistance, Type 2 diabetes, GLP-1, microbiota, metabolism, inflammation",
    doi: "10.1038/s41575-023-00788-2"
  },
  {
    id: 46,
    title: "Targeting MDM2-p53 Interaction to Reactivate Tumor Suppression in Hematologic Malignancies",
    authors: "Konieczny I, Prives C, Burgess AW",
    year: 2023,
    journal: "Frontiers in Oncology",
    abstract: "In tumors retaining wild-type TP53, MDM2 acts as the primary E3 ubiquitin ligase targeting p53 for proteasomal degradation. Small molecule MDM2 antagonists (Nutlins, Idasanutlin, Siremadlin) prevent MDM2-p53 binding, stabilizing p53 and provoking cell cycle arrest and apoptosis in acute myeloid leukemia and dedifferentiated liposarcoma.",
    keywords: "TP53, p53, MDM2, apoptosis, leukemia, sarcoma, tumor suppressor",
    doi: "10.3389/fonc.2023.1098411"
  },
  {
    id: 47,
    title: "CD20-Targeted Monoclonal Antibodies and Bispecific T-Cell Engagers in B-Cell Non-Hodgkin Lymphoma",
    authors: "Salles G, Barrett M, Foà R, Maurer J",
    year: 2022,
    journal: "Blood",
    abstract: "CD20 (MS4A1) is an unglycosylated phosphoprotein expressed on mature B lymphocytes and B-cell lymphomas. Anti-CD20 monoclonal antibodies (Rituximab, Obinutuzumab) revolutionized chemoimmunotherapy. Next-generation bispecific antibodies like Glofitamab and Epcoritamab bridge CD20-expressing lymphoma cells to CD3 on T cells, generating profound cytotoxic responses in refractory diffuse large B-cell lymphoma.",
    keywords: "CD20, MS4A1, lymphoma, Rituximab, immunotherapy, bispecific antibody",
    doi: "10.1182/blood.2022015520"
  },
  {
    id: 48,
    title: "Targeting the AXL and MERTK Receptor Tyrosine Kinases in Cancer Immune Evasion",
    authors: "Akalu YT, Rothlin CV, Ghosh S",
    year: 2023,
    journal: "Nature Reviews Immunology",
    abstract: "The TAM receptor tyrosine kinases (TYRO3, AXL, MERTK) normally mediate phagocytic clearance of apoptotic cells and suppress immune responses. In the tumor microenvironment, AXL overexpression on malignant cells fosters epithelial-mesenchymal transition and suppresses dendritic cell cross-presentation. Selective AXL inhibitors overcome anti-PD-1 resistance across lung, ovarian, and triple-negative breast cancers.",
    keywords: "AXL, MERTK, breast cancer, lung cancer, immunotherapy, tyrosine kinase, resistance",
    doi: "10.1038/s41577-023-00854-3"
  },
  {
    id: 49,
    title: "Insulin-Like Growth Factor 1 (IGF-1) Signaling in Sarcopenia and Metabolic Regulation",
    authors: "Clemmons DR",
    year: 2023,
    journal: "Endocrine Reviews",
    abstract: "Insulin-like growth factor 1 (IGF-1) acts downstream of growth hormone to stimulate protein synthesis via the PI3K/AKT/mTOR cascade. Reduced circulating IGF-1 during aging correlates with progressive loss of skeletal muscle mass (sarcopenia) and worsened insulin resistance in elderly populations afflicted with Type 2 diabetes.",
    keywords: "IGF1, insulin resistance, Type 2 diabetes, mTOR, AKT1, metabolism, muscle",
    doi: "10.1210/endrev/bnad012"
  },
  {
    id: 50,
    title: "RAD51 Recombinase and Homologous Recombination Repair Regulation in Cancer Cells",
    authors: "Holthausen JT, Wyman C, Kanaar R",
    year: 2023,
    journal: "Cold Spring Harbor Perspectives in Biology",
    abstract: "RAD51 is the central recombinase of the homologous recombination machinery, forming helical nucleoprotein filaments on single-stranded DNA to execute strand invasion and homology search. BRCA2 acts as a chaperone loading RAD51 at double-strand breaks. Elevated RAD51 expression confers resistance to ionizing radiation and poly(ADP-ribose) polymerase (PARP) inhibitors in breast and ovarian tumors.",
    keywords: "RAD51, BRCA2, DNA repair, homologous recombination, breast cancer, ovarian cancer",
    doi: "10.1101/cshperspect.a041223"
  },
  {
    id: 51,
    title: "Anti-Amyloid Monoclonal Antibodies Lecanemab and Donanemab in Early Alzheimer's Disease",
    authors: "van Dyck CH, Swanson CJ, Aisen P, Bateman RJ",
    year: 2023,
    journal: "New England Journal of Medicine",
    abstract: "In large phase 3 trials in early Alzheimer's disease, humanized IgG1 monoclonal antibodies directed against soluble amyloid-beta protofibrils (Lecanemab) and N3pG-amyloid (Donanemab) achieved marked clearance of cortical amyloid plaques. Patients experienced modest slowing of cognitive decline over 18 months, alongside manageable amyloid-related imaging abnormalities (ARIA).",
    keywords: "amyloid-beta, Alzheimer disease, Lecanemab, Donanemab, APOE, neurodegeneration",
    doi: "10.1056/NEJMoa2212948"
  },
  {
    id: 52,
    title: "Role of MET Oncogene Amplification in Mediating Resistance to Targeted Therapies",
    authors: "Trusolino L, Bertotti A, Comoglio PM",
    year: 2024,
    journal: "Nature Reviews Cancer",
    abstract: "MET receptor tyrosine kinase amplification and exon 14 skipping alterations drive oncogenesis in non-small cell lung cancer and gastric carcinoma. Furthermore, MET genomic amplification serves as a principal bypass mechanism overcoming EGFR tyrosine kinase inhibition in lung adenocarcinoma and BRAF inhibition in colorectal cancer. MET-specific inhibitors Capmatinib and Tepotinib overcome this resistance.",
    keywords: "MET, EGFR, lung cancer, tyrosine kinase, Capmatinib, resistance, colorectal cancer",
    doi: "10.1038/s41568-023-00650-7"
  },
  {
    id: 53,
    title: "GLP-1 Receptor Agonists and Cardiovascular Outcomes in Overweight and Obese Non-Diabetic Patients",
    authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, Deanfield J",
    year: 2023,
    journal: "New England Journal of Medicine",
    abstract: "In the SELECT cardiovascular outcomes trial, weekly subcutaneous Semaglutide (2.4 mg) reduced the incidence of death from cardiovascular causes, nonfatal myocardial infarction, or nonfatal stroke by 20% in patients with preexisting cardiovascular disease and obesity without diabetes. Favorable effects stemmed from systemic anti-inflammatory actions and improved endothelial function.",
    keywords: "Semaglutide, obesity, cardiovascular disease, GLP-1, atherosclerosis, inflammation",
    doi: "10.1056/NEJMoa2307563"
  },
  {
    id: 54,
    title: "Mismatch Repair and Lynch Syndrome: Identification and Management of Germline Mutations",
    authors: "Lynch HT, Snyder CL, Shaw TG, Heinen CD, Hitchins MP",
    year: 2022,
    journal: "Nature Reviews Clinical Oncology",
    abstract: "Lynch syndrome is an autosomal dominant hereditary cancer predisposition disorder caused by germline pathogenic variants in mismatch repair genes (MLH1, MSH2, MSH6, PMS2) or EPCAM deletion. Carriers carry up to 70% cumulative lifetime risk for colorectal cancer and 40% for endometrial cancer. Universal tumor screening for microsatellite instability guides immune checkpoint therapy.",
    keywords: "MLH1, MSH2, MSH6, colorectal cancer, Lynch syndrome, DNA repair, endometrial cancer",
    doi: "10.1038/s41571-022-00670-w"
  },
  {
    id: 55,
    title: "PD-1/PD-L1 Pathway in Tumor Immunology and Mechanisms of Acquired Resistance",
    authors: "Sharma P, Goswami S, Raychaudhuri D, Siddiqui BA",
    year: 2023,
    journal: "Cell",
    abstract: "Immune checkpoint therapy targeting the PD-1/PD-L1 axis has transformed modern oncology. However, acquired resistance commonly arises through loss of beta-2-microglobulin (B2M) disrupting MHC class I antigen presentation, inactivating JAK1/JAK2 mutations impairing interferon-gamma signaling, or upregulation of alternative inhibitory receptors like TIM-3 and LAG-3.",
    keywords: "PD-1, PD-L1, immunotherapy, B2M, JAK1, JAK2, cancer genomics",
    doi: "10.1016/j.cell.2023.01.004"
  }
];

export const SEED_GENES: Gene[] = [
  {
    id: 1,
    symbol: "BRCA1",
    name: "BRCA1 DNA Repair Associated",
    chromosome: "17q21.31",
    type: "Protein Coding",
    description: "Tumor suppressor gene encoding an E3 ubiquitin-protein ligase essential for double-strand DNA repair via homologous recombination.",
    functions: "DNA repair, homologous recombination, cell cycle checkpoint, transcriptional regulation, tumor suppression",
    associatedDiseases: "Breast Cancer, Ovarian Cancer, Pancreatic Cancer, Prostate Cancer"
  },
  {
    id: 2,
    symbol: "BRCA2",
    name: "BRCA2 DNA Repair Associated",
    chromosome: "13q13.1",
    type: "Protein Coding",
    description: "Maintains genomic integrity by recruiting RAD51 recombinase to double-strand breaks during homologous recombination repair.",
    functions: "DNA double-strand break repair, homologous recombination, meiotic recombination, genome stability",
    associatedDiseases: "Breast Cancer, Ovarian Cancer, Pancreatic Cancer, Fanconi Anemia"
  },
  {
    id: 3,
    symbol: "TP53",
    name: "Tumor Protein P53",
    chromosome: "17p13.1",
    type: "Protein Coding",
    description: "The 'guardian of the genome'; transcription factor orchestrating cell cycle arrest, senescence, DNA repair, and apoptosis in response to cellular stress.",
    functions: "Apoptosis, DNA damage response, cell cycle arrest, senescence, metabolic regulation",
    associatedDiseases: "Li-Fraumeni Syndrome, Breast Cancer, Colorectal Cancer, Lung Adenocarcinoma, Glioblastoma"
  },
  {
    id: 4,
    symbol: "EGFR",
    name: "Epidermal Growth Factor Receptor",
    chromosome: "7p11.2",
    type: "Protein Coding",
    description: "Receptor tyrosine kinase of the ErbB family; initiates Ras-Raf-MEK-ERK and PI3K-AKT cascades governing cellular proliferation.",
    functions: "Receptor tyrosine kinase signaling, cell proliferation, cell survival, migration, angiogenesis",
    associatedDiseases: "Non-Small Cell Lung Cancer, Glioblastoma, Colorectal Cancer, Head and Neck Cancer"
  },
  {
    id: 5,
    symbol: "APOE",
    name: "Apolipoprotein E",
    chromosome: "19q13.32",
    type: "Protein Coding",
    description: "Lipoprotein involved in cholesterol transport and lipid metabolism in peripheral tissues and the central nervous system.",
    functions: "Lipid transport, cholesterol homeostasis, amyloid-beta clearance, neuroinflammation, synaptic plasticity",
    associatedDiseases: "Alzheimer Disease, Cerebral Amyloid Angiopathy, Atherosclerosis, Cardiovascular Disease"
  },
  {
    id: 6,
    symbol: "TNF",
    name: "Tumor Necrosis Factor",
    chromosome: "6p21.33",
    type: "Protein Coding",
    description: "Pro-inflammatory cytokine produced primarily by macrophages, regulating systemic inflammation, immune response, and apoptotic signaling.",
    functions: "Pro-inflammatory signaling, apoptosis induction, NF-kB activation, cachexia regulation, immune defense",
    associatedDiseases: "Rheumatoid Arthritis, Inflammatory Bowel Disease, Psoriasis, Type 2 Diabetes, Sepsis"
  },
  {
    id: 7,
    symbol: "KRAS",
    name: "KRAS Proto-Oncogene, GTPase",
    chromosome: "12p12.1",
    type: "Protein Coding",
    description: "Small GTPase cycling between active GTP-bound and inactive GDP-bound states; major activator of MAPK and PI3K pathways.",
    functions: "GTPase signaling, cell proliferation, cell survival, differentiation, actin cytoskeleton organization",
    associatedDiseases: "Colorectal Cancer, Pancreatic Cancer, Non-Small Cell Lung Cancer, Multiple Myeloma"
  },
  {
    id: 8,
    symbol: "PTEN",
    name: "Phosphatase and Tensin Homolog",
    chromosome: "10q23.31",
    type: "Protein Coding",
    description: "Lipid phosphatase dephosphorylating PIP3 to PIP2, directly attenuating the proto-oncogenic PI3K-AKT-mTOR signaling pathway.",
    functions: "Lipid phosphatase activity, PI3K/AKT antagonism, cell cycle inhibition, genomic stability, apoptosis",
    associatedDiseases: "Cowden Syndrome, Glioblastoma, Prostate Cancer, Endometrial Cancer, Breast Cancer"
  },
  {
    id: 9,
    symbol: "INS",
    name: "Insulin",
    chromosome: "11p15.5",
    type: "Protein Coding",
    description: "Peptide hormone produced by pancreatic beta cells; regulates carbohydrate, lipid, and protein metabolism by promoting glucose uptake.",
    functions: "Glucose uptake regulation, glycogen synthesis, lipogenesis, protein translation, metabolic homeostasis",
    associatedDiseases: "Type 1 Diabetes, Type 2 Diabetes, Diabetic Ketoacidosis, Hyperinsulinism"
  },
  {
    id: 10,
    symbol: "VEGFA",
    name: "Vascular Endothelial Growth Factor A",
    chromosome: "6p21.1",
    type: "Protein Coding",
    description: "Growth factor active in angiogenesis, vasculogenesis, and endothelial cell growth, inducing microvascular hyperpermeability.",
    functions: "Angiogenesis, vasculogenesis, endothelial proliferation, vascular permeability, cell survival",
    associatedDiseases: "Colorectal Cancer, Renal Cell Carcinoma, Diabetic Retinopathy, Age-Related Macular Degeneration"
  },
  {
    id: 11,
    symbol: "IL6",
    name: "Interleukin 6",
    chromosome: "7p15.3",
    type: "Protein Coding",
    description: "Pleiotropic cytokine synthesized by monocytes and endothelial cells; regulates acute phase responses, inflammation, and B cell maturation.",
    functions: "Acute phase response, inflammation cascade, B cell differentiation, hematopoiesis, fever induction",
    associatedDiseases: "Rheumatoid Arthritis, Cytokine Release Syndrome, Sepsis, Castleman Disease, Atherosclerosis"
  },
  {
    id: 12,
    symbol: "AKT1",
    name: "AKT Serine/Threonine Kinase 1",
    chromosome: "14q32.32",
    type: "Protein Coding",
    description: "Key serine/threonine protein kinase downstream of PI3K; phosphorylates glycogen synthase kinase 3, FOXO, and Bad to promote survival.",
    functions: "Cell survival, glucose metabolism, protein synthesis, cell growth, anti-apoptotic signaling",
    associatedDiseases: "Proteus Syndrome, Breast Cancer, Colorectal Cancer, Ovarian Cancer"
  },
  {
    id: 13,
    symbol: "MTOR",
    name: "Mechanistic Target of Rapamycin Kinase",
    chromosome: "1p36.22",
    type: "Protein Coding",
    description: "Serine/threonine kinase forming catalytic core of mTORC1 and mTORC2; master sensor of nutrient availability and energy status.",
    functions: "Nutrient sensing, protein synthesis, autophagy suppression, cell growth, ribosome biogenesis",
    associatedDiseases: "Tuberous Sclerosis, Renal Cell Carcinoma, Focal Cortical Dysplasia, Diabetes"
  },
  {
    id: 14,
    symbol: "MYC",
    name: "MYC Proto-Oncogene, bHLH Transcription Factor",
    chromosome: "8q24.21",
    type: "Protein Coding",
    description: "Multifunctional transcription factor regulating ribosomal RNA transcription, cell cycle progression, and aerobic glycolysis.",
    functions: "Transcription activation, cell proliferation, ribosome biogenesis, glycolysis stimulation, transformation",
    associatedDiseases: "Burkitt Lymphoma, Diffuse Large B-Cell Lymphoma, Breast Cancer, Colorectal Cancer"
  },
  {
    id: 15,
    symbol: "ERBB2",
    name: "Erb-B2 Receptor Tyrosine Kinase 2 (HER2)",
    chromosome: "17q12",
    type: "Protein Coding",
    description: "Receptor tyrosine kinase (HER2) lacking intrinsic ligand binding; forms heterodimers with EGFR and HER3 to drive proliferation.",
    functions: "Receptor tyrosine kinase signaling, cell survival, proliferation, motility, invasion",
    associatedDiseases: "HER2-Positive Breast Cancer, Gastric Cancer, Ovarian Cancer, Lung Adenocarcinoma"
  },
  {
    id: 16,
    symbol: "BRAF",
    name: "B-Raf Proto-Oncogene, Serine/Threonine Kinase",
    chromosome: "7q34",
    type: "Protein Coding",
    description: "Serine/threonine-protein kinase belonging to the RAF family; activates downstream MEK1/2 kinases in the canonical MAPK cascade.",
    functions: "MAPK/ERK signaling, cell division, cell differentiation, apoptosis inhibition, cell migration",
    associatedDiseases: "Cutaneous Melanoma, Colorectal Cancer, Papillary Thyroid Carcinoma, Non-Small Cell Lung Cancer"
  },
  {
    id: 17,
    symbol: "MAPT",
    name: "Microtubule Associated Protein Tau",
    chromosome: "17q21.31",
    type: "Protein Coding",
    description: "Binds and stabilizes neuronal axonal microtubules; hyperphosphorylation leads to toxic paired helical filaments and neurofibrillary tangles.",
    functions: "Microtubule stabilization, axonal transport, synaptic plasticity, neuronal integrity",
    associatedDiseases: "Alzheimer Disease, Frontotemporal Dementia, Progressive Supranuclear Palsy, Pick Disease"
  },
  {
    id: 18,
    symbol: "SNCA",
    name: "Synuclein Alpha",
    chromosome: "4q22.1",
    type: "Protein Coding",
    description: "Presynaptic protein regulating vesicle trafficking and neurotransmitter release; main structural component of Lewy body fibrils.",
    functions: "Synaptic vesicle trafficking, dopamine release modulation, lipid membrane binding, neuroprotection",
    associatedDiseases: "Parkinson Disease, Dementia with Lewy Bodies, Multiple System Atrophy"
  },
  {
    id: 19,
    symbol: "CFTR",
    name: "CF Transmembrane Conductance Regulator",
    chromosome: "7q31.2",
    type: "Protein Coding",
    description: "ATP-binding cassette transporter acting as an epithelial chloride and thiocyanate ion channel across apical mucosal membranes.",
    functions: "Chloride ion transport, bicarbonate secretion, epithelial fluid regulation, mucociliary clearance",
    associatedDiseases: "Cystic Fibrosis, Congenital Bilateral Absence of Vas Deferens, Bronchiectasis"
  },
  {
    id: 20,
    symbol: "ESR1",
    name: "Estrogen Receptor 1",
    chromosome: "6q25.1",
    type: "Protein Coding",
    description: "Nuclear hormone receptor transcription factor mediating downstream actions of 17beta-estradiol; essential regulator of female endocrine biology.",
    functions: "Estrogen response element binding, endocrine signaling, mammary gland proliferation, bone density",
    associatedDiseases: "Estrogen Receptor-Positive Breast Cancer, Endometrial Cancer, Osteoporosis"
  },
  {
    id: 21,
    symbol: "PCSK9",
    name: "Proprotein Convertase Subtilisin/Kexin Type 9",
    chromosome: "1p32.3",
    type: "Protein Coding",
    description: "Secreted subtilase enzyme that binds hepatic LDL receptors and escorts them to lysosomal destruction, raising circulating LDL-C.",
    functions: "LDL receptor degradation, cholesterol homeostasis, lipid clearance regulation",
    associatedDiseases: "Familial Hypercholesterolemia, Atherosclerosis, Coronary Artery Disease, Stroke"
  },
  {
    id: 22,
    symbol: "CTNNB1",
    name: "Catenin Beta 1",
    chromosome: "3p22.1",
    type: "Protein Coding",
    description: "Dual-function protein coordinating adherens junction cell-cell adhesion and canonical Wnt transcription coactivation in nuclei.",
    functions: "Adherens junction stability, Wnt signaling coactivation, cell polarity, stem cell maintenance",
    associatedDiseases: "Colorectal Cancer, Hepatocellular Carcinoma, Desmoid Tumors, Pilomatricoma"
  },
  {
    id: 23,
    symbol: "PIK3CA",
    name: "Phosphatidylinositol-4,5-Bisphosphate 3-Kinase Catalytic Subunit Alpha",
    chromosome: "3q26.32",
    type: "Protein Coding",
    description: "Catalytic subunit p110alpha of class IA phosphoinositide 3-kinase; synthesizes PIP3 from PIP2 to stimulate downstream AKT1.",
    functions: "Lipid phosphorylation, PIP3 synthesis, PI3K/AKT activation, cell growth, insulin signaling",
    associatedDiseases: "PIK3CA-Related Overgrowth Spectrum, Breast Cancer, Colorectal Cancer, Endometrial Cancer"
  },
  {
    id: 24,
    symbol: "MLH1",
    name: "MutL Homolog 1",
    chromosome: "3p22.2",
    type: "Protein Coding",
    description: "DNA mismatch repair heterodimer component that coordinates excision of mismatched bases generated during DNA replication.",
    functions: "Mismatch repair, nucleotide incision recruitment, genomic stability, microsatellite fidelity",
    associatedDiseases: "Lynch Syndrome, Colorectal Cancer, Endometrial Cancer, Ovarian Cancer"
  },
  {
    id: 25,
    symbol: "PALB2",
    name: "Partner and Localizer of BRCA2",
    chromosome: "16p12.2",
    type: "Protein Coding",
    description: "Bridges BRCA1 and BRCA2, orchestrating recruitment of RAD51 recombinase to sites of DNA double-strand breaks during homologous recombination.",
    functions: "BRCA complex bridging, homologous recombination, DNA repair, chromosome segregation",
    associatedDiseases: "Hereditary Breast Cancer, Pancreatic Cancer, Fanconi Anemia"
  }
];

export const SEED_DISEASES: Disease[] = [
  {
    id: 1,
    name: "Breast Cancer",
    category: "Oncology",
    meshId: "D001943",
    description: "Malignant neoplasm arising from mammary epithelial ductal or lobular tissue, strongly influenced by BRCA1, BRCA2, HER2, and ESR1 alterations.",
    associatedGenes: "BRCA1, BRCA2, ERBB2, ESR1, PIK3CA, PALB2, TP53",
    primaryManifestations: "Mammary mass, axillary lymphadenopathy, skin retraction, nipple discharge"
  },
  {
    id: 2,
    name: "Alzheimer Disease",
    category: "Neurology",
    meshId: "D000544",
    description: "Progressive neurodegenerative cortical disorder marked by extracellular amyloid-beta plaques, intracellular tau neurofibrillary tangles, and severe synaptic loss.",
    associatedGenes: "APOE, MAPT, APP, TREM2, PSEN1, PSEN2",
    primaryManifestations: "Progressive memory impairment, spatial disorientation, executive dysfunction, aphasia"
  },
  {
    id: 3,
    name: "Type 2 Diabetes",
    category: "Metabolic",
    meshId: "D003924",
    description: "Chronic endocrine disorder characterized by skeletal muscle and hepatic insulin resistance alongside progressive pancreatic beta-cell secretory failure.",
    associatedGenes: "INS, TNF, IL6, PPARG, TCF7L2, KCNJ11",
    primaryManifestations: "Hyperglycemia, polyuria, polydipsia, fatigue, microvascular retinoneuropathy"
  },
  {
    id: 4,
    name: "Colorectal Cancer",
    category: "Oncology",
    meshId: "D015179",
    description: "Malignant transformation of glandular epithelial mucosa in the colon or rectum, frequently initiated by APC or Wnt pathway mutations.",
    associatedGenes: "APC, CTNNB1, KRAS, TP53, MLH1, MSH2, BRAF",
    primaryManifestations: "Rectal bleeding, iron deficiency anemia, altered bowel habits, abdominal cramping"
  },
  {
    id: 5,
    name: "Non-Small Cell Lung Cancer",
    category: "Oncology",
    meshId: "D002289",
    description: "Heterogeneous group of epithelial lung malignancies including adenocarcinoma and squamous cell carcinoma, driven by EGFR, KRAS, or ALK mutations.",
    associatedGenes: "EGFR, KRAS, ALK, BRAF, MET, TP53, CD274",
    primaryManifestations: "Persistent cough, hemoptysis, dyspnea, pleural effusion, weight loss"
  },
  {
    id: 6,
    name: "Glioblastoma",
    category: "Neurology / Oncology",
    meshId: "D005909",
    description: "Highly aggressive grade IV astrocytic intracranial tumor characterized by diffuse microvascular proliferation and extensive pseudopalisading necrosis.",
    associatedGenes: "PTEN, EGFR, TP53, IDH1, MGMT, PDGFRA",
    primaryManifestations: "New-onset seizures, persistent headaches, localized focal neurological deficits"
  },
  {
    id: 7,
    name: "Parkinson Disease",
    category: "Neurology",
    meshId: "D010300",
    description: "Movement disorder characterized by degeneration of dopaminergic neurons in the substantia nigra pars compacta and alpha-synuclein-containing Lewy bodies.",
    associatedGenes: "SNCA, PRKN, PINK1, LRRK2, GBA",
    primaryManifestations: "Rest tremor, cogwheel rigidity, bradykinesia, postural instability"
  },
  {
    id: 8,
    name: "Atherosclerosis",
    category: "Cardiovascular",
    meshId: "D050197",
    description: "Chronic inflammatory fibro-fatty lesion development in large and medium arterial walls driven by oxidized LDL deposition and macrophage recruitment.",
    associatedGenes: "PCSK9, APOE, IL1B, LDLR, APOB, TNF",
    primaryManifestations: "Angina pectoris, intermittent claudication, myocardial infarction, ischemic stroke"
  },
  {
    id: 9,
    name: "Rheumatoid Arthritis",
    category: "Autoimmune",
    meshId: "D001172",
    description: "Systemic autoimmune inflammatory disorder targeting synovial joints, leading to cartilage destruction, bony erosions, and systemic vascular inflammation.",
    associatedGenes: "TNF, IL6, HLA-DRB1, PTPN22, JAK2",
    primaryManifestations: "Symmetric polyarthritis, morning joint stiffness, subcutaneous nodules, fatigue"
  },
  {
    id: 10,
    name: "Ovarian Cancer",
    category: "Oncology",
    meshId: "D010051",
    description: "Malignant neoplasm arising from epithelial surface or fimbrial fallopian tube cells, frequently presenting late with diffuse peritoneal dissemination.",
    associatedGenes: "BRCA1, BRCA2, TP53, RAD51, PALB2",
    primaryManifestations: "Abdominal distension, persistent early satiety, pelvic pain, ascites"
  },
  {
    id: 11,
    name: "Cutaneous Melanoma",
    category: "Dermatology / Oncology",
    meshId: "D008545",
    description: "Malignant transformation of epidermal melanocytes associated with ultraviolet radiation exposure and BRAF V600 or NRAS driver mutations.",
    associatedGenes: "BRAF, NRAS, CDKN2A, TP53, KIT",
    primaryManifestations: "Asymmetric pigmented skin lesion, irregular borders, color variation, diameter >6mm"
  },
  {
    id: 12,
    name: "Cystic Fibrosis",
    category: "Pulmonology / Genetic",
    meshId: "D003550",
    description: "Autosomal recessive multisystem monogenic disorder caused by CFTR ion channel mutations, resulting in viscous inspissated mucus and chronic lung infections.",
    associatedGenes: "CFTR",
    primaryManifestations: "Chronic suppurative cough, bronchiectasis, pancreatic exocrine insufficiency, meconium ileus"
  },
  {
    id: 13,
    name: "Renal Cell Carcinoma",
    category: "Oncology",
    meshId: "D002292",
    description: "Malignant neoplasm arising from renal proximal tubular epithelium, strongly linked to VHL tumor suppressor gene inactivation and VEGFA neoangiogenesis.",
    associatedGenes: "VHL, VEGFA, BAP1, SETD2, PBRM1, MET",
    primaryManifestations: "Flank pain, painless gross hematuria, palpable abdominal mass, hypertension"
  },
  {
    id: 14,
    name: "Burkitt Lymphoma",
    category: "Hematology / Oncology",
    meshId: "D002045",
    description: "Aggressive mature B-cell non-Hodgkin lymphoma characterized by high proliferation index and chromosomal translocations of MYC with immunoglobulin loci.",
    associatedGenes: "MYC, BCL2, TP53, ID3, CCND3",
    primaryManifestations: "Rapidly enlarging jaw mass, abdominal organ infiltration, tumor lysis syndrome"
  },
  {
    id: 15,
    name: "Frontotemporal Dementia",
    category: "Neurology",
    meshId: "D057180",
    description: "Neurodegenerative clinical syndrome involving selective degeneration of frontal and temporal brain lobes, driven by tau or TDP-43 neuropathology.",
    associatedGenes: "MAPT, GRN, C9orf72, VCP, CHMP2B",
    primaryManifestations: "Marked personality alterations, disinhibition, loss of empathy, progressive aphasia"
  }
];

export const SEED_PROTEINS: Protein[] = [
  {
    id: 1,
    name: "Tumor Protein P53",
    uniprotId: "P04637",
    geneSymbol: "TP53",
    molecularMassKda: 53.7,
    cellularLocalization: "Nucleus, Cytoplasm",
    function: "Acts as a tumor suppressor in all higher eukaryotic species, inducing apoptosis, cell cycle arrest, and metabolic regulation.",
    associatedDiseases: "Li-Fraumeni Syndrome, Breast Cancer, Colorectal Cancer"
  },
  {
    id: 2,
    name: "Breast Cancer Type 1 Susceptibility Protein",
    uniprotId: "P38398",
    geneSymbol: "BRCA1",
    molecularMassKda: 207.7,
    cellularLocalization: "Nucleus",
    function: "E3 ubiquitin ligase component maintaining chromosomal stability through homology-directed repair of double-strand DNA breaks.",
    associatedDiseases: "Breast Cancer, Ovarian Cancer"
  },
  {
    id: 3,
    name: "Breast Cancer Type 2 Susceptibility Protein",
    uniprotId: "P51587",
    geneSymbol: "BRCA2",
    molecularMassKda: 384.3,
    cellularLocalization: "Nucleus",
    function: "Promotes recruitment of RAD51 to damaged DNA loci, facilitating sister-chromatid exchange during homologous recombination.",
    associatedDiseases: "Breast Cancer, Ovarian Cancer"
  },
  {
    id: 4,
    name: "Epidermal Growth Factor Receptor",
    uniprotId: "P00533",
    geneSymbol: "EGFR",
    molecularMassKda: 134.3,
    cellularLocalization: "Cell Membrane",
    function: "Transmembrane receptor tyrosine kinase stimulating cell proliferation, migration, survival, and neo-angiogenesis.",
    associatedDiseases: "Non-Small Cell Lung Cancer, Glioblastoma"
  },
  {
    id: 5,
    name: "Apolipoprotein E",
    uniprotId: "P02649",
    geneSymbol: "APOE",
    molecularMassKda: 36.2,
    cellularLocalization: "Secreted, Extracellular Matrix",
    function: "Apoprotein mediating uptake of lipid and cholesterol particles through binding to low-density lipoprotein receptors.",
    associatedDiseases: "Alzheimer Disease, Atherosclerosis"
  },
  {
    id: 6,
    name: "Insulin",
    uniprotId: "P01308",
    geneSymbol: "INS",
    molecularMassKda: 11.9,
    cellularLocalization: "Secreted, Extracellular Matrix",
    function: "Hormone stimulating peripheral glucose consumption into muscle and adipocytes while suppressing hepatic gluconeogenesis.",
    associatedDiseases: "Type 1 Diabetes, Type 2 Diabetes"
  },
  {
    id: 7,
    name: "Tumor Necrosis Factor Alpha",
    uniprotId: "P01375",
    geneSymbol: "TNF",
    molecularMassKda: 25.6,
    cellularLocalization: "Cell Membrane, Secreted",
    function: "Potent pro-inflammatory cytokine activating death receptor and NF-kB signaling during infection and chronic inflammation.",
    associatedDiseases: "Rheumatoid Arthritis, Inflammatory Bowel Disease"
  },
  {
    id: 8,
    name: "Interleukin-6",
    uniprotId: "P05231",
    geneSymbol: "IL6",
    molecularMassKda: 23.7,
    cellularLocalization: "Secreted",
    function: "Pro-inflammatory and immunoregulatory cytokine orchestrating hepatic acute-phase response and plasmacyte differentiation.",
    associatedDiseases: "Rheumatoid Arthritis, Cytokine Release Syndrome"
  },
  {
    id: 9,
    name: "Phosphatase and Tensin Homolog",
    uniprotId: "P60484",
    geneSymbol: "PTEN",
    molecularMassKda: 47.1,
    cellularLocalization: "Cytoplasm, Nucleus",
    function: "Lipid and protein phosphatase opposing the PI3K signaling pathway through dephosphorylation of phosphatidylinositol (3,4,5)-trisphosphate.",
    associatedDiseases: "Glioblastoma, Prostate Cancer, Cowden Syndrome"
  },
  {
    id: 10,
    name: "Vascular Endothelial Growth Factor A",
    uniprotId: "P15692",
    geneSymbol: "VEGFA",
    molecularMassKda: 27.0,
    cellularLocalization: "Secreted, Extracellular Matrix",
    function: "Potent mitogen for vascular endothelial cells, promoting physiological vasculogenesis and pathological tumor microvascularization.",
    associatedDiseases: "Colorectal Cancer, Renal Cell Carcinoma"
  },
  {
    id: 11,
    name: "Receptor Tyrosine-Protein Kinase erbB-2 (HER2)",
    uniprotId: "P04626",
    geneSymbol: "ERBB2",
    molecularMassKda: 137.9,
    cellularLocalization: "Cell Membrane",
    function: "Receptor tyrosine kinase devoid of direct ligand binding; forms potent heterodimeric signaling units with EGFR and HER3.",
    associatedDiseases: "HER2-Positive Breast Cancer, Gastric Cancer"
  },
  {
    id: 12,
    name: "Microtubule-Associated Protein Tau",
    uniprotId: "P10636",
    geneSymbol: "MAPT",
    molecularMassKda: 78.9,
    cellularLocalization: "Cytoplasm, Axons",
    function: "Promotes microtubule assembly and stability in neurons; hyperphosphorylation causes pathological paired helical neurofibrillary tangles.",
    associatedDiseases: "Alzheimer Disease, Frontotemporal Dementia"
  },
  {
    id: 13,
    name: "Alpha-Synuclein",
    uniprotId: "P37840",
    geneSymbol: "SNCA",
    molecularMassKda: 14.5,
    cellularLocalization: "Presynapse, Cytoplasm",
    function: "Presynaptic phosphoprotein modulating neurotransmitter exocytosis; aggregates to form pathological inclusions in Lewy bodies.",
    associatedDiseases: "Parkinson Disease, Lewy Body Dementia"
  },
  {
    id: 14,
    name: "K-Ras GTPase",
    uniprotId: "P01116",
    geneSymbol: "KRAS",
    molecularMassKda: 21.6,
    cellularLocalization: "Cell Membrane, Inner Leaflet",
    function: "GTP-binding protein relaying mitogenic signals from receptor tyrosine kinases to downstream Raf/MEK/ERK cascades.",
    associatedDiseases: "Colorectal Cancer, Pancreatic Cancer"
  },
  {
    id: 15,
    name: "Cystic Fibrosis Transmembrane Conductance Regulator",
    uniprotId: "P13569",
    geneSymbol: "CFTR",
    molecularMassKda: 168.1,
    cellularLocalization: "Apical Plasma Membrane",
    function: "Phosphorylation-regulated ABC transporter that forms a cAMP-activated chloride and thiocyanate conducting pore in epithelial membranes.",
    associatedDiseases: "Cystic Fibrosis"
  }
];

export const SEED_DRUGS: Drug[] = [
  {
    id: 1,
    name: "Olaparib",
    brandName: "Lynparza",
    drugClass: "PARP Inhibitor",
    targetEntities: "BRCA1, BRCA2, PARP1",
    indication: "Ovarian Cancer, Breast Cancer",
    mechanismOfAction: "Traps PARP1/2 at single-strand DNA breaks, inducing lethal double-strand breaks in HR-deficient cells."
  },
  {
    id: 2,
    name: "Osimertinib",
    brandName: "Tagrisso",
    drugClass: "EGFR Tyrosine Kinase Inhibitor",
    targetEntities: "EGFR",
    indication: "Non-Small Cell Lung Cancer",
    mechanismOfAction: "Irreversibly binds EGFR kinase domain with high selectivity for exon 19 del, L858R, and T790M resistance mutations."
  },
  {
    id: 3,
    name: "Trastuzumab",
    brandName: "Herceptin",
    drugClass: "Monoclonal Antibody",
    targetEntities: "ERBB2 (HER2)",
    indication: "HER2-Positive Breast Cancer",
    mechanismOfAction: "Binds extracellular domain IV of HER2, blocking ligand-independent dimerization and triggering ADCC."
  },
  {
    id: 4,
    name: "Metformin",
    brandName: "Glucophage",
    drugClass: "Biguanide",
    targetEntities: "AMPK, Complex I",
    indication: "Type 2 Diabetes",
    mechanismOfAction: "Inhibits mitochondrial complex I, elevating AMP/ATP ratio to activate AMPK and curb hepatic gluconeogenesis."
  },
  {
    id: 5,
    name: "Semaglutide",
    brandName: "Ozempic / Wegovy",
    drugClass: "GLP-1 Receptor Agonist",
    targetEntities: "GLP1R",
    indication: "Type 2 Diabetes, Obesity",
    mechanismOfAction: "Mimics glucagon-like peptide-1, stimulating glucose-dependent insulin secretion and delaying gastric emptying."
  },
  {
    id: 6,
    name: "Pembrolizumab",
    brandName: "Keytruda",
    drugClass: "PD-1 Immune Checkpoint Inhibitor",
    targetEntities: "PDCD1 (PD-1), CD274 (PD-L1)",
    indication: "Lung Cancer, Melanoma, MSI-H Colorectal Cancer",
    mechanismOfAction: "Blocks PD-1 interaction with PD-L1/PD-L2, releasing T cell exhaustion and restoring antitumor cytotoxicity."
  },
  {
    id: 7,
    name: "Sotorasib",
    brandName: "Lumakras",
    drugClass: "KRAS G12C Inhibitor",
    targetEntities: "KRAS",
    indication: "Non-Small Cell Lung Cancer, Colorectal Cancer",
    mechanismOfAction: "Covalently locks KRAS G12C in its inactive GDP-bound conformation, suppressing downstream RAF-MEK-ERK signaling."
  },
  {
    id: 8,
    name: "Palbociclib",
    brandName: "Ibrance",
    drugClass: "CDK4/6 Inhibitor",
    targetEntities: "CDK4, CDK6, RB1",
    indication: "HR-Positive Breast Cancer",
    mechanismOfAction: "Selectively inhibits CDK4 and CDK6, maintaining retinoblastoma protein in hypophosphorylated state to halt G1/S transition."
  },
  {
    id: 9,
    name: "Vemurafenib",
    brandName: "Zelboraf",
    drugClass: "BRAF Kinase Inhibitor",
    targetEntities: "BRAF",
    indication: "Cutaneous Melanoma",
    mechanismOfAction: "Potently and selectively inhibits the kinase activity of the mutated BRAF V600E monomer."
  },
  {
    id: 10,
    name: "Adalimumab",
    brandName: "Humira",
    drugClass: "Anti-TNF Monoclonal Antibody",
    targetEntities: "TNF",
    indication: "Rheumatoid Arthritis, Crohn's Disease",
    mechanismOfAction: "Neutralizes soluble and transmembrane TNF-alpha, dampening the pro-inflammatory cytokine cascade."
  },
  {
    id: 11,
    name: "Tocilizumab",
    brandName: "Actemra",
    drugClass: "Anti-IL-6R Monoclonal Antibody",
    targetEntities: "IL6, IL6R",
    indication: "Rheumatoid Arthritis, Cytokine Release Syndrome",
    mechanismOfAction: "Competitively inhibits binding of IL-6 to both soluble and membrane-bound IL-6 receptors."
  },
  {
    id: 12,
    name: "Venetoclax",
    brandName: "Venclexta",
    drugClass: "BCL-2 Inhibitor (BH3-mimetic)",
    targetEntities: "BCL2",
    indication: "Chronic Lymphocytic Leukemia, AML",
    mechanismOfAction: "Selectively binds BH3-binding groove of anti-apoptotic BCL-2, displacing BIM to execute mitochondrial apoptosis."
  },
  {
    id: 13,
    name: "Evolocumab",
    brandName: "Repatha",
    drugClass: "PCSK9 Monoclonal Antibody",
    targetEntities: "PCSK9, LDLR",
    indication: "Atherosclerosis, Hypercholesterolemia",
    mechanismOfAction: "Inhibits PCSK9 binding to LDL receptors, preventing LDLR degradation and accelerating LDL clearance."
  },
  {
    id: 14,
    name: "Ivacaftor",
    brandName: "Kalydeco",
    drugClass: "CFTR Potentiator",
    targetEntities: "CFTR",
    indication: "Cystic Fibrosis",
    mechanismOfAction: "Increases open probability of the gating-defective CFTR channel pore, augmenting chloride transport across epithelia."
  },
  {
    id: 15,
    name: "Lecanemab",
    brandName: "Leqembi",
    drugClass: "Anti-Amyloid Monoclonal Antibody",
    targetEntities: "Amyloid-Beta, APP",
    indication: "Alzheimer Disease",
    mechanismOfAction: "Preferentially binds soluble amyloid-beta protofibrils and facilitates microglial phagocytic clearance."
  }
];

export const SEED_RELATIONSHIPS: Relationship[] = [
  { id: 1, sourceType: "Gene", sourceName: "BRCA1", relationshipType: "associated_with", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.99, evidence: "Germline pathogenic variants predispose up to 70% cumulative lifetime incidence." },
  { id: 2, sourceType: "Gene", sourceName: "BRCA1", relationshipType: "associated_with", targetType: "Disease", targetName: "Ovarian Cancer", confidence: 0.98, evidence: "Impaired homologous recombination increases serous ovarian adenocarcinoma susceptibility." },
  { id: 3, sourceType: "Gene", sourceName: "BRCA1", relationshipType: "expresses", targetType: "Protein", targetName: "Breast Cancer Type 1 Susceptibility Protein", confidence: 1.0, evidence: "Encodes 1863 amino acid nuclear ring finger protein." },
  { id: 4, sourceType: "Gene", sourceName: "BRCA2", relationshipType: "associated_with", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.97, evidence: "Germline truncation mutations confer elevated breast cancer predisposition." },
  { id: 5, sourceType: "Gene", sourceName: "BRCA2", relationshipType: "associated_with", targetType: "Disease", targetName: "Ovarian Cancer", confidence: 0.95, evidence: "Loss of BRCA2 leads to homologous recombination deficiency." },
  { id: 6, sourceType: "Gene", sourceName: "BRCA2", relationshipType: "expresses", targetType: "Protein", targetName: "Breast Cancer Type 2 Susceptibility Protein", confidence: 1.0, evidence: "Encodes key component of DNA double-strand repair machinery." },
  { id: 7, sourceType: "Gene", sourceName: "TP53", relationshipType: "associated_with", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.94, evidence: "Somatic mutations occur in ~35% of all breast carcinomas." },
  { id: 8, sourceType: "Gene", sourceName: "TP53", relationshipType: "associated_with", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.96, evidence: "Inactivating mutations mark transition from adenoma to invasive carcinoma." },
  { id: 9, sourceType: "Gene", sourceName: "TP53", relationshipType: "associated_with", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.92, evidence: "Most frequent alteration in lung adenocarcinoma and squamous carcinoma." },
  { id: 10, sourceType: "Gene", sourceName: "TP53", relationshipType: "associated_with", targetType: "Disease", targetName: "Glioblastoma", confidence: 0.91, evidence: "Inactivation compromises cell cycle checkpoint control in astrocytic lineages." },
  { id: 11, sourceType: "Gene", sourceName: "TP53", relationshipType: "expresses", targetType: "Protein", targetName: "Tumor Protein P53", confidence: 1.0, evidence: "Directly encodes 393-amino acid homotetrameric transcription factor." },
  { id: 12, sourceType: "Gene", sourceName: "EGFR", relationshipType: "associated_with", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.98, evidence: "Exon 19 in-frame deletions and L858R missense point mutations drive tumorigenesis." },
  { id: 13, sourceType: "Gene", sourceName: "EGFR", relationshipType: "associated_with", targetType: "Disease", targetName: "Glioblastoma", confidence: 0.93, evidence: "EGFR amplification and EGFRvIII variants hyperactivate receptor tyrosine kinase signaling." },
  { id: 14, sourceType: "Gene", sourceName: "EGFR", relationshipType: "expresses", targetType: "Protein", targetName: "Epidermal Growth Factor Receptor", confidence: 1.0, evidence: "Encodes 170 kDa transmembrane glycoprotein receptor." },
  { id: 15, sourceType: "Gene", sourceName: "APOE", relationshipType: "associated_with", targetType: "Disease", targetName: "Alzheimer Disease", confidence: 0.99, evidence: "APOE epsilon 4 allele escalates risk by 3-fold (heterozygous) to 12-fold (homozygous)." },
  { id: 16, sourceType: "Gene", sourceName: "APOE", relationshipType: "associated_with", targetType: "Disease", targetName: "Atherosclerosis", confidence: 0.94, evidence: "APOE isoforms critically govern clearance of remnant lipoproteins and LDL particles." },
  { id: 17, sourceType: "Gene", sourceName: "APOE", relationshipType: "expresses", targetType: "Protein", targetName: "Apolipoprotein E", confidence: 1.0, evidence: "Synthesized heavily by astrocytes in brain and hepatocytes systemically." },
  { id: 18, sourceType: "Gene", sourceName: "TNF", relationshipType: "associated_with", targetType: "Disease", targetName: "Rheumatoid Arthritis", confidence: 0.97, evidence: "Drives synovial osteoclast differentiation and joint microvascular inflammation." },
  { id: 19, sourceType: "Gene", sourceName: "TNF", relationshipType: "associated_with", targetType: "Disease", targetName: "Type 2 Diabetes", confidence: 0.88, evidence: "Elevated TNF-alpha promotes serine phosphorylation of IRS-1, inducing insulin resistance." },
  { id: 20, sourceType: "Gene", sourceName: "TNF", relationshipType: "expresses", targetType: "Protein", targetName: "Tumor Necrosis Factor Alpha", confidence: 1.0, evidence: "Encodes homotrimeric membrane-anchored and cleaved cytokine." },
  { id: 21, sourceType: "Gene", sourceName: "KRAS", relationshipType: "associated_with", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.98, evidence: "Codon 12 and 13 mutations activate GTPase signaling independent of upstream EGFR." },
  { id: 22, sourceType: "Gene", sourceName: "KRAS", relationshipType: "associated_with", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.95, evidence: "KRAS G12C mutation constitutes major targetable oncogenic driver." },
  { id: 23, sourceType: "Gene", sourceName: "KRAS", relationshipType: "expresses", targetType: "Protein", targetName: "K-Ras GTPase", confidence: 1.0, evidence: "Encodes small G-protein tethered to plasma membrane." },
  { id: 24, sourceType: "Gene", sourceName: "PTEN", relationshipType: "associated_with", targetType: "Disease", targetName: "Glioblastoma", confidence: 0.96, evidence: "Deletion or mutation leads to loss of PIP3 phosphatase activity." },
  { id: 25, sourceType: "Gene", sourceName: "PTEN", relationshipType: "expresses", targetType: "Protein", targetName: "Phosphatase and Tensin Homolog", confidence: 1.0, evidence: "Translates lipid phosphatase that counteracts PI3K enzymatic activity." },
  { id: 26, sourceType: "Gene", sourceName: "INS", relationshipType: "associated_with", targetType: "Disease", targetName: "Type 2 Diabetes", confidence: 0.98, evidence: "Beta-cell secretory defect and peripheral receptor signaling collapse." },
  { id: 27, sourceType: "Gene", sourceName: "INS", relationshipType: "expresses", targetType: "Protein", targetName: "Insulin", confidence: 1.0, evidence: "Encodes preproinsulin cleaved into mature A and B chains." },
  { id: 28, sourceType: "Gene", sourceName: "VEGFA", relationshipType: "associated_with", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.95, evidence: "Stimulates vessel sprout formation sustaining tumor oxygenation and metastasis." },
  { id: 29, sourceType: "Gene", sourceName: "VEGFA", relationshipType: "associated_with", targetType: "Disease", targetName: "Renal Cell Carcinoma", confidence: 0.98, evidence: "Loss of VHL leads to HIF-mediated hypersecretion of VEGFA." },
  { id: 30, sourceType: "Gene", sourceName: "VEGFA", relationshipType: "expresses", targetType: "Protein", targetName: "Vascular Endothelial Growth Factor A", confidence: 1.0, evidence: "Translates dimeric angiogenic polypeptide." },
  { id: 31, sourceType: "Gene", sourceName: "IL6", relationshipType: "associated_with", targetType: "Disease", targetName: "Rheumatoid Arthritis", confidence: 0.96, evidence: "Synthesized by synovial fibroblasts, mediating systemic inflammatory phase." },
  { id: 32, sourceType: "Gene", sourceName: "IL6", relationshipType: "associated_with", targetType: "Disease", targetName: "Type 2 Diabetes", confidence: 0.87, evidence: "Chronic low-grade elevation impairs adipocyte and hepatic insulin signaling." },
  { id: 33, sourceType: "Gene", sourceName: "IL6", relationshipType: "expresses", targetType: "Protein", targetName: "Interleukin-6", confidence: 1.0, evidence: "Encodes four-helix bundle cytokine." },
  { id: 34, sourceType: "Gene", sourceName: "ERBB2", relationshipType: "associated_with", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.98, evidence: "Gene amplification in 15-20% invasive mammary carcinomas causes aggressive biology." },
  { id: 35, sourceType: "Gene", sourceName: "ERBB2", relationshipType: "expresses", targetType: "Protein", targetName: "Receptor Tyrosine-Protein Kinase erbB-2 (HER2)", confidence: 1.0, evidence: "Encodes orphan tyrosine kinase receptor with high kinase potency." },
  { id: 36, sourceType: "Gene", sourceName: "BRAF", relationshipType: "associated_with", targetType: "Disease", targetName: "Cutaneous Melanoma", confidence: 0.99, evidence: "V600E point mutation causes constitutive monomeric kinase activation." },
  { id: 37, sourceType: "Gene", sourceName: "BRAF", relationshipType: "associated_with", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.94, evidence: "BRAF V600E mutations confer aggressive prognosis and resistance to EGFR therapy." },
  { id: 38, sourceType: "Gene", sourceName: "MAPT", relationshipType: "associated_with", targetType: "Disease", targetName: "Alzheimer Disease", confidence: 0.97, evidence: "Hyperphosphorylated Tau forms paired helical filaments and neurofibrillary tangles." },
  { id: 39, sourceType: "Gene", sourceName: "MAPT", relationshipType: "expresses", targetType: "Protein", targetName: "Microtubule-Associated Protein Tau", confidence: 1.0, evidence: "Encodes axonal microtubule stabilizing phosphoprotein." },
  { id: 40, sourceType: "Gene", sourceName: "SNCA", relationshipType: "associated_with", targetType: "Disease", targetName: "Parkinson Disease", confidence: 0.99, evidence: "Point mutations or duplications accelerate Lewy body fibrillization." },
  { id: 41, sourceType: "Gene", sourceName: "SNCA", relationshipType: "expresses", targetType: "Protein", targetName: "Alpha-Synuclein", confidence: 1.0, evidence: "Encodes 140-amino acid natively unfolded presynaptic protein." },
  { id: 42, sourceType: "Drug", sourceName: "Olaparib", relationshipType: "treats", targetType: "Disease", targetName: "Ovarian Cancer", confidence: 0.99, evidence: "FDA approved for advanced BRCA-mutated or HRD-positive epithelial ovarian cancer." },
  { id: 43, sourceType: "Drug", sourceName: "Olaparib", relationshipType: "treats", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.97, evidence: "Approved for germline BRCA-mutated HER2-negative metastatic breast cancer." },
  { id: 44, sourceType: "Drug", sourceName: "Osimertinib", relationshipType: "treats", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.99, evidence: "First-line standard of care for EGFR mutation-positive lung adenocarcinoma." },
  { id: 45, sourceType: "Drug", sourceName: "Osimertinib", relationshipType: "inhibits", targetType: "Protein", targetName: "Epidermal Growth Factor Receptor", confidence: 0.99, evidence: "Potently inhibits exon 19 del, L858R, and T790M EGFR kinases." },
  { id: 46, sourceType: "Drug", sourceName: "Trastuzumab", relationshipType: "treats", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.99, evidence: "Standard of care for HER2-amplified early and metastatic breast malignancies." },
  { id: 47, sourceType: "Drug", sourceName: "Trastuzumab", relationshipType: "inhibits", targetType: "Protein", targetName: "Receptor Tyrosine-Protein Kinase erbB-2 (HER2)", confidence: 0.99, evidence: "Binds domain IV of HER2, abrogating proliferative downstream survival cascades." },
  { id: 48, sourceType: "Drug", sourceName: "Metformin", relationshipType: "treats", targetType: "Disease", targetName: "Type 2 Diabetes", confidence: 0.99, evidence: "First-line oral antidiabetic therapy, reducing hepatic glucose output." },
  { id: 49, sourceType: "Drug", sourceName: "Semaglutide", relationshipType: "treats", targetType: "Disease", targetName: "Type 2 Diabetes", confidence: 0.99, evidence: "Improves glycemic control and stimulates glucose-dependent insulin secretion." },
  { id: 50, sourceType: "Drug", sourceName: "Semaglutide", relationshipType: "treats", targetType: "Disease", targetName: "Atherosclerosis", confidence: 0.92, evidence: "Demonstrated 20% reduction in major adverse cardiovascular events (MACE)." },
  { id: 51, sourceType: "Drug", sourceName: "Pembrolizumab", relationshipType: "treats", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.98, evidence: "First-line therapy for tumors expressing high PD-L1 without EGFR/ALK mutations." },
  { id: 52, sourceType: "Drug", sourceName: "Pembrolizumab", relationshipType: "treats", targetType: "Disease", targetName: "Cutaneous Melanoma", confidence: 0.98, evidence: "Substantially prolongs overall survival in advanced melanoma." },
  { id: 53, sourceType: "Drug", sourceName: "Pembrolizumab", relationshipType: "treats", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.96, evidence: "Highly effective in microsatellite instability-high (MSI-H / dMMR) colorectal cancers." },
  { id: 54, sourceType: "Drug", sourceName: "Sotorasib", relationshipType: "treats", targetType: "Disease", targetName: "Non-Small Cell Lung Cancer", confidence: 0.97, evidence: "First targeted small molecule approved for KRAS G12C-mutated solid tumors." },
  { id: 55, sourceType: "Drug", sourceName: "Sotorasib", relationshipType: "inhibits", targetType: "Protein", targetName: "K-Ras GTPase", confidence: 0.99, evidence: "Covalently binds cysteine 12 in the switch II pocket of mutant KRAS." },
  { id: 56, sourceType: "Drug", sourceName: "Palbociclib", relationshipType: "treats", targetType: "Disease", targetName: "Breast Cancer", confidence: 0.98, evidence: "Synergizes with aromatase inhibitors or fulvestrant in ER+ advanced breast cancer." },
  { id: 57, sourceType: "Drug", sourceName: "Vemurafenib", relationshipType: "treats", targetType: "Disease", targetName: "Cutaneous Melanoma", confidence: 0.98, evidence: "Selectively suppresses BRAF V600E mutant kinase activity." },
  { id: 58, sourceType: "Drug", sourceName: "Adalimumab", relationshipType: "treats", targetType: "Disease", targetName: "Rheumatoid Arthritis", confidence: 0.99, evidence: "Anti-TNF biological therapy inducing clinical ACR70 remission responses." },
  { id: 59, sourceType: "Drug", sourceName: "Adalimumab", relationshipType: "inhibits", targetType: "Protein", targetName: "Tumor Necrosis Factor Alpha", confidence: 0.99, evidence: "Neutralizes circulating and membrane-bound TNF cytokines." },
  { id: 60, sourceType: "Drug", sourceName: "Tocilizumab", relationshipType: "treats", targetType: "Disease", targetName: "Rheumatoid Arthritis", confidence: 0.98, evidence: "Suppresses IL-6 mediated articular destruction and C-reactive protein elevation." },
  { id: 61, sourceType: "Drug", sourceName: "Tocilizumab", relationshipType: "inhibits", targetType: "Protein", targetName: "Interleukin-6", confidence: 0.99, evidence: "Blocks both classical and trans-signaling through IL-6 receptor." },
  { id: 62, sourceType: "Drug", sourceName: "Venetoclax", relationshipType: "treats", targetType: "Disease", targetName: "Chronic Lymphocytic Leukemia", confidence: 0.99, evidence: "Directly induces rapid apoptosis in BCL2-dependent leukemia cells." },
  { id: 63, sourceType: "Drug", sourceName: "Evolocumab", relationshipType: "treats", targetType: "Disease", targetName: "Atherosclerosis", confidence: 0.99, evidence: "Reduces LDL-C by up to 60% and significantly decreases cardiovascular plaque volume." },
  { id: 64, sourceType: "Drug", sourceName: "Ivacaftor", relationshipType: "treats", targetType: "Disease", targetName: "Cystic Fibrosis", confidence: 0.99, evidence: "Dramatically improves lung clearance in gating-mutation CFTR carriers." },
  { id: 65, sourceType: "Drug", sourceName: "Ivacaftor", relationshipType: "activates", targetType: "Protein", targetName: "Cystic Fibrosis Transmembrane Conductance Regulator", confidence: 0.98, evidence: "Potentiates chloride open probability across mucosal surfaces." },
  { id: 66, sourceType: "Drug", sourceName: "Lecanemab", relationshipType: "treats", targetType: "Disease", targetName: "Alzheimer Disease", confidence: 0.96, evidence: "Clears amyloid-beta protofibrils and slows cognitive decline by 27% at 18 months." },
  { id: 67, sourceType: "Drug", sourceName: "Bevacizumab", relationshipType: "treats", targetType: "Disease", targetName: "Colorectal Cancer", confidence: 0.97, evidence: "Inhibits tumor neo-angiogenesis in combination with fluorouracil-based chemotherapy." },
  { id: 68, sourceType: "Drug", sourceName: "Bevacizumab", relationshipType: "inhibits", targetType: "Protein", targetName: "Vascular Endothelial Growth Factor A", confidence: 0.99, evidence: "Deprives endothelial cells of VEGFA survival signaling." }
];
