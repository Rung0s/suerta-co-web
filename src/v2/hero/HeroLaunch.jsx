import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_CARDS } from './card-list';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';

/* ==========================================================================
   Firlatma sahnesi — sabitlenen hero
   --------------------------------------------------------------------------
   Hero ve alan kartlari ayri iki blok degil, tek bir sahne. Sayfa bolumun
   ustune geldiginde sahne ekrana sabitleniyor (sticky) ve asagi kaydirmak
   artik sayfayi degil sahneyi ilerletiyor: yazi yukari cikiyor, kartlar
   sirayla saga kayiyor, roket rampadan havalaniyor. Alti kart bittiginde
   sabitleme birakiyor ve sayfa normal akisina donuyor.

   Neden boyle: kartlar onceden zamanlayiciyla donuyordu. Zamanlayici
   okuyucuyu beklemiyor — bir karti okurken digerine geciyordu. Burada
   ilerlemeyi okuyucu veriyor.

   Sahne yalnizca genis ekranda ve hareket kisitlamasi yokken sabitleniyor.
   Dar ekranda sabitleme dokunmatik kaydirmayla cakisiyor; orada yazi,
   roket ve kartlar sirayla normal akista duruyor.
   ========================================================================== */

const CARD_COUNT = HERO_CARDS.length;

/* Sahnenin bolumleri, ilerleme (0–1) uzerinden:
   0.00–0.10  yazi duruyor, roket rampada
   0.10–0.20  yazi yukari cikiyor, ilk kart geliyor
   0.20–0.92  kartlar sirayla geciyor, roket yukseliyor
   0.92–1.00  son kart ortada duruyor, sahne birakiliyor */
const COPY_OUT = 0.2;
/* Kartlar yazi tamamen cekildikten sonra giriyor. Onceden ikisi ayni anda
   ortadaydi ve kartlar paragrafin uzerine biniyordu. */
const CARDS_IN = 0.24;
const CARDS_OUT = 0.94;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/* Iki esik arasindaki konumu 0–1'e indiriyor. */
function span(value, from, to) {
  return clamp((value - from) / (to - from));
}

export default function HeroLaunch() {
  const c = useCopy();
  const { lang } = useLang();
  const outer = useRef(null);
  /* Alan adi kartin ustunde duruyor ve kartlarin boyu icerigine gore
     degisiyor. Yuzde ile yerlestirilince kisa ekranlarda yazi kartin
     ustune biniyordu: konumu kartin gercek yuksekliginden hesapliyoruz. */
  const deckRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(320);
  const [progress, setProgress] = useState(0);
  /* Ilk cizim her yerde ayni olmali: prerender masaustu genisliginde
     calisiyor, mod ancak tarayicida olculuyor. */
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 900px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => setPinned(!narrow.matches && !reduced.matches);
    apply();

    narrow.addEventListener('change', apply);
    reduced.addEventListener('change', apply);
    return () => {
      narrow.removeEventListener('change', apply);
      reduced.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    const node = outer.current;
    if (!node || !pinned) {
      setProgress(0);
      return undefined;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      /* Kaydirilabilir mesafe = bolumun boyu eksi bir ekran. Sahne o mesafe
         boyunca sabit duruyor. */
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      setProgress(clamp(-rect.top / travel));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned]);

  /* Kart treni: t=0 ilk kart ortada, t=1 son kart ortada.

     Ilerleme dogrudan konuma cevrilirse kartlar yolun buyuk kisminda iki
     kartin arasinda kaliyor ve ikisi de yari saydam durdugu icin hicbiri
     okunmuyor. Her adimin ortasinda hizli bir gecis, iki yaninda durus
     var: kart yolun ucte ikisinde tam ortada ve tam belirgin duruyor. */
  const t = span(progress, CARDS_IN, CARDS_OUT);
  const seg = t * (CARD_COUNT - 1);
  const index = Math.min(CARD_COUNT - 2, Math.floor(seg));
  const frac = CARD_COUNT > 1 ? clamp(seg - index) : 0;
  const move = clamp((frac - 0.42) / 0.18);
  const head = index + move * move * (3 - 2 * move);
  const active = Math.round(head);

  /* Olculen kart sirada olan kart: kartlarin boyu icerigine gore
     degisiyor (sohbet karti takvim kartindan uzun), ilk kartin boyuna
     gore yerlestirilen yazi digerlerinin ustune biniyordu.

     offsetHeight, getBoundingClientRect degil: kartlar olceklenerek
     hareket ediyor ve olcek olcuye karisirdi. */
  useEffect(() => {
    /* Olculen sey slotun tamami: kartin altinda bir de "yaziyi oku"
       satiri var ve slot dikeyde ortalandigi icin kartin ust kenari o
       satirin yarisi kadar daha yukarida duruyor. Yalnizca kart
       olculunce yazi kartin ustune bes piksel biniyordu. */
    const node = deckRef.current?.children?.[active];
    if (!node) return undefined;

    const apply = () => {
      if (node.offsetHeight > 0) setCardHeight(node.offsetHeight);
    };
    apply();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  const copyOut = span(progress, 0.04, COPY_OUT);
  const lift = span(progress, 0.1, 1);

  /* Kartin sahnedeki yerine gitmek: nokta gostergesine basinca sayfa o
     kartin denk geldigi kaydirma konumuna gidiyor. */
  const goTo = (index) => {
    const node = outer.current;
    if (!node || !pinned) return;
    const travel = node.offsetHeight - window.innerHeight;
    const ratio = CARDS_IN + (index / (CARD_COUNT - 1)) * (CARDS_OUT - CARDS_IN);
    window.scrollTo({
      top: node.offsetTop + travel * ratio,
      behavior: 'smooth',
    });
  };

  const copy = (
    <div
      className="v2-launch__copy"
      style={
        pinned
          ? {
              opacity: 1 - copyOut,
              transform: `translateY(${copyOut * -56}px)`,
              pointerEvents: copyOut > 0.6 ? 'none' : 'auto',
            }
          : undefined
      }
    >
      {/* Marka adi hero'da yaziyla geciyor: arama motoru da ziyaretci de
          sayfanin ilk ekraninda kimin konustugunu gormeli. */}
      <span className="v2-hero__brand">
        suerta<span className="v2-hero__brand-dot">.co</span>
      </span>
      <h1 className="v2-display">
        <span className="v2-tone-lead">{c.hero.lead}</span> {c.hero.tail}
      </h1>
      <div className="v2-hero__actions">
        <a className="v2-btn v2-btn--primary" href="#iletisim">
          {c.hero.ctaPrimary}
        </a>
        <a className="v2-btn v2-btn--ghost" href="#isler">
          {c.hero.ctaSecondary}
        </a>
      </div>
    </div>
  );

  const deck = (
    /* Kartlar yazi cekilirken geliyor: ikisi ayni anda ortada durunca
       kartlar yazinin uzerine biniyordu. */
    <div
      className="v2-launch__deck"
      ref={deckRef}
      style={pinned ? { opacity: span(progress, 0.18, 0.28) } : undefined}
    >
      {HERO_CARDS.map(({ key, Card, post }, i) => {
        const offset = i - head;
        const distance = Math.abs(offset);

        const style = pinned
          ? {
              /* Yalnizca sirada olan kart okunuyor. Komsular hem daha
                 uzakta hem neredeyse gorunmez: uc yarim saydam kart yan
                 yana durunca hicbiri okunmuyor, uclu bir leke cikiyordu. */
              transform: `translate(-50%, -50%) translateX(${offset * 118}%) scale(${
                1 - Math.min(distance, 2) * 0.12
              })`,
              /* Ortadaki kart hep tam belirgin; solma yalnizca kart
                 kadrajdan cikarken basliyor. Yari saydam kart, ustunde
                 durulunca "kaybolmus" gorunuyordu. */
              opacity: distance <= 0.55 ? 1 : Math.max(0, 1 - (distance - 0.55) * 3),
              zIndex: Math.max(1, 10 - Math.round(distance * 10)),
              pointerEvents: i === active ? 'auto' : 'none',
            }
          : undefined;

        /* Kart bir baglanti: gordugun ekrani anlatan yaziya gidiyor.
           Kartin kendisi tiklanabilir olunca "bu bir resim mi, dugme mi"
           sorusu kalmiyor; altindaki satir da nereye gidildigini yaziyla
           soyluyor. Yalnizca sirada olan kart tiklanabilir — arkadaki
           kartlar zaten pointerEvents ile kapali. */
        return (
          <div className="v2-launch__slot" key={key} style={style}>
            <Link
              className="v2-launch__card-link"
              to={pathFor('blogItem', lang, { id: post })}
              tabIndex={i === active ? undefined : -1}
              aria-hidden={i === active ? undefined : 'true'}
            >
              <Card />
              <span className="v2-launch__read">
                {c.cards[key].read}
                <span className="v2-launch__read-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );

  return (
    <header
      className={`v2-launch${pinned ? ' is-pinned' : ''}`}
      id="top"
      ref={outer}
      style={{ '--cards': CARD_COUNT, '--card-h': `${Math.round(cardHeight)}px` }}
    >
      <div className="v2-launch__stage">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-castlight" aria-hidden="true" />

        {/* Sahne: kalabalik ve roket. Yazidan sonra geliyor, boylece
            sabitleme kapaliyken (dar ekran) once yazi ve kartlar, sonra
            sahne okunuyor. */}
        <div className="v2-launch__scene">
          {/* Kalabalik sahnenin zemini: roketin olcegini veren ve bakisin
              nereye dondugunu soyleyen sey. */}
          <img
            className="v2-launch__crowd"
            src="/img/crowd.webp"
            alt=""
            aria-hidden="true"
            width="2400"
            height="455"
            decoding="async"
          />

          {/* Roket iki baski: rampadaki hali ve havalanmis hali. Sahne
              ilerledikce biri sonuyor, digeri yukari cikarak beliriyor.
              Onceki hali kodla cizilmis bir piksel roketti ve sayfadaki
              halftone baskilarin yaninda oyuncak gibi duruyordu. */}
          <img
            className="v2-launch__pad"
            src="/img/rocket-pad.webp"
            alt=""
            aria-hidden="true"
            width="900"
            height="1739"
            decoding="async"
            style={pinned ? { opacity: 1 - Math.min(1, lift * 2.4) } : undefined}
          />

          <img
            className="v2-launch__fly"
            src="/img/rocket-fly.webp"
            alt=""
            aria-hidden="true"
            width="900"
            height="1592"
            decoding="async"
            style={
              pinned
                ? {
                    opacity: Math.min(1, lift * 2.6),
                    transform: `translateY(${(1 - lift) * 24}%) scale(${0.92 + lift * 0.08})`,
                  }
                : { opacity: 0 }
            }
          />
        </div>

        <div className="v2-shell v2-launch__inner">
          {copy}

          {/* Sirada olan alanin adi kartin ustunde yaziyla duruyor: kart
              kendi basina hangi isten bahsettigini soylemekte zayif
              kaliyordu ve bolum basliksiz gorunuyordu. */}
          <span
            className="v2-launch__area"
            style={pinned ? { opacity: span(progress, 0.2, 0.3) } : undefined}
            aria-hidden="true"
          >
            {c.cards[HERO_CARDS[active].key].area}
          </span>

          {deck}
        </div>

        <div className="v2-launch__dots" role="tablist" aria-label={c.hero.areasLabel}>
          {HERO_CARDS.map((card, i) => (
            <button
              key={card.key}
              type="button"
              role="tab"
              className={`v2-deck__dot${i === active ? ' is-active' : ''}`}
              aria-selected={i === active}
              aria-label={c.hero.dotLabel(c.cards[card.key].area)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Sahnenin kaydirmayla ilerledigini bir yerde soylemek gerekiyor;
            aksi halde sayfa donmus gibi duruyor. */}
        <motion.span
          className="v2-launch__hint"
          animate={{ opacity: progress > 0.08 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {c.hero.hint}
        </motion.span>
      </div>
    </header>
  );
}
