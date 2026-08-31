/* Halftone baskilarin dar ekran kopyalari.
   Kaynaklar 2400px ve 900px genisliginde: telefonda 375px'lik bir kutuya
   siginirken yedi kati piksel iniyordu. Her baski icin birkac genislik
   uretiliyor, isaretlemede srcset ile secim tarayiciya birakiliyor.
   Kaynak dosyalar oldugu gibi kaliyor: genis ekranin ihtiyaci onlar. */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCES = [
  { dir: 'public/img', file: 'crowd', widths: [800, 1200] },
  { dir: 'public/img', file: 'control', widths: [800, 1200] },
  { dir: 'public/img', file: 'rocket-pad', widths: [360, 600] },
  { dir: 'public/img', file: 'rocket-fly', widths: [360, 600] },
  /* Referans ekran goruntuleri: 1520px kaynak, karti en genis halinde bile
     ~600px'lik bir kutuya giriyor. */
  { dir: 'public', file: 'emsa', widths: [480, 900] },
  { dir: 'public', file: 'ronesans', widths: [480, 900] },
  { dir: 'public', file: 'pawsec', widths: [480, 900] },
  { dir: 'public', file: 'arguman', widths: [480, 900] },
];

await mkdir('public/img', { recursive: true });

for (const { dir, file, widths } of SOURCES) {
  const src = `${dir}/${file}.webp`;
  const meta = await sharp(src).metadata();

  for (const width of widths) {
    if (width >= meta.width) continue;
    const out = `${dir}/${file}-${width}.webp`;
    const info = await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    console.log(`${out}  ${width}px  ${Math.round(info.size / 1024)}KB`);
  }
}
