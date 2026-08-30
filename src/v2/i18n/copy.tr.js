/* Turkce metinler — tek dogru kaynak.
   --------------------------------------------------------------------------
   Bilesenlerin icine gomulu metin birakmiyoruz: iki dil olunca gomulu her
   cumle bir daha bulunmasi gereken bir yer demek. Bilesenler yalnizca
   duzeni ve davranisi tasiyor, cumleyi buradan okuyor.

   Ingilizce karsiligi copy.en.js'te ayni anahtarlarla duruyor. */

export const tr = {
  langName: 'Türkçe',
  switchTo: 'English',

  nav: {
    home: 'Ana sayfa',
    aria: 'Ana menü',
    open: 'Menüyü aç',
    close: 'Menüyü kapat',
    cta: 'Görüşme ayarla',
    links: [
      { key: 'work', label: 'İşler', hash: '#isler' },
      { key: 'services', label: 'Hizmetler', hash: '#hizmetler' },
      { key: 'blog', label: 'Blog', hash: null },
      { key: 'about', label: 'Hakkımızda', hash: '#hakkimizda' },
      { key: 'contact', label: 'İletişim', hash: '#iletisim' },
    ],
  },

  hero: {
    lead: 'Ziyaretçiyi müşteriye çeviren',
    tail: 'premium web siteleri.',
    ctaPrimary: 'Görüşme ayarla',
    ctaSecondary: 'İşleri gör',
    hint: 'KAYDIR',
    areasLabel: 'Çalışma alanları',
    dotLabel: (area) => `${area} kartına git`,
  },

  cards: {
    site: {
      area: 'İnternet siteleri',
      screen: 'Canlı trafik',
      badge: 'mobil öncelikli',
      now: 'şu an sitede',
      count: '38',
      devices: [
        { label: 'Mobil', value: 68 },
        { label: 'Masaüstü', value: 24 },
        { label: 'Tablet', value: 8 },
      ],
      read: 'Web sitesi maliyeti 2026',
    },
    eticaret: {
      area: 'E-ticaret',
      screen: 'Sepet',
      badge: 'tek akış',
      items: [
        { name: 'Tahıllı Köpek Maması 12 kg', price: '₺1.240', tone: 'a' },
        { name: 'Otomatik Su Kabı', price: '₺600', tone: 'b' },
      ],
      shippingLabel: 'Kargo',
      shippingValue: 'Bedava',
      totalLabel: 'toplam',
      total: '₺1.840',
      done: 'Ödeme tamamlandı ✓',
      read: 'Shopify mı, WooCommerce mi?',
    },
    bot: {
      area: 'Yapay zekâ otomasyonları',
      screen: 'WhatsApp',
      badge: 'otomatik yanıt',
      chat: [
        { from: 'them', text: 'Merhaba, 14–17 Ağustos boş oda var mı?' },
        { from: 'us', text: '14–17 Ağustos deniz manzaralı deluxe müsait. 3 gece ₺12.600.' },
        { from: 'them', text: 'Kahvaltı dahil mi?' },
      ],
      avgLabel: 'ortalama yanıt',
      avgValue: '0,4 sn',
      read: 'WhatsApp chatbot nasıl kurulur?',
    },
    otel: {
      area: 'Otel & rezervasyon',
      screen: 'Rezervasyon',
      badge: 'komisyon %0',
      room: 'Deniz Manzaralı Deluxe',
      meta: '2 misafir · kahvaltı dahil',
      calHead: 'Ağustos',
      staySummary: '3 gece · 14–17 Ağu',
      price: '₺12.600',
      cta: 'Rezervasyonu tamamla',
      read: 'Rezervasyonda hız ve dönüşüm',
    },
    kiralama: {
      area: 'Emlak & kiralama',
      screen: 'İlan takvimi',
      badge: 'takvim senkron',
      flat: 'Deniz Manzaralı 2+1',
      meta: 'Bodrum · 4 misafir',
      channels: [
        { name: 'Airbnb', state: 'Dolu', fee: 'komisyon %15', tone: 'off' },
        { name: 'Booking', state: 'Dolu', fee: 'komisyon %18', tone: 'off' },
        { name: 'Kendi siteniz', state: 'Müsait', fee: 'komisyon yok', tone: 'on' },
      ],
      perNight: 'gecelik',
      price: '₺4.200',
      read: 'İlan fotoğrafı nasıl çekilir?',
    },
    gorunurluk: {
      area: 'Görünürlük & büyüme',
      screen: 'Arama sonucu',
      badge: 'SEO + GEO',
      query: 'otel web sitesi kurulumu',
      results: [
        { rank: '1', label: 'suerta.co', highlight: true },
        { rank: '2', label: 'rakip ajans' },
        { rank: '3', label: 'dizin sitesi' },
      ],
      aiLabel: 'Yapay zekâ yanıtı',
      aiBefore: '“…otel siteleri için ',
      aiAfter: ' gibi ajanslar…”',
      read: 'GEO: yapay zekâ sizi önerirse',
    },
  },

  work: {
    lead: 'Seçili',
    tail: 'işler.',
    detail: 'İşi incele →',
    visit: 'Siteyi gör ↗',
    shot: (name) => `${name} projesinden ekran görüntüsü`,
    didLabel: 'Neler yaptık',
    all: 'Tüm işler',
    results: {
      1: 'Doğrudan rezervasyon %40 arttı',
      2: 'Kontenjan takibi 7/24 otomatik',
      3: 'Sıfırdan e-ticaret, tek akışta ödeme',
      4: '1.000+ konu aranabilir arşive dönüştü',
    },
    kpis: [
      { unit: '%', value: '40', label: 'Emsa Otel’de doğrudan rezervasyon artışı' },
      { value: '1.000+', label: 'Argüman Fabrikası’nda aranabilir arşiv kaydı' },
      { value: '20+', label: 'Farklı sektörde teslim edilen proje', laurel: true },
    ],
    films: [
      {
        id: 'film-kiralik',
        name: 'Kiralık Daire Tanıtımı',
        desc: 'Roma · Tanıtım Filmi & Görsel İçerik',
        did: ['Mekân Çekimi', 'Kurgu ve Renk', 'Web İçin Optimizasyon', 'Listing Entegrasyonu'],
      },
      {
        id: 'film-araz',
        name: 'Araz Wooden Concept',
        desc: 'Adrasan · Drone Çekimi & Tesis Tanıtımı',
        did: ['Drone Çekimi', 'Ünite Çekimleri', 'Kurgu', 'Web İçin Optimizasyon'],
      },
    ],
  },

  services: {
    headLead: (count) => `${count} alanda`,
    headTail: 'çalışıyoruz.',
    annotation: 'hepsinde aynı ölçü: ziyaretçi müşteriye dönüyor mu',
    more: 'Hizmetlerin ayrıntısı',
    audienceLabel: 'Kimin için',
    deliverablesLabel: 'Teslim edilenler',
    proofLabel: 'Bu alanda yaptığımız iş',
    items: [
      {
        slug: 'internet-siteleri',
        proof: [4],
        title: 'İnternet siteleri',
        desc: 'Kurumsal site, portfolyo ve tanıtım siteleri. Hızlı, mobil öncelikli, çok dilli; içeriği kendiniz yönetirsiniz.',
        tags: ['Kurumsal & portfolyo', 'Mobil öncelikli', 'Çok dilli', 'İçerik paneli'],
        audience: 'Kurumsal markalar, ajanslar ve tek kişilik stüdyolar.',
        deliverables: [
          'Tasarım sistemi ve sayfa düzenleri',
          'İçerik paneli',
          'Çok dilli yapı',
          'Performans ve erişilebilirlik geçişi',
        ],
      },
      {
        slug: 'e-ticaret',
        proof: [3],
        title: 'E-ticaret',
        desc: 'Shopify ya da özel altyapı. Sepetten ödemeye tek akış, ürün ve stok yönetimi sizde kalır.',
        tags: ['Shopify kurulumu', 'Checkout akışı', 'Ürün & stok yönetimi', 'Güvenli ödeme'],
        audience: 'Kendi ürününü satan markalar ve mağazalar.',
        deliverables: [
          'Mağaza kurulumu ve tema',
          'Ürün, varyant ve stok yapısı',
          'Ödeme ve kargo entegrasyonu',
          'Sepet ve checkout akışı',
        ],
      },
      {
        slug: 'yapay-zeka-otomasyon',
        proof: [2],
        title: 'Yapay zekâ otomasyonları',
        desc: 'Tekrar eden işi yazılıma devrediyoruz: soruları yanıtlayan chatbotlar, fırsat yakalayan takip botları, form ve talep akışlarının otomasyonu.',
        tags: ['WhatsApp chatbot', 'Telegram takip botu', 'Talep otomasyonu', 'Panel entegrasyonu'],
        audience: 'Aynı soruyu günde onlarca kez yanıtlayan ekipler.',
        deliverables: [
          'Chatbot kurulumu ve içerik eğitimi',
          'Takip / bildirim botu',
          'Form ve talep otomasyonu',
          'Mevcut panele entegrasyon',
        ],
      },
      {
        slug: 'otel-rezervasyon',
        proof: [1],
        title: 'Otel & rezervasyon sistemleri',
        desc: 'Misafir OTA üzerinden değil, doğrudan sizden rezervasyon yapar. Oda envanteri, sezonluk fiyat ve müsaitlik tek panelden yönetilir.',
        tags: ['Komisyonsuz rezervasyon', 'Channel manager / PMS', 'Sezonluk fiyatlama', 'Online ödeme'],
        audience: 'Butik otel, apart, bungalov ve tesis işletmeleri.',
        deliverables: [
          'Oda ve müsaitlik paneli',
          'Rezervasyon motoru + online ödeme',
          'Channel manager / PMS senkronu',
          'Çok dilli misafir akışı',
        ],
      },
      {
        slug: 'emlak-kiralama',
        proof: [],
        title: 'Emlak & kiralama',
        desc: 'Portföy, günlük kiralık ve Airbnb tek yerde. Airbnb ve Booking takvimleriyle senkron çalışır; aynı daireyi komisyon ödemeden kendi sitenizden de doldurursunuz.',
        tags: ['Portföy paneli', 'Takvim senkronu (iCal)', 'Filtreli arama', 'Harita görünümü'],
        audience: 'Emlak ofisleri, günlük kiralık ve Airbnb yöneticileri.',
        deliverables: [
          'İlan ve portföy paneli',
          'iCal takvim senkronu',
          'Filtreli arama + harita',
          'Talep ve görüşme formu',
        ],
      },
      {
        slug: 'gorunurluk-buyume',
        proof: [1],
        title: 'Görünürlük & büyüme',
        desc: 'Site kurulup bırakılmıyor. Arama motorlarında ve yapay zekâ yanıtlarında bulunur olmanız için SEO, GEO ve reklam tarafını da yürütüyoruz.',
        tags: ['SEO', 'GEO (yapay zekâ arama)', 'Google & Meta Ads', 'İşletme profili'],
        audience: 'Sitesi olan ama aranınca bulunmayan markalar.',
        deliverables: [
          'Teknik SEO ve içerik düzeni',
          'Yapay zekâ aramalarına hazırlık (GEO)',
          'Google & Meta reklam kurulumu',
          'Google İşletme Profili optimizasyonu',
        ],
      },
    ],
  },

  process: {
    lead: 'İlk görüşmeden',
    tail: 'yayına kadar.',
    steps: [
      { num: '01', title: 'Keşif', desc: '15 dakikalık görüşme. Ne sattığınızı, kime sattığınızı ve neyin eksik olduğunu netleştiririz.' },
      { num: '02', title: 'Kapsam', desc: 'Sabit fiyat, sabit kapsam ve teslim tarihi. Sürpriz kalem yok.' },
      { num: '03', title: 'Kurulum', desc: 'Tasarım, geliştirme, gerekli entegrasyonlar. Ara teslimlerle ilerler.' },
      { num: '04', title: 'Devir', desc: 'Yayına alma, panel eğitimi ve 30 gün destek. Site sizde kalır, bize bağımlı değilsiniz.' },
    ],
  },

  faq: {
    lead: 'Görüşmeden önce',
    tail: 'merak edilenler.',
    items: [
      {
        q: 'Ne kadar sürede teslim ediyorsunuz?',
        a: 'Kapsama bağlı. Tanıtım sitesi ve portfolyo için 2–3 hafta; e-ticaret, rezervasyon motoru veya entegrasyon gerektiren işler 4–6 hafta. Tarihi kapsam aşamasında yazılı veriyoruz.',
      },
      {
        q: 'Siteyi kendim güncelleyebilir miyim?',
        a: 'Evet. Ürün, oda, ilan, fiyat, görsel ve içerik girişini yapabileceğiniz bir panel teslim ediyoruz. Devirde eğitim veriyoruz. Küçük değişiklik için bize dönmeniz gerekmiyor.',
      },
      {
        q: 'Hazır tema mı kuruyorsunuz?',
        a: 'Hayır. Tasarım da kod da işe göre yazılıyor. Shopify gibi bir altyapı kullandığımızda bile tema sizin markanız için kuruluyor; hazır şablonun üzerine logo koymuyoruz.',
      },
      {
        q: 'Yapay zekâ otomasyonu benim işime yarar mı?',
        a: 'Aynı soruyu günde onlarca kez yanıtlıyorsanız yarar. WhatsApp chatbotu sık soruları yanıtlar, çözemediğini size devreder; takip botları ise elle izlenemeyecek şeyleri (kontenjan, fiyat, stok) izleyip haber verir.',
      },
      {
        q: 'OTA komisyonunu gerçekten düşürebilir miyim?',
        a: 'Tamamen bitirmez ama payı ciddi biçimde kaydırır. Booking veya Airbnb üzerinden gelen misafir komisyon götürür; kendi sitenizden gelen götürmez. Emsa Otel’de doğrudan rezervasyon oranı %40 arttı. Hedef platformları bırakmak değil, ikinci ve üçüncü kez gelen misafiri doğrudan kendinize almak.',
      },
      {
        q: 'Çok dilli ve çok para birimli olur mu?',
        a: 'Olur. Türkçe–İngilizce standart; talep halinde Almanca, Rusça ve Arapça ekliyoruz. Fiyatlar ziyaretçinin para biriminde gösterilebilir.',
      },
    ],
  },

  partners: {
    lead: 'Çalıştığımız',
    tail: 'markalar ne diyor.',
    prev: 'Önceki referans',
    next: 'Sonraki referans',
    openBrand: 'Ayrılmış',
    openText: 'Bu alan sizinle kuracağımız iş için ayrıldı.',
    openCta: 'Görüşme ayarla',
    quotes: [
      {
        brand: 'Emsa Otel',
        role: 'Yönetim Kurulu',
        text: 'Otelimizin dijital dönüşümünde suerta.co ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı.',
      },
      {
        brand: 'Rönesans Edu',
        role: 'Kurucu Ortak',
        text: 'Sınav kontenjanı takibi elle imkânsızdı. Kurdukları Telegram botu kontenjan açıldığı an haber veriyor; öğrencilerimiz artık fırsat kaçırmıyor.',
      },
      {
        brand: 'Pawsec Shop',
        role: 'Marka Sahibi',
        text: 'Sıfırdan e-ticaret kurduk. Sepetten ödemeye kadar tek akışta ilerliyor ve ürünlerimi kendim güncelliyorum — her değişiklik için kimseye dönmem gerekmiyor.',
      },
      {
        brand: 'Argüman Fabrikası',
        role: 'Kurucu',
        text: 'Binden fazla münazara konusunu aranabilir bir arşive çevirdiler. Reklam ve SEO tarafını da yürüttükleri için içerik gerçekten karşılığını buldu.',
      },
    ],
  },

  manifesto: {
    line: 'Biz suerta.co’yuz. Otel, kiralama, eğitim ve e-ticaret markalarına ziyaretçiyi müşteriye çeviren siteler kuruyoruz.',
    coinFlip: 'Parayı çevir',
    coinAgain: 'Bir daha bas',
    noteIdle: 'bu paraya dokunma',
    noteAgain: 'bir daha bas',
    heads: 'Tura',
    tails: 'Yazı',
    resultSuffix: 'geldi.',
    cardLine: 'İşini şansa bırakma.',
    cardTag: 'markanızın şansı',
    cardCta: 'Görüşme ayarla',
  },

  contact: {
    heading: 'Ne inşa ettiğinizi anlatın',
    vision: 'Bir markanın internette en çok çalışan şeyi kendi sitesidir: aracıya komisyon ödemez, mesai bitince kapanmaz, gelen her ziyaretçiyi hatırlar. Sizinkini birlikte kuralım.',
    status: 'Bu hafta yanıt süresi: birkaç saat',
    sentTitle: 'WhatsApp’ta açıldı.',
    sentNote: 'Pencere açılmadıysa engellenmiş olabilir; aşağıdaki kanallardan doğrudan yazabilirsiniz.',
    reopen: 'Formu tekrar aç',
    nameLabel: 'Ad',
    namePlaceholder: 'Adınız',
    brandLabel: 'Marka',
    brandPlaceholder: 'İşletme veya marka adı',
    reachLabel: 'Telefon veya e-posta',
    reachPlaceholder: 'Size nereden dönelim?',
    typeLabel: 'Proje tipi',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Ne yapmak istediğinizi birkaç cümleyle anlatın.',
    formNote: 'Form WhatsApp’ta açılır; hiçbir bilgi burada saklanmaz.',
    submit: 'Gönder',
    types: [
      'İnternet sitesi',
      'E-ticaret',
      'Yapay zekâ otomasyonu',
      'Otel & rezervasyon',
      'Emlak & kiralama',
      'Görünürlük & büyüme',
      'Henüz emin değilim',
    ],
    mailLabel: 'E-posta',
    replyTitle: 'Yanıt süresi',
    replyText: 'Hafta içi mesajlara aynı gün, hafta sonu ertesi iş günü dönüyoruz. Üç kişilik bir ekibiz; size yazan da işi yapan kişi oluyor.',
    whatsappMeta: 'En hızlı yol — genelde birkaç saat',
    mailMeta: 'Ayrıntılı brief için',
    instagramMeta: 'Yaptığımız işler',
    greeting: 'Merhaba suerta.co,',
    fieldName: 'Ad',
    fieldBrand: 'Marka',
    fieldReach: 'İletişim',
    fieldType: 'Proje tipi',
  },

  footer: {
    menu: 'Menü',
    social: 'Sosyal',
    contact: 'İletişim',
    location: 'Eskişehir, Türkiye (Global)',
    copy: (year) =>
      `© ${year} suerta.co — dijital ajans. İnternet siteleri, e-ticaret, rezervasyon sistemleri ve yapay zekâ otomasyonları. Tüm hakları saklıdır.`,
    toTop: 'Yukarı dön ↑',
  },

  pages: {
    services: {
      label: 'Hizmetler',
      lead: 'Altı alanda',
      tail: 'çalışıyoruz.',
      intro: 'Hepsi tek bir işe çıkıyor: ziyaretçiyi müşteriye çevirmek. Aşağıda her alanın kime uygun olduğu, ne teslim ettiğimiz ve o alanda yaptığımız iş yazıyor.',
      processLead: 'Hangi alan olursa olsun',
      processTail: 'süreç aynı.',
      ctaLead: 'Hangi alanda olduğunuzu',
      ctaTail: '15 dakikada netleştirelim.',
      ctaText: 'Ne sattığınızı, kime sattığınızı ve neyin eksik olduğunu konuşuyoruz. Görüşme ücretsiz, kapsam ve fiyat sonrasında yazılı geliyor.',
      proofLabel: 'Bu alanda',
    },
    work: {
      lead: 'Teslim ettiğimiz',
      tail: 'işler.',
      intro: 'Dört müşteri projesi ve iki tanıtım filmi. Her birinde ne yaptığımız ve ne çıktığı yazıyor.',
      detailBack: '← Tüm işler',
      detailVisit: 'Siteyi gör ↗',
      detailFaq: 'Bu projede sık sorulanlar',
      notFound: 'Bu iş bulunamadı.',
    },
    blog: {
      lead: 'Yazılar ve',
      tail: 'rehberler.',
      intro: 'Site maliyetinden rezervasyon hızına, chatbot kurulumundan yapay zekâ aramalarında görünürlüğe kadar yaptığımız işin yazıya dökülmüş hali.',
      allTags: 'Tümü',
      readMore: 'Yazıyı oku',
      back: '← Tüm yazılar',
      related: 'Bunlar da ilgini çekebilir',
      minutes: 'dk okuma',
      untranslated: 'Bu metnin İngilizcesi henüz hazır değil; aşağıdaki yazı Türkçe.',
      notFound: 'Bu yazı bulunamadı.',
    },
    about: {
      lead: 'Üç kişilik ekip,',
      tail: 'tek masa.',
      intro: 'suerta co. Eskişehir merkezli bir dijital stüdyo. Tasarım, yazılım ve büyüme tarafını aynı masada yürütüyoruz; iş ajanstan ajansa devredilmiyor.',
      valuesTitle: 'Nasıl çalışıyoruz',
      values: [
        {
          title: 'Sabit kapsam, sabit fiyat',
          desc: 'Kapsam yazılı, tarih yazılı. İş büyürse konuşuruz; sessizce fatura büyümez.',
        },
        {
          title: 'Site sizde kalır',
          desc: 'Kod, panel ve alan adı sizin. Küçük bir değişiklik için bize dönmek zorunda değilsiniz.',
        },
        {
          title: 'Ölçülen sonuç',
          desc: 'Teslim ettiğimiz her işin bir çıktısı var: doğrudan rezervasyon, otomatik yanıt, aranabilir arşiv.',
        },
        {
          title: 'Aracıyı aradan çıkarmak',
          desc: 'Komisyon alan platform, sizin yerinize konuşan aracı, her değişiklik için beklenen ajans — hepsi aynı sorunun farklı hâli.',
        },
      ],
      team: [
        { role: 'Ön yüz / Yapay zekâ mimarisi', desc: 'Arayüzün her pikseli ve yapay zekâ destekli kod mimarisi.' },
        { role: 'Arka uç / Veritabanı', desc: 'Ölçeklenen sistem mimarisi ve veri akışı.' },
        { role: 'Ürün / Tasarım', desc: 'Kullanıcı deneyimi, yaratıcı strateji ve estetik yön.' },
      ],
      teamTitle: 'Ekip',
    },
    contact: {
      lead: 'Konuşalım.',
      tail: '',
      intro: 'Projenizi anlatın; kapsamı, süreyi ve bütçeyi ilk görüşmede netleştirelim.',
    },
    notFound: {
      title: 'Bu sayfa yok.',
      intro: 'Adres yanlış olabilir ya da sayfa taşınmış olabilir.',
      cta: 'Ana sayfaya dön',
    },
  },

  meta: {
    home: {
      title: 'İnternet Sitesi & E-Ticaret Ajansı — Eskişehir | suerta co.',
      description:
        'Eskişehir merkezli dijital stüdyo: internet siteleri, e-ticaret, yapay zekâ otomasyonları ve rezervasyon sistemleri. Sabit kapsam, sabit fiyat.',
    },
    services: {
      title: 'Hizmetler: Web Sitesi, E-Ticaret & Otomasyon',
      description:
        'Altı alan; her biri kime uygun ve ne teslim ediliyor: internet siteleri, e-ticaret, yapay zekâ otomasyonları, otel rezervasyonu, emlak, SEO ve GEO.',
    },
    work: {
      title: 'Referanslar: Teslim Ettiğimiz Projeler',
      description:
        'Emsa Otel’de doğrudan rezervasyon %40 arttı, Rönesans Edu’da kontenjan takibi otomatikleşti, Pawsec sıfırdan e-ticarete geçti. Ne yaptık, ne çıktı?',
    },
    blog: {
      title: 'Blog: Web, E-Ticaret ve SEO Rehberleri',
      description:
        'Web sitesi maliyeti, Shopify mı WooCommerce mi, yayın öncesi SEO kontrol listesi, WhatsApp chatbot kurulumu ve yapay zekâ aramalarında görünürlük.',
    },
    about: {
      title: 'Hakkımızda: Üç Kişilik Dijital Stüdyo',
      description:
        'Tasarım, yazılım ve büyüme aynı masada. Sabit kapsam ve sabit fiyat, panel eğitimiyle teslim, 30 gün destek — kod ve alan adı sizde kalır.',
    },
    contact: {
      title: 'İletişim: Projenizi Anlatın',
      description:
        'WhatsApp, e-posta veya form üzerinden yazın. Kapsamı, süreyi ve bütçeyi ilk görüşmede netleştiriyoruz; hafta içi mesajlara aynı gün dönüyoruz.',
    },
  },
};
