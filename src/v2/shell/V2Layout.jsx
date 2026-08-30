import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DotCursor from './DotCursor';
import V2Nav from './V2Nav';
import V2Footer from './V2Footer';
import '../surface.css';
import '../work.css';
import '../partners.css';
import '../manifesto.css';
import '../closing.css';
import '../contact.css';
import '../cursor.css';
import '../hero.css';
/* v2.css en son: digerlerindeki kurallari kasten eziyor. */
import '../v2.css';

/* /v2 altindaki her sayfanin kabugu: imleç, menu, alt bilgi ve tum yuzey
   katmani tek yerde. Sayfalar yalnizca kendi bolumlerini yaziyor.

   `footer={false}` anasayfa icin: orada kapanis bandi iletisim bolumunun
   hemen ardindan geliyor ve sayfanin kendi akisinin parcasi. */
export default function V2Layout({ children, footer = true }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="v2-root">
      <DotCursor />
      <V2Nav />
      {children}
      {footer && <V2Footer />}
    </div>
  );
}
