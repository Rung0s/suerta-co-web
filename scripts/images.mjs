// Proje ekran goruntulerini WebP'ye cevirir.
// ---------------------------------------------------------------------------
// public/ icindeki dort ekran goruntusu PNG olarak 3,4 MB tutuyordu ve isler
// sayfasi dordunu birden gosteriyor. WebP ayni goruntuyu tipik olarak
// dortte bir agirlikta veriyor.
//
// Kaynak PNG'ler yerinde kaliyor: donusum kayipli, kaynagi silmek geri
// donusu olmayan bir islem olurdu.
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const files = (await readdir(PUBLIC)).filter((name) => extname(name) === '.png');

for (const name of files) {
  const from = join(PUBLIC, name);
  const to = join(PUBLIC, `${basename(name, '.png')}.webp`);

  await sharp(from)
    /* Ekran goruntusu 1600 pikselden genis gosterilmiyor; daha buyugu
       yalnizca indirme suresi. */
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(to);

  const before = (await stat(from)).size;
  const after = (await stat(to)).size;
  console.log(
    `${name} → ${basename(to)}  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`
  );
}
