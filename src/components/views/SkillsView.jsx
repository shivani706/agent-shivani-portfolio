import React from 'react';
import TiltCard from '../ui/TiltCard';
import { SKILL_GROUPS } from '../../data/portfolioData';

export default function SkillsView({ theme = 'obsidian', overclock }) {
  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : isLight
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  const barBg = overclock
    ? 'bg-rose-500'
    : isLight
    ? 'bg-amber-500'
    : theme === 'amethyst'
    ? 'bg-purple-500'
    : 'bg-emerald-400';

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-zinc-800'}`}>
        <span className={`font-mono text-xs uppercase tracking-widest ${accentText}`}>
          // TECHNICAL CAPABILITY TELEMETRY
        </span>
        <span className="font-mono text-xs text-emerald-500 font-bold">STATUS: VERIFIED</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <TiltCard
              key={group.category}
              maxTilt={8}
              scale={1.02}
              overclock={overclock}
              className={`rounded-xl border p-4 space-y-3 ${
                isLight ? 'border-stone-200 bg-stone-50/90' : 'border-zinc-800 bg-zinc-950/75'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${accentText}`} />
                  <h3 className={`font-mono text-xs font-bold tracking-wider ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {group.category}
                  </h3>
                </div>
                <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {group.level}
                </span>
              </div>

              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-stone-200' : 'bg-zinc-800'}`}>
                <div className={`h-full rounded-full ${barBg}`} style={{ width: group.level }} />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-md border text-xs font-mono ${
                      isLight
                        ? 'bg-white border-stone-200 text-zinc-800'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
