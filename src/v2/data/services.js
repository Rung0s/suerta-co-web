/* Alti hizmet alani. HomeV2 ve /v2/hizmetlerimiz ayni diziden okuyor:
   anasayfada baslik, aciklama ve etiketler; hizmet sayfasinda ayrica
   kimin icin oldugu, teslim edilen kalemler ve o alanda yapilmis gercek
   is gorunuyor.

   `proof` degerleri src/data/references.js'teki proje id'leri. Isi olmayan
   alan bos birakiliyor — olmayan referans uydurmak yerine o kart kanitsiz
   duruyor. */

/* Sira, kitlenin genisligine gore: site ve e-ticaret her sektorden
   markanin isi, otel ve emlak daha dar. Rezervasyon basta durunca
   listenin tamami otel isiymis gibi okunuyordu. */
export const SERVICES = [
  {
    slug: 'internet-siteleri',
    title: 'İnternet siteleri',
    desc:
      'Kurumsal site, portfolyo ve tanıtım siteleri. Hızlı, mobil öncelikli, çok dilli; içeriği kendiniz yönetirsiniz.',
    tags: ['Kurumsal & portfolyo', 'Mobil öncelikli', 'Çok dilli', 'İçerik paneli'],
    audience: 'Kurumsal markalar, ajanslar ve tek kişilik stüdyolar.',
    deliverables: [
      'Tasarım sistemi ve sayfa düzenleri',
      'İçerik paneli',
      'Çok dilli yapı',
      'Performans ve erişilebilirlik geçişi',
    ],
    proof: [4],
  },
  {
    slug: 'e-ticaret',
    title: 'E-ticaret',
    desc:
      'Shopify ya da özel altyapı. Sepetten ödemeye tek akış, ürün ve stok yönetimi sizde kalır.',
    tags: ['Shopify kurulumu', 'Checkout akışı', 'Ürün & stok yönetimi', 'Güvenli ödeme'],
    audience: 'Kendi ürününü satan markalar ve mağazalar.',
    deliverables: [
      'Mağaza kurulumu ve tema',
      'Ürün, varyant ve stok yapısı',
      'Ödeme ve kargo entegrasyonu',
      'Sepet ve checkout akışı',
    ],
    proof: [3],
  },
  {
    slug: 'yapay-zeka-otomasyon',
    title: 'Yapay zekâ otomasyonları',
    desc:
      'Tekrar eden işi yazılıma devrediyoruz: soruları yanıtlayan chatbotlar, fırsat yakalayan takip botları, form ve talep akışlarının otomasyonu.',
    tags: ['WhatsApp chatbot', 'Telegram takip botu', 'Talep otomasyonu', 'Panel entegrasyonu'],
    audience: 'Aynı soruyu günde onlarca kez yanıtlayan ekipler.',
    deliverables: [
      'Chatbot kurulumu ve içerik eğitimi',
      'Takip / bildirim botu',
      'Form ve talep otomasyonu',
      'Mevcut panele entegrasyon',
    ],
    proof: [2],
  },

  {
    slug: 'otel-rezervasyon',
    title: 'Otel & rezervasyon sistemleri',
    desc:
      'Misafir OTA üzerinden değil, doğrudan sizden rezervasyon yapar. Oda envanteri, sezonluk fiyat ve müsaitlik tek panelden yönetilir.',
    tags: ['Komisyonsuz rezervasyon', 'Channel manager / PMS', 'Sezonluk fiyatlama', 'Online ödeme'],
    audience: 'Butik otel, apart, bungalov ve tesis işletmeleri.',
    deliverables: [
      'Oda ve müsaitlik paneli',
      'Rezervasyon motoru + online ödeme',
      'Channel manager / PMS senkronu',
      'Çok dilli misafir akışı',
    ],
    proof: [1],
  },
  {
    slug: 'emlak-kiralama',
    title: 'Emlak & kiralama',
    desc:
      'Portföy, günlük kiralık ve Airbnb tek yerde. Airbnb ve Booking takvimleriyle senkron çalışır; aynı daireyi komisyon ödemeden kendi sitenizden de doldurursunuz.',
    tags: ['Portföy paneli', 'Takvim senkronu (iCal)', 'Filtreli arama', 'Harita görünümü'],
    audience: 'Emlak ofisleri, günlük kiralık ve Airbnb yöneticileri.',
    deliverables: [
      'İlan ve portföy paneli',
      'iCal takvim senkronu',
      'Filtreli arama + harita',
      'Talep ve görüşme formu',
    ],
    proof: [],
  },
  {
    slug: 'gorunurluk-buyume',
    title: 'Görünürlük & büyüme',
    desc:
      'Site kurulup bırakılmıyor. Arama motorlarında ve yapay zekâ yanıtlarında bulunur olmanız için SEO, GEO ve reklam tarafını da yürütüyoruz.',
    tags: ['SEO', 'GEO (yapay zekâ arama)', 'Google & Meta Ads', 'İşletme profili'],
    audience: 'Sitesi olan ama aranınca bulunmayan markalar.',
    deliverables: [
      'Teknik SEO ve içerik düzeni',
      'Yapay zekâ aramalarına hazırlık (GEO)',
      'Google & Meta reklam kurulumu',
      'Google İşletme Profili optimizasyonu',
    ],
    proof: [1],
  },
];
