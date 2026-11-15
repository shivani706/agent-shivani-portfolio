import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';
import { PROFILE_INFO } from '../../data/portfolioData';

export default function HackerCli({ onClose, overclock, onToggleOverclock, onSwitchTab, onOpenDino, onOpenContact }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'AGENT SHIVANI OS v4.26 [DESIGNATION: ZERO-DAY]',
    'Type "help" to view available tactical directives. Press ESC or "~" to exit.',
  ]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const executeCommand = (e) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    const pushLines = (lines) => setHistory((prev) => [...prev, `agent@shivani:~$ ${raw}`, ...lines]);

    switch (cmd) {
      case 'help':
        pushLines([
          'AVAILABLE DIRECTIVES:',
          '  whoami     - Display operative identity & MITS / IAF / NCC standing',
          '  projects   - Switch stage to Deployed Systems & inspect repositories',
          '  skills     - Switch stage to Technical Capability Telemetry',
          '  dossier    - View IAF Internship & Naval NCC credentials',
          '  dino       - Launch Gesture Dino Vision Runner arcade',
          '  contact    - Open Web3Forms transmission uplink',
          '  overclock  - Toggle high-frequency Overclock Mode',
          '  clear      - Purge terminal buffer',
        ]);
        break;
      case 'whoami':
        pushLines([
          `NAME        : ${PROFILE_INFO.name} (${PROFILE_INFO.codename})`,
          'EDUCATION   : B.Tech CSE @ MITS Gwalior (CGPA: 8.2)',
          'EXPERIENCE  : Ex-Graphic Design Intern @ Indian Air Force (IAF)',
          'LEADERSHIP  : Naval Wing Cadet @ National Cadet Corps (NCC)',
          `GITHUB      : ${PROFILE_INFO.github}`,
        ]);
        break;
      case 'projects': onSwitchTab('projects'); pushLines(['[OK] Stage switched to SW_01 // MY PROJECTS.']); break;
      case 'skills': onSwitchTab('skills'); pushLines(['[OK] Stage switched to SW_02 // SKILL MATRIX.']); break;
      case 'dossier': onSwitchTab('dossier'); pushLines(['[OK] Stage switched to SW_03 // IAF & ARCADE DOSSIER.']); break;
      case 'dino': case 'cam': pushLines(['[LAUNCHING] Initializing Cyber Dino Vision Engine...']); setTimeout(() => onOpenDino(), 250); break;
      case 'contact': case 'mail': pushLines([`[OPENING] Establishing Web3Forms uplink to ${PROFILE_INFO.email}...`]); setTimeout(() => onOpenContact(), 250); break;
      case 'overclock': onToggleOverclock(); pushLines([`[SYSTEM] Overclock state toggled -> ${!overclock ? 'ENGAGED' : 'NOMINAL'}.`]); break;
      case 'clear': setHistory([]); break;
      default: pushLines([`[ERR] Unknown directive "${raw}". Type "help" for valid commands.`]);
    }
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className={`w-full max-w-2xl rounded-2xl border ${overclock ? 'border-rose-500/60' : 'border-emerald-500/60'} bg-[#050507] shadow-2xl overflow-hidden font-mono`}>
        <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className={`w-4 h-4 ${overclock ? 'text-rose-400' : 'text-emerald-400'}`} />
            <span className="text-zinc-200 font-bold">ZERO-DAY // SHELL (~)</span>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-4 h-72 overflow-y-auto space-y-1.5 text-xs text-zinc-300">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith('agent@shivani') ? (overclock ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold') : 'whitespace-pre-wrap'}>{line}</div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={executeCommand} className="px-4 py-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2">
          <span className={`text-xs font-bold ${overclock ? 'text-rose-400' : 'text-emerald-400'}`}>agent@shivani:~$</span>
          <input type="text" autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter command (help, whoami, dino, contact, overclock)..." className="flex-1 bg-transparent text-xs text-white focus:outline-none" />
        </form>
      </div>
    </div>
  );
}

