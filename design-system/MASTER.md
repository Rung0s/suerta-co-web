# suerta.co — Tasarım Sistemi

> Bu belge kodun anlatımıdır, kodun kaynağı değil. Tek doğru kaynak
> `src/v2/v2.css` (tokenlar, tipografi, düğmeler, menü) ve `src/v2/surface.css`
> (gölge, hareket, kâğıt, ızgara). Bir değer burada ve orada çelişiyorsa
> doğru olan orasıdır; bu dosyayı güncelleyin.
>
> Önceki sürüm koyu temalı, "liquid glass" bir sistem tarif ediyordu (Bodoni
> Moda + Jost, `#1A1A1D` zemin, `backdrop-filter` panelleri). Site o sistemden
> çıktı; belge geride kalmıştı ve her yeni bölümde yanlış referans veriyordu.

---

## Karakter

Açık, kâğıt hissi veren bir yüzey. Cam yok, blur yok, gradyan süsü yok.
Derinlik tek bir gölge ölçeğinden ve kâğıdın kendi ışığından geliyor.
Referans dil: `thelaunchcompany.cc` — gücü tipografide değil, her panelin
aynı fiziksel malzemeden kesilmiş gibi durmasında.

Koyu bölümler istisna, tema değil: `.v2-section--dark` sayfanın ritmini
kırmak için var (partnerler, kapanış), sistemin ikinci bir modu değil.

---

## Renk

Tokenlar `:root` ve `.v2-root` üzerinde birlikte tanımlı — `<body>` de aynı
zemini kullanabilsin diye.

| Token | Değer | Ne için |
|---|---|---|
| `--bg` | `#f6f5f2` | Sayfa zemini |
| `--surface` | `#ffffff` | Kart, panel |
| `--surface-sunken` | `#f2f0ea` | Zemine gömülü alanlar |
| `--ink` | `#111110` | Ana metin, birincil düğme zemini |
| `--muted` | `#6b6a66` | İkincil metin |
| `--line` | `rgba(17,17,16,.09)` | Kenarlık |
| `--accent` | `#9a161f` | Marka kırmızısı — vurgu ve odak halkası |
| `--brand-dot` | `#6d0f17` | Yalnızca marka adındaki `.co` |
| `--gold` | `#b8892b` | Nadir detay |
| `--flare` | `#d93a2b` | Anotasyon ve parlama; `--accent`'in yerine geçmez |

Koyu bölüm: `--dark-bg #111110`, `--dark-ink #f6f5f2`,
`--dark-muted rgba(246,245,242,.58)`, `--dark-line rgba(246,245,242,.14)`,
`--dark-surface rgba(246,245,242,.05)`.

**Kural:** `--accent` ile `--flare` aynı yüzeyde yan yana durmaz. Marka
kırmızısı karar (düğme, odak); flare ise dikkat çekme (anotasyon, ışık).

---

## Tipografi

Üç aile, hepsi `/fonts/` altında yerel (`src/fonts.css`). Google'dan
çekilmiyor: o zincir bitmeden gövde yazısı çizilmiyordu.

| Token | Aile | Ne için |
|---|---|---|
| `--font` | Inter | Gövde ve başlık — ikisi de |
| `--font-note` | Caveat | El yazısı notlar, anotasyon |
| `--font-numeric` | Doto | Sayılar, sayaçlar |

Ayrı bir başlık ailesi yok; hiyerarşi boyut, ağırlık ve harf aralığıyla
kuruluyor.

**Beş boyut, daha fazlası değil:**

| Token | Değer |
|---|---|
| `--text-display` | `clamp(2.5rem, 5.4vw, 4.25rem)` |
| `--text-title` | `clamp(1.9rem, 3.4vw, 2.75rem)` |
| `--text-lead` | `clamp(1.0625rem, 1.4vw, 1.1875rem)` |
| `--text-body` | `1rem` |
| `--text-small` | `0.875rem` |
| `--text-micro` | `0.8125rem` |

Satır yüksekliği: `--leading-display 1.04`, `--leading-title 1.1`,
`--leading-body 1.6`.
Harf aralığı: `--tracking-display -0.028em`, `--tracking-title -0.018em`,
`--tracking-label 0.08em`.

**Kural:** Yeni bir `font-size` yazmadan önce bu altısından biri işi görüyor
mu diye bakın. Ölçeğin dışına çıkan her boyut sistemi bir parça bozuyor.

---

## Boşluk ve geometri

`--space-1` (0.25rem) … `--space-26` (6.5rem) arası dörtlü adımlar.

| Token | Değer |
|---|---|
| `--gutter` | `clamp(1.25rem, 4.4vw, 4rem)` |
| `--section-y` | `clamp(4rem, 7.8vw, 7rem)` |
| `--max-width` | `1270px` |
| `--radius-inner` | `12px` |
| `--radius-card` | `20px` |
| `--radius-pill` | `999px` |

Bölüm dolgusu `.v2-section` üzerinden geliyor; art arda gelen iki açık bölümde
ikincinin üst dolgusu otomatik kalkıyor. Kendi `padding-block` değerinizi
yazmayın.

`.v2-shell` genişliği ve iç dolguyu birlikte veriyor — her bölümün içi bununla
başlar.

---

## Yüzey: dört katman

`src/v2/surface.css` sistemin taşıyıcısı. Bölümler bunu yeniden üretmez,
kullanır.

1. **Kâğıt** — `--paper-top` (sayfa), `--paper-tile` (kart), `--paper-base`
   (kenarlara doğru koyulaşan gradyan). İkisi üst üste binince yüzey düz bir
   dolgu yerine ışık alan bir malzeme oluyor.
2. **Izgara halesi** — `--grid-cell 56px`, `--grid-cross 168px`.
3. **Gölge — üç kademe, daha fazlası değil:**
   `--shadow-tile` (duran panel), `--shadow-raised` (kalkan panel),
   `--shadow-control` (basılabilir kontrol; üst kenarda iç beyaz çizgi).
   Koyu bölümde `--shadow-dark`.
4. **Hareket** — aşağıda.

---

## Hareket

İki eğri, dört süre:

| Token | Değer | Ne için |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | Varsayılan |
| `--ease-overshoot` | `cubic-bezier(.34,1.26,.64,1)` | Yalnızca ekrana yeni giren şey |
| `--dur-press` | `110ms` | Basma |
| `--dur-hover` | `200ms` | Üzerine gelme |
| `--dur-enter` | `600ms` | Giriş |
| `--dur-nav` | `520ms` | Menü |

**Kural:** `prefers-reduced-motion: reduce` her animasyonlu bileşende ele
alınır. Şu an dokuz CSS dosyasında karşılığı var; yeni bir bölüm bunu
atlarsa sistemden düşer. `LazyVideo` bu tercihte filmi hiç kurmuyor, poster
kalıyor.

---

## Düğmeler

`.v2-btn` taban; iki varyant:

- `.v2-btn--primary` — `--ink` zemin, `--shadow-control`. Hover'da 1px
  kalkıyor, basılınca 1px çöküyor ve gölge kısalıyor. Fiziksel bir tuş gibi.
- `.v2-btn--ghost` — kâğıt zemin, `--line` kenarlık, `--shadow-tile`.

Odak: `outline: 2px solid var(--accent)`, `outline-offset: 3px`. Kaldırmayın.
`[disabled]`: opaklık `.55`, `cursor: progress`, `pointer-events: none`.

---

## Erişilebilirlik — pazarlık dışı

- Her etkileşimli öğede `:focus-visible` görünür.
- `prefers-reduced-motion` her hareket eden bileşende.
- Görsel olarak parçalanmış metin (`ScriptedLine` gibi) `.v2-sr-only` içinde
  bütün halini taşır.
- Sabit menü var; çapa hedefleri `scroll-margin-top` ile menünün altında
  kalmıyor.
- Durum değişimleri (`form gönderildi` gibi) `role="status"` +
  `aria-live="polite"` ile bildirilir.

---

## Dosya düzeni

```
src/v2/
  v2.css          tokenlar, kabuk, tipografi, düğme, menü
  surface.css     gölge / hareket / kâğıt / ızgara tokenları
  hero.css  work.css  services.css  manifesto.css
  partners.css  crew.css  closing.css  contact.css  pages.css
  cursor.css
```

Her bölüm kendi CSS dosyasını taşır ve yalnızca kendi seçicilerini yazar.
Token tanımı yalnızca `v2.css` ve `surface.css` içinde olur.

---

## Yeni bölüm eklerken

1. Tokenları kullanın; yeni renk, yeni boyut, yeni süre tanımlamayın.
2. Bölüm sarmalayıcısı `.v2-section` + `.v2-shell`.
3. CSS'i `src/v2/<bölüm>.css` içine, seçiciler `.v2-<bölüm>` ön ekiyle.
4. Hareket varsa `prefers-reduced-motion` karşılığını aynı commit'te yazın.
5. Metin `src/v2/i18n/copy.{tr,en,it}.js` içine — üçüne birden.
