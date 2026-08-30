import React from 'react';
import V2Layout from '../shell/V2Layout';
import PageHead from './PageHead';
import ContactSection from '../sections/ContactSection';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb } from '../seo/Seo';

/* Iletisim sayfasi.
   Anasayfadaki iletisim bolumunun aynisi — iki ayri form iki ayri metin,
   iki ayri bakim demek olurdu. Sayfaya yalnizca kendi basligi ekleniyor. */
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

      <PageHead
        label={c.nav.links.find((link) => link.key === 'contact').label}
        lead={c.pages.contact.lead}
        tail={c.pages.contact.tail}
        intro={c.pages.contact.intro}
      />
      <ContactSection />
    </V2Layout>
  );
}
