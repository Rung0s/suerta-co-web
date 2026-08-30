import React from 'react';

/* ==========================================================================
   Kontrol merkezi
   --------------------------------------------------------------------------
   Sayfayi kapatan gorsel. Referans burada firlatmayi izleyen kontrol
   odasini kullaniyor: konsollarin basinda, ellerini kaldirmis insanlar.
   Anlami acik — is tuttu.

   Bizde ayni sahne piksel dilinde kuruluyor: roket, kule ve kalabalik
   nasil raster ediliyorsa bu da oyle. Onceki hali bir drone videosuydu;
   guzeldi ama sayfanin geri kalaniyla ayni dili konusmuyordu ve 3,5 MB
   yer tutuyordu.

   Koyu bantta duruyor, dolayisiyla ton ters: konsollar koyu, ekranlar
   aydinlik, insanlar acik siluet.
   ========================================================================== */

const COLS = 420;
const ROWS = 84;

function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/* Konsol bankosu: dort birim, aralarinda bir hucrelik bosluk. */
const DESK_TOP = 56;
const UNIT = 52;

/* Operatorler. `arms` ellerini kaldirmis olanlar — hepsi kaldirsa
   koreografi olur; ikisi kaldirip biri one egilince oda canlaniyor. */
const CREW = [
  { cx: 34, head: 5.4, shoulder: 13, arms: 'both', lean: 0 },
  { cx: 96, head: 5.0, shoulder: 12, arms: 'right', lean: 1 },
  { cx: 158, head: 5.6, shoulder: 13.5, arms: 'none', lean: 2 },
  { cx: 222, head: 5.2, shoulder: 12.5, arms: 'both', lean: 0 },
  { cx: 286, head: 5.5, shoulder: 13, arms: 'none', lean: 1 },
  { cx: 350, head: 5.1, shoulder: 12.2, arms: 'right', lean: 0 },
];

/* Bir noktanin kalin bir dogru parcasina uzakligi: kollar boyle
   ciziliyor, hucre hucre kol yazmak yerine. */
function nearSegment(x, y, x1, y1, x2, y2, width) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = dx * dx + dy * dy;
  const t = len === 0 ? 0 : Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / len));
  const px = x1 + t * dx;
  const py = y1 + t * dy;
  return (x - px) ** 2 + (y - py) ** 2 <= width * width;
}

function crewColor(x, y) {
  for (const person of CREW) {
    const headCy = 30 + person.lean;
    const shoulderTop = headCy + person.head * 0.8;
    const cx = person.cx;

    /* kafa */
    const dx = (x - cx) / person.head;
    const dy = (y - headCy) / (person.head * 1.1);
    if (dx * dx + dy * dy <= 1) return 'crew';

    /* omuz ve govde: masaya kadar iniyor */
    if (y >= shoulderTop && y <= DESK_TOP + 2) {
      const t = (y - shoulderTop) / (DESK_TOP + 2 - shoulderTop);
      const half = person.head * 0.75 + (person.shoulder - person.head * 0.75) * Math.sqrt(t);
      if (Math.abs(x - cx) <= half) return 'crew';
    }

    /* Kaldirilmis kollar. Ucunda bir el var: kolun duz kesilmesi
       kirpilmis gibi duruyordu. */
    const shoulderY = shoulderTop + 4;
    const hand = (hx, hy) => (x - hx) ** 2 + (y - hy) ** 2 <= 6;
    if (person.arms === 'both' || person.arms === 'right') {
      if (nearSegment(x, y, cx + person.shoulder * 0.7, shoulderY, cx + person.shoulder * 1.5, 14, 1.6)) {
        return 'crew';
      }
      if (hand(cx + person.shoulder * 1.5, 13)) return 'crew';
    }
    if (person.arms === 'both') {
      if (nearSegment(x, y, cx - person.shoulder * 0.7, shoulderY, cx - person.shoulder * 1.5, 16, 1.6)) {
        return 'crew';
      }
      if (hand(cx - person.shoulder * 1.5, 15)) return 'crew';
    }
  }
  return null;
}

function deskColor(x, y) {
  if (y < DESK_TOP) return null;

  const local = x % UNIT;
  /* birimler arasindaki dikey bosluk */
  if (local === 0) return null;

  /* ust kenar ve on panel arasindaki golge cizgisi */
  if (y === DESK_TOP) return 'deskEdge';

  /* ekran */
  if (y >= DESK_TOP + 3 && y <= DESK_TOP + 11 && local >= 4 && local <= 20) {
    /* ekranin icinde tarama satirlari */
    return (y - DESK_TOP) % 3 === 0 ? 'screenLine' : 'screen';
  }

  /* dugmeler: iki sira nokta */
  if ((y === DESK_TOP + 5 || y === DESK_TOP + 8) && local >= 26 && local <= 44 && local % 3 === 0) {
    return local % 6 === 0 ? 'lampWarm' : 'lamp';
  }

  /* uyari lambasi */
  if (y >= DESK_TOP + 3 && y <= DESK_TOP + 5 && local >= 46 && local <= 48) return 'lampHot';

  /* govde: asagi indikce ditherle koyulasiyor, bant zeminine kariyor */
  const fade = (y - DESK_TOP) / (ROWS - DESK_TOP);
  if (fade > 0.55 && noise(x * 2.3, y * 1.9) < (fade - 0.55) / 0.45) return null;

  return 'desk';
}

function cellColor(x, y) {
  const crew = crewColor(x, y);
  /* Ekip masanin arkasinda: masa hucresi varsa o kazaniyor. */
  const desk = deskColor(x, y);
  if (desk) return desk;
  return crew;
}

const PALETTE = {
  crew: 'var(--ctrl-crew, rgba(246, 245, 242, 0.86))',
  desk: 'var(--ctrl-desk, rgba(246, 245, 242, 0.16))',
  deskEdge: 'var(--ctrl-desk-edge, rgba(246, 245, 242, 0.34))',
  screen: 'var(--ctrl-screen, rgba(120, 180, 150, 0.4))',
  screenLine: 'var(--ctrl-screen-line, rgba(150, 220, 180, 0.72))',
  lamp: 'var(--ctrl-lamp, rgba(246, 245, 242, 0.5))',
  lampWarm: 'var(--ctrl-lamp-warm, rgba(184, 137, 43, 0.9))',
  lampHot: 'var(--ctrl-lamp-hot, rgba(217, 58, 43, 0.9))',
};

function buildPaths() {
  const paths = {};
  for (const key of Object.keys(PALETTE)) paths[key] = '';

  for (let y = 0; y < ROWS; y += 1) {
    let runColor = null;
    let runStart = 0;

    const flush = (endX) => {
      if (runColor) {
        paths[runColor] += `M${runStart} ${y}h${endX - runStart}v1h-${endX - runStart}z`;
      }
    };

    for (let x = 0; x < COLS; x += 1) {
      const color = cellColor(x, y);
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

export default function PixelControl({ className }) {
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
