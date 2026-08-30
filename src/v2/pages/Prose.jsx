import React from 'react';

/* Uzun metni ekrana koyan tek yer.
   --------------------------------------------------------------------------
   Icerik iki bicimde geliyor: blog yazilari duz paragraflar, proje
   anlatimlari ise "### baslik" ve "*   **Etiket:** aciklama" satirlari
   tasiyan kucuk bir markdown alt kumesi. Ikisi de burada isleniyor.

   Tam bir markdown kutuphanesi tasimiyoruz: iki bicimin toplami alti
   kural ediyor, kutuphane ise sayfaya kendi agirligini ve kendi tipografi
   varsayimlarini getiriyor. Metin de bizim yazdigimiz metin — disaridan
   gelen, her sey olabilecek bir girdi degil. */

function inline(text, keyBase) {
  /* **kalin** parcalarini ayiriyoruz. Iç içe bicimlendirme yok: metinde
     de yok. */
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyBase}-${i}`}>{part}</strong> : part
  );
}

export default function Prose({ text, className = 'v2-prose' }) {
  const lines = String(text || '').split('\n');
  const blocks = [];
  let list = null;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const joined = paragraph.join(' ');
    blocks.push(
      <p key={`p-${blocks.length}`}>{inline(joined, `p-${blocks.length}`)}</p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="v2-prose__list">
        {list.map((item, i) => (
          <li key={`li-${i}`}>{inline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ul>
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2 key={`h-${blocks.length}`} className="v2-prose__head">
          {line.slice(4)}
        </h2>
      );
      continue;
    }

    if (line.startsWith('*   ') || line.startsWith('* ')) {
      flushParagraph();
      list = list || [];
      list.push(line.replace(/^\*\s+/, ''));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return <div className={className}>{blocks}</div>;
}
