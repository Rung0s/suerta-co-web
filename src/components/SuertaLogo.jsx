import React from 'react';

export default function SuertaLogo({ size = 120, animated = false }) {
  const globeSize = size * 0.8;
  const orbitSize = size * 1.2;

  const stars = React.useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      
      {/* Background Rotating Stars Container */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: size * 1.5, height: size * 1.5, zIndex: 1
      }}>
        <div style={{
          width: '100%', height: '100%',
          animation: animated ? 'logoSpin 20s linear infinite' : 'none',
          opacity: 0.6, position: 'relative'
        }}>
          {stars.map((star, i) => (
            <div key={i} style={{
              position: 'absolute', top: star.top, left: star.left,
              width: star.size, height: star.size, background: '#ffffff',
              borderRadius: '50%', boxShadow: '0 0 5px #fff'
            }} />
          ))}
        </div>
      </div>

      {/* The Black Globe */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: globeSize, height: globeSize, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #3a3a3d 0%, #050505 40%, #000000 100%)',
        boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.9), 0 5px 15px rgba(0,0,0,0.6)',
        zIndex: 2
      }} />

      {/* The Red Orbit System */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: orbitSize, height: orbitSize,
        transform: 'translate(-50%, -50%) rotate(-20deg) scaleY(0.35)',
        zIndex: 3
      }}>
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(220, 30, 50, 0.8)', borderRadius: '50%' }} />
        
        <div style={{
          position: 'absolute', inset: 0,
          animation: animated ? 'logoSpin 4s linear infinite' : 'none'
        }}>
           <div style={{ position: 'absolute', top: -3, left: '50%', width: 6, height: 6, background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px 2px #fff', transform: 'translateX(-50%)' }} />
           <div style={{ position: 'absolute', bottom: '20%', right: -3, width: 5, height: 5, background: '#fff', borderRadius: '50%', boxShadow: '0 0 8px 1px #fff' }} />
           <div style={{ position: 'absolute', top: '20%', left: -3, width: 4, height: 4, background: '#fff', borderRadius: '50%', boxShadow: '0 0 6px 1px #fff' }} />
        </div>
      </div>

      {/* Text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-hero)', fontWeight: '900', fontSize: size * 0.15,
        color: '#ffffff', letterSpacing: '0px', zIndex: 4,
        textShadow: '0 4px 10px rgba(0,0,0,0.9)', whiteSpace: 'nowrap'
      }}>
        SUERTA CO.
      </div>
      
      <style>
        {`
          @keyframes logoSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
