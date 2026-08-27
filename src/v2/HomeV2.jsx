import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { referencesData } from '../data/references';
import PixelRocket from './PixelRocket';
import './surface.css';
import './work.css';
import './partners.css';
import './manifesto.css';
import './closing.css';
import './contact.css';
import './cursor.css';
import './v2.css';

/* Tek reveal primitifi. Sitede uc ayri reveal sistemi vardi (CSS + iki farkli
   framer kullanimi, uc farkli sure); hepsi bunun yerine gecer. */
const revealGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function Reveal({ children, className, as = 'div', style }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      style={style}
      variants={revealGroup}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </Component>
  );
}

function Item({ children, className, as = 'div', style }) {
  const Component = motion[as] || motion.div;
  return (
    <Component className={className} style={style} variants={revealItem}>
      {children}
    </Component>
  );
}

/* Cumlenin ilk yarisi soluk, vurgu tam kontrast. Referans sistemin imzasi. */
function TwoTone({ lead, tail }) {
  return (
    <>
      <span className="v2-tone-lead">{lead}</span> {tail}
    </>
  );
}

/* Hero kartlari.
   Onceden tek bir rezervasyon karti vardi ve yalnizca otel isini
   anlatiyordu — alti alanda calisirken bir alani gostermek digerlerini
   yokmus gibi yapiyor. Alti alanin her birinin kendi karti var ve sirayla
   doniyorlar.

   Her kart ayni iskeleti kullaniyor: bir baslik satiri, iki alan ve bir
   toplam. Icerik degisiyor, yapi degismiyor; kartlar donerken sekil
   sabit kaldigi icin goz her seferinde yeniden yer aramiyor. */
const HERO_CARDS = [
  {
    area: 'Otel & rezervasyon',
    badge: 'komisyon %0',
    thumb: 'linear-gradient(135deg, #3f3a33 0%, #7d6c58 55%, #c3ac8a 100%)',
    title: 'Deluxe Deniz Manzaralı Oda',
    meta: '2 misafir · kahvaltı dahil',
    fields: [
      ['Giriş', '14 Ağu'],
      ['Çıkış', '17 Ağu'],
    ],
    footLabel: '3 gece',
    footValue: '₺12.600',
    cta: 'Rezervasyonu tamamla',
  },
  {
    area: 'Emlak & kiralama',
    badge: 'takvim senkron',
    thumb: 'linear-gradient(135deg, #2f4034 0%, #5c7a5f 55%, #a8c0a2 100%)',
    title: 'Deniz Manzaralı 2+1 Daire',
    meta: 'Bodrum · 4 misafir',
    fields: [
      ['Airbnb', 'Dolu'],
      ['Kendi siten', 'Müsait'],
    ],
    footLabel: 'gecelik',
    footValue: '₺4.200',
    cta: 'Rezervasyon talebi',
  },
  {
    area: 'İnternet siteleri',
    badge: 'mobil öncelikli',
    thumb: 'linear-gradient(135deg, #23303f 0%, #4a6885 55%, #9db6ce 100%)',
    title: 'Kurumsal site yenilendi',
    meta: '4 dil · tek panel',
    fields: [
      ['Mobil skor', '98'],
      ['Yüklenme', '0,9 sn'],
    ],
    footLabel: 'hemen çıkma',
    footValue: '−%34',
    cta: 'Siteyi incele',
  },
  {
    area: 'E-ticaret',
    badge: 'tek akış',
    thumb: 'linear-gradient(135deg, #3d2a34 0%, #7a5566 55%, #cfa9b8 100%)',
    title: 'Sepet → ödeme tamamlandı',
    meta: '3 ürün · kargo bedava',
    fields: [
      ['Sepet', '₺1.840'],
      ['Kargo', '₺0'],
    ],
    footLabel: 'toplam',
    footValue: '₺1.840',
    cta: 'Ödemeyi tamamla',
  },
  {
    area: 'Yapay zekâ otomasyonları',
    badge: 'otomatik yanıt',
    thumb: 'linear-gradient(135deg, #2b2b33 0%, #55566b 55%, #a9aac2 100%)',
    title: 'Kontenjan açıldı',
    meta: 'Telegram botu · anlık bildirim',
    fields: [
      ['Yanıt', '0,4 sn'],
      ['Elle iş', 'Yok'],
    ],
    footLabel: 'bu ay yanıtlanan',
    footValue: '1.240',
    cta: 'Botu gör',
  },
  {
    area: 'Görünürlük & büyüme',
    badge: 'SEO + GEO',
    thumb: 'linear-gradient(135deg, #3b3320 0%, #7d6b36 55%, #d5c179 100%)',
    title: 'Aramada ilk sayfa',
    meta: 'Organik + yapay zekâ yanıtları',
    fields: [
      ['Organik', '+%62'],
      ['Tıklama', '+%41'],
    ],
    footLabel: 'reklam maliyeti',
    footValue: '−%28',
    cta: 'Raporu gör',
  },
];

function HeroCard({ card }) {
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i === 16 || i === 19) return 'edge';
    if (i === 17 || i === 18) return 'on';
    return 'off';
  });

  return (
    <div className="v2-mock">
      <div className="v2-mock__cal">
        <div className="v2-mock__cal-head">{card.area}</div>
        <div className="v2-mock__cal-grid">
          {days.map((state, i) => (
            <span
              key={i}
              className={`v2-mock__day${state === 'off' ? '' : ` v2-mock__day--${state}`}`}
            />
          ))}
        </div>
      </div>

      <span className="v2-mock__badge">{card.badge}</span>

      <div className="v2-mock__panel">
        <div className="v2-mock__row">
          <span className="v2-mock__thumb" style={{ background: card.thumb }} />
          <span>
            <span className="v2-mock__name">{card.title}</span>
            <br />
            <span className="v2-mock__meta">{card.meta}</span>
          </span>
        </div>

        <div className="v2-mock__split">
          {card.fields.map(([label, value]) => (
            <span className="v2-mock__field" key={label}>
              <span className="v2-mock__field-label">{label}</span>
              <span className="v2-mock__field-value">{value}</span>
            </span>
          ))}
        </div>

        <div className="v2-mock__total">
          <span className="v2-mock__meta">{card.footLabel}</span>
          <span className="v2-mock__price">{card.footValue}</span>
        </div>

        <span className="v2-btn v2-btn--primary v2-mock__cta">{card.cta}</span>
      </div>
    </div>
  );
}

/* Firlatma sahnesi.
   Onceki hali tek parca bir roket silueti idi ve cikartma gibi duruyordu:
   ne oturdugu bir zemin ne de olcegini veren baska bir nesne vardi.
   Referansin hamlesi roketin kendisi degil, yanindaki kule — kule olmadan
   sey kucuk mu buyuk mu belli olmuyor.

   Bitmap degil SVG: her olcekte net kaliyor ve renkleri tokenlardan
   aliyor. Govde tek dolgu degil, kademeli: panel cizgileri ve kademe
   halkalari uzaklik hissini veren tek sey. */
function LaunchScene() {
  return (
    <svg
      className="v2-rocket"
      width="188"
      height="200"
      viewBox="0 0 188 200"
      fill="none"
      role="img"
      aria-label="Fırlatma rampasındaki roket"
    >
      {/* --- servis kulesi ------------------------------------------------ */}
      <g className="v2-rocket__tower">
        <rect x="126" y="34" width="4" height="140" fill="var(--accent)" />
        <rect x="158" y="34" width="4" height="140" fill="var(--accent)" />
        {/* capraz baglantilar: kule bir cizgi degil, bir kafes */}
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <path
              d={`M130 ${40 + i * 20}L158 ${58 + i * 20}`}
              stroke="var(--accent)"
              strokeWidth="2"
              opacity="0.6"
            />
            <path
              d={`M158 ${40 + i * 20}L130 ${58 + i * 20}`}
              stroke="var(--accent)"
              strokeWidth="2"
              opacity="0.6"
            />
            <rect x="126" y={38 + i * 20} width="36" height="2.5" fill="var(--accent)" />
          </g>
        ))}
        {/* rokete uzanan servis kollari */}
        <rect x="104" y="70" width="24" height="4" fill="var(--accent)" opacity="0.85" />
        <rect x="104" y="118" width="24" height="4" fill="var(--accent)" opacity="0.85" />
        <rect x="120" y="26" width="48" height="4" fill="var(--accent)" />
      </g>

      {/* --- roket -------------------------------------------------------- */}
      <g className="v2-rocket__body">
        {/* burun konisi */}
        <path d="M84 4c7.4 8.2 11.6 17.6 12.6 28H71.4C72.4 21.6 76.6 12.2 84 4z" fill="currentColor" />
        {/* ucuncu kademe */}
        <rect x="71" y="32" width="26" height="34" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
        {/* kademe halkasi */}
        <rect x="69" y="64" width="30" height="5" fill="currentColor" />
        {/* ikinci kademe */}
        <rect x="69" y="69" width="30" height="46" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
        <rect x="69" y="86" width="30" height="3" fill="currentColor" opacity="0.35" />
        {/* kademe halkasi */}
        <rect x="66" y="113" width="36" height="5" fill="currentColor" />
        {/* birinci kademe */}
        <rect x="66" y="118" width="36" height="52" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
        <rect x="66" y="140" width="36" height="3" fill="currentColor" opacity="0.35" />
        {/* govde isareti */}
        <circle cx="84" cy="47" r="4.5" fill="var(--accent)" />

        {/* kanatlar */}
        <path d="M66 150l-13 24h13v-24z" fill="currentColor" />
        <path d="M102 150l13 24h-13v-24z" fill="currentColor" />

        {/* motor agizliklari */}
        <path d="M70 170h9l3 8h-15l3-8z" fill="currentColor" opacity="0.75" />
        <path d="M89 170h9l3 8h-15l3-8z" fill="currentColor" opacity="0.75" />
      </g>

      {/* --- itki ---------------------------------------------------------- */}
      <g className="v2-rocket__flame">
        <path d="M84 176c7 8.6 10.5 17 10.5 25.2H73.5C73.5 193 77 184.6 84 176z" fill="var(--flare)" />
        <path d="M84 182c3.6 5.6 5.4 11.2 5.4 16.8H78.6c0-5.6 1.8-11.2 5.4-16.8z" fill="var(--gold)" />
      </g>

      {/* --- rampa --------------------------------------------------------- */}
      <rect x="30" y="176" width="140" height="6" rx="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* Karakter yagmuru. Math.random kullanilmiyor: prerender ile tarayici farkli
   sonuc uretirse React hydration'da uyusmazlik verir. Yerine indislerden
   turetilen deterministik bir karisim var — gozle rastgele, calismalar
   arasinda ayni. */
/* Rampada bosluk ve nokta yok. Sekli tasiyan sey maske; karakterler yalnizca
   dokuyu veriyor. Seyrek karakterler karisinca maskelenen harf delik desik
   cikiyor ve okunmuyordu. */
const ASCII_RAMP = '-=+*#%@$&';

function asciiBlock(rows, cols, seed) {
  let out = '';
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const n = Math.sin((x + 1) * 12.9898 + (y + 1) * 78.233 + seed) * 43758.5453;
      const f = n - Math.floor(n);
      out += ASCII_RAMP[Math.floor(f * ASCII_RAMP.length)];
    }
    if (y < rows - 1) out += '\n';
  }
  return out;
}

/* Maske olarak markanin bas harfi. SVG data-URI, cunku tek bir harf icin
   ikili dosya tasimak israf ve harf her olcekte net kalmali. */
function glyphMask(letter) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 130'>` +
    `<text x='50' y='104' text-anchor='middle' font-family='Inter,sans-serif' ` +
    `font-size='128' font-weight='700' fill='%23000'>${letter}</text></svg>`;
  return `url("data:image/svg+xml,${svg.replace(/#/g, '%23')}")`;
}

/* Cumle karakter karakter aydinlaniyor. Kaydirma konumu bolumun kendi
   yuksekligine gore 0-1 arasina indiriliyor; kac karakter yanacagini o oran
   belirliyor. Boylece cumle okundugu hizda "yaziliyor".

   Kaydirma dinleyicisi rAF'e sikistiriliyor: her scroll olayinda yuzlerce
   sinif degistirmek karesiz birakir. */
function ScriptedLine({ text }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);
  const chars = React.useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    /* Azaltilmis hareket tercihinde hic olcum yapmiyoruz; karakterleri
       tam kontrasta getirmeyi CSS zaten ustleniyor. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      /* Cumle ekranin alt ucundan girip ust ucune dogru ilerlerken doluyor.
         Payda viewport + eleman yuksekligi, cunku ikisi de yola dahil. */
      const travel = window.innerHeight + rect.height;
      const done = (window.innerHeight - rect.top) / travel;
      const eased = Math.min(1, Math.max(0, (done - 0.18) / 0.46));
      setLit(Math.round(eased * chars.length));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    /* Ilk olcum de rAF uzerinden: efekt govdesinde dogrudan setState
       cagirmak zincirleme render tetikliyor. */
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chars.length]);

  return (
    <h2 className="v2-script" ref={ref}>
      {/* Gorsel olarak parcalanmis metin ekran okuyucuda harf harf okunur;
          erisilebilir isim butun cumleyi tasiyor. */}
      <span className="v2-sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) =>
          char === ' ' ? (
            <span key={i} className="v2-script__space">
              {' '}
            </span>
          ) : (
            <span key={i} className={`v2-script__char${i < lit ? ' is-lit' : ''}`}>
              {char}
            </span>
          )
        )}
      </span>
    </h2>
  );
}

/* Referansin kirmizi butonunun karsiligi. Marka "suerta" — sans; obje de
   madeni para.

   Uc perde: para durur ("dokunma"), cevrilir (yazi ya da tura, gercekten
   rastgele), bir daha basilinca yerini kartvizit alir. Sira onemli — once
   sansi gostermek, sonra elinden almak. Sadece kart gosterilseydi cumle
   sadece bir slogan olurdu; parayi bir kez atmis olmak onu bir sonuca
   ceviriyor. */
function LuckCoin() {
  /* Yarim tur cinsinden. Cift toplam tura, tek toplam yazi verir; her
     basista 9 ya da 10 yarim tur eklendigi icin sonuc gercekten rastgele
     ama para hep ayni yonde donuyor, geri sarma hissi olmuyor. */
  const [halfTurns, setHalfTurns] = useState(0);
  const [stage, setStage] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const press = () => {
    if (stage === 0) {
      setHalfTurns((n) => n + 9 + Math.round(Math.random()));
      setStage(1);
      setSpinning(true);
      return;
    }
    setStage(2);
  };

  const side = halfTurns % 2 === 0 ? 'Tura' : 'Yazı';

  if (stage === 2) {
    return (
      <div className="v2-altar">
        <div className="v2-halo v2-halo--altar" aria-hidden="true" />
        <div className="v2-luckcard" role="group" aria-label="suerta.co kartviziti">
          <p className="v2-luckcard__line">İşini şansa bırakma.</p>
          <p className="v2-luckcard__brand">
            suerta<span className="v2-luckcard__dot">.co</span>
          </p>
          <p className="v2-luckcard__tag">markanızın şansı</p>
          <a className="v2-btn v2-btn--primary v2-luckcard__cta" href="#iletisim">
            Görüşme ayarla
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`v2-altar${spinning ? ' is-spinning' : ''}`}>
      <div className="v2-halo v2-halo--altar" aria-hidden="true" />
      <span className="v2-altar__glow" aria-hidden="true" />

      <button
        type="button"
        className="v2-coin"
        onClick={press}
        onTransitionEnd={() => setSpinning(false)}
        style={{ transform: `rotateY(${halfTurns * 180}deg)` }}
        aria-label={stage === 0 ? 'Parayı çevir' : 'Bir daha bas'}
      >
        <span className="v2-coin__face" aria-hidden="true">
          <span className="v2-coin__mark">s</span>
        </span>
        <span className="v2-coin__face v2-coin__face--back" aria-hidden="true">
          <span className="v2-coin__mark v2-coin__mark--small">suerta.co</span>
        </span>
      </button>

      <span className="v2-pedestal" aria-hidden="true" />

      {/* Ok notu paraya baglar; yalniz metin, yaninda duran bir cumle olarak
          okunuyordu. */}
      <p className="v2-altar__note">
        <svg
          className="v2-altar__arrow"
          width="42"
          height="30"
          viewBox="0 0 42 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M40 28C31 26 23.5 21 17 13.5 13.4 9.4 9.8 5.2 6 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M2.5 9.5L5 1.5l8 1.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {stage === 0 ? 'bu paraya dokunma' : 'bir daha bas'}
      </p>

      <p className="v2-altar__result" aria-live="polite">
        {stage === 1 ? `${side} geldi.` : ''}
      </p>
    </div>
  );
}

/* Bant kendi kendine saga iliyor. Onceki hali sayfa konumuna bagliydi ve
   yanlis hissettiriyordu: kullanici asagi kaydirdiginda bant da kayiyordu,
   yani sayfanin kendisi yerinden oynuyormus gibi oluyordu. Simdi sayfa tam
   yerinde duruyor, hareket eden tek sey bant.

   Surus rAF ile, sabit hizda ve tek yonde. Sona gelince basa donuyor;
   kartlar iki kez basildigi icin donus gorunmuyor.

   Herhangi bir mudahalede (tekerlek, parmak, klavye, ok) alti saniye
   devrediliyor — birinin okudugu yerden bandi cekmek, hareketin
   sagladigi her seyden kotudur. */
function useDriftingCarousel(ref) {
  const takeOverRef = useRef(() => {});

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let releaseTimer = 0;
    let paused = false;
    let last = 0;
    /* Saniyede piksel. Okunacak metin tasiyan bir bant icin yavas olmali;
       hizli olsaydi goz takip etmek zorunda kalirdi. */
    const SPEED = 26;

    const step = (now) => {
      raf = requestAnimationFrame(step);
      const delta = last ? (now - last) / 1000 : 0;
      last = now;
      if (paused || delta <= 0) return;

      /* Yarisi: kartlar iki kez basildi, ilk kopyanin sonuna gelince
         basa donuluyor ve kesinti gorunmuyor. */
      const half = node.scrollWidth / 2;
      if (half <= 0) return;

      let next = node.scrollLeft + SPEED * delta;
      if (next >= half) next -= half;
      node.scrollLeft = next;
    };

    const takeOver = () => {
      paused = true;
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        paused = false;
      }, 6000);
    };

    const hold = () => {
      paused = true;
      clearTimeout(releaseTimer);
    };
    const release = () => {
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        paused = false;
      }, 600);
    };

    takeOverRef.current = takeOver;
    raf = requestAnimationFrame(step);

    node.addEventListener('wheel', takeOver, { passive: true });
    node.addEventListener('touchstart', takeOver, { passive: true });
    node.addEventListener('keydown', takeOver);
    /* Uzerine gelince duruyor: okumak icin gelinmis demektir. */
    node.addEventListener('mouseenter', hold);
    node.addEventListener('mouseleave', release);
    node.addEventListener('focusin', hold);
    node.addEventListener('focusout', release);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(releaseTimer);
      node.removeEventListener('wheel', takeOver);
      node.removeEventListener('touchstart', takeOver);
      node.removeEventListener('keydown', takeOver);
      node.removeEventListener('mouseenter', hold);
      node.removeEventListener('mouseleave', release);
      node.removeEventListener('focusin', hold);
      node.removeEventListener('focusout', release);
    };
  }, [ref]);

  return takeOverRef;
}

/* Iletisim.
   Arkada sunucu yok, o yuzden form "gonderiliyor" numarasi yapmiyor:
   alanlari duzenli bir mesaja cevirip WhatsApp'ta aciyor. Sahte bir
   basari ekrani gostermektense mesajin nereye gittigini gormek daha
   durust ve pratikte daha hizli donuyor. */
const PROJECT_TYPES = [
  'Otel & rezervasyon',
  'Emlak & kiralama',
  'İnternet sitesi',
  'E-ticaret',
  'Yapay zekâ otomasyonu',
  'Görünürlük & büyüme',
  'Henüz emin değilim',
];

const WHATSAPP = '905060693525';

function ArrowGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4v6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactSection() {
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      'Merhaba suerta.co,',
      '',
      `Ad: ${data.get('ad') || '—'}`,
      `Marka: ${data.get('marka') || '—'}`,
      `İletişim: ${data.get('iletisim') || '—'}`,
      `Proje tipi: ${type}`,
      '',
      data.get('mesaj') || '',
    ];
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );
    setSent(true);
  };

  return (
    <section className="v2-section v2-close v2-contact" id="iletisim">
      <div className="v2-halo" aria-hidden="true" />
      <div className="v2-shell">
        {/* Kapanis ve iletisim ayri iki bolumdu ve ikisi de ayni basligi
            tasiyip ayni seyi istiyordu. Tek perde halinde birlestiler:
            once sahne ve kontenjan, hemen ardindan doldurulacak alan. */}
        <Reveal className="v2-close__inner">
          <Item>
            <LaunchScene />
          </Item>
          <Item as="h2" className="v2-display">
            Ne inşa ettiğinizi anlatın
          </Item>
          <Item>
            <span className="v2-ticket">
              <span className="v2-ticket__num">2</span>
              <span className="v2-ticket__label">yer · bu ay</span>
            </span>
          </Item>
          <Item className="v2-status">
            <span className="v2-status__dot" aria-hidden="true" />
            Bu hafta yanıt süresi: birkaç saat
          </Item>
        </Reveal>

        <Reveal className="v2-contact__grid">
          <Item>
            {sent ? (
              <div className="v2-form">
                <div className="v2-form__sent">
                  <p className="v2-form__sent-title">WhatsApp’ta açıldı.</p>
                  <p className="v2-form__note">
                    Pencere açılmadıysa engellenmiş olabilir; aşağıdaki kanallardan
                    doğrudan yazabilirsiniz.
                  </p>
                  <button
                    type="button"
                    className="v2-btn v2-btn--ghost"
                    onClick={() => setSent(false)}
                  >
                    Formu tekrar aç
                  </button>
                </div>
              </div>
            ) : (
              <form className="v2-form" onSubmit={submit}>
                <div className="v2-form__row">
                  <label className="v2-field">
                    <span className="v2-field__label">Ad</span>
                    <input name="ad" type="text" placeholder="Adınız" required />
                  </label>
                  <label className="v2-field">
                    <span className="v2-field__label">Marka</span>
                    <input name="marka" type="text" placeholder="İşletme veya marka adı" />
                  </label>
                </div>

                <label className="v2-field">
                  <span className="v2-field__label">Telefon veya e-posta</span>
                  <input
                    name="iletisim"
                    type="text"
                    placeholder="Size nereden dönelim?"
                    required
                  />
                </label>

                <fieldset className="v2-field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="v2-field__label">Proje tipi</legend>
                  <div className="v2-choices">
                    {PROJECT_TYPES.map((option) => (
                      <label className="v2-choice" key={option}>
                        <input
                          type="radio"
                          name="tip"
                          value={option}
                          checked={type === option}
                          onChange={() => setType(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="v2-field">
                  <span className="v2-field__label">Mesaj</span>
                  <textarea
                    name="mesaj"
                    placeholder="Ne yapmak istediğinizi birkaç cümleyle anlatın."
                  />
                </label>

                <div className="v2-form__foot">
                  <p className="v2-form__note">
                    Form WhatsApp’ta açılır; hiçbir bilgi burada saklanmaz.
                  </p>
                  <button type="submit" className="v2-btn v2-btn--primary">
                    Gönder
                  </button>
                </div>
              </form>
            )}
          </Item>

          <Item className="v2-channels">
            <a
              className="v2-channel"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 2a8 8 0 110 16 8 8 0 01-4.2-1.2l-.4-.2-2.5.7.7-2.4-.3-.4A8 8 0 0112 4zm-3.3 4c-.2 0-.5 0-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3l-.6-.3-1.8-.9c-.3-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.1-.3 0-.4.1-.5l.5-.5.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4z" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">WhatsApp</span>
                <span className="v2-channel__meta">En hızlı yol — genelde birkaç saat</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <a className="v2-channel" href="mailto:suerta.info@gmail.com">
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">E-posta</span>
                <span className="v2-channel__meta">suerta.info@gmail.com</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <a
              className="v2-channel"
              href="https://instagram.com/suerta.co"
              target="_blank"
              rel="noreferrer"
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">Instagram</span>
                <span className="v2-channel__meta">@suerta.co — işleri buradan da görebilirsiniz</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <div className="v2-reply">
              <span className="v2-reply__head">
                <span className="v2-status__dot" aria-hidden="true" />
                Yanıt süresi
              </span>
              <p className="v2-reply__text">
                Hafta içi mesajlara aynı gün, hafta sonu ertesi iş günü dönüyoruz. Üç
                kişilik bir ekibiz; size yazan da işi yapan kişi oluyor.
              </p>
            </div>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}

/* Oklar kendi konum durumunu tutmuyor; bir kart genisligi kadar kaydiriyor
   ve durmayi tarayiciya birakiyor. Durum tutulsaydi kullanici parmakla
   kaydirdiginda sayac gercekle uyusmaz hale gelirdi. */
function scrollCarousel(ref, direction, takeOverRef) {
  const node = ref.current;
  if (!node) return;
  /* Ok da bir mudahale: surus devrediliyor ve ayni zamanlayiciyla geri
     aliniyor, yoksa ilk tiktan sonra bant bir daha hic kendiliginden
     ilerlemezdi. */
  takeOverRef?.current?.();

  const card = node.firstElementChild;
  const step = card ? card.getBoundingClientRect().width + 16 : node.clientWidth * 0.8;
  node.scrollBy({ left: step * direction, behavior: 'smooth' });
}

function PartnerPortrait({ letter, tint, seed }) {
  return (
    <div className="v2-pcard__portrait" style={{ '--tint': tint }}>
      <div className="v2-ascii-mask" style={{ '--glyph': glyphMask(letter) }} aria-hidden="true">
        {/* Blok paneli her yonden asiyor; maskenin altinda karakter bitmesin
            diye. Tasan kisim zaten kirpiliyor. */}
        <pre className="v2-ascii">{asciiBlock(46, 52, seed)}</pre>
      </div>
      <span className="v2-pcard__glow" aria-hidden="true" />
      <span className="v2-pcard__foil" aria-hidden="true" />
    </div>
  );
}

/* Her projede ne yaptigimiz zaten references.js'teki `details` metninde
   kalin basliklar halinde duruyor ("*   **Shopify Entegrasyonu:** ...").
   Ayri bir liste tutmak yerine oradan cikariyoruz: tek kaynak kaliyor ve
   proje guncellenince kart kendiliginden dogru sayiyor. */
function serviceLabels(project) {
  if (!project.details) return [];
  return [...project.details.matchAll(/\*\s+\*\*([^:*]+):/g)].map((m) => m[1].trim());
}

function WorkTile({ project, wide, result }) {
  const labels = serviceLabels(project);
  /* Filmlerin gidilecek bir adresi yok; baglantisi olmayani <a> yapmak
     tiklanabilirmis gibi gosterir ve klavye ile bos bir durak yaratir. */
  const Shell = project.link ? 'a' : 'div';
  const linkProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noreferrer' }
    : {};

  return (
    <Shell
      className={`v2-tile${wide ? ' v2-tile--wide' : ''}${project.link ? '' : ' v2-tile--static'}`}
      {...linkProps}
    >
      {/* Ekran bir televizyonun icinde: cerceve, kavisli cam, tarama
          cizgileri ve dugmeler. Referans bunu sahnelenmis fotografla
          yapiyor; bizde nesne cizilerek kuruluyor, ama okunusu ayni —
          site bir yerde, bir seyin icinde duruyor. */}
      <div className="v2-tv">
        <div className="v2-tv__screen">
          {project.video ? (
            <video
              className="v2-tv__media v2-tv__media--video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={project.poster}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <img
              className="v2-tv__media"
              src={project.image}
              alt={`${project.name} projesinden ekran görüntüsü`}
              loading="lazy"
              decoding="async"
            />
          )}

          <span className="v2-tv__scan" aria-hidden="true" />
          <span className="v2-tv__glare" aria-hidden="true" />

          {/* Uzerine gelince ekrani o projede yaptigimiz isler kapliyor. */}
          <div className="v2-tv__overlay">
            <span className="v2-tv__overlay-label">Neler yaptık</span>
            <ul className="v2-tv__list">
              {labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            {project.link && <span className="v2-tv__go">Siteyi gör ↗</span>}
          </div>
        </div>

        <div className="v2-tv__chin">
          <span className="v2-tv__brand">suerta.co</span>
          <span className="v2-tv__knobs" aria-hidden="true">
            <i />
            <i />
          </span>
        </div>
      </div>

      <div className="v2-tile__foot">
        <span className="v2-tile__name">
          {project.name}
          <VerifiedMark />
        </span>
        <span className="v2-tile__desc">{project.desc}</span>
        {result && <span className="v2-tile__result">{result}</span>}
      </div>
    </Shell>
  );
}

function EmptyTile() {
  return (
    <div className="v2-tile v2-tile--empty">
      <p className="v2-tile__empty-text">Bu slot bir sonraki iş için ayrıldı.</p>
    </div>
  );
}

/* Kirmizi nokta imlec.
   Konum React durumundan degil, dogrudan DOM'a yaziliyor: her fare
   hareketinde render tetiklemek bu sayfanin geri kalanini (karakter karakter
   beliren cumle, kayan bant) da yeniden hesaplatirdi.

   Halka noktayi gecikmeli takip ediyor. Ayni karede ikisi de tam konuma
   giderse hareketin agirligi olmuyor; gecikme tek basina "bu bir nesne"
   hissini veriyor. */
function DotCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dotNode = dot.current;
    const ringNode = ring.current;
    if (!dotNode || !ringNode) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      /* Basit yumusatma: hedefe kalan mesafenin bir kismi kadar yaklas.
         Kare suresinden bagimsiz olmasa da bu olcekte fark edilmiyor. */
      const ease = reduced ? 1 : 0.16;
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      ringNode.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dotNode.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      /* Uzerinde durulan sey tiklanabilir mi? Her harekette soruluyor ama
         `closest` ucuz; alternatifi her etkilesimli ogeye ayri dinleyici
         takmak olurdu ve dinamik icerikte bozulurdu. */
      const hot = event.target?.closest?.('a, button, [role="tab"], summary, input, textarea, label');
      ringNode.classList.toggle('is-hot', Boolean(hot));
    };

    const onDown = () => {
      dotNode.classList.add('is-down');
      ringNode.classList.add('is-down');
    };
    const onUp = () => {
      dotNode.classList.remove('is-down');
      ringNode.classList.remove('is-down');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <>
      <span className="v2-cursor__ring" ref={ring} aria-hidden="true" />
      <span className="v2-cursor" ref={dot} aria-hidden="true" />
    </>
  );
}

function Laurel({ side }) {
  return (
    <svg
      className={`v2-laurel${side === 'right' ? ' v2-laurel--right' : ''}`}
      width="26"
      height="46"
      viewBox="0 0 26 46"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.4 2.6c-6.9 2-12 6.4-14.8 12.4C4.7 21.1 4.4 28 6.7 35.6l1.1 3.7 1.8-.6-1-3.6c-2.1-7-1.9-13.2.6-18.6C11.6 11.1 16.1 7.2 22.4 5.3V2.6z" />
      <path d="M18.4 8.6c-2.7.2-4.9 1.3-6.4 3.2 2 1.2 4.2 1.3 6.4.4V8.6zM14.9 15.6c-2.5.6-4.4 2-5.5 4.2 2.2.8 4.3.5 6.2-.9l-.7-3.3zM12.9 23.9c-2.3 1-3.9 2.7-4.6 5.1 2.3.4 4.3-.3 5.8-2l-1.2-3.1zM13.1 32.4c-2 1.4-3.2 3.3-3.4 5.8 2.3-.1 4.1-1.2 5.2-3.2l-1.8-2.6z" />
    </svg>
  );
}

/* Metin yazilir gibi belirir, ok cizilir gibi. Yolun gercek uzunlugunu
   olcup dasharray'e veriyoruz; sabit bir sayi verilirse farkli ekranlarda
   cizgi ya erken bitiyor ya da yarim kaliyor. */
function Annotation({ text }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const path = node.querySelector('path');
    if (path) node.style.setProperty('--len', path.getTotalLength().toFixed(1));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`v2-anno${shown ? ' is-in' : ''}`} aria-hidden="true">
      <span className="v2-anno__text">{text}</span>
      <svg className="v2-anno__arrow" width="46" height="34" viewBox="0 0 46 34" fill="none">
        <path d="M2 3c8.5 1.2 15.6 5.2 21.3 12 3.2 3.8 6.4 8.2 9.6 13.2" />
        <path d="M26.4 28.8l7 1 1.4-7" />
      </svg>
    </span>
  );
}

/* Hero sahnesi.
   Arkada rampadaki roket, onunde alti alanin kartlari. Kart yigini sayfa
   kaydikca yatayda kayiyor: sabit dursaydi altindaki roketle iliskisi
   olmayan, uzerine yapistirilmis bir kutu gibi dururdu. Kayma sayfa
   hareketine bagli, kendi kendine donen bir karusel degil — kullanici
   durdugunda o da duruyor.

   Kartlar ayrica belirli araliklarla degisiyor, cunku alti alanin hepsini
   ayni anda gostermenin yolu yok ve tek alani gostermek digerlerini yokmus
   gibi yapiyor. */
function HeroStage() {
  const stage = useRef(null);
  const [active, setActive] = useState(0);
  const [drift, setDrift] = useState(0);

  /* Kart degisimi ------------------------------------------------------- */
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setActive((n) => (n + 1) % HERO_CARDS.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  /* Yatay kayma ---------------------------------------------------------
     Sayfa konumu -1 ile 1 arasina indiriliyor; kart yigini o araliga gore
     sola ve saga geziyor. rAF'e sikistiriliyor, yoksa her scroll olayinda
     durum guncellemek kare dusuruyor. */
  useEffect(() => {
    const node = stage.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const ratio = (center - window.innerHeight / 2) / window.innerHeight;
      setDrift(Math.max(-1, Math.min(1, ratio)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="v2-stage" ref={stage}>
      <PixelRocket className="v2-stage__rocket" />

      <div
        className="v2-deck"
        style={{ transform: `translateX(${drift * 14}%) rotate(${drift * -1.6}deg)` }}
      >
        {HERO_CARDS.map((card, i) => (
          <div
            key={card.area}
            className={`v2-deck__slot${i === active ? ' is-active' : ''}`}
            aria-hidden={i !== active}
          >
            <HeroCard card={card} />
          </div>
        ))}
      </div>

      {/* Hangi alanin gosterildigi yaziyla da duruyor; kart iceriginden
          cikarmak okuyucudan is istiyor. */}
      <div className="v2-deck__dots" role="tablist" aria-label="Çalışma alanları">
        {HERO_CARDS.map((card, i) => (
          <button
            key={card.area}
            type="button"
            role="tab"
            className={`v2-deck__dot${i === active ? ' is-active' : ''}`}
            aria-selected={i === active}
            aria-label={card.area}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

function VerifiedMark() {
  return (
    <svg
      className="v2-verified"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.4 1.8-1.2 2.7 1.2 2.7-2.4 1.8-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.3 15.7l1.2-2.7-1.2-2.7 2.4-1.8.9-2.9 3 .2L12 2zm-1 13.3l5.2-5.2-1.4-1.4-3.8 3.8-1.8-1.8L7.8 12l3.2 3.3z" />
    </svg>
  );
}

/* Referansta gecen sayilar: %40 Emsa Otel yorumundan, proje sayisi
   references.js'ten turuyor, ekip buyuklugu sabit. */
const kpis = [
  { unit: '%', value: '40', label: 'Emsa Otel’de doğrudan rezervasyon artışı' },
  { value: String(referencesData.length), label: 'Teslim edilen proje' },
  { value: '3', label: 'Kişilik ekip, tek masa', laurel: true },
];

/* Video isleri.
   Bunlar musteri sitesi degil, cektigimiz tanitim filmleri — hizmet
   listesinde zaten fotograf ve icerik uretimi var. Site ekran goruntusuymus
   gibi sunmak yaniltici olurdu; kendi girdileri olarak duruyorlar ve
   `details` alani ayni kalibi kullandigi icin hover listesi de otomatik
   dogru cikiyor. */
const mediaWorks = [
  {
    id: 'film-kiralik',
    name: 'Kiralık Daire Tanıtımı',
    desc: 'Roma · Tanıtım Filmi & Görsel İçerik',
    video: '/video/reel.mp4',
    poster: '/video/reel-poster.jpg',
    details: `
*   **Mekân Çekimi:** Daire ve çevresi misafirin göreceği sırayla çekildi.
*   **Kurgu ve Renk:** Listing sayfasında döngüde oynayacak şekilde kurgulandı.
*   **Web İçin Optimizasyon:** Sayfayı yavaşlatmayacak boyuta indirildi.
*   **Listing Entegrasyonu:** Rezervasyon sayfasına gömüldü.
    `,
  },
  {
    id: 'film-bungalov',
    name: 'Bungalov Tesisi',
    desc: 'Drone Çekimi & Tesis Tanıtımı',
    video: '/video/showcase.mp4',
    poster: '/video/showcase-poster.jpg',
    details: `
*   **Drone Çekimi:** Tesisin bütünü ve konumu havadan gösterildi.
*   **Ünite Çekimleri:** Her bungalov tipi ayrı ayrı kaydedildi.
*   **Kurgu:** Ana sayfada sessiz döngü için hazırlandı.
*   **Web İçin Optimizasyon:** Mobilde de akıcı oynayacak şekilde sıkıştırıldı.
    `,
  },
];

/* Izgaraya once musteri projeleri, sonra filmler giriyor. */
const allWorks = [...referencesData, ...mediaWorks];

/* One cikan is: sonucu en net olcülen proje. */
const FEATURED_ID = 1;

/* Yerlesimi proje sayisi belirliyor.
   Alti projede referansin birebir duzeni cikiyor: ust sirada dort dar tugla,
   alt sirada bir dar + bir genis + sayi karti. Daha az projede ust sira
   genisleyip bosluk birakmadan kapaniyor — "yakinda" kutusu ancak tam bir
   slot acikta kalirsa devreye giriyor, dolgu olsun diye degil. */
function buildWorkLayout(projects) {
  const featured = projects.find((p) => p.id === FEATURED_ID) || projects[0];
  const rest = projects.filter((p) => p !== featured);
  const dense = rest.length >= 4;

  const top = dense ? rest.slice(0, 4) : rest;
  const small = dense ? rest[4] || null : undefined;

  return {
    featured,
    top,
    /* 12 kolonda ust sira tam kapanir. Ara genislikte izgara 6 kolona
       dusuyor ve orada da bolunme tam olmali: uc tugla varsa satira ucu
       birden, dort varsa ikiser ikiser girer. Sabit bir deger verilseydi
       biri ya da digeri yanina delik birakirdi. */
    topSpan: top.length ? 12 / top.length : 12,
    topSpanMd: top.length === 3 ? 2 : 3,
    small,
    wideSpan: dense ? 6 : 8,
    kpiSpan: dense ? 3 : 4,
    smallSpan: 3,
  };
}

/* Ne yaptigimiz. Etiketler somut teslimat, sifat degil.

   Emlak, gunluk kiralik ve Airbnb ayri hatlar degil: musteri acisindan
   ucu de "mulkumu doldurmak" isi. Ayri ayri yazmak uc farkli hizmet
   satiyormus gibi gosteriyordu; tek baslikta toplandi. */
const services = [
  {
    title: 'Otel & rezervasyon sistemleri',
    desc:
      'Misafir OTA üzerinden değil, doğrudan sizden rezervasyon yapar. Oda envanteri, sezonluk fiyat ve müsaitlik tek panelden yönetilir.',
    tags: ['Komisyonsuz rezervasyon', 'Channel manager / PMS', 'Sezonluk fiyatlama', 'Online ödeme'],
  },
  {
    title: 'Emlak & kiralama',
    desc:
      'Portföy, günlük kiralık ve Airbnb tek yerde. Airbnb ve Booking takvimleriyle senkron çalışır; aynı daireyi komisyon ödemeden kendi sitenizden de doldurursunuz.',
    tags: ['Portföy paneli', 'Takvim senkronu (iCal)', 'Filtreli arama', 'Harita görünümü'],
  },
  {
    title: 'İnternet siteleri',
    desc:
      'Kurumsal site, portfolyo ve tanıtım siteleri. Hızlı, mobil öncelikli, çok dilli; içeriği kendiniz yönetirsiniz.',
    tags: ['Kurumsal & portfolyo', 'Mobil öncelikli', 'Çok dilli', 'İçerik paneli'],
  },
  {
    title: 'E-ticaret',
    desc:
      'Shopify ya da özel altyapı. Sepetten ödemeye tek akış, ürün ve stok yönetimi sizde kalır.',
    tags: ['Shopify kurulumu', 'Checkout akışı', 'Ürün & stok yönetimi', 'Güvenli ödeme'],
  },
  {
    title: 'Yapay zekâ otomasyonları',
    desc:
      'Tekrar eden işi yazılıma devrediyoruz: soruları yanıtlayan chatbotlar, fırsat yakalayan takip botları, form ve talep akışlarının otomasyonu.',
    tags: ['WhatsApp chatbot', 'Telegram takip botu', 'Talep otomasyonu', 'Panel entegrasyonu'],
  },
  {
    title: 'Görünürlük & büyüme',
    desc:
      'Site kurulup bırakılmıyor. Arama motorlarında ve yapay zekâ yanıtlarında bulunur olmanız için SEO, GEO ve reklam tarafını da yürütüyoruz.',
    tags: ['SEO', 'GEO (yapay zekâ arama)', 'Google & Meta Ads', 'İşletme profili'],
  },
];

/* Baslik sayiyi elle tasiyordu ve hizmet eklenince yalan soyluyordu; artik
   diziden turuyor. */
const NUMBER_WORDS = ['sıfır', 'tek', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz'];

/* Dort adim. Sureler gercek taahhut; degistirmeden once teslim gecmisine bak. */
const steps = [
  { num: '01', title: 'Keşif', desc: '15 dakikalık görüşme. Ne sattığınızı, kime sattığınızı ve neyin eksik olduğunu netleştiririz.' },
  { num: '02', title: 'Kapsam', desc: 'Sabit fiyat, sabit kapsam ve teslim tarihi. Sürpriz kalem yok.' },
  { num: '03', title: 'Kurulum', desc: 'Tasarım, geliştirme, rezervasyon motoru ve entegrasyonlar. Ara teslimlerle ilerler.' },
  { num: '04', title: 'Devir', desc: 'Yayına alma, panel eğitimi ve 30 gün destek. Site sizde kalır, bize bağımlı değilsiniz.' },
];

const faqs = [
  {
    q: 'OTA komisyonunu gerçekten düşürebilir miyim?',
    a: 'Tamamen bitirmez ama payı ciddi biçimde kaydırır. Booking veya Airbnb üzerinden gelen misafir komisyon götürür; kendi sitenizden gelen götürmez. Emsa Otel’de doğrudan rezervasyon oranı %40 arttı. Hedef platformları bırakmak değil, ikinci ve üçüncü kez gelen misafiri doğrudan kendinize almak.',
  },
  {
    q: 'Mevcut channel manager veya PMS’imle çalışır mı?',
    a: 'Evet. API veya iCal desteği olan sistemlerle takvim ve envanter senkronu kuruyoruz; müsaitlik iki yerde ayrı ayrı güncellenmez. Hangi sistemi kullandığınızı söyleyin, entegrasyonun mümkün olup olmadığını görüşmeden önce netleştirelim.',
  },
  {
    q: 'Siteyi kendim güncelleyebilir miyim?',
    a: 'Evet. Oda, ilan, fiyat, görsel ve içerik girişini yapabileceğiniz bir panel teslim ediyoruz. Devirde eğitim veriyoruz. Küçük değişiklik için bize dönmeniz gerekmiyor.',
  },
  {
    q: 'Ne kadar sürede teslim ediyorsunuz?',
    a: 'Kapsama bağlı. Tek mülk veya butik otel için 2–3 hafta; rezervasyon motoru ve entegrasyon gerektiren işler 4–6 hafta. Tarihi kapsam aşamasında yazılı veriyoruz.',
  },
  {
    q: 'Çok dilli ve çok para birimli olur mu?',
    a: 'Olur, bu nişte neredeyse zorunlu. Türkçe–İngilizce standart; talep halinde Almanca, Rusça ve Arapça ekliyoruz. Fiyatlar ziyaretçinin para biriminde gösterilebilir.',
  },
];

/* Dort gercek proje, dordu de references.js'te. Her yorum o projede fiilen
   yapilan ise dayaniyor — genel ovgu cumlesi yazmak yerine teslim edilen
   seyi soyletmek hem daha inandirici hem de dogru. */
const quotes = [
  {
    brand: 'Emsa Otel',
    letter: 'E',
    tint: '#9a3b32',
    seed: 11,
    text:
      'Otelimizin dijital dönüşümünde suerta.co ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı.',
    role: 'Yönetim Kurulu',
  },
  {
    brand: 'Rönesans Edu',
    letter: 'R',
    tint: '#5c9cd8',
    seed: 29,
    text:
      'Sınav kontenjanı takibi elle imkânsızdı. Kurdukları Telegram botu kontenjan açıldığı an haber veriyor; öğrencilerimiz artık fırsat kaçırmıyor.',
    role: 'Kurucu Ortak',
  },
  {
    brand: 'Pawsec Shop',
    letter: 'P',
    tint: '#4f8f6a',
    seed: 53,
    text:
      'Sıfırdan e-ticaret kurduk. Sepetten ödemeye kadar tek akışta ilerliyor ve ürünlerimi kendim güncelliyorum — her değişiklik için kimseye dönmem gerekmiyor.',
    role: 'Marka Sahibi',
  },
  {
    brand: 'Argüman Fabrikası',
    letter: 'A',
    tint: '#c08a2e',
    seed: 71,
    text:
      'Binden fazla münazara konusunu aranabilir bir arşive çevirdiler. Reklam ve SEO tarafını da yürüttükleri için içerik gerçekten karşılığını buldu.',
    role: 'Kurucu',
  },
];

export default function HomeV2() {
  const work = buildWorkLayout(allWorks);
  const carousel = useRef(null);
  const carouselTakeOver = useDriftingCarousel(carousel);

  return (
    <div className="v2-root">
      <DotCursor />

      <nav className="v2-nav" aria-label="Ana menü">
        <a className="v2-nav__brand" href="#top">
          suerta<span className="v2-nav__brand-dot">.co</span>
        </a>
        <div className="v2-nav__links">
          <a className="v2-nav__link" href="#isler">
            İşler
          </a>
          <a className="v2-nav__link" href="#hizmetler">
            Hizmetler
          </a>
          <a className="v2-nav__link" href="#surec">
            Süreç
          </a>
          <a className="v2-nav__link" href="#sss">
            SSS
          </a>
        </div>
        <a className="v2-btn v2-btn--primary" href="#iletisim">
          Görüşme ayarla
        </a>
      </nav>

      {/* Hero ------------------------------------------------------------- */}
      <header className="v2-hero" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-castlight" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal className="v2-hero__inner">
            {/* Marka adi hero'da yaziyla geciyor: arama motoru da ziyaretci
                de sayfanin ilk ekraninda kimin konustugunu gormeli. */}
            <Item className="v2-hero__brand">
              suerta<span className="v2-hero__brand-dot">.co</span>
            </Item>
            <Item as="h1" className="v2-display">
              <TwoTone
                lead="Ziyaretçiyi müşteriye çeviren"
                tail="premium web siteleri."
              />
            </Item>
            <Item as="p" className="v2-lead">
              Otel, kiralama, eğitim ve e-ticaret markaları için. Aracıya komisyon ödemek
              yerine doğrudan satış ve rezervasyon kazandıran siteler kuruyoruz.
            </Item>
            <Item className="v2-hero__actions">
              <a className="v2-btn v2-btn--primary" href="#iletisim">
                Görüşme ayarla
              </a>
              <a className="v2-btn v2-btn--ghost" href="#isler">
                İşleri gör
              </a>
            </Item>
            <Item style={{ width: '100%' }}>
              <HeroStage />
            </Item>
          </Reveal>
        </div>
      </header>

      {/* Secili isler ----------------------------------------------------- */}
      <section className="v2-section" id="isler">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="Seçili" tail="işler." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-work" style={{ '--top-span-md': work.topSpanMd }}>
            {work.top.map((project) => (
              <Item key={project.id} style={{ gridColumn: `span ${work.topSpan}` }}>
                <WorkTile project={project} />
              </Item>
            ))}

            {work.small !== undefined && (
              <Item style={{ gridColumn: `span ${work.smallSpan}` }}>
                {work.small ? <WorkTile project={work.small} /> : <EmptyTile />}
              </Item>
            )}

            <Item
              className="v2-work__wide"
              style={{ gridColumn: `span ${work.wideSpan}` }}
            >
              <WorkTile
                project={work.featured}
                wide
                result="Doğrudan rezervasyon %40 arttı"
              />
            </Item>

            <Item
              className="v2-work__kpi"
              style={{ gridColumn: `span ${work.kpiSpan}` }}
            >
              <div className="v2-kpi">
                {kpis.map((kpi) => (
                  <div className="v2-kpi__row" key={kpi.label}>
                    <span className="v2-kpi__value">
                      {kpi.laurel && <Laurel />}
                      <span>
                        {kpi.unit && <span className="v2-kpi__unit">{kpi.unit}</span>}
                        {kpi.value}
                      </span>
                      {kpi.laurel && <Laurel side="right" />}
                    </span>
                    <span className="v2-kpi__label">{kpi.label}</span>
                  </div>
                ))}
              </div>
            </Item>
          </Reveal>
        </div>
      </section>

      {/* Ne yapiyoruz ----------------------------------------------------- */}
      <section className="v2-section" id="hizmetler">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone
                  lead={`${NUMBER_WORDS[services.length] ?? services.length} alanda`}
                  tail="çalışıyoruz."
                />
              </h2>
              <Annotation text="hepsinde aynı mesele: aracıyı aradan çıkarmak" />
            </Item>
          </Reveal>

          <Reveal className="v2-list">
            {services.map((service, i) => (
              <Item key={service.title} className="v2-row">
                <span className="v2-row__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="v2-row__title">{service.title}</h3>
                <div className="v2-row__body">
                  <p className="v2-row__desc">{service.desc}</p>
                  <div className="v2-tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="v2-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Surec ------------------------------------------------------------ */}
      <section className="v2-section" id="surec">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="İlk görüşmeden" tail="yayına kadar." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-steps">
            {steps.map((step) => (
              <Item key={step.num} className="v2-step">
                <span className="v2-step__num">{step.num}</span>
                <span className="v2-step__title">{step.title}</span>
                <span className="v2-step__desc">{step.desc}</span>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Referans yorumlari (koyu) ---------------------------------------- */}
      <section className="v2-section v2-section--dark v2-partners">
        <div className="v2-halo v2-halo--dark" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-partners__head">
              <h2 className="v2-title">
                <TwoTone lead="Çalıştığımız" tail="markalar ne diyor." />
              </h2>
              <div className="v2-carousel-nav">
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => scrollCarousel(carousel, -1, carouselTakeOver)}
                  aria-label="Önceki referans"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => scrollCarousel(carousel, 1, carouselTakeOver)}
                  aria-label="Sonraki referans"
                >
                  →
                </button>
              </div>
            </Item>
          </Reveal>
        </div>

        <div className="v2-shell">
          {/* Kartlar iki kez basiliyor: bant sona gelince basa donuyor ve
              kopya sayesinde donus gorunmuyor. Ikinci tur erisilebilirlik
              agacindan gizli, yoksa okuyucu her yorumu iki kez okuyor. */}
          <div className="v2-carousel" ref={carousel}>
            {[0, 1].map((pass) => (
              <React.Fragment key={pass}>
                {quotes.map((quote) => (
                  <figure
                    className="v2-pcard"
                    key={`${pass}-${quote.brand}`}
                    aria-hidden={pass === 1 ? 'true' : undefined}
                  >
                    <div className="v2-pcard__body">
                      <span className="v2-pcard__brand">{quote.brand}</span>
                      <blockquote className="v2-pcard__quote">“{quote.text}”</blockquote>
                      {/* Marka adi zaten ustte; alt satirda tekrarlamak
                          yerine konusanin kim oldugu duruyor. */}
                      <figcaption className="v2-pcard__by">
                        <strong>{quote.role}</strong>
                        <span className="v2-pcard__role">{quote.brand}</span>
                      </figcaption>
                    </div>
                    <PartnerPortrait letter={quote.letter} tint={quote.tint} seed={quote.seed} />
                  </figure>
                ))}

                {/* Referans son slotu bos birakmiyor, teklife ceviriyor. */}
                <div
                  className="v2-pcard v2-pcard--open"
                  key={`${pass}-open`}
                  aria-hidden={pass === 1 ? 'true' : undefined}
                >
                  <div className="v2-pcard__body">
                    <span className="v2-pcard__brand">Ayrılmış</span>
                    <p className="v2-pcard__open-text">
                      Bu alan sizinle kuracağımız iş için ayrıldı.
                    </p>
                    <a className="v2-btn v2-btn--primary" href="#iletisim" tabIndex={pass === 1 ? -1 : undefined}>
                      Görüşme ayarla
                    </a>
                  </div>
                  <PartnerPortrait letter="?" tint="#d0aa64" seed={47} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SSS -------------------------------------------------------------- */}
      <section className="v2-section" id="sss">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="Görüşmeden önce" tail="merak edilenler." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-faq">
            {faqs.map((faq) => (
              <Item key={faq.q} as="details" className="v2-faq__item">
                <summary className="v2-faq__q">
                  {faq.q}
                  <span className="v2-faq__sign" aria-hidden="true" />
                </summary>
                <p className="v2-faq__a">{faq.a}</p>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Biz kimiz -------------------------------------------------------- */}
      <section className="v2-section v2-manifesto" id="hakkimizda">
        <div className="v2-shell">
          <div className="v2-manifesto__grid">
            <ScriptedLine text="Biz suerta.co'yuz. Otel, kiralama, eğitim ve e-ticaret markalarına ziyaretçiyi müşteriye çeviren siteler kuruyoruz." />
            <LuckCoin />
          </div>
        </div>
      </section>

      {/* Kapanis + iletisim ------------------------------------------------ */}
      <ContactSection />

      {/* Kapanis bandi ----------------------------------------------------
          Referans sayfayi tam genislik bir gorselle kapatiyor ve telif
          satirini onun uzerine serilen koyu gradyanda tasiyor. Gorsel
          uretilene kadar ayni yeri SVG turbulansiyla kurulan ditherli bir
          doku tutuyor. */}
      <footer className="v2-band">
        <video
          className="v2-band__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/showcase-poster.jpg"
          aria-label="Bungalov tesisi drone çekimi"
        >
          <source src="/video/showcase.mp4" type="video/mp4" />
        </video>
        <div className="v2-band__dither" aria-hidden="true" />
        <div className="v2-band__foot">
          <div className="v2-shell">
            {/* Ana sitedeki alt bilgi duzeni: uc kolon, dev logotype, en altta
                telif ve yukari don. Onceki hali tek satirlik bir baglanti
                seridiydi ve sayfanin sonu gibi degil, kesilmis gibi
                duruyordu. */}
            <div className="v2-fcols">
              <div className="v2-fcol">
                <span className="v2-fcol__title">Menü</span>
                <a className="v2-fcol__link" href="#isler">
                  İşler
                </a>
                <a className="v2-fcol__link" href="#hizmetler">
                  Hizmetler
                </a>
                <a className="v2-fcol__link" href="#surec">
                  Süreç
                </a>
                <a className="v2-fcol__link" href="#sss">
                  SSS
                </a>
              </div>

              <div className="v2-fcol">
                <span className="v2-fcol__title">Sosyal</span>
                <a
                  className="v2-fcol__link"
                  href="https://instagram.com/suerta.co"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>
                <a
                  className="v2-fcol__link"
                  href="https://wa.me/905060693525"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp ↗
                </a>
              </div>

              <div className="v2-fcol">
                <span className="v2-fcol__title">İletişim</span>
                <a className="v2-fcol__link" href="mailto:suerta.info@gmail.com">
                  suerta.info@gmail.com
                </a>
                <span className="v2-fcol__link v2-fcol__link--plain">
                  Eskişehir, Türkiye (Global)
                </span>
              </div>
            </div>

            {/* Logotype, baslik degil: sayfada ikinci bir h1 yaratmasin diye
                div ve role="img". */}
            <div className="v2-wordmark" role="img" aria-label="suerta.co">
              suerta<span className="v2-wordmark__dot">.co</span>
            </div>

            <div className="v2-band__bottom">
              <span className="v2-band__copy">
                © {new Date().getFullYear()} suerta.co — otel, kiralama, eğitim ve
                e-ticaret markaları için siteler. Tüm hakları saklıdır.
              </span>
              <button
                type="button"
                className="v2-totop"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Yukarı dön ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
