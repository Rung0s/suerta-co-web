import React, { useRef } from 'react';

export default function TiltCard({ 
  children, 
  style, 
  className = '', 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  tiltMax = 6 
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    // Dokunmatik ekransa (mobil) tilt yapma
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltMax;
    const rotateY = ((x - centerX) / centerX) * tiltMax;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
  };

  const handleLeave = (e) => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    }
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      className={`luxury-card ${className}`}
      style={{
        ...style,
        transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
