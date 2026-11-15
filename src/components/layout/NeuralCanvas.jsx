import React, { useEffect, useRef } from 'react';

const THEME_RGB = {
  obsidian: '16, 185, 129',   // Emerald Mint
  daylight: '217, 119, 6',    // Warm Amber
  amethyst: '168, 85, 247',   // Neon Violet
};

export default function NeuralCanvas({ theme = 'obsidian', overclock }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -999, y: -999 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const speedMult = overclock ? 2.4 : 1;
      const strokeRgb = overclock ? '244, 63, 94' : (THEME_RGB[theme] || THEME_RGB.obsidian);

      particles.forEach((p, i) => {
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const distM = Math.hypot(dxm, dym);
        if (distM < 150) { p.x -= dxm * 0.015; p.y -= dym * 0.015; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${strokeRgb}, 0.75)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${strokeRgb}, ${(1 - d / 130) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [theme, overclock]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      {theme !== 'daylight' && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-15"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 3px)' }}
        />
      )}
    </>
  );
}
