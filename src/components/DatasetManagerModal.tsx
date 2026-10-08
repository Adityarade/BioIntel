import React, { useState } from 'react';
import { X, Upload, Download, RotateCcw, Plus, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { dataService } from '../services/dataService';

interface DatasetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const DatasetManagerModal: React.FC<DatasetManagerModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'add' | 'export'>('import');
  const [csvText, setCsvText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form for single paper addition
  const [newTitle, setNewTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [newJournal, setNewJournal] = useState('');
  const [newAbstract, setNewAbstract] = useState('');
  const [newKeywords, setNewKeywords] = useState('');

  if (!isOpen) return null;

  const handleImportCSV = () => {
    setStatusMessage(null);
    if (!csvText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste or upload valid CSV text.' });
      return;
    }

    const res = dataService.importPapersFromCSV(csvText);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Successfully indexed ${res.added} biomedical papers into the IR engine!` });
      setCsvText('');
      onDataChanged();
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to import CSV.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content);
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csvContent = dataService.exportPapersToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `biointel_papers_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetSeed = () => {
    if (window.confirm("Reset dataset back to default 55 peer-reviewed seed papers?")) {
      dataService.resetToSeed();
      setStatusMessage({ type: 'success', text: 'Corpus reset to default seed dataset.' });
      onDataChanged();
    }
  };

  const handleAddManualPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAbstract.trim()) {
      setStatusMessage({ type: 'error', text: 'Title and Abstract are required.' });
      return;
    }

    dataService.addPaper({
      title: newTitle.trim(),
      authors: newAuthors.trim() || 'Anonymous Researcher',
      year: parseInt(newYear, 10) || 2024,
      journal: newJournal.trim() || 'Biomedical Journal',
      abstract: newAbstract.trim(),
      keywords: newKeywords.trim(),
      doi: `10.1016/j.biointel.${Date.now().toString().slice(-6)}`
    });

    setStatusMessage({ type: 'success', text: 'New paper indexed and added to knowledge repository!' });
    setNewTitle('');
    setNewAuthors('');
    setNewJournal('');
    setNewAbstract('');
    setNewKeywords('');
    onDataChanged();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dataset & Literature Manager</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Import, export, or manually curate biomedical literature in the active IR index.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg max-w-fit text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('import'); setStatusMessage(null); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'import' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Import CSV
          </button>
          <button
            onClick={() => { setActiveTab('add'); setStatusMessage(null); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'add' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Add New Paper
          </button>
          <button
            onClick={() => { setActiveTab('export'); setStatusMessage(null); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'export' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Export & Seed
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* 1. IMPORT CSV TAB */}
        {activeTab === 'import' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Paste CSV text or upload a CSV file containing columns: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">title, abstract, authors, year, journal, keywords</code>.
            </p>

            <div className="flex items-center gap-3">
              <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium cursor-pointer flex items-center gap-1.5 border border-slate-300">
                <Upload className="w-3.5 h-3.5 text-slate-600" />
                <span>Upload CSV File</span>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              </label>
              <span className="text-slate-400">or paste directly below:</span>
            </div>

            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={`title,authors,year,journal,abstract,keywords\n"Novel KRAS Inhibitors","Smith J",2024,"Nature","KRAS mutations in lung cancer...","KRAS,oncology"`}
              rows={8}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              onClick={handleImportCSV}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Validate & Index Papers</span>
            </button>
          </div>
        )}

        {/* 2. ADD SINGLE PAPER TAB */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddManualPaper} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Paper Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Identification of novel DNA repair kinase inhibitors in glioblastoma"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Authors</label>
                <input
                  type="text"
                  value={newAuthors}
                  onChange={(e) => setNewAuthors(e.target.value)}
                  placeholder="e.g. Miller A, Zhao K"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year</label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Journal</label>
                <input
                  type="text"
                  value={newJournal}
                  onChange={(e) => setNewJournal(e.target.value)}
                  placeholder="e.g. Nature Genetics"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Abstract Text *</label>
              <textarea
                required
                value={newAbstract}
                onChange={(e) => setNewAbstract(e.target.value)}
                placeholder="Enter complete research study abstract..."
                rows={4}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Keywords (comma-separated)</label>
              <input
                type="text"
                value={newKeywords}
                onChange={(e) => setNewKeywords(e.target.value)}
                placeholder="e.g. DNA repair, glioblastoma, kinase, ATM"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Save & Index Document</span>
            </button>
          </form>
        )}

        {/* 3. EXPORT & SEED TAB */}
        {activeTab === 'export' && (
          <div className="space-y-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Export Complete Literature Corpus</h4>
              <p className="text-slate-600">
                Download all {dataService.papers.length} indexed publications as a structured CSV file including DOI, title, authors, and abstracts.
              </p>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Papers CSV</span>
              </button>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200/60 space-y-2">
              <h4 className="font-bold text-rose-900">Reset to Academic Seed Dataset</h4>
              <p className="text-rose-700">
                Restore the default 55 peer-reviewed sample papers, genes, and relationships.
              </p>
              <button
                onClick={handleResetSeed}
                className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-800 border border-rose-300 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>Reset to Seed Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
