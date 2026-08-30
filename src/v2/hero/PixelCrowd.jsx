import React from 'react';

/* ==========================================================================
   Piksel seyirci kalabaligi
   --------------------------------------------------------------------------
   Referansin hero'sunda roketi izleyen bir kalabalik var: koyu, iri,
   ditherli, alt kenara dogru zemine karisan bir kutle. Isi dekor degil
   olcek — roketin buyuklugu ancak onunde duran insan boyuyla okunuyor.

   Ilk halinde siluetler kucuk ve grimsiydi; uzaktan bir sehir siluetine
   benziyordu. Referansin yaptigi sey iki karar: kalabalik cok yakin
   (yalnizca kafa ve omuz giriyor, govde yok) ve cok koyu. Derinlik
   boyuttan degil tondan geliyor.

   Cizim yontemi PixelRocket ile ayni: elle bitmap yazilmiyor, her hucre
   icin "bu nokta kafanin mi omzun mu icinde" diye soruluyor ve satirdaki
   ayni renkli hucreler tek <path>'e birlesiyor. Desen deterministik —
   prerender ile tarayici ayni kalabaligi ciziyor.
   ========================================================================== */

const COLS = 240;
const ROWS = 48;

function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/* Uc sira. Arkadaki kucuk ve soluk, ondeki iri ve neredeyse siyah.
   `base` sirayi asagi indiriyor: arkadaki sira daha yukarida bitiyor. */
const TIERS = [
  { key: 'far', seed: 7, base: 10, head: [4.2, 5.2], shoulder: [11, 14], gap: [26, 34] },
  { key: 'mid', seed: 23, base: 4, head: [5.4, 6.6], shoulder: [14, 18], gap: [33, 43] },
  { key: 'near', seed: 51, base: 0, head: [6.8, 8.4], shoulder: [18, 23], gap: [41, 53] },
];

function buildTier(tier) {
  const people = [];
  let x = -4;
  let i = 0;

  while (x < COLS + 6) {
    const r1 = noise(tier.seed + i * 1.7, 3);
    const r2 = noise(tier.seed + i * 2.9, 11);
    const r3 = noise(tier.seed + i * 4.3, 29);

    const headR = tier.head[0] + r1 * (tier.head[1] - tier.head[0]);
    const shoulderHalf = tier.shoulder[0] + r2 * (tier.shoulder[1] - tier.shoulder[0]);
    const gap = tier.gap[0] + r3 * (tier.gap[1] - tier.gap[0]);

    people.push({
      cx: x,
      headR,
      shoulderHalf,
      /* Kafa omuzun tam ortasinda degil: birine donmus, egilmis,
         yukari bakan insanlar. Hepsi ayni eksende olsa sira olur. */
      headShift: (r1 - 0.5) * headR * 0.9,
      /* Sira icinde de kucuk yukseklik farki: herkes ayni boyda degil. */
      rise: tier.base + Math.round(r2 * 2),
    });

    x += gap;
    i += 1;
  }

  return people;
}

/* Bir insanin bu hucreyi kaplayip kaplamadigi.
   Kafa elips, omuz asagi dogru acilan bir yay. Ikisinin arasinda boyun
   icin bir daralma var; boyun olmadan siluet tas gibi duruyor. */
function covers(person, x, y, bottom) {
  const headCx = person.cx + person.headShift;
  const headCy = bottom - person.rise - person.shoulderHalf * 0.62 - person.headR;

  const dx = (x - headCx) / person.headR;
  const dy = (y - headCy) / (person.headR * 1.12);
  if (dx * dx + dy * dy <= 1) return true;

  const shoulderTop = headCy + person.headR * 0.75;
  const foot = bottom - person.rise;
  if (y < shoulderTop || y > foot) return false;

  /* Omuz genisligi boyundan basliyor ve karekokle aciliyor: dogrusal
     acilim koni gibi duruyordu. */
  const t = (y - shoulderTop) / Math.max(1, foot - shoulderTop);
  const half = person.headR * 0.72 + (person.shoulderHalf - person.headR * 0.72) * Math.sqrt(t);
  return Math.abs(x - person.cx) <= half;
}

const PALETTE = {
  far: 'var(--crowd-far, rgba(17, 17, 16, 0.42))',
  mid: 'var(--crowd-mid, rgba(17, 17, 16, 0.68))',
  near: 'var(--crowd-near, rgba(17, 17, 16, 0.92))',
};

function buildPaths() {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  /* Arkadan one: ondeki sira arkadakini kapatiyor. */
  for (const tier of TIERS) {
    const people = buildTier(tier);
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        for (const person of people) {
          if (!covers(person, x, y, ROWS - 1)) continue;

          /* Dither: alt satirlara indikce hucreler seyreliyor ve kalabalik
             zemine karisiyor. Duz bir maske ile solmak yerine boyle
             cozulmesi, sahnenin geri kalanindaki piksel diliyle ayni. */
          const fade = Math.max(0, (y - ROWS * 0.74) / (ROWS * 0.26));
          if (fade > 0 && noise(x * 3.1, y * 1.7) < fade) break;

          grid[y][x] = tier.key;
          break;
        }
      }
    }
  }

  const paths = { far: '', mid: '', near: '' };

  for (let y = 0; y < ROWS; y += 1) {
    let runColor = null;
    let runStart = 0;

    const flush = (endX) => {
      if (runColor) {
        paths[runColor] += `M${runStart} ${y}h${endX - runStart}v1h-${endX - runStart}z`;
      }
    };

    for (let x = 0; x < COLS; x += 1) {
      const color = grid[y][x];
      if (color !== runColor) {
        flush(x);
        runColor = color;
        runStart = x;
      }
    }
    flush(COLS);
  }

  return paths;
}

const PATHS = buildPaths();

export default function PixelCrowd({ className }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${COLS} ${ROWS}`}
      preserveAspectRatio="xMidYMax meet"
      shapeRendering="crispEdges"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {Object.entries(PATHS).map(([key, d]) =>
        d ? <path key={key} d={d} fill={PALETTE[key]} /> : null
      )}
    </svg>
  );
}
