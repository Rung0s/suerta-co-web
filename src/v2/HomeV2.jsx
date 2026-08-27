import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { referencesData } from '../data/references';
import './surface.css';
import './work.css';
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

/* Hero'nun merkez objesi: komisyon odenmeden tamamlanan bir rezervasyon.
   Tamamen dekoratif, bu yuzden erisilebilirlik agacindan gizli. */
function BookingMock() {
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i === 16 || i === 19) return 'edge';
    if (i === 17 || i === 18) return 'on';
    return 'off';
  });

  return (
    <div className="v2-stage" aria-hidden="true">
      <div className="v2-mock">
        <div className="v2-mock__cal">
          <div className="v2-mock__cal-head">Ağustos</div>
          <div className="v2-mock__cal-grid">
            {days.map((state, i) => (
              <span
                key={i}
                className={`v2-mock__day${state === 'off' ? '' : ` v2-mock__day--${state}`}`}
              />
            ))}
          </div>
        </div>

        <span className="v2-mock__badge">komisyon %0</span>

        <div className="v2-mock__panel">
          <div className="v2-mock__row">
            <span className="v2-mock__thumb" />
            <span>
              <span className="v2-mock__name">Deluxe Deniz Manzaralı Oda</span>
              <br />
              <span className="v2-mock__meta">2 misafir · kahvaltı dahil</span>
            </span>
          </div>

          <div className="v2-mock__split">
            <span className="v2-mock__field">
              <span className="v2-mock__field-label">Giriş</span>
              <span className="v2-mock__field-value">14 Ağu</span>
            </span>
            <span className="v2-mock__field">
              <span className="v2-mock__field-label">Çıkış</span>
              <span className="v2-mock__field-value">17 Ağu</span>
            </span>
          </div>

          <div className="v2-mock__total">
            <span className="v2-mock__meta">3 gece</span>
            <span className="v2-mock__price">₺12.600</span>
          </div>

          <span className="v2-btn v2-btn--primary v2-mock__cta">Rezervasyonu tamamla</span>
        </div>
      </div>
    </div>
  );
}

/* Referansin imza objesi. Bitmap yerine SVG: her olcekte net, tema degisince
   renk tokenlarini takip eder. */
function Rocket() {
  return (
    <svg
      className="v2-rocket"
      width="72"
      height="96"
      viewBox="0 0 72 96"
      fill="none"
      aria-hidden="true"
    >
      {/* govde */}
      <path
        d="M36 4c9.5 8.6 15 21.4 15 34.6 0 8.4-2.2 16.3-6 22.9H27c-3.8-6.6-6-14.5-6-22.9C21 25.4 26.5 12.6 36 4z"
        fill="currentColor"
      />
      {/* pencere */}
      <circle cx="36" cy="33" r="7" fill="var(--bg)" />
      <circle cx="36" cy="33" r="3.4" fill="var(--gold)" />
      {/* kanatlar */}
      <path d="M21 40c-6 4.4-9.5 11.4-9.5 19.6L21 54V40z" fill="currentColor" opacity="0.55" />
      <path d="M51 40c6 4.4 9.5 11.4 9.5 19.6L51 54V40z" fill="currentColor" opacity="0.55" />
      {/* luleyi govdeye yapistiran agizlik — alev bosluktan degil, buradan cikar */}
      <path d="M28.5 61.5h15l-2.5 5h-10l-2.5-5z" fill="currentColor" opacity="0.7" />
      {/* alev */}
      <g className="v2-rocket__flame">
        <path d="M36 65c4.6 5.2 6.9 10.7 6.9 16.5 0 5.6-2.9 10.4-6.9 14.5-4-4.1-6.9-8.9-6.9-14.5C29.1 75.7 31.4 70.2 36 65z" fill="currentColor" />
        <path d="M36 71.5c2.4 3.2 3.5 6.7 3.5 10.3 0 3.4-1.6 6.4-3.5 9.2-1.9-2.8-3.5-5.8-3.5-9.2 0-3.6 1.1-7.1 3.5-10.3z" fill="var(--gold)" />
      </g>
    </svg>
  );
}

function WorkTile({ project, wide, result }) {
  return (
    <a
      className={`v2-tile${wide ? ' v2-tile--wide' : ''}`}
      href={project.link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="v2-tile__frame">
        <img
          src={project.image}
          alt={`${project.name} projesinden ekran görüntüsü`}
          loading="lazy"
          decoding="async"
        />
        <span className="v2-tile__glass" />
        <span className="v2-tile__label">Siteyi gör ↗</span>
      </div>
      <div className="v2-tile__foot">
        <span className="v2-tile__name">
          {project.name}
          <VerifiedMark />
        </span>
        <span className="v2-tile__desc">{project.desc}</span>
        {result && <span className="v2-tile__result">{result}</span>}
      </div>
    </a>
  );
}

function EmptyTile() {
  return (
    <div className="v2-tile v2-tile--empty">
      <p className="v2-tile__empty-text">Bu slot bir sonraki iş için ayrıldı.</p>
    </div>
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

/* Ne yaptigimiz — nise gore uc hat. Etiketler somut teslimat, sifat degil. */
const services = [
  {
    title: 'Otel & rezervasyon siteleri',
    desc:
      'Misafir OTA üzerinden değil, doğrudan sizden rezervasyon yapar. Oda envanteri, sezonluk fiyat ve müsaitlik tek panelden yönetilir.',
    tags: ['Komisyonsuz rezervasyon', 'Channel manager / PMS', 'Sezonluk fiyatlama', 'Online ödeme'],
  },
  {
    title: 'Günlük kiralık & Airbnb',
    desc:
      'Airbnb ve Booking takvimleriyle senkron çalışan kendi siteniz. Aynı daireyi platforma komisyon ödemeden de doldurursunuz.',
    tags: ['Takvim senkronu (iCal)', 'Çok dilli listing', 'Çoklu para birimi', 'Direkt talep formu'],
  },
  {
    title: 'Emlak & ilan siteleri',
    desc:
      'Portföyünüzü kendiniz yönetirsiniz. Filtreli arama, harita, karşılaştırma ve danışman sayfalarıyla ilanı satışa çeviren yapı.',
    tags: ['Portföy paneli', 'Filtreli arama', 'Harita görünümü', 'Danışman profilleri'],
  },
];

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

const quotes = [
  {
    text:
      'Otelimizin dijital dönüşümünde suerta co. ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı.',
    name: 'Emsa Otel',
    role: 'Yönetim Kurulu',
  },
  {
    text:
      'Eğitim platformumuzu dijitale taşırken hem öğrenci deneyimi hem de modern bir arayüz arıyorduk. Beklentimizin çok üstüne çıktılar.',
    name: 'Rönesans Edu',
    role: 'Kurucu Ortak',
  },
];

export default function HomeV2() {
  const work = buildWorkLayout(referencesData);

  return (
    <div className="v2-root">
      <nav className="v2-nav" aria-label="Ana menü">
        <a className="v2-nav__brand" href="#top">
          suerta co.
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
            <Item as="h1" className="v2-display">
              <TwoTone
                lead="Ziyaretçiyi müşteriye çeviren"
                tail="premium web siteleri."
              />
            </Item>
            <Item as="p" className="v2-lead">
              Otel, günlük kiralık ve emlak markaları için. Komisyon ödemek yerine doğrudan
              rezervasyon kazandıran siteler kuruyoruz.
            </Item>
            <Item className="v2-hero__actions">
              <a className="v2-btn v2-btn--primary" href="#iletisim">
                Görüşme ayarla
              </a>
              <a className="v2-btn v2-btn--ghost" href="#isler">
                İşleri gör
              </a>
            </Item>
            <Item>
              <BookingMock />
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
              <Annotation text="rezervasyon motorunu da biz kuruyoruz" />
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
                <TwoTone lead="Üç alanda" tail="çalışıyoruz." />
              </h2>
              <span className="v2-note">hepsinde aynı mesele: doğrudan rezervasyon</span>
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
      <section className="v2-section v2-section--dark">
        <div className="v2-halo v2-halo--dark" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="Çalıştığımız" tail="markalar ne diyor." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-quotes">
            {quotes.map((quote) => (
              <Item key={quote.name} className="v2-quote">
                <blockquote className="v2-quote__text">“{quote.text}”</blockquote>
                <figcaption className="v2-quote__by">
                  <strong>{quote.name}</strong> — {quote.role}
                </figcaption>
              </Item>
            ))}
          </Reveal>
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
      <section className="v2-section" id="hakkimizda">
        <div className="v2-shell">
          <Reveal>
            <Item as="h2" className="v2-display">
              <TwoTone
                lead="Biz suerta co.'yuz. Otel ve kiralama markalarına site kuruyoruz —"
                tail="misafiri komisyon ödemeden getiren türünden."
              />
            </Item>
          </Reveal>
        </div>
      </section>

      {/* Kapanis ---------------------------------------------------------- */}
      <section className="v2-section v2-cta" id="iletisim">
        <div className="v2-shell">
          <Reveal className="v2-cta__inner">
            <Item>
              <Rocket />
            </Item>
            <Item as="h2" className="v2-display">
              Ne inşa ettiğinizi anlatın
            </Item>
            <Item className="v2-availability">
              Bu ay <span className="v2-availability__num">2</span> proje kontenjanı
            </Item>
            <Item>
              <a
                className="v2-btn v2-btn--primary"
                href="https://wa.me/905060693525"
                target="_blank"
                rel="noreferrer"
              >
                15 dakikalık görüşme ayarla
              </a>
            </Item>
          </Reveal>
        </div>
      </section>

      {/* Alt bilgi -------------------------------------------------------- */}
      <footer className="v2-footer">
        <div className="v2-shell">
          <div className="v2-footer__top">
            <div className="v2-footer__col">
              <span className="v2-label">suerta co.</span>
              <span className="v2-footer__link" style={{ cursor: 'default' }}>
                Rezervasyon ve ilan siteleri stüdyosu
              </span>
            </div>
            <div className="v2-footer__col">
              <span className="v2-label">Menü</span>
              <a className="v2-footer__link" href="#isler">
                İşler
              </a>
              <a className="v2-footer__link" href="#hizmetler">
                Hizmetler
              </a>
              <a className="v2-footer__link" href="#surec">
                Süreç
              </a>
              <a className="v2-footer__link" href="#sss">
                SSS
              </a>
            </div>
            <div className="v2-footer__col">
              <span className="v2-label">İletişim</span>
              <a className="v2-footer__link" href="mailto:suerta.info@gmail.com">
                suerta.info@gmail.com
              </a>
              <a
                className="v2-footer__link"
                href="https://instagram.com/suerta.co"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="v2-footer__bottom">
            © {new Date().getFullYear()} suerta co. — suerta.co
          </div>
        </div>
      </footer>
    </div>
  );
}
