import React from 'react';
import { useCopy } from '../i18n';

/* ==========================================================================
   Alan kartlari
   --------------------------------------------------------------------------
   Alti kart, alti ayri ekran. Onceden hepsi ayni rezervasyon iskeletini
   kullaniyordu: yalnizca yazilar degisiyordu, dolayisiyla kart donerken
   "ayni sey, baska etiket" gibi okunuyordu.

   Kart basligi alan adini degil o ekranin adini tasiyor (Rezervasyon,
   Sepet, WhatsApp...): alan adi zaten kartin ustunde buyuk yaziyla
   duruyor, ikisi ayni seyi yazinca kart kendini tekrar ediyordu.

   Her kart o alanda teslim edilen seyin kendi arayuzu: rezervasyon icin
   takvim, bot icin sohbet, site icin canli ziyaretci, e-ticaret icin
   sepet, gorunurluk icin arama sonucu. Ortak olan tek sey cerceve —
   baslik satiri, rozet ve ayni yuzey.

   Kartlarin icindeki her cumle dil dosyasindan geliyor: bu kartlar
   sayfanin en cok bakilan nesnesi, yari Turkce yari Ingilizce bir kart
   Ingilizce sayfada en cok goze batan sey olurdu. */

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
  const t = useCopy().cards.otel;

  return (
    <CardShell area={t.screen} badge={t.badge}>
      <div className="v2-hc__room">
        <span className="v2-hc__thumb v2-hc__thumb--room" />
        <span className="v2-hc__stack">
          <span className="v2-hc__name">{t.room}</span>
          <span className="v2-hc__meta">{t.meta}</span>
        </span>
      </div>

      <div className="v2-hc__cal">
        <span className="v2-hc__cal-head">{t.calHead}</span>
        <div className="v2-hc__cal-grid">
          {CAL_DAYS.map((state, i) => (
            <span key={i} className={`v2-hc__day v2-hc__day--${state}`} />
          ))}
        </div>
      </div>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">{t.staySummary}</span>
        <span className="v2-hc__price">{t.price}</span>
      </div>

      <span className="v2-hc__cta">{t.cta}</span>
    </CardShell>
  );
}

/* 2 — Emlak & kiralama -----------------------------------------------------
   Ayni daire uc kanalda. Iki kanal komisyon aliyor, biri almiyor; kartin
   tek isi bunu yan yana gostermek. */
export function ListingCard() {
  const t = useCopy().cards.kiralama;

  return (
    <CardShell area={t.screen} badge={t.badge}>
      <div className="v2-hc__room">
        <span className="v2-hc__thumb v2-hc__thumb--flat" />
        <span className="v2-hc__stack">
          <span className="v2-hc__name">{t.flat}</span>
          <span className="v2-hc__meta">{t.meta}</span>
        </span>
      </div>

      <ul className="v2-hc__channels">
        {t.channels.map((channel) => (
          <li key={channel.name} className={`v2-hc__channel v2-hc__channel--${channel.tone}`}>
            <span className="v2-hc__channel-name">{channel.name}</span>
            <span className="v2-hc__channel-fee">{channel.fee}</span>
            <span className="v2-hc__channel-state">{channel.state}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">{t.perNight}</span>
        <span className="v2-hc__price">{t.price}</span>
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
  const t = useCopy().cards.site;

  return (
    <CardShell area={t.screen} badge={t.badge}>
      <div className="v2-hc__live">
        <span className="v2-hc__pulse" aria-hidden="true" />
        <span className="v2-hc__meta">{t.now}</span>
        <span className="v2-hc__live-count">{t.count}</span>
      </div>

      <svg className="v2-hc__spark" viewBox="0 0 200 56" fill="none" aria-hidden="true">
        <path d={`${sparkPath(TRAFFIC, 200, 48)} L200 56 L0 56 Z`} className="v2-hc__spark-fill" />
        <path d={sparkPath(TRAFFIC, 200, 48)} className="v2-hc__spark-line" />
      </svg>

      <ul className="v2-hc__bars">
        {t.devices.map((device) => (
          <li key={device.label} className="v2-hc__bar">
            <span className="v2-hc__bar-label">{device.label}</span>
            <span className="v2-hc__bar-track">
              <span className="v2-hc__bar-fill" style={{ width: `${device.value}%` }} />
            </span>
            <span className="v2-hc__bar-value">%{device.value}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

/* 4 — E-ticaret ------------------------------------------------------------
   Sepetten odemeye tek akis. Kart o akisin son adiminda duruyor: iki urun,
   kargo bedava, odeme tamam. */
export function CheckoutCard() {
  const t = useCopy().cards.eticaret;

  return (
    <CardShell area={t.screen} badge={t.badge}>
      <ul className="v2-hc__cart">
        {t.items.map((item) => (
          <li key={item.name} className="v2-hc__cart-row">
            <span className={`v2-hc__thumb v2-hc__thumb--${item.tone}`} />
            <span className="v2-hc__cart-name">{item.name}</span>
            <span className="v2-hc__cart-price">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__line">
        <span className="v2-hc__meta">{t.shippingLabel}</span>
        <span className="v2-hc__meta">{t.shippingValue}</span>
      </div>

      <div className="v2-hc__total">
        <span className="v2-hc__meta">{t.totalLabel}</span>
        <span className="v2-hc__price">{t.total}</span>
      </div>

      <span className="v2-hc__cta v2-hc__cta--done">{t.done}</span>
    </CardShell>
  );
}

/* 5 — Yapay zeka otomasyonlari ---------------------------------------------
   Botun isi gece yarisi gelen soruyu yanitsiz birakmamak. Kart bunu bir
   sohbet olarak gosteriyor; sayi sohbetin altinda kaliyor. */
export function ChatCard() {
  const t = useCopy().cards.bot;

  return (
    <CardShell area={t.screen} badge={t.badge} tone="chat">
      <div className="v2-hc__chat">
        {t.chat.map((line) => (
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
        <span className="v2-hc__meta">{t.avgLabel}</span>
        <span className="v2-hc__price v2-hc__price--sm">{t.avgValue}</span>
      </div>
    </CardShell>
  );
}

/* 6 — Gorunurluk & buyume --------------------------------------------------
   Iki yerde bulunmak gerekiyor: arama sonucunda ve yapay zeka yanitinda.
   Kart ikisini de gosteriyor — ustte siralama, altta yanitin kaynagi. */
export function RankCard() {
  const t = useCopy().cards.gorunurluk;

  return (
    <CardShell area={t.screen} badge={t.badge}>
      <div className="v2-hc__search">
        <span className="v2-hc__search-icon" aria-hidden="true" />
        <span className="v2-hc__search-text">{t.query}</span>
      </div>

      <ul className="v2-hc__results">
        {t.results.map((result) => (
          <li key={result.rank} className={`v2-hc__result${result.highlight ? ' is-us' : ''}`}>
            <span className="v2-hc__rank">{result.rank}</span>
            <span className="v2-hc__result-label">{result.label}</span>
          </li>
        ))}
      </ul>

      <div className="v2-hc__ai">
        <span className="v2-hc__ai-label">{t.aiLabel}</span>
        <span className="v2-hc__ai-text">
          {t.aiBefore}
          <b>suerta.co</b>
          {t.aiAfter}
        </span>
      </div>
    </CardShell>
  );
}
