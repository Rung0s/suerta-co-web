# suerta.co — Kod Analizi
**Tarih:** 2026-07-14  
**Proje:** `C:\Users\songu\.gemini\antigravity-ide\scratch\suerta-co-web`  
**Dev sunucu:** `localhost:5178`

---

## 1. GENEL SORUNLAR

### KRİTİK (Ziyaretçinin anında gördüğü)

| # | Sorun | Dosya:Satır | Not |
|---|---|---|---|
| G1 | `<title>` yanlış — "suerta-co-web" | `index.html:7` | Tarayıcı sekmesi ve Google'da ham geliştirici adı çıkıyor |
| G2 | Hero bölümünde CTA butonu yok | `HeroSection.jsx` | `styles.badge` tanımlı ama render edilmiyor; "Bize Ulaşın" / "Portföyü Gör" yok |
| G3 | Footer sosyal linkler kırık | `Footer.jsx:161-162` | Twitter/X ve LinkedIn `href="#"` placeholder |
| G4 | Marka yazımı hatası — 4 ayrı yerde | Aşağıda detay | Kural: `suerta co.` (küçük + nokta) |

**G4 detayı — yanlış yazılan yerler:**
- `AboutSection.jsx:174` → `"Biz **Suerta Co.** olarak..."`
- `Footer.jsx:180` → `© 2026 Suerta Co. Dijital Lüks.`
- `FAQSection.jsx:18` → `"Suerta Co. tam kapsamlı..."`
- `TestimonialsSection.jsx:8` → `"Suerta Co. ile çalışmak..."`

---

### YÜKSEK (Teknik / Kalite)

| # | Sorun | Dosya:Satır | Düzeltme |
|---|---|---|---|
| G5 | CSS geçersiz değer | `HeroSection.jsx:116` | `'0 0.90 rem'` → `'0 0.90rem'` (boşluk yüzünden padding uygulanmıyor) |
| G6 | Aynı element'te çift `style` prop | `AboutSection.jsx:185` | İkinci style yoksayılır, React konsol uyarısı basar |
| G7 | Çift Google Fonts yüklemesi | `index.html:10` + `index.css:1` | `Great Vibes` ve `Playfair Display` hiçbir yerde kullanılmıyor — gereksiz ağ isteği |
| G8 | Meta description ve OG tagları yok | `index.html` | Google ve WhatsApp paylaşımında başlık/açıklama çıkmıyor |

---

### ORTA (UX / Mimari)

| # | Sorun | Dosya:Satır | Düzeltme |
|---|---|---|---|
| G9 | "Daha Fazla Bilgi Al" linki `/blog`'a gidiyor | `ServicesSection.jsx:245,305` | `/iletisim` veya `/hizmetlerimiz` olmalı |
| G10 | Kullanılmayan `MagneticButton` import | `ContactSection.jsx:4` | Import var, kullanım yok |
| G11 | Ekip datası iki yerde duplike | `AboutSection.jsx` + `TeamSection.jsx` | Aynı `team` array'i — tek kaynaktan export edilmeli |
| G12 | Stats bölümü yetersiz | `AboutSection.jsx:179` | Sadece 1 istatistik var (`100% Bespoke`), proje/müşteri sayısı eklenmeli |
| G13 | Scroll handler gereksiz re-render | `App.jsx:68-80` | `showCanvas` dependency array'de — her değişimde handler yeniden attach oluyor |

---

## 2. MOBİL SORUNLAR

### KRİTİK

| # | Sorun | Dosya:Satır | Açıklama |
|---|---|---|---|
| M1 | Mobil servis animasyonu yanlış blokta | `ServicesSection.jsx:61` | `.mobile-service-card` animasyonu `if (!isMobile)` içinde — hiç çalışmıyor |
| M2 | 3D Canvas mobilede GPU çalışıyor | `App.jsx:126` | Canvas sadece `opacity:0` / `visibility:hidden` — WebGL ve animasyonlar arka planda sürüyor |

**M1 detayı:**
```js
if (!isMobile) {           // ← masaüstü bloğu
  // ...desktop pin...

  // "Mobile animasyonu" buraya yanlışlıkla yazılmış:
  const cards = gsap.utils.toArray('.mobile-service-card'); // mobilede DOM'da yok
  gsap.set(content, { height: 0, opacity: 0 });            // bu satır mobilede hiç çalışmıyor
  ScrollTrigger.create({...});
}
```
Sonuç: masaüstünde `.mobile-service-card` render edilmediği için boş array; mobilede `if (!isMobile)` atlandığı için animasyon çalışmıyor. İçerik statik açık kalıyor.

---

### YÜKSEK

| # | Sorun | Dosya:Satır | Açıklama |
|---|---|---|---|
| M3 | 400px x-offset — yatay taşma riski | `TestimonialsSection.jsx:190` | `x: offset * 400` mobilede yatay scroll açabilir; `sliderWrapper`'da `overflow:hidden` yok |
| M4 | Logo `scale(0.6)` — layout hatası | `Navbar.jsx:188` | `transform: scale(0.6)` layout alanını değiştirmiyor; tıklanabilir alan büyük kalıyor |
| M5 | SignatureScene mobilede `min-height:100vh` | `SignatureScene.jsx:43` | Devasa boş alan; `50vh` veya `auto` olmalı |
| M6 | Iframe modal mobilede kullanılmaz | `ReferencesSection.jsx:229` | `height:85vh` iframe + X-Frame-Options engeli + masaüstü boyutlu içerik |

---

### ORTA

| # | Sorun | Dosya:Satır | Düzeltme |
|---|---|---|---|
| M7 | BlogPage paddingTop sabit 100px | `BlogPage.jsx:6` | Navbar mobilede 60px — 40px gereksiz boşluk; `paddingTop: 'calc(60px + 2rem)'` |
| M8 | MagneticButton dokunmatik cihazlarda çalışmıyor | `MagneticButton.jsx` | Sadece `onMouseMove/Leave` var; `onTouchStart` fallback gerekli |
| M9 | CustomCursor mobilede mount ediliyor | `App.jsx:135` | CSS gizliyor ama mouse listener'lar çalışıyor; `window.innerWidth > 768` ile koşullu render |
| M10 | Great Vibes çift import | `SignatureScene.jsx:88` | `<style>` içinde `@import` render-blocking; font zaten `index.html:10`'da yüklü |

---

## 3. TAM SORUN LİSTESİ (öncelik sırasıyla)

| Kod | Kategori | Öncelik | Dosya:Satır |
|---|---|---|---|
| G1 | Genel | 🔴 Kritik | `index.html:7` |
| G2 | Genel | 🔴 Kritik | `HeroSection.jsx` |
| G3 | Genel | 🔴 Kritik | `Footer.jsx:161-162` |
| G4 | Genel | 🔴 Kritik | About/Footer/FAQ/Testimonials |
| M1 | Mobil | 🔴 Kritik | `ServicesSection.jsx:61` |
| M2 | Mobil | 🔴 Kritik | `App.jsx:126` |
| G5 | Genel | 🟠 Yüksek | `HeroSection.jsx:116` |
| G6 | Genel | 🟠 Yüksek | `AboutSection.jsx:185` |
| G7 | Genel | 🟠 Yüksek | `index.html:10` |
| G8 | Genel | 🟠 Yüksek | `index.html` |
| M3 | Mobil | 🟠 Yüksek | `TestimonialsSection.jsx:190` |
| M4 | Mobil | 🟠 Yüksek | `Navbar.jsx:188` |
| M5 | Mobil | 🟠 Yüksek | `SignatureScene.jsx:43` |
| M6 | Mobil | 🟠 Yüksek | `ReferencesSection.jsx:229` |
| G9 | Genel | 🟡 Orta | `ServicesSection.jsx:245,305` |
| G10 | Genel | 🟡 Orta | `ContactSection.jsx:4` |
| G11 | Genel | 🟡 Orta | `AboutSection` + `TeamSection` |
| G12 | Genel | 🟡 Orta | `AboutSection.jsx:179` |
| G13 | Genel | 🟡 Orta | `App.jsx:68-80` |
| M7 | Mobil | 🟡 Orta | `BlogPage.jsx:6` |
| M8 | Mobil | 🟡 Orta | `MagneticButton.jsx` |
| M9 | Mobil | 🟡 Orta | `App.jsx:135` |
| M10 | Mobil | 🟡 Orta | `SignatureScene.jsx:88` |
