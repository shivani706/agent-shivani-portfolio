import React from 'react';
import { Volume2, VolumeX, Terminal, Camera, Zap, Palette } from 'lucide-react';
import { playSynth } from '../../utils/soundSynth';

const THEMES = [
  { id: 'obsidian', label: 'OBSIDIAN', dot: 'bg-emerald-400' },
  { id: 'daylight', label: 'DAYLIGHT', dot: 'bg-amber-500' },
  { id: 'amethyst', label: 'AMETHYST', dot: 'bg-purple-400' },
];

export default function Navbar({
  theme,
  onChangeTheme,
  overclock,
  muted,
  onToggleMute,
  onToggleCli,
  onOpenDino,
  onToggleOverclock,
}) {
  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : theme === 'daylight'
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  return (
    <header
      className={`relative z-10 border-b backdrop-blur-md transition-colors ${
        isLight
          ? 'border-stone-200 bg-[#faf9f6]/90 text-zinc-900'
          : 'border-zinc-800/80 bg-[#09090b]/85 text-zinc-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full animate-ping ${
              overclock ? 'bg-rose-500' : isLight ? 'bg-amber-500' : 'bg-emerald-400'
            }`}
          />
          <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold">
            AGENT SHIVANI <span className={accentText}>// ZERO-DAY</span>
          </span>
        </div>

        {/* Theme Switcher Pill */}
        <div
          className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border font-mono text-[11px] ${
            isLight ? 'bg-stone-200/70 border-stone-300' : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5 mx-1.5 opacity-60" />
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playSynth('switch', muted);
                onChangeTheme(t.id);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                theme === t.id
                  ? isLight
                    ? 'bg-white text-zinc-900 font-bold shadow-sm'
                    : 'bg-zinc-800 text-white font-bold'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${t.dot}`} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Cycle Button */}
          <button
            onClick={() => {
              const next = THEMES[(THEMES.findIndex((t) => t.id === theme) + 1) % THEMES.length].id;
              playSynth('switch', muted);
              onChangeTheme(next);
            }}
            title="Switch Theme"
            className={`lg:hidden p-2 rounded-lg border transition cursor-pointer ${
              isLight ? 'border-stone-300 bg-white text-zinc-700' : 'border-zinc-800 bg-zinc-900 text-zinc-300'
            }`}
          >
            <Palette className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleMute}
            title="Toggle Synth Audio"
            className={`p-2 rounded-lg border transition cursor-pointer ${
              isLight ? 'border-stone-300 bg-white text-zinc-700' : 'border-zinc-800 bg-zinc-900 text-zinc-300'
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playSynth('terminal', muted);
              onToggleCli();
            }}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition cursor-pointer ${
              isLight
                ? 'border-stone-300 bg-white hover:border-amber-500 text-zinc-800'
                : 'border-zinc-800 bg-zinc-900 hover:border-emerald-500/50 text-zinc-300'
            }`}
          >
            <Terminal className={`w-3.5 h-3.5 ${accentText}`} />
            CLI [~]
          </button>

          <button
            onClick={() => {
              playSynth('jump', muted);
              onOpenDino();
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition cursor-pointer ${
              isLight
                ? 'border-emerald-600/40 bg-emerald-500/15 text-emerald-800 hover:bg-emerald-500/25'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            DINO CAM
          </button>

          <button
            onClick={onToggleOverclock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold tracking-wider transition cursor-pointer ${
              overclock
                ? 'border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : isLight
                ? 'border-amber-500/50 bg-amber-500/15 text-amber-800 hover:bg-amber-500/25'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {overclock ? 'OVERCLOCK: ON' : 'OVERCLOCK'}
          </button>
        </div>
      </div>
    </header>
  );
}
