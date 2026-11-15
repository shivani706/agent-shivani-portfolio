import React, { useRef, useState } from 'react';
import { Mail, Upload, FileDown, Copy, Check, Award } from 'lucide-react';
import TiltCard from '../ui/TiltCard';
import { PROFILE_INFO } from '../../data/portfolioData';
import { playSynth } from '../../utils/soundSynth';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function PortraitCard({
  theme = 'obsidian',
  photoUrl,
  onPhotoChange,
  overclock,
  muted,
  onOpenContact,
}) {
  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const isLight = theme === 'daylight';
  const accentText = overclock
    ? 'text-rose-500'
    : isLight
    ? 'text-amber-600'
    : theme === 'amethyst'
    ? 'text-purple-400'
    : 'text-emerald-400';

  const cardSurface = isLight
    ? 'border-stone-200 bg-white/95 shadow-md text-zinc-900'
    : overclock
    ? 'border-rose-500/40 bg-zinc-900/75 text-zinc-100'
    : theme === 'amethyst'
    ? 'border-purple-500/35 bg-[#14101d]/85 text-zinc-100'
    : 'border-emerald-500/35 bg-zinc-900/75 text-zinc-100';

  const ringBorder = overclock
    ? 'border-rose-500/50'
    : isLight
    ? 'border-amber-500/60'
    : theme === 'amethyst'
    ? 'border-purple-400/50'
    : 'border-emerald-400/50';

  const cornerBorder = overclock
    ? 'border-rose-400'
    : isLight
    ? 'border-amber-500'
    : theme === 'amethyst'
    ? 'border-purple-400'
    : 'border-emerald-400';

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) onPhotoChange(URL.createObjectURL(file));
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE_INFO.email);
    playSynth('switch', muted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TiltCard
      maxTilt={7}
      scale={1.015}
      overclock={overclock}
      className={`rounded-2xl border ${cardSurface} backdrop-blur-xl p-6 sm:p-7 transition-colors`}
    >
      <div style={{ transform: 'translateZ(28px)' }} className="relative group w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
        <div className={`absolute -inset-2 rounded-2xl border-2 border-dashed ${ringBorder} animate-[spin_18s_linear_infinite]`} />
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${cornerBorder}`} />
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${cornerBorder}`} />
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${cornerBorder}`} />
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${cornerBorder}`} />

        <div className={`relative w-full h-full rounded-xl overflow-hidden border ${isLight ? 'bg-stone-100 border-stone-300' : 'bg-zinc-950 border-zinc-700'}`}>
          <img src={photoUrl} alt={PROFILE_INFO.name} className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-zinc-950/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-xs font-mono text-emerald-300 transition-opacity cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            <span>SWAP PORTRAIT</span>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border text-[11px] font-mono whitespace-nowrap ${
          isLight
            ? 'bg-white border-emerald-500 text-emerald-700 shadow-sm'
            : 'bg-zinc-950 border-emerald-500/50 text-emerald-400'
        }`}>
          ● OPEN TO INTERNSHIPS
        </div>
      </div>

      <div style={{ transform: 'translateZ(18px)' }} className="text-center space-y-1.5 mt-4">
        <p className={`font-mono text-xs tracking-widest uppercase ${accentText}`}>
          OPERATIVE // {PROFILE_INFO.name.toUpperCase()}
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{PROFILE_INFO.role}</h1>
        <p className={`text-xs font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
          {PROFILE_INFO.credentials}
        </p>
      </div>

      <p
        style={{ transform: 'translateZ(12px)' }}
        className={`mt-4 text-sm leading-relaxed text-center sm:text-left border-t pt-4 ${
          isLight ? 'text-zinc-600 border-stone-200' : 'text-zinc-300 border-zinc-800/80'
        }`}
      >
        {PROFILE_INFO.bio}
      </p>

      {/* Coding Arena & NPTEL Telemetry Strip */}
      <div style={{ transform: 'translateZ(15px)' }} className="mt-4 grid grid-cols-3 gap-2">
        {PROFILE_INFO.codingStats.map((stat) => (
          <div
            key={stat.platform}
            className={`rounded-xl border p-2.5 text-center ${
              isLight ? 'bg-stone-100/80 border-stone-200' : 'bg-zinc-950/70 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <Award className={`w-3 h-3 ${accentText}`} />
              <span className="font-mono text-[10px] font-bold tracking-wider">{stat.platform}</span>
            </div>
            <p className={`text-[10px] mt-0.5 truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* One-Click Email Copy Pill */}
      <div style={{ transform: 'translateZ(16px)' }} className="mt-3">
        <button
          onClick={handleCopyEmail}
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border font-mono text-xs transition cursor-pointer ${
            isLight
              ? 'bg-stone-100 hover:bg-stone-200/70 border-stone-300 text-zinc-700'
              : 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}
        >
          <span className="truncate">{PROFILE_INFO.email}</span>
          <span className={`flex items-center gap-1 font-bold shrink-0 ml-2 ${accentText}`}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'COPIED!' : 'COPY'}
          </span>
        </button>
      </div>

      {/* Action Buttons: GitHub, Transmit Mail, and Resume PDF */}
      <div style={{ transform: 'translateZ(20px)' }} className="mt-4 grid grid-cols-2 gap-2.5">
        <a
          href={PROFILE_INFO.github}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition ${
            isLight
              ? 'bg-stone-200/80 hover:bg-stone-200 border-stone-300 text-zinc-900'
              : 'bg-zinc-800/80 hover:bg-zinc-800 border-zinc-700 text-white'
          }`}
        >
          <GithubIcon className="w-4 h-4" />
          GITHUB
        </a>

        <button
          onClick={() => {
            playSynth('switch', muted);
            onOpenContact();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition cursor-pointer ${
            overclock
              ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/50 text-rose-400'
              : isLight
              ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/50 text-amber-900'
              : theme === 'amethyst'
              ? 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/50 text-purple-200'
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          TRANSMIT MAIL
        </button>

        <a
          href={PROFILE_INFO.resumeUrl}
          download="Shivani_Raghuwanshi_Resume.pdf"
          className={`col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-mono font-bold tracking-wider transition ${
            isLight
              ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-900 text-white'
              : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-700 text-zinc-200'
          }`}
        >
          <FileDown className="w-4 h-4" />
          DOWNLOAD RESUME (PDF)
        </a>
      </div>
    </TiltCard>
  );
}
