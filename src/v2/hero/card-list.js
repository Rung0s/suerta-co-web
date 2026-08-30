import {
  BookingCard,
  ListingCard,
  VisitorsCard,
  CheckoutCard,
  ChatCard,
  RankCard,
} from './cards';

/* Sira: en genis kitleye hitap eden isten en dar olana. Rezervasyon
   basta durunca sayfa "otel yazilimi satan bir yer" gibi okunuyordu;
   oysa ayni ekip site, e-ticaret ve otomasyon da kuruyor. Otel artik
   siranin ortasinda, alti alandan biri olarak duruyor.

   Her kartin bir yazisi var: kart tiklanabilir ve o alani anlatan blog
   yazisina gidiyor. Hem ziyaretci kartta gordugu seyi okuyabiliyor hem
   de anasayfa blogun ic linklerini besliyor. */
export const HERO_CARDS = [
  {
    key: 'site',
    area: 'İnternet siteleri',
    Card: VisitorsCard,
    post: { slug: 'web-sitesi-maliyeti-2026', label: 'Web sitesi maliyeti 2026' },
  },
  {
    key: 'eticaret',
    area: 'E-ticaret',
    Card: CheckoutCard,
    post: { slug: 'shopify-mi-woocommerce-mi', label: 'Shopify mı, WooCommerce mi?' },
  },
  {
    key: 'bot',
    area: 'Yapay zekâ otomasyonları',
    Card: ChatCard,
    post: { slug: 'whatsapp-chatbot', label: 'WhatsApp chatbot nasıl kurulur?' },
  },
  {
    key: 'otel',
    area: 'Otel & rezervasyon',
    Card: BookingCard,
    post: { slug: 'otel-rezervasyon-hizi', label: 'Rezervasyonda hız ve dönüşüm' },
  },
  {
    key: 'kiralama',
    area: 'Emlak & kiralama',
    Card: ListingCard,
    post: { slug: 'fotograf-cekimi', label: 'İlan fotoğrafı nasıl çekilir?' },
  },
  {
    key: 'gorunurluk',
    area: 'Görünürlük & büyüme',
    Card: RankCard,
    post: { slug: 'geo-yapay-zeka-gorunurluk', label: 'GEO: yapay zekâ sizi önerirse' },
  },
];
