/* Beyaz zeminli halftone cizimi alfa kanalli kesime cevirir: koyuluk
   opakliga donusur, boya murekkep rengi. Nokta dokusu korunur, zemin gider.
   Kaynaklar Higgsfield CDN'inde gecici; cikti public/img altinda kalici. */
import sharp from 'sharp';
const B = 'https://d8j0ntlcm91z4.cloudfront.net/user_3I8WRTbSnTa7hnkI4uGl4nTixol/';
const targets = [
  ['crew/seat-1', 'hf_20260904_153943_d91da4c9-32d3-4508-82a1-c739bb320bc7', 480],
  ['crew/seat-2', 'hf_20260904_153943_9b5ee213-bdd4-4998-9177-2aa454fc01ea', 480],
  ['crew/seat-3', 'hf_20260904_153943_f88c58a0-5b96-4e0c-a051-eb9f41d50111', 480],
  ['crew/seat-4', 'hf_20260904_153943_e7bcaee6-7034-4648-861e-47f6099a67b8', 480],
  ['svc/terminal', 'hf_20260904_153943_6e074400-ee60-4cf4-9832-99ec50a8ea6a', 360],
  ['svc/cart', 'hf_20260904_155232_73b09399-1b06-4e93-84cf-e510e904c072', 360],
  ['svc/robot', 'hf_20260904_155232_0be612b7-4a72-4efb-9c0f-f57e99379485', 360],
  ['svc/key', 'hf_20260904_155232_c9a6a12e-c4f1-42ea-ae78-c51678734969', 360],
  ['svc/house', 'hf_20260904_155232_68794c11-30b0-40e9-94f3-a5f8b774b85b', 360],
  ['svc/telescope', 'hf_20260904_155232_60bc4249-9fa5-40e5-a455-00eddf107f79', 360],
];
for (const [name, id, w] of targets) {
  const res = await fetch(B + id + '.png');
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { data, info } = await sharp(buf).grayscale().normalise().linear(1.12, -12).raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i += 1) {
    rgba[i * 4] = 17; rgba[i * 4 + 1] = 17; rgba[i * 4 + 2] = 16;
    rgba[i * 4 + 3] = 255 - data[i];
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 8 })
    .resize({ width: w, height: w, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82, effort: 6 })
    .toFile(`public/img/${name}.webp`);
  console.log(name);
}
