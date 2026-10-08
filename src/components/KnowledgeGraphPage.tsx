import React, { useState, useMemo } from 'react';
import {
  Share2, Filter, Search, Info, ZoomIn, ZoomOut, RotateCcw,
  Dna, Activity, Layers, Pill, ArrowRight, ShieldCheck
} from 'lucide-react';
import { Relationship, Gene, Disease, Protein, Drug } from '../types';

interface KnowledgeGraphPageProps {
  relationships: Relationship[];
  onSearchEntity: (term: string) => void;
}

interface Node {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  borderColor: string;
}

interface Link {
  source: string;
  target: string;
  type: string;
  confidence: number;
  evidence?: string;
}

export const KnowledgeGraphPage: React.FC<KnowledgeGraphPageProps> = ({
  relationships,
  onSearchEntity
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedRel, setSelectedRel] = useState<Relationship | null>(null);
  const [filterRelType, setFilterRelType] = useState<string>('All');
  const [filterNodeType, setFilterNodeType] = useState<string>('All');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Get unique relationship types
  const relTypes = useMemo(() => {
    return Array.from(new Set(relationships.map(r => r.relationshipType)));
  }, [relationships]);

  // Filtered relationships for the graph
  const filteredRelationships = useMemo(() => {
    return relationships.filter(r => {
      if (filterRelType !== 'All' && r.relationshipType !== filterRelType) return false;
      if (filterNodeType !== 'All') {
        if (r.sourceType !== filterNodeType && r.targetType !== filterNodeType) return false;
      }
      return true;
    });
  }, [relationships, filterRelType, filterNodeType]);

  // Construct Graph Nodes and Coordinates in an aesthetic scientific layout
  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, Node>();
    const nodeNames = new Set<string>();

    filteredRelationships.forEach(r => {
      nodeNames.add(r.sourceName);
      nodeNames.add(r.targetName);
    });

    const nodeList = Array.from(nodeNames);
    const total = nodeList.length;
    const centerX = 450;
    const centerY = 320;

    // Distribute nodes in clusters by entity type
    nodeList.forEach((name, idx) => {
      // Find its type
      const match = relationships.find(r => r.sourceName === name || r.targetName === name);
      const type = (match?.sourceName === name ? match?.sourceType : match?.targetType) || 'Entity';

      let baseRadius = 220;
      let angleOffset = 0;
      let color = '#3b82f6';
      let borderColor = '#1d4ed8';

      if (type === 'Disease') {
        baseRadius = 160;
        angleOffset = 0.5;
        color = '#06b6d4';
        borderColor = '#0891b2';
      } else if (type === 'Protein') {
        baseRadius = 260;
        angleOffset = 1.0;
        color = '#10b981';
        borderColor = '#059669';
      } else if (type === 'Drug') {
        baseRadius = 310;
        angleOffset = 1.5;
        color = '#f59e0b';
        borderColor = '#d97706';
      }

      const angle = (idx / total) * 2 * Math.PI + angleOffset;
      const x = centerX + Math.cos(angle) * (baseRadius + ((idx % 3) * 20));
      const y = centerY + Math.sin(angle) * (baseRadius + ((idx % 3) * 15));

      nodeMap.set(name, {
        id: name,
        name,
        type,
        x,
        y,
        radius: type === 'Disease' ? 18 : type === 'Gene' ? 16 : 14,
        color,
        borderColor
      });
    });

    const linkList: Link[] = filteredRelationships.map(r => ({
      source: r.sourceName,
      target: r.targetName,
      type: r.relationshipType,
      confidence: r.confidence,
      evidence: r.evidence
    }));

    return { nodes: Array.from(nodeMap.values()), links: linkList };
  }, [filteredRelationships, relationships]);

  // Filtered tabular relationships
  const tableData = useMemo(() => {
    return relationships.filter(r =>
      r.sourceName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      r.targetName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      r.relationshipType.toLowerCase().includes(tableSearch.toLowerCase())
    );
  }, [relationships, tableSearch]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    // Find first relevant relation
    const foundRel = relationships.find(
      r => r.sourceName === node.name || r.targetName === node.name
    );
    if (foundRel) setSelectedRel(foundRel);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Biomedical Knowledge Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Interactive multi-relational network modeling gene-disease, gene-protein, and drug-disease associations.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-700 font-medium">Gene</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" />
            <span className="text-slate-700 font-medium">Disease</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-slate-700 font-medium">Protein</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-700 font-medium">Drug</span>
          </div>
        </div>
      </div>

      {/* Graph Filter Ribbon */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Relationship Type:</span>
            <select
              value={filterRelType}
              onChange={(e) => setFilterRelType(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Types ({relationships.length})</option>
              {relTypes.map(rt => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Entity Filter:</span>
            <select
              value={filterNodeType}
              onChange={(e) => setFilterNodeType(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Entities</option>
              <option value="Gene">Gene</option>
              <option value="Disease">Disease</option>
              <option value="Protein">Protein</option>
              <option value="Drug">Drug</option>
            </select>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 2.0))}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { setZoomLevel(1); setPan({ x: 0, y: 0 }); }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Network Stage */}
        <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative shadow-lg h-[640px] flex items-center justify-center">
          <svg
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            viewBox="0 0 900 640"
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoomLevel})`} transform-origin="450 320">
              {/* Relationship Links */}
              {links.map((link, idx) => {
                const sNode = nodes.find(n => n.id === link.source);
                const tNode = nodes.find(n => n.id === link.target);
                if (!sNode || !tNode) return null;

                const isConnectedToSelected = selectedNode && (
                  selectedNode.name === link.source || selectedNode.name === link.target
                );

                return (
                  <g key={idx}>
                    <line
                      x1={sNode.x}
                      y1={sNode.y}
                      x2={tNode.x}
                      y2={tNode.y}
                      stroke={isConnectedToSelected ? '#38bdf8' : '#334155'}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                      strokeOpacity={isConnectedToSelected ? 0.9 : 0.4}
                      strokeDasharray={link.type === 'inhibits' ? '4 2' : undefined}
                    />
                  </g>
                );
              })}

              {/* Entity Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    <circle
                      r={node.radius + (isSelected ? 4 : 0)}
                      fill={node.color}
                      stroke={isSelected ? '#ffffff' : node.borderColor}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-150"
                    />
                    <text
                      y={node.radius + 14}
                      textAnchor="middle"
                      fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                      fontSize={isSelected ? 11 : 9.5}
                      fontWeight={isSelected ? 700 : 500}
                      fontFamily="JetBrains Mono, monospace"
                      className="pointer-events-none drop-shadow-sm"
                    >
                      {node.name.length > 16 ? node.name.substring(0, 14) + '..' : node.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Canvas HUD hint */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
            {nodes.length} Nodes · {links.length} Active Edges · Click any node to inspect
          </div>
        </div>

        {/* Selected Entity Inspector Panel */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {selectedNode.type} Node
                </span>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedNode.color }} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-mono">{selectedNode.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active in biological pathways and literature connections.
                </p>
              </div>

              {/* Incident Relationships */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-900 block">Connected Edges:</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {relationships
                    .filter(r => r.sourceName === selectedNode.name || r.targetName === selectedNode.name)
                    .map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => setSelectedRel(rel)}
                        className="p-2 rounded bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-[11px] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-slate-700 font-medium">
                          <span>{rel.sourceName}</span>
                          <span className="font-mono text-blue-900 font-semibold px-1 bg-white rounded border border-slate-200">
                            {rel.relationshipType}
                          </span>
                          <span>{rel.targetName}</span>
                        </div>
                        {rel.evidence && (
                          <p className="text-[10px] text-slate-500 mt-1 italic line-clamp-2">
                            &ldquo;{rel.evidence}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Relationship Inspector */}
              {selectedRel && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs space-y-1.5">
                  <span className="font-bold text-blue-950 block">Relationship Evidence</span>
                  <div className="flex items-center justify-between font-mono text-[11px] text-blue-900">
                    <span>Confidence: {(selectedRel.confidence * 100).toFixed(0)}%</span>
                    <span>Type: {selectedRel.relationshipType}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {selectedRel.evidence}
                  </p>
                </div>
              )}

              <button
                onClick={() => onSearchEntity(selectedNode.name)}
                className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Search Literature for &ldquo;{selectedNode.name}&rdquo;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Share2 className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-xs font-bold text-slate-700">No Node Selected</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click any gene, disease, protein, or drug node on the network canvas to view its biological connections and verified evidence.
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            Ground Truth: Curated Literature Graph
          </div>
        </div>
      </div>

      {/* Tabular Relationship Explorer */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Curated Biological Relationships Registry ({tableData.length})
            </h3>
            <p className="text-xs text-slate-500">
              Tabular view of all validated functional interactions in the knowledge repository.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search source, target, or edge..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3 font-semibold">Source Entity</th>
                <th className="py-2.5 px-3 font-semibold">Source Type</th>
                <th className="py-2.5 px-3 font-semibold">Interaction Type</th>
                <th className="py-2.5 px-3 font-semibold">Target Entity</th>
                <th className="py-2.5 px-3 font-semibold">Target Type</th>
                <th className="py-2.5 px-3 font-semibold">Confidence</th>
                <th className="py-2.5 px-3 font-semibold">Evidence Snippet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.slice(0, 15).map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold font-mono text-slate-900">{row.sourceName}</td>
                  <td className="py-2.5 px-3 text-slate-500">{row.sourceType}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-medium">
                      {row.relationshipType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold font-mono text-slate-900">{row.targetName}</td>
                  <td className="py-2.5 px-3 text-slate-500">{row.targetType}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-700">
                    {(row.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate" title={row.evidence}>
                    {row.evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
