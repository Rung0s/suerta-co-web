import React from 'react';
import V2Layout from '../shell/V2Layout';
import ContactSection from '../sections/ContactSection';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb } from '../seo/Seo';

/* Iletisim sayfasi.
   Anasayfadaki iletisim bolumunun aynisi — iki ayri form iki ayri metin,
   iki ayri bakim demek olurdu.

   Ustune bir de sayfa basligi konuyordu ve sayfa iki kez kendini takdim
   ediyordu: once "Konusalim." + bir paragraf, hemen altinda "Ne insa
   ettiginizi anlatin" + bir paragraf daha. Form ancak ondan sonra
   basliyordu, yani en yuksek niyetli sayfada iki bucuk ekran giris.
   Baslik kaldirildi; bolumun kendi basligi zaten var. */
export default function ContactPage() {
  const c = useCopy();
  const { lang } = useLang();

  return (
    <V2Layout>
      <Seo
        title={c.meta.contact.title}
        description={c.meta.contact.description}
        jsonLd={breadcrumb([
          { name: c.nav.home, path: pathFor('home', lang) },
          { name: c.nav.links.find((link) => link.key === 'contact').label, path: pathFor('contact', lang) },
        ])}
      />

      <ContactSection as="h1" />
    </V2Layout>
  );
}
