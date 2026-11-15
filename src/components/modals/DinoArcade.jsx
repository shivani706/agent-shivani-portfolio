import React, { useState, useRef, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { playSynth } from '../../utils/soundSynth';

export default function DinoArcade({ onClose, muted }) {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [camActive, setCamActive] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const jumpRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dinoY = 150, vy = 0, isJumping = false, obstacleX = 560, currentScore = 0, alive = true, animId;

    const triggerJump = () => {
      if (!isJumping && alive) { vy = -11.5; isJumping = true; playSynth('jump', muted); }
      else if (!alive) { dinoY = 150; vy = 0; isJumping = false; obstacleX = 560; currentScore = 0; alive = true; setGameOver(false); setScore(0); }
    };
    jumpRef.current = triggerJump;

    const onKey = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); triggerJump(); } };
    window.addEventListener('keydown', onKey);

    const loop = () => {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 560, 210);
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 182); ctx.lineTo(560, 182); ctx.stroke();

      if (alive) {
        dinoY += vy; vy += 0.65;
        if (dinoY >= 150) { dinoY = 150; vy = 0; isJumping = false; }
        obstacleX -= 5.5 + Math.min(currentScore * 0.01, 4);
        if (obstacleX < -24) { obstacleX = 560 + Math.random() * 140; currentScore += 10; setScore(currentScore); }
        if (obstacleX < 74 && obstacleX + 20 > 46 && dinoY + 30 > 152) { alive = false; setGameOver(true); }
      }

      ctx.fillStyle = '#34d399'; ctx.fillRect(46, dinoY, 28, 32);
      ctx.fillStyle = '#09090b'; ctx.fillRect(64, dinoY + 6, 5, 5);
      ctx.fillStyle = '#f43f5e'; ctx.fillRect(obstacleX, 152, 20, 30);
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('keydown', onKey); };
  }, [muted]);

  const enableCamControl = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) { videoRef.current.srcObject = stream; setCamActive(true); }
      const offscreen = document.createElement('canvas'); offscreen.width = 64; offscreen.height = 48;
      const octx = offscreen.getContext('2d');
      let prevFrame = null;
      const interval = setInterval(() => {
        if (!videoRef.current || videoRef.current.readyState < 2) return;
        octx.drawImage(videoRef.current, 0, 0, 64, 48);
        const data = octx.getImageData(0, 0, 64, 48).data;
        if (prevFrame) {
          let diff = 0;
          for (let i = 0; i < data.length; i += 16) diff += Math.abs(data[i] - prevFrame[i]);
          if (diff > 18000) jumpRef.current();
        }
        prevFrame = new Uint8ClampedArray(data);
      }, 90);
      return () => { clearInterval(interval); stream.getTracks().forEach((t) => t.stop()); };
    } catch { alert('Camera access denied or unavailable — use Spacebar or Click to jump!'); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-xl w-full rounded-2xl border border-emerald-500/40 bg-zinc-900 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-emerald-400 font-bold">CYBER DINO // GESTURE &amp; KEYBOARD RUNNER</span>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="relative rounded-xl overflow-hidden border border-zinc-800">
          <canvas ref={canvasRef} width={560} height={210} onClick={() => jumpRef.current()} className="w-full h-auto block cursor-pointer" />
          {camActive && <video ref={videoRef} autoPlay muted playsInline className="absolute top-2 right-2 w-24 h-18 rounded border border-emerald-400 object-cover scale-x-[-1]" />}
          {gameOver && (
            <div className="absolute inset-0 bg-zinc-950/75 flex flex-col items-center justify-center gap-2">
              <p className="font-mono text-rose-400 font-bold text-lg">FIREWALL HIT // SCORE: {score}</p>
              <button onClick={() => jumpRef.current()} className="px-4 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-mono text-xs font-bold cursor-pointer">PRESS SPACE OR CLICK TO RETRY</button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-300">SCORE: <strong className="text-emerald-400">{score}</strong></span>
          <button onClick={enableCamControl} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center gap-1.5 hover:bg-emerald-500/30 cursor-pointer">
            <Camera className="w-3.5 h-3.5" />
            {camActive ? 'WEBCAM MOTION ACTIVE' : 'ENABLE WEBCAM JUMP'}
          </button>
        </div>
      </div>
    </div>
  );
}

