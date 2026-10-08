import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { SystemStats, Paper, Gene, Disease, Relationship } from '../types';

interface AnalyticsPageProps {
  stats: SystemStats;
  papers: Paper[];
  genes: Gene[];
  diseases: Disease[];
  relationships: Relationship[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  stats,
  papers,
  genes,
  diseases,
  relationships
}) => {
  // 1. Papers by Year
  const papersByYear = useMemo(() => {
    const counts: Record<number, number> = {};
    papers.forEach(p => {
      counts[p.year] = (counts[p.year] || 0) + 1;
    });
    return Object.keys(counts)
      .sort()
      .map(year => ({
        year,
        count: counts[parseInt(year, 10)]
      }));
  }, [papers]);

  // 2. Most Frequently Occurring Genes in Papers
  const topGenesData = useMemo(() => {
    const list = genes.map(g => {
      const sym = g.symbol.toLowerCase();
      const count = papers.filter(p =>
        p.title.toLowerCase().includes(sym) ||
        p.abstract.toLowerCase().includes(sym) ||
        (p.keywords && p.keywords.toLowerCase().includes(sym))
      ).length;
      return { symbol: g.symbol, count };
    });
    return list.sort((a, b) => b.count - a.count).slice(0, 8);
  }, [genes, papers]);

  // 3. Disease Category Distribution
  const diseaseCategoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    diseases.forEach(d => {
      const cat = d.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const colors = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    return Object.keys(counts).map((category, idx) => ({
      name: category,
      value: counts[category],
      color: colors[idx % colors.length]
    }));
  }, [diseases]);

  // 4. Entity Breakdown Distribution
  const entityDistribution = useMemo(() => {
    return [
      { name: 'Research Papers', count: stats.totalPapers, fill: '#1e3a8a' },
      { name: 'Genes', count: stats.totalGenes, fill: '#2563eb' },
      { name: 'Diseases', count: stats.totalDiseases, fill: '#06b6d4' },
      { name: 'Proteins', count: stats.totalProteins, fill: '#10b981' },
      { name: 'Drugs', count: stats.totalDrugs, fill: '#f59e0b' },
      { name: 'Relationships', count: stats.totalRelationships, fill: '#8b5cf6' }
    ];
  }, [stats]);

  // 5. Biomedical Topic Keywords Frequency
  const topKeywords = useMemo(() => {
    const counts: Record<string, number> = {};
    papers.forEach(p => {
      if (p.keywords) {
        p.keywords.split(',').forEach(k => {
          const clean = k.trim().toLowerCase();
          if (clean.length > 2) {
            counts[clean] = (counts[clean] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
  }, [papers]);

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Biomedical IR & Genomic Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Empirical distribution of publications, genomic targets, disease pathology, and entity co-occurrences.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
          <span className="text-slate-500">Repository Status:</span>
          <span className="font-semibold text-emerald-600">● Nominal (Fully Indexed)</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Papers', val: stats.totalPapers, sub: 'Corpus size' },
          { label: 'Genes', val: stats.totalGenes, sub: 'Annotated targets' },
          { label: 'Diseases', val: stats.totalDiseases, sub: 'Pathologies' },
          { label: 'Proteins', val: stats.totalProteins, sub: 'UniProt mapped' },
          { label: 'Drugs', val: stats.totalDrugs, sub: 'FDA approved' },
          { label: 'Relationships', val: stats.totalRelationships, sub: 'Graph edges' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              {m.label}
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {m.val}
            </span>
            <p className="text-[10px] text-slate-500 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Papers by Year */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Research Publications by Year</h3>
              <p className="text-xs text-slate-500">Chronological distribution of indexed peer-reviewed studies</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Time-series</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={papersByYear} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                />
                <Bar dataKey="count" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Papers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Top Genes Occurrence */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Frequently Cited Genes</h3>
              <p className="text-xs text-slate-500">Occurrence counts across document titles and abstracts</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Frequency Ranking</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topGenesData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="symbol" type="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#0891b2" radius={[0, 4, 4, 0]} name="Citations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: Disease Category Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Disease Categories</h3>
            <p className="text-xs text-slate-500">Pathology classification in BioIntel</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {diseaseCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {diseaseCategoryData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Entity Type Inventory */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Biomedical Knowledge Distribution</h3>
              <p className="text-xs text-slate-500">Total volume of records across each entity classification</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Total Count</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entityDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {entityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Keywords / Biomedical Topics Frequency Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Top Biomedical Topics & Keywords</h3>
            <p className="text-xs text-slate-500">Most prevalent concepts extracted across all document metadata</p>
          </div>
          <span className="text-xs font-mono text-slate-500">Corpus Vocabulary</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {topKeywords.map((k, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
            >
              <span className="text-xs font-semibold text-slate-800 capitalize">{k.keyword}</span>
              <span className="font-mono text-xs text-blue-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                {k.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
