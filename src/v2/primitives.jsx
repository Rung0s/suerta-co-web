import React from 'react';
import { motion } from 'framer-motion';

/* Tek reveal primitifi. Sitede uc ayri reveal sistemi vardi (CSS + iki farkli
   framer kullanimi, uc farkli sure); hepsi bunun yerine gecer.

   Bu dosya HomeV2'den cikarildi: ayni primitifleri /v2 altindaki diger
   sayfalar da kullaniyor, iki kopya iki farkli sure demek olurdu. */
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

export function Reveal({ children, className, as = 'div', style, id }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      id={id}
      className={className}
      style={style}
      variants={revealGroup}
      initial="hidden"
      whileInView="show"
      /* 'some': ogenin ilk pikseli goruneni yeter. Oran verilince (0.25)
         ekrandan uzun bloklar — mobilde alti kartlik izgara, uzun listeler —
         hicbir zaman esigi gecmiyor ve gorunmez kaliyordu. Alt kenardan
         biraz iceri cekiliyor ki blok tam ekrana girerken baslamasin. */
      viewport={{ once: true, amount: 'some', margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Component>
  );
}

export function Item({ children, className, as = 'div', style, id }) {
  const Component = motion[as] || motion.div;
  return (
    <Component id={id} className={className} style={style} variants={revealItem}>
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
