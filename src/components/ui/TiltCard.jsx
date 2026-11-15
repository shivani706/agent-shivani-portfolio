import React, { useState, useRef, useEffect } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  overclock = false,
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
  });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((clientY - rect.top) / rect.height) * 2 - 1;
      const rotateX = (-normY * maxTilt).toFixed(2);
      const rotateY = (normX * maxTilt).toFixed(2);
      const glareX = (((clientX - rect.left) / rect.width) * 100).toFixed(1);
      const glareY = (((clientY - rect.top) / rect.height) * 100).toFixed(1);

      setTransformStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s ease-out',
      });
      setGlare({ x: glareX, y: glareY, opacity: 1 });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  const glareColor = overclock ? 'rgba(244, 63, 94, 0.18)' : 'rgba(16, 185, 129, 0.14)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...transformStyle, transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, ${glareColor}, transparent 75%)`,
        }}
      />
      {children}
    </div>
  );
}

