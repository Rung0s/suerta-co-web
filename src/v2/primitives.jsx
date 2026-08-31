import React, { useLayoutEffect, useRef, useState } from 'react';

/* Tek reveal primitifi. Sitede uc ayri reveal sistemi vardi (CSS + iki farkli
   framer kullanimi, uc farkli sure); hepsi bunun yerine gecer.

   Bu dosya HomeV2'den cikarildi: ayni primitifleri /v2 altindaki diger
   sayfalar da kullaniyor, iki kopya iki farkli sure demek olurdu.

   Once framer-motion ile yaziliydi. Yaptigi is iki ozellikti — opaklik ve
   dikey kayma — ama paket her sayfada ~40KB (gzip) yer tutuyordu. Ayni
   davranis burada bir gozlemci ve bir gecisle duruyor; sureler, egri ve
   kademe araligi eskisiyle ayni (450ms, cubic-bezier(.16,1,.3,1), 60ms).
   Gorunum kurallari v2.css'te "Reveal" bolumunde. */

/* Gozlemci grubun ilk pikseli goruneni yeter. Oran verilince (0.25) ekrandan
   uzun bloklar — mobilde alti kartlik izgara, uzun listeler — hicbir zaman
   esigi gecmiyor ve gorunmez kaliyordu. Alt kenardan biraz iceri cekiliyor ki
   blok tam ekrana girerken baslamasin. */
const MARGIN = 0.1;
const VIEWPORT = { rootMargin: `0px 0px -${MARGIN * 100}% 0px`, threshold: 0 };

/* Gizleme yalnizca ekranin altinda kalan bloklara uygulaniyor: acilista
   zaten gorunen bir bolumu once gizleyip sonra acmak, yavas baglantida bos
   bir sayfa demek olurdu. */
function useReveal() {
  const ref = useRef(null);
  /* '' hicbir sey yapilmadi (icerik gorunur), 'armed' gizli ve beklemede,
     'revealed' girdi. */
  const [state, setState] = useState('');

  /* Boyamadan once: gizlenecekse gizlemesi bu tarafta bitsin, aksi halde
     bir kare gorunup kaybolan icerik olusur.
     Bir kez calisiyor. Duruma bagli calissaydi 'armed' ile gelen ikinci
     tur, ilk turun temizligini isletip gozlemciyi daha ilk kesisimden once
     kapatirdi. */
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    /* Gozlemci yoksa gizlemenin anlami yok: icerik oldugu gibi kaliyor. */
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const box = node.getBoundingClientRect();
    const limit = window.innerHeight * (1 - MARGIN);
    if (box.top < limit && box.bottom > 0) {
      /* Zaten ekranda: hic gizlenmiyor, dogrudan yerinde duruyor. */
      return undefined;
    }

    setState('armed');

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setState('revealed');
        observer.disconnect();
      }
    }, VIEWPORT);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, state];
}

function join(...values) {
  return values.filter(Boolean).join(' ');
}

export function Reveal({ children, className, as: Component = 'div', style, id }) {
  const [ref, state] = useReveal();

  return (
    <Component
      ref={ref}
      id={id}
      className={join(
        'v2-reveal',
        state && 'is-armed',
        state === 'revealed' && 'is-revealed',
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export function Item({ children, className, as: Component = 'div', style, id }) {
  return (
    <Component id={id} className={join('v2-reveal__item', className)} style={style}>
      {children}
    </Component>
  );
}

/* Cumlenin ilk yarisi soluk, vurgu tam kontrast. Referans sistemin imzasi. */
export function TwoTone({ lead, tail }) {
  return (
    <>
      <span className="v2-tone-lead">{lead}</span> {tail}
    </>
  );
}
