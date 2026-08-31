/* Yazi tipleri kendi sunucumuzdan.
   Onceden uc aile Google'dan geliyordu: yazi tipi CSS'i istemek ayri bir
   sunucuya DNS + TLS + istek demek ve o zincir bitmeden ilk satir cizilmiyor.
   Burada yalnizca latin ve latin-ext dilimleri indiriliyor (Turkce ve
   Ingilizce icin gereken hepsi bu), yollar yerele cevriliyor.

   Calistir: node scripts/fetch-fonts.mjs  (yalnizca aile degisince gerekir) */
import { mkdir, writeFile } from 'node:fs/promises';

const SOURCE =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Doto:wght@400;700;900&family=Inter:opsz,wght@14..32,400..700&display=swap';

/* Modern bir tarayici gibi soruyoruz: aksi halde Google woff2 yerine eski
   bicimleri veriyor. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const KEEP = ['latin', 'latin-ext'];
const DIR = 'public/fonts';
const OUT = 'src/fonts.css';

const css = await fetch(SOURCE, { headers: { 'User-Agent': UA } }).then((r) => r.text());

/* Google her dilim icin "/* latin *​/" yorumu birakiyor; bloklari o yoruma
   gore ayiriyoruz. */
const blocks = css.split(/(?=\/\* [a-z0-9-]+ \*\/)/).filter((b) => b.includes('@font-face'));

await mkdir(DIR, { recursive: true });

const kept = [];
/* Anahtar adres: ayni aile ve dilim birden fazla dosyaya isaret edebilir
   (degisken olmayan aileler agirlik basina bir dosya verir). Ada gore
   ayiklamak o durumda butun agirliklari tek dosyaya baglardi. */
const names = new Map();
/* Kok basina kacinci dosya oldugumuzu ayri tutuyoruz: "caveat-latin",
   "caveat-latin-ext" adinin da onekidir, sayimi ada bakarak yapmak
   dilimleri birbirine karistirirdi. */
const stems = new Map();

for (const block of blocks) {
  const subset = block.match(/\/\* ([a-z0-9-]+) \*\//)?.[1];
  if (!KEEP.includes(subset)) continue;

  const url = block.match(/url\((https:[^)]+)\)/)?.[1];
  const family = block.match(/font-family:\s*'([^']+)'/)?.[1];
  if (!url || !family) continue;

  let name = names.get(url);
  if (!name) {
    const stem = `${family.toLowerCase().replace(/\s+/g, '-')}-${subset}`;
    const taken = stems.get(stem) ?? 0;
    stems.set(stem, taken + 1);
    name = taken ? `${stem}-${taken + 1}.woff2` : `${stem}.woff2`;
    names.set(url, name);

    const bytes = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
    await writeFile(`${DIR}/${name}`, bytes);
    console.log(`${DIR}/${name}  ${Math.round(bytes.length / 1024)}KB`);
  }

  kept.push(block.replace(/url\(https:[^)]+\)/, `url(/fonts/${name})`).trim());
}

const header = `/* URETILMIS DOSYA - elle duzenlemeyin.
   Kaynak: scripts/fetch-fonts.mjs
   Google Fonts'un verdigi @font-face bloklarinin latin ve latin-ext
   dilimleri; url'ler /fonts/ altina cevrilmis hali. */\n\n`;

await writeFile(OUT, header + kept.join('\n\n') + '\n');
console.log(`${OUT}  ${kept.length} blok`);
