/* Markanin sabitleri ve kurumsal semasi.
   --------------------------------------------------------------------------
   Onceki tasarimin Seo bileseninin icinde duruyordu; o dosya kaldirilinca
   buraya tasindi. Burada bilesen yok, yalnizca veri: hem sayfa etiketlerini
   yazan bilesen hem de site haritasi bunu okuyor.

   `knowsAbout` alani markanin ne yaptigini yapay zeka tarayicilarina
   sayarak soyluyor. Eskiden yalnizca otel ve ilan isini sayiyordu; site
   alti alanda calisiyor ve liste de bunu yansitmali. */

export const SITE_URL = 'https://www.suerta.co';
/* Iki ad, iki is.
   --------------------------------------------------------------------------
   Isletmenin adi "Suerta Co." — Google Isletme Profili'nde de boyle kayitli.
   Sayfalarda ve baslik etiketlerinde `suerta.co` yaziliyor: nokta, adin
   tiklanabilir bir adres oldugunu okuyana bir bakista soyluyor.

   Sema tarafinda ikisi ayri alana giriyor. `name` ve `legalName`, Isletme
   Profili'ndeki kayitla birebir ayni olmak zorunda: arama motoru markayi
   dogrulanmis kayitla eslestirirken bu iki dizeye bakiyor ve aradaki her
   fark eslesmeyi zayiflatiyor. Sitenin kendi adi (`WebSite.name`, sayfa
   basliklarinin sonundaki ek, og:site_name) ise gorunen yazim olarak
   kaliyor. Kalan varyantlar `alternateName` icinde. */
export const LEGAL_NAME = 'Suerta Co.';
export const SITE_NAME = 'suerta.co';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const DESCRIPTION =
  'suerta.co, internet siteleri, e-ticaret, rezervasyon sistemleri, yapay zekâ otomasyonları ve SEO/GEO işleri yapan butik bir dijital stüdyo.';

/* Tip hem Organization hem ProfessionalService.
   --------------------------------------------------------------------------
   Onceden yalnizca Organization'di ve yorum "yerel isletme paketine
   sokulmadan da adres tasiyabiliyor" diyordu. Dogru, ama marka adi Google
   tarafindan "suerte"nin yazim hatasi olarak okunuyor ve arama motoru bir
   markayi en saglam sekilde dogrulanmis adres + telefondan taniyor.
   ProfessionalService, LocalBusiness'in alt tipi: tek bir @id altinda kalip
   yerel isletme anlamini da kazaniyoruz, iki ayri varlik uretmiyoruz. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: LEGAL_NAME,
  legalName: LEGAL_NAME,
  /* Marka sorgularinin (suerta.co / suerta co / suertaco) tek bir varliga
     cozulebilmesi icin butun yazim varyantlari. Sitenin gorunen yazimi olan
     `suerta.co` da burada: adin kendisi artik "Suerta Co.". */
  alternateName: ['suerta.co', 'suerta co', 'suerta co.', 'suertaco', 'Suerta'],
  url: SITE_URL,
  /* Google'in logo yonergesi SVG kabul etmiyor (JPG/PNG/GIF); SVG verilince
     logo sessizce yok sayiliyor. `npm run og` ile uretilen PNG. */
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-512.png`,
    width: 512,
    height: 512,
  },
  image: DEFAULT_IMAGE,
  slogan: 'Markanızın Şansı',
  email: 'suerta.info@gmail.com',
  telephone: '+905060693525',
  description: DESCRIPTION,
  /* Acik adres: Google Isletme Profili'ndeki kayitla birebir ayni yazilmali,
     ikisi arasindaki her fark dogrulamayi zayiflatiyor. */
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yenikent Mah. Rezzan Sk., Fulya Sitesi',
    addressLocality: 'Odunpazarı',
    addressRegion: 'Eskişehir',
    postalCode: '26050',
    addressCountry: 'TR',
  },
  areaServed: [
    { '@type': 'Country', name: 'Türkiye' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'İnternet Sitesi Tasarımı',
    'Website Design and Development',
    'E-Ticaret Kurulumu',
    'E-Commerce Development',
    'Shopify Kurulumu',
    'Yapay Zekâ Otomasyonu',
    'WhatsApp Chatbot',
    'Telegram Bot Geliştirme',
    'Otel Web Sitesi',
    'Otel Rezervasyon Sistemi',
    'Direct Booking Engine',
    'Airbnb ve Kısa Dönem Kiralama Sitesi',
    'Emlak İlan Sitesi',
    'Channel Manager Entegrasyonu',
    'Teknik SEO',
    'GEO (Generative Engine Optimization)',
    'Web Performans Optimizasyonu',
  ],
  /* Markanin baska yerlerdeki ayni kimligi. Google bir markayi ancak birden
     fazla bagimsiz kayitta ayni kimlikle gorurse ayri bir varlik sayiyor;
     tek bir Instagram baglantisi bunun icin ince bir kanit. Isletme Profili,
     LinkedIn ve YouTube adresleri acildikca buraya eklenecek — var olmayan
     bir adres yazmak olu baglanti ve yanlis eslesme demek, o yuzden liste
     yalnizca gercekten var olanlari tasiyor. */
  sameAs: [
    'https://instagram.com/suerta.co',
    /* Google Isletme Profili. Kisa baglanti (maps.app.goo.gl/...) yerine
       kaydin kalici kimligi (CID) yaziliyor: kisa baglantilar yonlendirme
       ve Google'in kendi kisaltma servisinin omruyle birlikte degisebilir,
       CID kaydin kendisine bagli. */
    'https://www.google.com/maps?cid=17354213420392860441',
  ],
};

/* Sitenin kendisi bir varlik olarak.
   --------------------------------------------------------------------------
   Organization "bu marka kim" diyor; WebSite "bu adres o markanin sitesi"
   diyor ve ikisini `publisher` uzerinden birbirine bagliyor. Bu bag olmadan
   arama motoru sayfalari markaya baglamak icin tahmin yuruyor.

   Icinde arama kutusu olan siteler buraya `potentialAction` da koyuyor;
   burada site ici arama yok, o yuzden uydurma bir uc nokta tarif etmiyoruz. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DESCRIPTION,
  inLanguage: ['tr-TR', 'en', 'it'],
  publisher: { '@id': `${SITE_URL}/#organization` },
};
