import React from 'react';

// Kısa başlıklarda harf harf, uzun cümlelerde kelime kelime açılır.
// Uzun metinde harf bazlı stagger toplam süreyi saniyelerce uzatıyor.
const CHAR_MODE_MAX_LENGTH = 16;

export default function StaggeredText({ text, className, style, delay = 0 }) {
  const words = text.split(' ');
  const perCharacter = text.length <= CHAR_MODE_MAX_LENGTH;

  const reveal = (key, content, index, isAccentDot) => (
    <span
      key={key}
      style={{
        display: 'inline-block',
        animation: 'slideUpReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        animationDelay: `${delay + index * (perCharacter ? 0.05 : 0.06)}s`,
        opacity: 0,
        transform: 'translateY(100%)',
        color: isAccentDot ? 'var(--color-accent)' : 'inherit'
      }}
    >
      {content}
    </span>
  );

  let globalCharIndex = 0;

  return (
    <span
      className={className}
      aria-label={text}
      style={{ ...style, display: 'inline-flex', flexWrap: 'wrap', gap: '0.2em' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} aria-hidden="true" style={{ display: 'inline-flex', overflow: 'hidden' }}>
          {perCharacter
            ? word.split('').map((char) => {
                const currentIndex = globalCharIndex++;
                return reveal(currentIndex, char, currentIndex, char === '.');
              })
            : reveal(wordIndex, word, wordIndex, false)}
        </span>
      ))}
    </span>
  );
}
