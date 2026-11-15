import React from 'react';
import { Play } from 'lucide-react';
import { DOSSIER_ITEMS } from '../../data/portfolioData';
import { playSynth } from '../../utils/soundSynth';

export default function DossierView({ theme = 'obsidian', overclock, muted, onOpenDino }) {
  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : isLight
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  return (
    <div className="space-y-5">
      <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-zinc-800'}`}>
        <span className={`font-mono text-xs uppercase tracking-widest ${accentText}`}>
          // SERVICE CREDENTIALS &amp; INTERACTIVE LAB
        </span>
        <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
          CLEARANCE: LEVEL 4
        </span>
      </div>

      <div className="space-y-3">
        {DOSSIER_ITEMS.map((item) => (
          <div
            key={item.role}
            className={`rounded-xl border p-4 ${
              isLight ? 'border-stone-200 bg-stone-50/90' : 'border-zinc-800 bg-zinc-950/70'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className={`text-sm font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {item.role} <span className={accentText}>@ {item.org}</span>
              </h3>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight
                    ? 'bg-white border-stone-300 text-zinc-600'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                }`}
              >
                {item.period}
              </span>
            </div>
            <p className={`mt-1.5 text-xs leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight
            ? 'border-emerald-500/40 bg-emerald-50/80'
            : 'border-emerald-500/40 bg-emerald-950/20'
        }`}
      >
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
            // HIDDEN ARCADE MODULE
          </span>
          <h4 className={`text-sm font-bold mt-0.5 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Test the Browser Vision Dino Runner
          </h4>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
            Wave your hand in front of your webcam or press Spacebar to jump obstacles.
          </p>
        </div>
        <button
          onClick={() => {
            playSynth('jump', muted);
            onOpenDino();
          }}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-extrabold tracking-wider flex items-center gap-2 transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          LAUNCH ARCADE
        </button>
      </div>
    </div>
  );
}
