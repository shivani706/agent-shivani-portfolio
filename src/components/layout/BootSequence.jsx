import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

const BOOT_LINES = [
  '[OK] INITIALIZING AGENT SHIVANI // ZERO-DAY KERNEL v4.26...',
  '[OK] MOUNTING PYTORCH GEOMETRIC & 2R2C THERMAL TWIN ENGINES...',
  '[OK] VERIFYING CREDENTIALS: MITS GWALIOR • EX-IAF INTERN • NAVAL NCC...',
  '[READY] ESTABLISHING TACTICAL HUD UPLINK...',
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 340);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 1850);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b] text-emerald-400 font-mono flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-2xl border border-emerald-500/40 bg-zinc-950 p-6 space-y-4 shadow-[0_0_40px_rgba(16,185,129,0.18)]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>BOOT_SEQUENCE // ZERO-DAY</span>
          </div>
          <button
            onClick={onComplete}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
          >
            SKIP <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2 text-xs min-h-[104px]">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <p key={i} className={i === BOOT_LINES.length - 1 ? 'text-white font-bold' : 'text-emerald-400/90'}>
              {line}
            </p>
          ))}
        </div>

        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${(visibleLines / BOOT_LINES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
