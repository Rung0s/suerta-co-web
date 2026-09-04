import React, { useEffect, useRef, useState } from 'react';
import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy } from '../i18n';

/* Masanin basindaki yedi gorev.
   --------------------------------------------------------------------------
   Yukaridan bakilan yuvarlak masa; cevresinde yedi koltuk. Masa kaydirmayla
   doner: her kaydirma dilimi masayi bir koltuk cevirir ve ibrenin altina
   gelen koltuk gorevini soyler. Rulet gibi: nerede duracagi kaydiran kisiye
   bagli, ama her koltukta bir gorev var.

   Kaydirma ele gecirilmiyor. Sayfa normal akar; biz yalnizca bolum ekranda
   iken biriken kaydirma miktarini sayip esik asilinca bir koltuk ilerliyoruz.
   Boylece masa hic "takilmiyor", okuyucu istedigi an gecip gidebiliyor.

   Figurler dort ayri kusbakisi cizim; yedi koltuga dagitiliyor ve her biri
   masanin merkezine bakacak sekilde donduruluyor. Ayni figurun iki kez
   gorunmesi sorun degil: halftone doku zaten kisiyi degil koltugu anlatiyor. */
const SEATS = 7;
const STEP = 360 / SEATS;
const SPRITES = [1, 2, 4, 2, 1, 4, 2];
/* Bir koltuk icin gereken kaydirma (px). Fare tekeri tik basina ~100px;
   bir tik = bir koltuk hissi icin hafif ustunde. */
const THRESHOLD = 110;

export default function CrewTable({ compact = false }) {
  const c = useCopy().crew;
  const [seat, setSeat] = useState(0);
  /* Toplam donus koltuk cinsinden; koltuk numarasindan ayri tutuluyor ki masa
     hep ayni yonde donsun, 6'dan 0'a geri sarmasin. */
  const [turns, setTurns] = useState(0);
  const holder = useRef(null);
  const acc = useRef(0);
  const inView = useRef(false);
  const lastY = useRef(0);

  const advance = (dir) => {
    setTurns((t) => t + dir);
    setSeat((s) => (s + dir + SEATS) % SEATS);
  };

  useEffect(() => {
    const node = holder.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        acc.current = 0;
        lastY.current = window.scrollY;
      },
      { threshold: 0.45 }
    );
    observer.observe(node);

    const onScroll = () => {
      if (!inView.current) return;
      const y = window.scrollY;
      acc.current += y - lastY.current;
      lastY.current = y;
      while (Math.abs(acc.current) >= THRESHOLD) {
        const dir = acc.current > 0 ? 1 : -1;
        acc.current -= dir * THRESHOLD;
        advance(dir);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const current = c.seats[seat];
  /* Ibre saat 12'de. Koltuk i masa uzerinde i*STEP derecede duruyor; onu
     ibreye getirmek icin masa -i*STEP donmeli. */
  const angle = -turns * STEP;

  return (
    <div className={`v2-crew${compact ? ' v2-crew--compact' : ''}`} ref={holder}>
      <Reveal className="v2-crew__grid">
        {!compact && (
          <Item className="v2-crew__head">
            <h2 className="v2-title">
              <TwoTone lead={c.lead} tail={c.tail} />
            </h2>
            <p className="v2-lead">{c.intro}</p>
          </Item>
        )}

        <Item className="v2-crew__stage">
          <span className="v2-crew__needle" aria-hidden="true" />
          <div
            className="v2-crew__table"
            style={{ transform: `rotate(${angle}deg)` }}
            aria-hidden="true"
          >
            <span className="v2-crew__top" />
            {c.seats.map((s, i) => (
              <span
                key={s.role}
                className={`v2-crew__seat${i === seat ? ' is-live' : ''}`}
                style={{ '--a': `${i * STEP}deg` }}
              >
                <img
                  className="v2-crew__figure"
                  src={`/img/crew/seat-${SPRITES[i]}.webp`}
                  alt=""
                  width="240"
                  height="240"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}
          </div>
          <span className="v2-crew__hint">{c.hint}</span>
        </Item>

        <Item className="v2-crew__card" aria-live="polite">
          <span className="v2-crew__num">{c.seatLabel(seat + 1)}</span>
          <span className="v2-crew__role" key={`r${seat}`}>
            {current.role}
          </span>
          <span className="v2-crew__mission" key={`m${seat}`}>
            {current.mission}
          </span>
          <span className="v2-crew__dots" aria-hidden="true">
            {c.seats.map((s, i) => (
              <i key={s.role} className={i === seat ? 'is-on' : ''} />
            ))}
          </span>
          <span className="v2-crew__nav">
            <button type="button" className="v2-arrow" onClick={() => advance(-1)} aria-label={c.prev}>
              ←
            </button>
            <button type="button" className="v2-arrow" onClick={() => advance(1)} aria-label={c.next}>
              →
            </button>
          </span>
        </Item>
      </Reveal>
    </div>
  );
}
