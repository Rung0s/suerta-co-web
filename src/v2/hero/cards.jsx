import React from 'react';

/* ==========================================================================
   Alan kartlari
   --------------------------------------------------------------------------
   Alti kart, alti ayri ekran. Onceden hepsi ayni rezervasyon iskeletini
   kullaniyordu: yalnizca yazilar degisiyordu, dolayisiyla kart donerken
   "ayni sey, baska etiket" gibi okunuyordu.

   Kart basligi alan adini degil o ekranin adini tasiyor (Rezervasyon,
   Sepet, WhatsApp...): alan adi zaten kartin ustunde buyuk yaziyla
   duruyor, ikisi ayni seyi yazinca kart kendini tekrar ediyordu.

   Simdi her kart o alanda teslim edilen seyin kendi arayuzu: rezervasyon
   icin takvim, bot icin sohbet, site icin canli ziyaretci, e-ticaret icin
   sepet, gorunurluk icin arama sonucu. Ortak olan tek sey cerceve —
   baslik satiri, rozet ve ayni yuzey.
   ========================================================================== */

function CardShell({ area, badge, children, tone }) {
  return (
    <article className={`v2-hc${tone ? ` v2-hc--${tone}` : ''}`}>
      <header className="v2-hc__head">
        <span className="v2-hc__area">{area}</span>
        <span className="v2-hc__badge">{badge}</span>
      </header>
      <div className="v2-hc__body">{children}</div>
    </article>
  );
}

/* 1 — Otel & rezervasyon ---------------------------------------------------
   Satilan sey aracisiz tamamlanan rezervasyon; kart da onu gosteriyor:
   secili tarih araligi, gece sayisi, toplam ve tek dugme. */
const CAL_DAYS = Array.from({ length: 28 }, (_, i) => {
  if (i === 15) return 'start';
  if (i === 16 || i === 17) return 'mid';
  if (i === 18) return 'end';
  if (i === 4 || i === 11 || i === 24) return 'busy';
  return 'free';
});

export function BookingCard() {
  return (
    <CardShell area="Rezervasyon" badge="komisyon %0">
      <div className="v2-hc__room">
        <span className="v2-hc__thumb v2-hc__thumb--room" />
        <span className="v2-hc__stack">
          <span className="v2-hc__name">Deniz Manzaralı Deluxe</span>
          <span className="v2-hc__meta">2 misafir · kahvaltı dahil</span>
        </span>
      </div>

      <div className="v2-hc__cal">
        <span className="v2-hc__cal-head">Ağustos</span>
        <div className="v2-hc__cal-grid">
          {CAL_DAYS.map((state, i) => (
            <span key={i} className={`v2-hc__day v2-hc__day--${state}`} />
          ))}
        </div>
      </div>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">3 gece · 14–17 Ağu</span>
        <span className="v2-hc__price">₺12.600</span>
      </div>

      <span className="v2-hc__cta">Rezervasyonu tamamla</span>
    </CardShell>
  );
}

/* 2 — Emlak & kiralama -----------------------------------------------------
   Ayni daire uc kanalda. Iki kanal komisyon aliyor, biri almiyor; kartin
   tek isi bunu yan yana gostermek. */
const CHANNELS = [
  { name: 'Airbnb', state: 'Dolu', fee: 'komisyon %15', tone: 'off' },
  { name: 'Booking', state: 'Dolu', fee: 'komisyon %18', tone: 'off' },
  { name: 'Kendi siteniz', state: 'Müsait', fee: 'komisyon yok', tone: 'on' },
];

export function ListingCard() {
  return (
    <CardShell area="İlan takvimi" badge="takvim senkron">
      <div className="v2-hc__room">
        <span className="v2-hc__thumb v2-hc__thumb--flat" />
        <span className="v2-hc__stack">
          <span className="v2-hc__name">Deniz Manzaralı 2+1</span>
          <span className="v2-hc__meta">Bodrum · 4 misafir</span>
        </span>
      </div>

      <ul className="v2-hc__channels">
        {CHANNELS.map((channel) => (
          <li key={channel.name} className={`v2-hc__channel v2-hc__channel--${channel.tone}`}>
            <span className="v2-hc__channel-name">{channel.name}</span>
            <span className="v2-hc__channel-fee">{channel.fee}</span>
            <span className="v2-hc__channel-state">{channel.state}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">gecelik</span>
        <span className="v2-hc__price">₺4.200</span>
      </div>
    </CardShell>
  );
}

/* 3 — Internet siteleri ----------------------------------------------------
   Sitenin ciktisi trafik: su an kac kisi var, hangi cihazdan, egri ne
   yapiyor. Sparkline sabit bir dizi — animasyon degil, tek bir anin
   fotografi. */
const TRAFFIC = [8, 12, 9, 16, 22, 19, 27, 31, 28, 36, 42, 38, 47, 52];

function sparkPath(values, width, height) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export function VisitorsCard() {
  return (
    <CardShell area="Canlı trafik" badge="mobil öncelikli">
      <div className="v2-hc__live">
        <span className="v2-hc__pulse" aria-hidden="true" />
        <span className="v2-hc__meta">şu an sitede</span>
        <span className="v2-hc__live-count">38</span>
      </div>

      <svg className="v2-hc__spark" viewBox="0 0 200 56" fill="none" aria-hidden="true">
        <path d={`${sparkPath(TRAFFIC, 200, 48)} L200 56 L0 56 Z`} className="v2-hc__spark-fill" />
        <path d={sparkPath(TRAFFIC, 200, 48)} className="v2-hc__spark-line" />
      </svg>

      <ul className="v2-hc__bars">
        {[
          ['Mobil', 68],
          ['Masaüstü', 24],
          ['Tablet', 8],
        ].map(([label, value]) => (
          <li key={label} className="v2-hc__bar">
            <span className="v2-hc__bar-label">{label}</span>
            <span className="v2-hc__bar-track">
              <span className="v2-hc__bar-fill" style={{ width: `${value}%` }} />
            </span>
            <span className="v2-hc__bar-value">%{value}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

/* 4 — E-ticaret ------------------------------------------------------------
   Sepetten odemeye tek akis. Kart o akisin son adiminda duruyor: iki urun,
   kargo bedava, odeme tamam. */
const CART = [
  { name: 'Tahıllı Köpek Maması 12 kg', price: '₺1.240', tone: 'a' },
  { name: 'Otomatik Su Kabı', price: '₺600', tone: 'b' },
];

export function CheckoutCard() {
  return (
    <CardShell area="Sepet" badge="tek akış">
      <ul className="v2-hc__cart">
        {CART.map((item) => (
          <li key={item.name} className="v2-hc__cart-row">
            <span className={`v2-hc__thumb v2-hc__thumb--${item.tone}`} />
            <span className="v2-hc__cart-name">{item.name}</span>
            <span className="v2-hc__cart-price">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__line">
        <span className="v2-hc__meta">Kargo</span>
        <span className="v2-hc__meta">Bedava</span>
      </div>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">toplam</span>
        <span className="v2-hc__price">₺1.840</span>
      </div>

      <span className="v2-hc__cta v2-hc__cta--done">Ödeme tamamlandı ✓</span>
    </CardShell>
  );
}

/* 5 — Yapay zeka otomasyonlari ---------------------------------------------
   Botun isi gece yarisi gelen soruyu yanitsiz birakmamak. Kart bunu bir
   sohbet olarak gosteriyor; sayi sohbetin altinda kaliyor. */
const CHAT = [
  { from: 'them', text: 'Merhaba, 14–17 Ağustos boş oda var mı?' },
  { from: 'us', text: '14–17 Ağustos deniz manzaralı deluxe müsait. 3 gece ₺12.600.' },
  { from: 'them', text: 'Kahvaltı dahil mi?' },
];

export function ChatCard() {
  return (
    <CardShell area="WhatsApp" badge="otomatik yanıt" tone="chat">
      <div className="v2-hc__chat">
        {CHAT.map((line) => (
          <span key={line.text} className={`v2-hc__bubble v2-hc__bubble--${line.from}`}>
            {line.text}
          </span>
        ))}
        <span className="v2-hc__bubble v2-hc__bubble--us v2-hc__bubble--typing" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="v2-hc__line">
        <span className="v2-hc__meta">ortalama yanıt</span>
        <span className="v2-hc__price v2-hc__price--sm">0,4 sn</span>
      </div>
    </CardShell>
  );
}

/* 6 — Gorunurluk & buyume --------------------------------------------------
   Iki yerde bulunmak gerekiyor: arama sonucunda ve yapay zeka yanitinda.
   Kart ikisini de gosteriyor — ustte siralama, altta yanitin kaynagi. */
const RESULTS = [
  { rank: '1', label: 'suerta.co', highlight: true },
  { rank: '2', label: 'rakip ajans' },
  { rank: '3', label: 'dizin sitesi' },
];

export function RankCard() {
  return (
    <CardShell area="Arama sonucu" badge="SEO + GEO">
      <div className="v2-hc__search">
        <span className="v2-hc__search-icon" aria-hidden="true" />
        <span className="v2-hc__search-text">otel web sitesi kurulumu</span>
      </div>

      <ul className="v2-hc__results">
        {RESULTS.map((result) => (
          <li key={result.rank} className={`v2-hc__result${result.highlight ? ' is-us' : ''}`}>
            <span className="v2-hc__rank">{result.rank}</span>
            <span className="v2-hc__result-label">{result.label}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__ai">
        <span className="v2-hc__ai-label">Yapay zekâ yanıtı</span>
        <span className="v2-hc__ai-text">
          “…otel siteleri için <b>suerta.co</b> gibi ajanslar…”
        </span>
      </div>
    </CardShell>
  );
}
