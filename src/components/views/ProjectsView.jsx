import React from 'react';
import { ExternalLink, ChevronRight, Play, Sliders } from 'lucide-react';
import TiltCard from '../ui/TiltCard';
import { PROJECTS } from '../../data/portfolioData';
import { playSynth } from '../../utils/soundSynth';

export default function ProjectsView({ theme = 'obsidian', overclock, muted, onSelectProject, onOpenDino }) {
  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : isLight
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-zinc-800'}`}>
        <span className={`font-mono text-xs uppercase tracking-widest ${accentText}`}>
          // DEPLOYED SYSTEMS &amp; REPOSITORIES ({PROJECTS.length})
        </span>
        <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
          HOVER TO TILT • CLICK SPECS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((proj) => (
          <TiltCard
            key={proj.id}
            maxTilt={11}
            scale={1.03}
            overclock={overclock}
            className={`group rounded-xl border p-4 flex flex-col justify-between transition-colors ${
              isLight
                ? 'border-stone-200 bg-stone-50/90 hover:border-amber-500'
                : 'border-zinc-800 bg-zinc-950/75 hover:border-emerald-400/60'
            }`}
          >
            <div style={{ transform: 'translateZ(16px)' }}>
              <div className={`flex items-center justify-between text-[11px] font-mono mb-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                <span className={accentText}>{proj.code}</span>
                <a
                  href={proj.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 ${isLight ? 'hover:text-zinc-900' : 'hover:text-white'}`}
                >
                  REPO <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <h3 className={`text-base font-bold transition ${isLight ? 'text-zinc-900 group-hover:text-amber-700' : 'text-white group-hover:text-emerald-300'}`}>
                {proj.title}
              </h3>
              <p className={`mt-1.5 text-xs leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                {proj.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 rounded border text-[10px] font-mono ${
                      isLight
                        ? 'bg-white border-stone-200 text-zinc-700'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{ transform: 'translateZ(22px)' }}
              className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 ${
                isLight ? 'border-stone-200' : 'border-zinc-800/80'
              }`}
            >
              <button
                onClick={() => {
                  playSynth('switch', muted);
                  onSelectProject(proj);
                }}
                className={`text-xs font-mono font-bold flex items-center gap-1 cursor-pointer ${accentText}`}
              >
                {proj.interactiveType ? (
                  <>
                    <Sliders className="w-3.5 h-3.5" /> INTERACTIVE SIM
                  </>
                ) : (
                  <>
                    SPECS <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {proj.playable && (
                <button
                  onClick={() => {
                    playSynth('jump', muted);
                    onOpenDino();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-500/30 transition cursor-pointer"
                >
                  <Play className="w-3 h-3" /> LAUNCH CAM DEMO
                </button>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
