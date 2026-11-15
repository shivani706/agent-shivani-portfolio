import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { playSynth } from '../../utils/soundSynth';
import { PROFILE_INFO } from '../../data/portfolioData';

export default function ContactModal({ onClose, overclock, muted }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSynth('switch', muted);
    setStatus({ state: 'loading', message: 'ENCRYPTING & TRANSMITTING PACKET...' });

    if (!accessKey) {
      setStatus({ state: 'error', message: 'VITE_WEB3FORMS_KEY MISSING — USE DIRECT MAILTO BELOW' });
      return;
    }

    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    formData.append('subject', 'Portfolio Transmission: New Message for Agent Shivani');
    formData.append('from_name', 'Agent Shivani Portfolio Terminal');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setStatus({ state: 'success', message: `TRANSMISSION DELIVERED TO ${PROFILE_INFO.email.toUpperCase()}` });
        e.target.reset();
      } else {
        setStatus({ state: 'error', message: data.message || 'TRANSMISSION INTERRUPTED' });
      }
    } catch {
      setStatus({ state: 'error', message: 'NETWORK ERROR // USE DIRECT MAILTO LINK' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`max-w-lg w-full rounded-2xl border ${overclock ? 'border-rose-500/50' : 'border-emerald-500/50'} bg-zinc-900 p-6 space-y-4 shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <span className={`font-mono text-xs font-bold ${overclock ? 'text-rose-400' : 'text-emerald-400'}`}>// SECURE COMMS UPLINK</span>
            <p className="text-[11px] font-mono text-zinc-400">ENDPOINT: {PROFILE_INFO.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-mono text-zinc-300 mb-1">SENDER_IDENTITY</label>
            <input type="text" name="name" required placeholder="Recruiter / Collaborator Name" className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-300 mb-1">RETURN_ADDRESS</label>
            <input type="email" name="email" required placeholder="you@organization.com" className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-300 mb-1">MESSAGE_PAYLOAD</label>
            <textarea name="message" rows={4} required placeholder="Internship opportunity, project collaboration, or technical inquiry..." className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-400 focus:outline-none" />
          </div>

          {status.message && (
            <div className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${status.state === 'success' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : status.state === 'error' ? 'bg-rose-950/40 border-rose-500/50 text-rose-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}>
              {status.state === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{status.message}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a href={`mailto:${PROFILE_INFO.email}`} className="text-xs font-mono text-zinc-400 hover:text-white underline">DIRECT MAILTO FALLBACK</a>
            <button type="submit" disabled={status.state === 'loading'} className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 ${overclock ? 'bg-rose-500 hover:bg-rose-400 text-zinc-950' : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950'}`}>
              <Send className="w-3.5 h-3.5" />
              {status.state === 'loading' ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

