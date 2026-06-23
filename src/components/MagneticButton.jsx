import React, { useRef, useState } from 'react';

export default function MagneticButton({ children, style, className, onClick }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    // Magnetic pull strength
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, background 0.3s ease' : 'transform 0.1s linear, box-shadow 0.3s ease, background 0.3s ease'
      }}
    >
      {children}
    </button>
  );
}
