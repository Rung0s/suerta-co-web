/* Higgsfield'dan gelen halftone gorselleri indirir, gri tona cevirip
   kontrasti sabitler ve siteye uygun boyutlarda webp olarak yazar.
   Tek seferlik; kaynak URL'ler gecici, cikti public/img altinda kalici. */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const B = 'https://d8j0ntlcm91z4.cloudfront.net/user_3I8WRTbSnTa7hnkI4uGl4nTixol/';
const jobs = [
  ['blog/budget',    'hf_20260904_153943_ffeda2b9-6043-4835-866c-88bd4ba75740', [1200, 600]],
  ['blog/ecommerce', 'hf_20260904_153943_8bb44173-4eaf-4d3b-abd9-e87056ce182c', [1200, 600]],
  ['blog/seo',       'hf_20260904_153944_5b836aa4-a2b5-438f-9010-eaf5d5b19ebc', [1200, 600]],
  ['blog/hotel',     'hf_20260904_153944_efeb16e0-b56a-47c5-8a4f-ec98d6ac3e81', [1200, 600]],
  ['blog/bot',       'hf_20260904_153944_bc226cc6-34b4-4167-84e3-3bba3a5a0ff2', [1200, 600]],
  ['blog/geo',       'hf_20260904_153944_c6def723-a4c0-45bc-a6de-e11e2c33bdcd', [1200, 600]],
  ['crew/seat-1',    'hf_20260904_153943_d91da4c9-32d3-4508-82a1-c739bb320bc7', [480]],
  ['crew/seat-2',    'hf_20260904_153943_9b5ee213-bdd4-4998-9177-2aa454fc01ea', [480]],
  ['crew/seat-3',    'hf_20260904_153943_f88c58a0-5b96-4e0c-a051-eb9f41d50111', [480]],
  ['crew/seat-4',    'hf_20260904_153943_e7bcaee6-7034-4648-861e-47f6099a67b8', [480]],
  ['lost-satellite', 'hf_20260904_153943_50e46eab-ef7b-49df-b15f-bdca58dafb03', [1200, 600]],
  ['svc/terminal',   'hf_20260904_153943_6e074400-ee60-4cf4-9832-99ec50a8ea6a', [360]],
  ['svc/cart',       'hf_20260904_155232_73b09399-1b06-4e93-84cf-e510e904c072', [360]],
  ['svc/robot',      'hf_20260904_155232_0be612b7-4a72-4efb-9c0f-f57e99379485', [360]],
  ['svc/key',        'hf_20260904_155232_c9a6a12e-c4f1-42ea-ae78-c51678734969', [360]],
  ['svc/house',      'hf_20260904_155232_68794c11-30b0-40e9-94f3-a5f8b774b85b', [360]],
  ['svc/telescope',  'hf_20260904_155232_60bc4249-9fa5-40e5-a455-00eddf107f79', [360]],
];

for (const [name, id, widths] of jobs) {
  const res = await fetch(B + id + '.png');
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dir = 'public/img/' + name.split('/').slice(0, -1).join('/');
  mkdirSync(dir, { recursive: true });
  writeFileSync(`scripts/.src-${name.replace('/', '-')}.png`, buf);
  const base = sharp(buf).grayscale().normalise().linear(1.12, -12).flatten({ background: '#ffffff' });
  for (const w of widths) {
    const out = widths.length > 1 ? `public/img/${name}-${w}.webp` : `public/img/${name}.webp`;
    await base.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(out);
    console.log(out);
  }
}
