import React from 'react';
import { motion } from 'framer-motion';
import { referencesData } from '../data/references';
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

function Reveal({ children, className, as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={revealGroup}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </Component>
  );
}

function Item({ children, className, as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component className={className} variants={revealItem}>
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

/* Rakamlar gercek: %40 Emsa Otel yorumundan, 4 references.js'ten, 3 ekip
   buyuklugu. Portfoy buyudukce burasi guncellenmeli. */
const stats = [
  { unit: '%', value: '40', label: 'Emsa Otel’de doğrudan rezervasyon artışı' },
  { value: '4', label: 'Teslim edilen proje' },
  { value: '3', label: 'Kişilik ekip, tek masa' },
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
          <a className="v2-nav__link" href="#hakkimizda">
            Hakkımızda
          </a>
        </div>
        <a className="v2-btn v2-btn--primary" href="#iletisim">
          Görüşme ayarla
        </a>
      </nav>

      {/* Hero ------------------------------------------------------------- */}
      <header className="v2-hero" id="top">
        <div className="v2-hero__grid" aria-hidden="true" />
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
              <span className="v2-note">rezervasyon motorunu da biz kuruyoruz</span>
            </Item>
          </Reveal>

          <Reveal className="v2-work">
            {referencesData.map((project) => (
              <Item key={project.id}>
                <a
                  className="v2-card"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="v2-card__media">
                    <img
                      src={project.image}
                      alt={`${project.name} projesinden ekran görüntüsü`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="v2-card__foot">
                    <span className="v2-card__name">
                      {project.name}
                      <VerifiedMark />
                    </span>
                    <span className="v2-card__desc">{project.desc}</span>
                  </div>
                </a>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Sayilar ---------------------------------------------------------- */}
      <section className="v2-section">
        <div className="v2-shell">
          <Reveal className="v2-stats">
            {stats.map((stat) => (
              <Item key={stat.label} className="v2-stat">
                <span className="v2-stat__value">
                  {stat.unit && <span className="v2-stat__unit">{stat.unit}</span>}
                  {stat.value}
                </span>
                <span className="v2-stat__label">{stat.label}</span>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Referans yorumlari (koyu) ---------------------------------------- */}
      <section className="v2-section v2-section--dark">
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
            <Item as="h2" className="v2-display">
              Ne inşa ettiğinizi anlatın
            </Item>
            <Item className="v2-availability">bu ay 2 proje kontenjanı</Item>
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
              <a className="v2-footer__link" href="#hakkimizda">
                Hakkımızda
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
