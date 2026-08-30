import React from 'react';

/* ==========================================================================
   Piksel seyirci kalabaligi
   --------------------------------------------------------------------------
   Referansin hero'sunda roketi izleyen bir kalabalik var: sahnenin alt
   kenarinda, ditherli, piksel piksel. Kalabaligin isi dekor degil olcek —
   roketin ne kadar buyuk oldugu ancak onunde duran insan boyuyla okunuyor.

   PixelRocket ile ayni yontem: elle bitmap yazilmiyor, silueter izgaraya
   rasterleniyor ve satirdaki ayni renkli hucreler tek <path>'e birlesiyor.
   Uc sira var; arkadakiler daha kisa ve daha soluk, boylece derinlik
   cikiyor. Kimse birebir digerinin ayni degil ama desen deterministik:
   prerender ile tarayici ayni kalabaligi ciziyor.
   ========================================================================== */

const COLS = 220;
const ROWS = 16;

/* Zemin cizgisi: herkes bunun uzerinde duruyor. */
const GROUND = ROWS - 1;

function noise(seed) {
  const n = Math.sin(seed * 41.7891) * 27183.4577;
  return n - Math.floor(n);
}

/* Uc sira. Arkadaki kisa ve soluk, ondeki uzun ve koyu; aradaki bosluk
   (`lift`) siralari birbirinden ayiriyor. */
/* Oranlar onemli: siluet boyundan cok omuzdan okunuyor. Ince ve uzun
   dikdortgenler insan degil bina gibi duruyordu; omuz genisligi boyun
   yarisina yaklastiginda kalabalik cikti. Aralik genislikten buyuk: bitisik
   dizilince siluetler tek bir kutleye kaynayip yeniden bina oluyor, aradaki
   bosluk kalabaligi kalabalik yapiyor. */
const TIERS = [
  { key: 'far', seed: 3, lift: 3, width: [3, 4], gap: [6, 8], height: [7, 9], armChance: 0.08 },
  { key: 'mid', seed: 17, lift: 1, width: [4, 5], gap: [7, 10], height: [9, 11], armChance: 0.16 },
  { key: 'near', seed: 41, lift: 0, width: [5, 6], gap: [9, 13], height: [11, 14], armChance: 0.22 },
];

/* Bir siradaki insanlari uretiyor: x konumu, boy, kollar. */
function buildTier(tier) {
  const people = [];
  let x = -2;
  let i = 0;

  while (x < COLS + 2) {
    const r1 = noise(tier.seed + i * 1.31);
    const r2 = noise(tier.seed + i * 2.77);
    const r3 = noise(tier.seed + i * 5.19);

    const height = Math.round(tier.height[0] + r1 * (tier.height[1] - tier.height[0]));
    const gap = Math.round(tier.gap[0] + r2 * (tier.gap[1] - tier.gap[0]));

    people.push({
      x,
      height,
      /* Bir kismi omuz genisliginde, bir kismi dar: hepsi ayni genislikte
         olunca sira cit gibi duruyor. */
      width: Math.round(tier.width[0] + r3 * (tier.width[1] - tier.width[0])),
      arm: r3 < tier.armChance,
      /* Kafa govdenin ortasinda degil, hafif kayabiliyor: birbirine
         bakan, oturan, egilen insanlar. */
      headShift: r2 > 0.78 ? 1 : 0,
    });

    x += gap;
    i += 1;
  }

  return people;
}

/* Insan silueti izgaraya basiliyor.
   Ilk denemede siluet kafa + govde kutusuydu ve kalabalik bir sehir
   siluetine benziyordu. Insan yapan sey dort ayrinti: kafanin govdeden
   bir boyunla ayrilmasi, omuzun govdeden genis olmasi, govdenin daralmasi
   ve altta iki bacagin arasindaki bosluk. Dordu de tek hucrelik detay ama
   siluet ancak hepsi varken insan okunuyor. */
function stamp(grid, people, tier) {
  for (const person of people) {
    const bottom = GROUND - tier.lift;
    const top = bottom - person.height;
    const { width } = person;
    const headLeft = person.x + Math.floor((width - 2) / 2) + person.headShift;

    const paint = (y, left, right) => {
      if (y < 0 || y >= ROWS) return;
      for (let x = left; x <= right; x += 1) {
        if (x < 0 || x >= COLS) continue;
        grid[y][x] = tier.key;
      }
    };

    /* kafa (iki satir), boyun, omuz */
    paint(top, headLeft, headLeft + 1);
    paint(top + 1, headLeft, headLeft + 1);
    paint(top + 2, headLeft, headLeft);
    paint(top + 3, person.x, person.x + width - 1);

    /* govde: omuzdan bir hucre dar */
    for (let y = top + 4; y <= bottom - 2; y += 1) {
      paint(y, person.x + 1, person.x + width - 2);
    }

    /* bacaklar: iki sutun, aralarinda bosluk */
    for (let y = bottom - 1; y <= bottom; y += 1) {
      paint(y, person.x + 1, person.x + 1);
      paint(y, person.x + width - 2, person.x + width - 2);
    }

    /* Kaldirilmis kol: kalabaligin durgun bir dokudan cok bir seye bakan
       insanlar oldugunu soyleyen tek isaret. */
    if (person.arm) {
      const armX = person.x + width;
      for (let y = top + 1; y <= top + 4; y += 1) paint(y, armX, armX);
    }
  }
}

const PALETTE = {
  far: 'var(--crowd-far, rgba(17, 17, 16, 0.14))',
  mid: 'var(--crowd-mid, rgba(17, 17, 16, 0.24))',
  near: 'var(--crowd-near, rgba(17, 17, 16, 0.38))',
};

function buildPaths() {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  /* Arkadan one dogru basiliyor: ondeki sira arkadakini kapatiyor. */
  for (const tier of TIERS) stamp(grid, buildTier(tier), tier);

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
