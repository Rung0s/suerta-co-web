import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateHoverState = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  const styles = {
    dot: {
      position: 'fixed',
      top: position.y,
      left: position.x,
      width: '8px',
      height: '8px',
      background: 'var(--color-gold)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'width 0.2s, height 0.2s',
      mixBlendMode: 'difference'
    },
    ring: {
      position: 'fixed',
      top: position.y,
      left: position.x,
      width: isHovering ? '60px' : '40px',
      height: isHovering ? '60px' : '40px',
      border: '1px solid rgba(255, 236, 175, 0.5)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 9998,
      transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s',
      backgroundColor: isHovering ? 'rgba(255, 236, 175, 0.1)' : 'transparent',
      backdropFilter: isHovering ? 'blur(2px)' : 'none'
    }
  };

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div style={styles.ring} />
      <div style={{...styles.dot, width: isHovering ? '0px' : '8px', height: isHovering ? '0px' : '8px'}} />
    </>
  );
}
