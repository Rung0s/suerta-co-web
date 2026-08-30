import React from 'react';
import { Reveal, Item, TwoTone } from '../primitives';

/* Ic sayfalarin ortak basligi: kucuk etiket, iki tonlu baslik, bir
   paragraf ve istege bagli eylemler. Her sayfa kendi basligini yeniden
   yazsaydi ucuncu sayfada uc ayri hiyerarsi olurdu. */
export default function PageHead({ label, lead, tail, intro, children }) {
  return (
    <header className="v2-section v2-pagehead" id="top">
      <div className="v2-halo" aria-hidden="true" />
      <div className="v2-shell">
        <Reveal className="v2-pagehead__inner">
          {label && (
            <Item>
              <span className="v2-label">{label}</span>
            </Item>
          )}
          <Item as="h1" className="v2-display">
            <TwoTone lead={lead} tail={tail} />
          </Item>
          {intro && (
            <Item as="p" className="v2-lead">
              {intro}
            </Item>
          )}
          {children && <Item className="v2-pagehead__actions">{children}</Item>}
        </Reveal>
      </div>
    </header>
  );
}
