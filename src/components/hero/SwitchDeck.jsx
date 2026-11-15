import React from 'react';
import { Layers, Cpu, Shield } from 'lucide-react';

const SWITCHES = [
  { id: 'projects', num: '01', label: 'MY PROJECTS', icon: Layers },
  { id: 'skills', num: '02', label: 'SKILL MATRIX', icon: Cpu },
  { id: 'dossier', num: '03', label: 'IAF & ARCADE', icon: Shield },
];

export default function SwitchDeck({ theme = 'obsidian', activeTab, onSwitch, overclock }) {
  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : isLight
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  return (
    <div
      className={`grid grid-cols-3 gap-2.5 sm:gap-4 p-2 rounded-2xl border backdrop-blur-xl transition-colors ${
        isLight
          ? 'bg-stone-200/75 border-stone-300'
          : 'bg-zinc-900/85 border-zinc-800'
      }`}
    >
      {SWITCHES.map((sw) => {
        const Icon = sw.icon;
        const isActive = activeTab === sw.id;
        return (
          <button
            key={sw.id}
            onClick={() => onSwitch(sw.id)}
            className={`relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 py-3.5 px-2 sm:px-4 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              isActive
                ? overclock
                  ? 'bg-rose-500/25 text-white border border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]'
                  : isLight
                  ? 'bg-white text-zinc-900 border border-amber-500 shadow-sm scale-[1.02]'
                  : theme === 'amethyst'
                  ? 'bg-purple-500/25 text-white border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)] scale-[1.02]'
                  : 'bg-emerald-500/20 text-white border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]'
                : isLight
                ? 'bg-white/60 text-zinc-500 border border-transparent hover:text-zinc-900 hover:bg-white'
                : 'bg-zinc-950/60 text-zinc-400 border border-transparent hover:text-zinc-200 hover:bg-zinc-800/70'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? accentText : 'opacity-60'}`} />
            <div className="text-center sm:text-left">
              <span className="block text-[10px] opacity-60">SW_{sw.num}</span>
              <span>{sw.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
