import React from 'react';

/* ==========================================================================
   Piksel roket
   --------------------------------------------------------------------------
   Referansin hero'sunda rampadaki roketin ditherli, piksel piksel cozulen
   bir hali duruyor. Burada ayni sey elle cizilmis bir bitmap olarak degil,
   geometriden izgaraya rasterlenerek uretiliyor: her hucre icin "bu nokta
   govdenin mi, kulenin mi, alevin mi icinde" diye soruluyor.

   Boyle yapmanin sebebi: iki bin hucreyi elle yazmak hem hataya acik hem de
   degistirilemez olurdu. Burada roketin oranini degistirmek bir sayiyi
   degistirmek demek.

   Cizim tek tek <rect> ile degil, satirdaki ayni renkli hucreleri birlestirip
   renk basina tek bir <path> ile yapiliyor; aksi halde binlerce dugum DOM'a
   giriyor ve sayfa agirlasiyor.
   ========================================================================== */

const COLS = 40;
const ROWS = 80;

/* Deterministik gurultu. Math.random olamaz: prerender ile tarayici farkli
   desen uretirse hydration uyusmazligi verir. */
function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/* Roketin ekseni solda, kule sagda. Ikisi ust uste binmiyor ama servis
   kollari araligi kapatiyor — kule olmadan roketin buyuklugu okunmuyor.

   Kademeler asagi indikce genisliyor: Saturn V'in silueti bu. Ilk denemede
   yaricaplar cok kucuktu ve roket kulenin yaninda bir cubuk gibi kaliyordu;
   ana kademe izgaranin ucte birini kaplamali. */
const AXIS = 13;

/* Govde kademeleri: [ustSatir, altSatir, yariCap] */
const STAGES = [
  [12, 25, 4],
  [28, 48, 6],
  [51, 68, 8],
];

function bodyRadiusAt(y) {
  for (const [top, bottom, radius] of STAGES) {
    if (y >= top && y <= bottom) return radius;
  }
  return null;
}

const TOWER_LEFT = 25;
const TOWER_RIGHT = 37;
const TOWER_SPAN = TOWER_RIGHT - TOWER_LEFT;

function cellColor(x, y) {
  /* --- rampa --------------------------------------------------------- */
  if (y >= 74 && y <= 75) return x >= 1 && x <= 38 ? 'pad' : null;

  /* --- kule ----------------------------------------------------------- */
  if (x >= TOWER_LEFT && x <= TOWER_RIGHT && y >= 5 && y <= 73) {
    /* dikey ayaklar */
    if (x === TOWER_LEFT || x === TOWER_RIGHT) return 'tower';
    /* yatay katlar */
    if ((y - 5) % 7 === 0) return 'tower';
    /* Capraz kafes. Kat yuksekligi 7, genislik 12 oldugu icin capraz her
       satirda ~2 hucre atliyor; tek hucre isaretlemek kafesi kopuk noktalara
       cevirmisti. Caprazin cevresindeki bir hucrelik bant da boyaniyor,
       boylece cizgi sureklilik kazaniyor. */
    const localY = (y - 5) % 7;
    const localX = x - TOWER_LEFT;
    const diag = (localY / 6) * TOWER_SPAN;
    if (Math.abs(localX - diag) < 1.2 || Math.abs(localX - (TOWER_SPAN - diag)) < 1.2) {
      return 'towerDim';
    }
    return null;
  }

  /* kulenin tepesindeki vinc kolu */
  if (y >= 3 && y <= 4 && x >= 23 && x <= 39) return 'tower';

  /* servis kollari: kuleyi rokete baglar */
  if ((y === 24 || y === 47) && x > AXIS + 6 && x < TOWER_LEFT) return 'towerDim';

  /* --- alev ------------------------------------------------------------ */
  if (y >= 69 && y <= 73) {
    const spread = (y - 68) * 2.1;
    const dx = Math.abs(x - AXIS);
    if (dx <= spread) return dx <= spread * 0.42 ? 'flameCore' : 'flame';
    return null;
  }

  /* --- kanatlar --------------------------------------------------------- */
  if (y >= 58 && y <= 68) {
    const grow = (y - 58) * 0.42;
    const dx = Math.abs(x - AXIS);
    if (dx > 8 && dx <= 8 + grow) return 'shade';
  }

  /* --- burun konisi ----------------------------------------------------- */
  if (y >= 2 && y <= 11) {
    const halfWidth = (y - 1) * 0.42;
    const dx = Math.abs(x - AXIS);
    if (dx <= halfWidth) return dx > halfWidth - 1.1 && x > AXIS ? 'shade' : 'body';
    return null;
  }

  /* --- govde ------------------------------------------------------------ */
  const radius = bodyRadiusAt(y);
  if (radius !== null) {
    const dx = x - AXIS;
    if (Math.abs(dx) > radius) return null;

    /* kademe halkalari: gecis satirlari koyu */
    if (y <= 13 || (y >= 24 && y <= 25) || (y >= 28 && y <= 29) ||
        (y >= 47 && y <= 48) || (y >= 51 && y <= 52) || y >= 67) return 'ring';

    /* silindir golgesi: isik soldan geliyor. Kenara dogru dither ile
       koyulasiyor — duz iki tonlu gecis silindiri kagit gibi gosteriyor. */
    const shade = (dx + radius) / (radius * 2);
    if (shade > 0.62 + noise(x, y) * 0.22) return 'shade';
    if (shade < 0.14) return 'highlight';

    /* govde isareti */
    if (y >= 33 && y <= 38 && dx >= -2 && dx <= 2) return 'mark';
    /* ana kademede dikey panel cizgileri: olcegi veren detay */
    if (y >= 53 && y <= 66 && (dx === -4 || dx === 3)) return 'shade';

    return 'body';
  }

  return null;
}

const PALETTE = {
  body: 'var(--pixel-body, #f2efe6)',
  highlight: 'var(--pixel-high, #ffffff)',
  shade: 'var(--pixel-shade, #b9b2a2)',
  ring: 'var(--pixel-ring, #4a463c)',
  mark: 'var(--pixel-mark, #9a161f)',
  tower: 'var(--pixel-tower, #c0392b)',
  towerDim: 'var(--pixel-tower-dim, #8d2c22)',
  flame: 'var(--pixel-flame, #d93a2b)',
  flameCore: 'var(--pixel-flame-core, #f0c86a)',
  pad: 'var(--pixel-pad, #6c665a)',
};

/* Satirdaki ayni renkli ardisik hucreleri tek dikdortgene birlestiriyoruz;
   hucre basina bir dugum binlerce eleman demek olurdu. */
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

export default function PixelRocket({ className }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${COLS} ${ROWS}`}
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
