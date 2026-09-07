# Güvenlik

Statik bir site: sunucu yok, veritabanı yok, oturum yok, kullanıcı hesabı yok.
Saldırı yüzeyi buna göre dar — ama sıfır değil. Bu belge neyin nasıl
kapatıldığını ve hangi kararın neden verildiğini yazıyor.

Bir açık bulursanız: **suerta.info@gmail.com**.

---

## Güvenlik başlıkları

Hepsi `vercel.json` içindeki `headers` bloğunda. JSON yorum kabul etmediği
için gerekçeler burada.

### Content-Security-Policy

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none';
frame-ancestors 'none'; form-action 'self';
script-src 'self' https://cloud.umami.is;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
media-src 'self';
connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev https://formspree.io;
manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests
```

Direktif direktif:

| Direktif | Neden böyle |
|---|---|
| `default-src 'self'` | Aşağıda adı geçmeyen her kaynak türü yalnızca kendi kaynağımızdan. |
| `script-src` | Tek dış script Umami sayaç dosyası. Başka hiçbir yerden JavaScript çalışmaz. |
| `style-src 'unsafe-inline'` | **Bilinçli taviz.** React bileşenleri satır içi `style` özniteliği üretiyor (animasyon gecikmeleri, ASCII portrelerin `--glyph` maskesi, formun bal küpü alanı) — derlenmiş sayfada 49 tane. Bunları kaldırmadan `'unsafe-inline'` kaldırılamaz. Satır içi **stil** satır içi **script**'ten çok daha dar bir risk: JavaScript çalıştırmaz. Yine de bir gün temizlenecekse iş, o 49 özniteliği CSS sınıfına çevirmek. |
| `img-src data:` | Marka baş harfini maske olarak çizen SVG data-URI'ler (`glyphMask`). Bitmap taşımamak için tercih edildi. |
| `font-src 'self'` | Yazı tipleri `/fonts/` altında yerel. Google Fonts'a bağlanılmıyor — hem gizlilik hem hız. |
| `connect-src` | Üç dış uç: Umami'nin iki gönderim adresi ve iletişim formunun gittiği Formspree. Kodda başka `fetch` yok. |
| `frame-ancestors 'none'` | Siteyi kimse iframe içine alamaz — clickjacking kapalı. |
| `object-src 'none'`, `frame-src 'none'` | Flash/applet/iframe yok, olmayacak. |
| `base-uri 'self'` | Enjekte edilen bir `<base>` etiketiyle göreli adreslerin kaçırılması kapalı. |
| `form-action 'self'` | Form JavaScript ile gönderiliyor; script çalışmazsa bile başka bir yere POST edemez. |

**Doğrulama.** Politika tahmine dayanmıyor: `dist/` içindeki her HTML, CSS ve
JS dosyasındaki kaynak referansı politikayla karşılaştırıldı, engellenecek
kaynak sayısı sıfır çıktı. Politikayı değiştirirken aynı denetimi tekrarlayın.

Tarayıcıda elle denemek yanıltıcı olabilir: tarayıcı eklentilerinin sayfaya
enjekte ettiği kaynaklar sayfa CSP'sini atlar, dolayısıyla "engellenmedi"
sonucu politikanın çalışmadığını göstermez.

### Diğer başlıklar

| Başlık | Değer | Ne yapıyor |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | İki yıl boyunca yalnızca HTTPS. `preload` bilerek yok: hstspreload.org listesine girmek kalıcıya yakın bir karar, listeden çıkmak ay sürüyor ve o süre boyunca HTTPS'siz açılan her alt alan adı (staging, panel) tarayıcıda erişilemez oluyor. Listeye girmek istenirse önce bütün alt alan adlarının HTTPS olduğu doğrulanmalı, sonra direktif eklenip başvurulmalı. |
| `X-Content-Type-Options` | `nosniff` | Tarayıcı içerik türünü tahmin etmiyor. |
| `X-Frame-Options` | `DENY` | `frame-ancestors`'ın eski tarayıcı karşılığı. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Dışarı çıkarken tam adres değil yalnızca alan adı gidiyor. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Açtığımız pencereler bize erişemiyor. |
| `Permissions-Policy` | kamera, mikrofon, konum vb. kapalı | Site bunların hiçbirini kullanmıyor; kapalı olmaları enjekte edilen kodun da kullanamaması demek. |

`Cross-Origin-Embedder-Policy` bilerek yok: Umami script'i CORP başlığı
göndermediği için sayaç kırılırdı, karşılığında bu sitede kazanç yok.

---

## Uygulama tarafı

**Dış bağlantılar.** Hepsinde `rel="noopener noreferrer"`. Modern tarayıcılar
`target="_blank"` için `noopener`'ı zaten varsayıyor; açıkça yazılması eski
tarayıcılar için.

**HTML enjeksiyonu.** Kodun hiçbir yerinde `dangerouslySetInnerHTML`,
`innerHTML`, `eval` ya da `new Function` yok. Uzun metinler `Prose.jsx`
üzerinden işleniyor ve orada markdown, HTML'e değil doğrudan React
elemanlarına çevriliyor — araya HTML sokulabilecek bir adım yok.

**Form.** Formspree'ye gidiyor; sunucumuz olmadığı için işleyecek bir uç nokta
da yok. Bot koruması iki katmanlı: görünmez bal küpü alanı (`website`) ve
Formspree'nin kendi filtresi. Gönderim sırasında düğme kilitli — çift gönderim
hem kotayı yakıyor hem gelen kutusunu kirletiyordu.

**Ölçüm.** Umami çerez koymuyor, parmak izi çıkarmıyor, kişiyi tanımlamıyor.
Do Not Track açıksa hiç yüklenmiyor. Bu yüzden sitede onay bandı yok — çünkü
onay gerektiren bir şey toplanmıyor.

**Sır yönetimi.** Depoda anahtar yok. `.env` `.gitignore`'da; `VITE_UMAMI_ID`
ve `VITE_FORMSPREE_ID` Vercel'in Environment Variables ekranından geliyor.
Not: `VITE_` önekli her değer derlenmiş pakete gömülür ve herkese görünür —
oraya yalnızca zaten açık olan tanımlayıcılar konur, gizli anahtar asla.

---

## Bağımlılıklar

Üretim bağımlılığı üç paket: `react`, `react-dom`, `react-router-dom`.
Yüzey dar tutuluyor — markdown, animasyon ve tarih kütüphaneleri bilerek
taşınmıyor.

`npm audit` temiz (0 açık). Ayda bir tekrar edin:

```bash
npm audit            # gelistirme dahil
npm audit --omit=dev # yalnizca yayina cikan paketler
```

---

## Değişiklik yaparken

1. Yeni bir dış servis (script, API, gömülü içerik) eklerken CSP'de karşılığını
   açın — yoksa sessizce çalışmaz.
2. `dangerouslySetInnerHTML` gerekiyorsa önce gerçekten gerekli mi diye bakın;
   gerekiyorsa girdiyi temizleyen bir katman olmadan eklemeyin.
3. Yeni bir `target="_blank"` bağlantısına `rel="noopener noreferrer"` ekleyin.
4. Yeni bir ortam değişkeni gizli bilgi taşıyorsa `VITE_` öneki **kullanmayın**.
