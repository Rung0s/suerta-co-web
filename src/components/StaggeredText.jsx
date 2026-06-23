import React from 'react';

export default function StaggeredText({ text, className, style, delay = 0 }) {
  // Kelimeleri boşluklardan bölüp her harfi sarıyoruz
  const words = text.split(' ');
  let globalCharIndex = 0;

  return (
    <span className={className} style={{ ...style, display: 'inline-flex', flexWrap: 'wrap', gap: '0.2em' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', overflow: 'hidden' }}>
          {word.split('').map((char) => {
            const currentIdx = globalCharIndex++;
            return (
              <span
                key={currentIdx}
                style={{
                  display: 'inline-block',
                  animation: `slideUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${delay + currentIdx * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(100%)'
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
