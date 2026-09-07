import HeroLaunch from './hero/HeroLaunch';
import V2Layout from './shell/V2Layout';
import { useCopy } from './i18n';
import Seo from './seo/Seo';
import WorkSection from './sections/WorkSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import PartnersSection from './sections/PartnersSection';
import ManifestoSection from './sections/ManifestoSection';
import ContactSection from './sections/ContactSection';
import CrewTable from './sections/CrewTable';
import FaqSection from './sections/FaqSection';

/* Anasayfa.
   --------------------------------------------------------------------------
   Burada yalnizca sira var. Her bolum kendi dosyasinda duruyor ve kendi
   metnini i18n'den kendisi okuyor; bu dosya hicbir veriyi asagi tasimiyor.

   Onceki hali dokuz yuz satirdi: kart bileseni, kaydiran bant kancasi,
   madeni para, ASCII portreler ve alti bolumun JSX'i tek dosyadaydi. Tek
   bir bolumu degistirmek dosyanin tamamini okumayi gerektiriyordu.

   Sira anlatinin kendisi: once yapilmis is (kanit), sonra ne yaptigimiz,
   sonra nasil calistigimiz, sonra baskalarinin ne dedigi, sonra kim
   oldugumuz ve en sonda cagri. Bolumleri yer degistirirken bunu bozmamak
   gerekiyor. */
export default function HomeV2() {
  const c = useCopy();

  return (
    <V2Layout>
      {/* WebSite semasi src/v2/seo/brand.js'te ve her sayfada bir kez
          yaziliyor; burada ikinci bir kopyasi duruyordu. */}
      <Seo title={c.meta.home.title} description={c.meta.home.description} />

      <HeroLaunch />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <PartnersSection />
      <ManifestoSection />

      {/* Masanin basindaki yedi gorev. */}
      <section className="v2-section v2-section--crew" id="ekip">
        <CrewTable />
      </section>

      {/* Kapanis + iletisim. */}
      <ContactSection />

      <FaqSection />
    </V2Layout>
  );
}
