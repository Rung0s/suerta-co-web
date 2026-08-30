import React from 'react';
import V2Layout from '../shell/V2Layout';
import PageHead from './PageHead';
import ContactSection from '../sections/ContactSection';
import { useCopy } from '../i18n';
import Seo from '../seo/Seo';

/* Iletisim sayfasi.
   Anasayfadaki iletisim bolumunun aynisi — iki ayri form iki ayri metin,
   iki ayri bakim demek olurdu. Sayfaya yalnizca kendi basligi ekleniyor. */
export default function ContactPage() {
  const c = useCopy();

  return (
    <V2Layout>
      <Seo title={c.meta.contact.title} description={c.meta.contact.description} />

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
