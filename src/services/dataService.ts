import { Paper, Gene, Disease, Protein, Drug, Relationship, SearchHistoryItem, SystemStats, SearchFilters, SearchResultItem } from '../types';
import { SEED_PAPERS, SEED_GENES, SEED_DISEASES, SEED_PROTEINS, SEED_DRUGS, SEED_RELATIONSHIPS } from '../data/seedData';
import { BiomedicalIREngine } from './irEngine';

const STORAGE_KEY_PAPERS = 'biointel_papers';
const STORAGE_KEY_HISTORY = 'biointel_history';

class DataService {
  public papers: Paper[] = [];
  public genes: Gene[] = SEED_GENES;
  public diseases: Disease[] = SEED_DISEASES;
  public proteins: Protein[] = SEED_PROTEINS;
  public drugs: Drug[] = SEED_DRUGS;
  public relationships: Relationship[] = SEED_RELATIONSHIPS;
  public searchHistory: SearchHistoryItem[] = [];
  public irEngine: BiomedicalIREngine;

  constructor() {
    this.loadPapers();
    this.loadHistory();
    this.irEngine = new BiomedicalIREngine(this.papers);
  }

  private loadPapers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PAPERS);
      if (stored) {
        this.papers = JSON.parse(stored);
      } else {
        this.papers = [...SEED_PAPERS];
        this.savePapers();
      }
    } catch {
      this.papers = [...SEED_PAPERS];
    }
  }

  private savePapers() {
    try {
      localStorage.setItem(STORAGE_KEY_PAPERS, JSON.stringify(this.papers));
    } catch (e) {
      console.error("Failed to save papers to localStorage", e);
    }
  }

  private loadHistory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) {
        this.searchHistory = JSON.parse(stored);
      } else {
        this.searchHistory = [
          {
            id: 'init-1',
            query: 'BRCA1 mutations breast cancer',
            resultsCount: 14,
            rankingMethod: 'Hybrid',
            timestamp: Date.now() - 1000 * 60 * 15
          },
          {
            id: 'init-2',
            query: 'insulin resistance diabetes',
            resultsCount: 8,
            rankingMethod: 'BM25',
            timestamp: Date.now() - 1000 * 60 * 65
          },
          {
            id: 'init-3',
            query: 'APOE Alzheimer amyloid-beta',
            resultsCount: 9,
            rankingMethod: 'Hybrid',
            timestamp: Date.now() - 1000 * 60 * 180
          }
        ];
        this.saveHistory();
      }
    } catch {
      this.searchHistory = [];
    }
  }

  private saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(this.searchHistory));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }

  public recordSearch(query: string, resultsCount: number, rankingMethod: string) {
    if (!query.trim()) return;
    const item: SearchHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      query: query.trim(),
      resultsCount,
      rankingMethod,
      timestamp: Date.now()
    };
    // Keep most recent 30 items
    this.searchHistory = [item, ...this.searchHistory.filter(h => h.query.toLowerCase() !== query.trim().toLowerCase())].slice(0, 30);
    this.saveHistory();
  }

  public clearHistory() {
    this.searchHistory = [];
    this.saveHistory();
  }

  public search(query: string, filters?: Partial<SearchFilters>) {
    const res = this.irEngine.search(query, filters);
    this.recordSearch(query, res.total, filters?.rankingMethod || 'Hybrid');
    return res;
  }

  public addPaper(paper: Omit<Paper, 'id'>): Paper {
    const newId = this.papers.length > 0 ? Math.max(...this.papers.map(p => p.id)) + 1 : 1;
    const newPaper: Paper = { ...paper, id: newId };
    this.papers.push(newPaper);
    this.savePapers();
    this.irEngine.buildIndex(this.papers);
    return newPaper;
  }

  public importPapersFromCSV(csvText: string): { success: boolean; added: number; error?: string } {
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        return { success: false, added: 0, error: "CSV file is empty or missing headers." };
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
      const titleIdx = headers.indexOf('title');
      const abstractIdx = headers.indexOf('abstract');

      if (titleIdx === -1 || abstractIdx === -1) {
        return { success: false, added: 0, error: "CSV must contain at least 'title' and 'abstract' columns." };
      }

      const authorsIdx = headers.indexOf('authors');
      const yearIdx = headers.indexOf('year');
      const journalIdx = headers.indexOf('journal');
      const keywordsIdx = headers.indexOf('keywords');
      const doiIdx = headers.indexOf('doi');

      let addedCount = 0;
      let curMaxId = this.papers.length > 0 ? Math.max(...this.papers.map(p => p.id)) : 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple regex parser handling quoted commas
        const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
        const matches: string[] = [];
        let match;
        while ((match = regex.exec(line)) !== null) {
          const val = match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2];
          matches.push(val.trim());
          if (regex.lastIndex === line.length && line.endsWith(',')) {
            matches.push('');
          }
        }

        const title = matches[titleIdx] || '';
        const abstract = matches[abstractIdx] || '';

        if (!title || !abstract) continue;

        curMaxId += 1;
        const newPaper: Paper = {
          id: curMaxId,
          title,
          abstract,
          authors: (authorsIdx !== -1 ? matches[authorsIdx] : '') || 'Unknown Authors',
          year: (yearIdx !== -1 ? parseInt(matches[yearIdx], 10) : 2024) || 2024,
          journal: (journalIdx !== -1 ? matches[journalIdx] : '') || 'Biomedical Research Journal',
          keywords: keywordsIdx !== -1 ? matches[keywordsIdx] : '',
          doi: doiIdx !== -1 ? matches[doiIdx] : `10.1000/biointel.${curMaxId}`
        };

        this.papers.push(newPaper);
        addedCount++;
      }

      if (addedCount > 0) {
        this.savePapers();
        this.irEngine.buildIndex(this.papers);
        return { success: true, added: addedCount };
      } else {
        return { success: false, added: 0, error: "No valid rows could be parsed." };
      }
    } catch (e: any) {
      return { success: false, added: 0, error: e?.message || "Error parsing CSV" };
    }
  }

  public exportPapersToCSV(): string {
    const headers = ["id", "title", "authors", "year", "journal", "abstract", "keywords", "doi"];
    const rows = this.papers.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.authors.replace(/"/g, '""')}"`,
      p.year,
      `"${p.journal.replace(/"/g, '""')}"`,
      `"${p.abstract.replace(/"/g, '""')}"`,
      `"${(p.keywords || '').replace(/"/g, '""')}"`,
      `"${(p.doi || '').replace(/"/g, '""')}"`
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  public resetToSeed(): void {
    this.papers = [...SEED_PAPERS];
    this.savePapers();
    this.irEngine.buildIndex(this.papers);
  }

  public getStats(): SystemStats {
    return {
      totalPapers: this.papers.length,
      totalGenes: this.genes.length,
      totalDiseases: this.diseases.length,
      totalProteins: this.proteins.length,
      totalDrugs: this.drugs.length,
      totalRelationships: this.relationships.length,
      totalIndexedTokens: this.irEngine.index.index.size
    };
  }

  public getPaperCountForGene(symbol: string): number {
    const sym = symbol.toLowerCase();
    return this.papers.filter(p =>
      p.title.toLowerCase().includes(sym) ||
      p.abstract.toLowerCase().includes(sym) ||
      (p.keywords && p.keywords.toLowerCase().includes(sym))
    ).length;
  }

  public getPaperCountForDisease(name: string): number {
    const dis = name.toLowerCase();
    return this.papers.filter(p =>
      p.title.toLowerCase().includes(dis) ||
      p.abstract.toLowerCase().includes(dis)
    ).length;
  }
}

export const dataService = new DataService();
