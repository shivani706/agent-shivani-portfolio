import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { PROFILE_INFO } from './data/portfolioData';
import { playSynth } from './utils/soundSynth';

import BootSequence from './components/layout/BootSequence';
import NeuralCanvas from './components/layout/NeuralCanvas';
import Navbar from './components/layout/Navbar';
import PortraitCard from './components/hero/PortraitCard';
import SwitchDeck from './components/hero/SwitchDeck';

import ProjectsView from './components/views/ProjectsView';
import SkillsView from './components/views/SkillsView';
import DossierView from './components/views/DossierView';

import ProjectModal from './components/modals/ProjectModal';
import ContactModal from './components/modals/ContactModal';
import HackerCli from './components/modals/HackerCli';
import DinoArcade from './components/modals/DinoArcade';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState('obsidian');
  const [activeTab, setActiveTab] = useState('projects');
  const [overclock, setOverclock] = useState(false);
  const [muted, setMuted] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(PROFILE_INFO.defaultAvatar);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dinoModalOpen, setDinoModalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [cliOpen, setCliOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === '`' || e.key === '~') {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        setCliOpen((prev) => { playSynth('terminal', muted); return !prev; });
      } else if (e.key === 'Escape') {
        setCliOpen(false); setContactOpen(false); setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [muted]);

  const handleTabSwitch = (tab) => { playSynth('switch', muted); setActiveTab(tab); };
  const handleOverclock = () => { playSynth('overclock', muted); setOverclock((prev) => !prev); };

  const isLight = theme === 'daylight';
  const rootBg =
    theme === 'daylight'
      ? 'bg-[#faf9f6] text-zinc-900'
      : theme === 'amethyst'
      ? 'bg-[#0d0b12] text-zinc-100'
      : 'bg-[#09090b] text-zinc-100';

  const stageStyle = isLight
    ? 'border-stone-200 bg-white/90 shadow-sm'
    : overclock
    ? 'border-rose-500/40 bg-zinc-900/75'
    : theme === 'amethyst'
    ? 'border-purple-500/35 bg-[#14101d]/80'
    : 'border-emerald-500/30 bg-zinc-900/75';

  return (
    <div className={`min-h-screen ${rootBg} font-sans relative overflow-x-hidden transition-colors duration-300`}>
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      <NeuralCanvas theme={theme} overclock={overclock} />

      <Navbar
        theme={theme}
        onChangeTheme={setTheme}
        overclock={overclock}
        muted={muted}
        onToggleMute={() => setMuted((prev) => !prev)}
        onToggleCli={() => setCliOpen((prev) => !prev)}
        onOpenDino={() => setDinoModalOpen(true)}
        onToggleOverclock={handleOverclock}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5">
            <PortraitCard
              theme={theme}
              photoUrl={photoUrl}
              onPhotoChange={setPhotoUrl}
              overclock={overclock}
              muted={muted}
              onOpenContact={() => setContactOpen(true)}
            />
          </section>

          <section className="lg:col-span-7 space-y-6">
            <SwitchDeck
              theme={theme}
              activeTab={activeTab}
              onSwitch={handleTabSwitch}
              overclock={overclock}
            />

            <div className={`rounded-2xl border ${stageStyle} backdrop-blur-xl p-5 sm:p-6 min-h-[470px] transition-all duration-300`}>
              {activeTab === 'projects' && (
                <ProjectsView
                  theme={theme}
                  overclock={overclock}
                  muted={muted}
                  onSelectProject={setSelectedProject}
                  onOpenDino={() => setDinoModalOpen(true)}
                />
              )}
              {activeTab === 'skills' && <SkillsView theme={theme} overclock={overclock} />}
              {activeTab === 'dossier' && (
                <DossierView
                  theme={theme}
                  overclock={overclock}
                  muted={muted}
                  onOpenDino={() => setDinoModalOpen(true)}
                />
              )}
            </div>
          </section>
        </div>
      </main>

      <button
        onClick={() => { playSynth('terminal', muted); setCliOpen((prev) => !prev); }}
        title="Open Hacker Terminal (~)"
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl font-mono text-xs font-bold shadow-2xl transition-all cursor-pointer ${
          overclock
            ? 'bg-rose-950/90 border-rose-500 text-rose-300'
            : isLight
            ? 'bg-zinc-900 border-zinc-700 text-amber-300'
            : 'bg-zinc-950/90 border-emerald-500/60 text-emerald-300 hover:scale-105'
        }`}
      >
        <Terminal className="w-4 h-4" />
        <span>TERMINAL [~]</span>
      </button>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} overclock={overclock} muted={muted} />}
      {cliOpen && (
        <HackerCli
          onClose={() => setCliOpen(false)}
          overclock={overclock}
          onToggleOverclock={handleOverclock}
          onSwitchTab={setActiveTab}
          onOpenDino={() => { setCliOpen(false); setDinoModalOpen(true); }}
          onOpenContact={() => { setCliOpen(false); setContactOpen(true); }}
        />
      )}
      <ProjectModal project={selectedProject} overclock={overclock} onClose={() => setSelectedProject(null)} />
      {dinoModalOpen && <DinoArcade onClose={() => setDinoModalOpen(false)} muted={muted} />}
    </div>
  );
}
