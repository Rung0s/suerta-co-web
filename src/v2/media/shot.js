/* Referans ekran goruntulerinin dar ekran kopyalari.
   Kaynak 1520px; kart telefonda ~230px'lik bir kutuda duruyor. Yollar
   scripts/responsive-img.mjs'in urettigi adlandirmayi izliyor:
   /emsa.webp -> /emsa-480.webp, /emsa-900.webp */

const WIDTHS = [480, 900];
const SOURCE_WIDTH = 1520;

export function shotSrcSet(image) {
  if (!image || !image.endsWith('.webp')) return undefined;
  const base = image.slice(0, -'.webp'.length);
  const smaller = WIDTHS.map((width) => `${base}-${width}.webp ${width}w`);
  return [...smaller, `${image} ${SOURCE_WIDTH}w`].join(', ');
}
