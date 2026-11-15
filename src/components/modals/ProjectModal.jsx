import React, { useState } from 'react';
import { X, Thermometer, ShieldAlert } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const GNN_NODES = [
  { id: 'W_01', x: 60, y: 75, risk: 0.94, label: 'Mixer Hub (Illicit)', hops: '2-Hop Structuring -> W_03 -> W_05' },
  { id: 'W_02', x: 185, y: 35, risk: 0.14, label: 'Retail Exchange (Clean)', hops: 'Verified KYC Ingress' },
  { id: 'W_03', x: 195, y: 115, risk: 0.87, label: 'Peeling Chain Node', hops: 'High-velocity split from W_01' },
  { id: 'W_04', x: 325, y: 40, risk: 0.21, label: 'Cold Storage Vault', hops: 'Low-frequency institutional wallet' },
  { id: 'W_05', x: 335, y: 110, risk: 0.91, label: 'Exit Bridge Wallet', hops: 'Flagged by GAT + XGBoost ensemble' },
];

export default function ProjectModal({ project, overclock, onClose }) {
  const [outdoorTemp, setOutdoorTemp] = useState(38);
  const [occupancy, setOccupancy] = useState(65);
  const [selectedNode, setSelectedNode] = useState(GNN_NODES[0]);

  if (!project) return null;

  const accentText = overclock ? 'text-rose-400' : 'text-emerald-400';
  const accentBorder = overclock ? 'border-rose-500/40' : 'border-emerald-500/40';

  // 2R2C Thermal Physics Approximation for ThermaFlow
  const valveThrottle = Math.min(100, Math.max(15, Math.round((outdoorTemp - 18) * 2.3 + occupancy * 0.42)));
  const predictedZoneTemp = (22.0 + (outdoorTemp - 24) * 0.08 + (occupancy / 100) * 1.4 - (valveThrottle / 100) * 1.8).toFixed(1);
  const energySaved = Math.max(12, Math.round(34 - (valveThrottle * 0.18)));

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`max-w-xl w-full rounded-2xl border ${accentBorder} bg-zinc-900 p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className={`font-mono text-xs ${accentText}`}>{project.code}</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-xs font-mono text-emerald-400 mt-1">{project.metrics}</p>
        </div>

        {/* Interactive Demo 1: ThermaFlow 2R2C Live Simulator */}
        {project.interactiveType === 'thermal' && (
          <div className="rounded-xl border border-emerald-500/40 bg-zinc-950/90 p-4 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Thermometer className="w-4 h-4" /> LIVE 2R2C THERMAL SIMULATOR (GWALIOR)
              </span>
              <span className="text-[10px] text-zinc-400">DRAG SLIDERS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>OUTDOOR TEMP</span>
                  <span className="text-amber-400 font-bold">{outdoorTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={46}
                  value={outdoorTemp}
                  onChange={(e) => setOutdoorTemp(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>OCCUPANCY LOAD</span>
                  <span className="text-emerald-400 font-bold">{occupancy}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
              <div className="p-2 rounded-lg bg-zinc-900">
                <span className="block text-[10px] text-zinc-400">ZONE TEMP</span>
                <strong className="text-sm text-white">{predictedZoneTemp}°C</strong>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900">
                <span className="block text-[10px] text-zinc-400">VALVE THROTTLE</span>
                <strong className="text-sm text-amber-400">{valveThrottle}%</strong>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900">
                <span className="block text-[10px] text-zinc-400">HVAC SAVED</span>
                <strong className="text-sm text-emerald-400">+{energySaved}%</strong>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Demo 2: AegisGNN Bitcoin AML Subgraph Explorer */}
        {project.interactiveType === 'gnn' && (
          <div className="rounded-xl border border-rose-500/40 bg-zinc-950/90 p-4 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> GAT SUBGRAPH FORENSIC INSPECTOR
              </span>
              <span className="text-[10px] text-zinc-400">CLICK ANY WALLET NODE</span>
            </div>

            <svg viewBox="0 0 400 145" className="w-full h-36 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <line x1="60" y1="75" x2="185" y2="35" stroke="#52525b" strokeWidth="1.5" />
              <line x1="60" y1="75" x2="195" y2="115" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
              <line x1="185" y1="35" x2="325" y2="40" stroke="#52525b" strokeWidth="1.5" />
              <line x1="195" y1="115" x2="335" y2="110" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
              <line x1="185" y1="35" x2="195" y2="115" stroke="#52525b" strokeWidth="1.5" />

              {GNN_NODES.map((node) => {
                const isIllicit = node.risk > 0.7;
                const isSelected = selectedNode.id === node.id;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 19 : 15}
                      fill={isIllicit ? 'rgba(244,63,94,0.25)' : 'rgba(16,185,129,0.2)'}
                      stroke={isIllicit ? '#f43f5e' : '#10b981'}
                      strokeWidth={isSelected ? 3 : 1.5}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-bold text-white">{selectedNode.id}: {selectedNode.label}</span>
                <p className="text-[11px] text-zinc-400">{selectedNode.hops}</p>
              </div>
              <span className={`px-2.5 py-1 rounded font-bold ${selectedNode.risk > 0.7 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                GAT RISK: {(selectedNode.risk * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        )}

        <ul className="space-y-2 text-sm text-zinc-300 list-disc pl-5">
          {project.details.map((pt, idx) => <li key={idx}>{pt}</li>)}
        </ul>

        <div className="pt-3 flex items-center justify-end gap-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-mono text-xs font-bold flex items-center gap-2 hover:bg-emerald-500/30"
          >
            <GithubIcon className="w-4 h-4" /> VIEW SOURCE ON GITHUB
          </a>
        </div>
      </div>
    </div>
  );
}
