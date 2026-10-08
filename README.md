# BioIntel – Intelligent Biomedical Information Retrieval and Knowledge Discovery Platform

> **Mini Project – Bioinformatics + Information Retrieval Laboratory**  
> Developed for Academic Examination, Laboratory Viva, and Technical Demonstration.

---

## 1. Project Overview

**BioIntel** is an end-to-end full-stack biomedical search and knowledge discovery platform. It combines algorithmic **Information Retrieval (IR)** techniques (tokenization, inverted indices, TF-IDF vectorization, Okapi BM25 scoring, and cosine similarity) with domain-specific **Bioinformatics knowledge engineering** (genomic entities, disease ontologies, protein catalogs, and multi-relational biological knowledge graphs).

BioIntel allows clinicians, bioinformaticians, and students to query unstructured medical literature—such as *"BRCA1 mutations associated with breast cancer"*, *"diabetes insulin resistance"*, or *"APOE Alzheimer amyloid-beta"*—and receive transparently ranked research documents with an interactive **"Why this result?"** scoring inspector and biological entity extraction.

---

## 2. Core Features

- **Biomedical Query Engine**: Preprocesses clinical queries, normalizes biological terminology, removes stop words, and matches candidate documents via an Inverted Index.
- **Multi-Algorithm Ranking Models**:
  - **TF-IDF with Cosine Similarity**: Evaluates inverse document frequency and term specificity in vector space.
  - **Okapi BM25 ($k_1=1.5, b=0.75$)**: Length-normalized probabilistic ranking penalizing document verbosity.
  - **Semantic Concept Retrieval**: Concept projection accounting for biomedical synonyms (e.g., *oncology* $\leftrightarrow$ *cancer*, *dementia* $\leftrightarrow$ *Alzheimer*).
  - **Configurable Hybrid Ranking**: Dynamically calculates:
    $$\text{Final Score} = w_{\text{tfidf}} \cdot S_{\text{tfidf}} + w_{\text{bm25}} \cdot S_{\text{bm25}} + w_{\text{sem}} \cdot S_{\text{sem}}$$
- **"Why This Result?" Mathematical Inspector**: Deconstructs every result into exact TF-IDF, BM25, and semantic scores with the formula step-by-step for viva demonstration.
- **Biomedical Named Entity Recognition (NER)**: Identifies **Genes** (HUGO), **Diseases** (MeSH), **Proteins** (UniProt), and **Drugs** (FDA) directly in abstracts.
- **Biological Entity Explorers**:
  - **Gene Explorer**: Chromosome loci, biological functions, and linked literature.
  - **Disease Explorer**: Pathology categorization, driver mutations, and manifestations.
  - **Protein Explorer**: Molecular weights, cellular localizations, and enzyme classes.
  - **Therapeutics Explorer**: FDA drug classes, biological targets, and mechanisms of action.
- **Interactive Knowledge Graph Network**: Real-time SVG network visualizer modeling multi-relational edges (`associated_with`, `expresses`, `inhibits`, `treats`, `regulates`) with confidence scores.
- **Analytics Dashboard**: Interactive charts (Recharts) covering publication year distribution, top cited genes, disease distributions, and vocabulary frequency.
- **Dataset Manager & CSV Import/Export**: Upload custom biomedical literature CSVs, export indexed papers, and dynamically re-index without restarting.
- **Persistent Search History**: Tracks recent user queries, result counts, and timestamps with click-to-rerun.

---

## 3. Technology Stack

### Frontend:
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (domain-specific clinical palette: cobalt `#1e3a8a`, cyan `#06b6d4`, emerald `#10b981`)
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Responsive bar, pie, and line charts)

### Backend:
- **Language**: Python 3.10+
- **Framework**: FastAPI + Uvicorn
- **Validation**: Pydantic v2
- **ORM / Database**: SQLAlchemy (SQLite for local rapid zero-config development, PostgreSQL ready via `DATABASE_URL`)
- **IR & NLP**: scikit-learn, rank-bm25, custom pure-Python inverted index and tokenizer

---

## 4. System Architecture

```
                 USER SEARCH INTERFACE
                          │
                          ▼
            React + Vite Frontend (Tailwind CSS)
                          │
                          ▼
            FastAPI REST API / TypeScript IR Engine
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   NLP Service        IR Engine        Bio Engine
   (Named Entity     (TF-IDF + BM25    (Genomic & Disease
    Extraction)       Ranking)          Knowledge Graph)
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
            Normalized Hybrid Ranker
        Score = 0.35*TFIDF + 0.35*BM25 + 0.30*Semantic
                          │
                          ▼
            Database / Persistent Storage
         (PostgreSQL Schema / SQLite / Seed CSVs)
```

---

## 5. Folder Structure

```
BioIntel/
├── backend/
│   ├── main.py                  # FastAPI app entrypoint & lifespan index initialization
│   ├── config.py                # Environment configuration and IR weights
│   ├── requirements.txt         # Python dependencies
│   ├── database/
│   │   └── connection.py        # SQLAlchemy engine and session factory
│   ├── models/
│   │   └── database_models.py   # Tables: papers, genes, diseases, proteins, drugs, etc.
│   ├── schemas/
│   │   └── api_schemas.py       # Pydantic request/response schemas
│   ├── routes/
│   │   ├── search.py            # POST & GET /api/search
│   │   ├── papers.py            # GET /api/papers, /api/papers/{id}/related
│   │   ├── entities.py          # GET /api/genes, /api/diseases, /api/proteins
│   │   ├── analytics.py         # GET /api/analytics/dashboard
│   │   └── history.py           # GET & DELETE /api/search-history
│   ├── ir_engine/
│   │   ├── tokenizer.py         # Biomedical regex tokenization & stop-word filtering
│   │   ├── inverted_index.py    # InvertedIndex data structure & postings list
│   │   ├── tfidf_service.py     # TF-IDF calculation & cosine vector similarity
│   │   ├── bm25_service.py      # Okapi BM25 ranking algorithm
│   │   ├── semantic_service.py  # Concept embeddings & synonym similarity
│   │   └── hybrid_ranker.py     # Score normalizer & composite ranking formula
│   └── nlp/
│       └── entity_extractor.py  # Dictionary-based and regex NER for Gene/Disease/Protein/Drug
│
├── dataset/
│   ├── papers.csv               # 55+ peer-reviewed annotated biomedical papers
│   ├── genes.csv                # 30+ HUGO gene records
│   ├── diseases.csv             # 25+ MeSH disease records
│   ├── proteins.csv             # 25+ UniProt protein records
│   ├── drugs.csv                # 15+ FDA therapeutic drug records
│   └── relationships.csv        # 110+ functional biological relationships
│
├── scripts/
│   └── seed_database.py         # Database initialization and CSV seeding script
│
├── src/                         # Full React + Vite application
│   ├── components/              # Navbar, Home, SearchPage, ExplorePage, KnowledgeGraph, Analytics, About
│   ├── data/seedData.ts         # Persistent seed dataset
│   ├── services/irEngine.ts     # Client/Full-stack IR engine mirror
│   ├── services/dataService.ts  # State management & CSV import/export
│   └── types/index.ts           # Shared TypeScript interfaces
│
├── README.md
└── .env.example
```

---

## 6. How Information Retrieval Works in BioIntel

### A. Preprocessing & Tokenization
- Input query is converted to lowercase.
- Punctuation is stripped while preserving hyphens in gene symbols (e.g., `BRCA1`, `TNF-alpha`, `anti-PD-1`).
- Stop words (common English terms and academic fillers like *study*, *using*, *demonstrate*) are removed.

### B. Inverted Index
An inverted index maps terms to posting lists:
$$\text{term} \longrightarrow \{ \text{doc\_id}: \text{frequency} \}$$
For example:
- `brca1` $\rightarrow$ {Doc 1: 3, Doc 22: 2, Doc 36: 1}
- `insulin` $\rightarrow$ {Doc 5: 4, Doc 23: 1, Doc 28: 2, Doc 45: 2}

### C. TF-IDF & Cosine Similarity
$$\text{TF}(t, D) = \frac{f(t, D)}{|D|}, \quad \text{IDF}(t) = \ln\left(\frac{N + 1}{df(t) + 1}\right) + 1$$
$$\text{Cosine Similarity} = \frac{\vec{V}_Q \cdot \vec{V}_D}{\|\vec{V}_Q\| \|\vec{V}_D\|}$$

### D. Okapi BM25
$$\text{Score}(D, Q) = \sum_{q \in Q} \text{IDF}(q) \cdot \frac{f(q, D) \cdot (k_1 + 1)}{f(q, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$
Parameters: $k_1 = 1.5$ (term frequency saturation), $b = 0.75$ (document length normalization).

### E. Hybrid Combination
Component scores are normalized to $[0, 1]$ and aggregated:
$$\text{Score}_{\text{final}} = 0.35 \times S_{\text{tfidf}} + 0.35 \times S_{\text{bm25}} + 0.30 \times S_{\text{semantic}}$$

---

## 7. Installation & Local Setup (Run in VS Code)

### Prerequisites:
- Python 3.10+
- Node.js 18+ and npm

### Step 1: Clone or Open the Repository in VS Code
```bash
git clone <repository_url>
cd BioIntel
```

### Step 2: Backend Setup (Python FastAPI)
```bash
# Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Seed the database from CSV dataset
python scripts/seed_database.py

# Run the FastAPI server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
The FastAPI backend will start at `http://localhost:8000`.  
Explore the interactive Swagger documentation at `http://localhost:8000/docs`.

### Step 3: Frontend Setup (React SPA)
In a separate terminal:
```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 8. API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and engine status |
| `GET` | `/api/search?q=...` | Query literature using IR algorithms |
| `POST` | `/api/search` | Search with custom filters and weights |
| `GET` | `/api/papers` | List indexed papers with pagination |
| `GET` | `/api/papers/{id}` | Get paper by ID with detected entities |
| `GET` | `/api/papers/{id}/related` | Retrieve related papers via IR cosine similarity |
| `GET` | `/api/genes` | List annotated genes and paper counts |
| `GET` | `/api/diseases` | List diseases with category and associated genes |
| `GET` | `/api/proteins` | List proteins with UniProt IDs and mass |
| `GET` | `/api/drugs` | List FDA therapeutic drugs and targets |
| `GET` | `/api/relationships` | Query multi-relational biological graph edges |
| `GET` | `/api/analytics/dashboard` | Aggregated metrics for Recharts dashboard |
| `GET` | `/api/search-history` | View recent search history |
| `DELETE` | `/api/search-history` | Clear search history |

---

## 9. Viva Voce Cheat Sheet

1. **Why does Okapi BM25 perform better than raw TF-IDF for abstracts?**  
   Raw TF-IDF increases without bound as term frequency increases. BM25 uses an asymptote parameter ($k_1$) to prevent a document that mentions a term 15 times from completely eclipsing a highly focused document that mentions it 3 times. It also normalizes for document length ($b$).

2. **How does BioIntel prevent false entity matches?**  
   The entity extraction engine prioritizes longer multi-word phrases over single tokens (e.g., matching *"Type 2 Diabetes"* first rather than just *"Diabetes"*), preventing nested duplicates and partial string collisions.

3. **What is synthetic lethality demonstrated in the dataset?**  
   PARP inhibitors (e.g. Olaparib) selectively kill cancer cells with defective homologous recombination repair (BRCA1 or BRCA2 mutations), leaving normal cells unharmed. BioIntel models this relationship across both the IR engine and the knowledge graph.

---

## 10. Future Scope

- Integration with live NCBI PubMed Entrez API for automated corpus streaming.
- Deployment of BioBERT / PubMedBERT dense embeddings via FAISS vector index.
- Multi-hop pathway reasoning across drug-gene-disease cascades using Graph Neural Networks (GNNs).

---
*Created for the Bioinformatics + Information Retrieval Laboratory Mini-Project.*
