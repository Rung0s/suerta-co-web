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
   de anasayfa blogun ic linklerini besliyor.

   Etiketler burada degil dil dosyalarinda (copy.tr / copy.en): `key`
   hangi metin blogunu okuyacagini soyluyor, `post` hangi yaziya
   gidilecegini. Yazinin kimligi iki dilde de ayni. */
export const HERO_CARDS = [
  { key: 'site', Card: VisitorsCard, post: 'web-sitesi-maliyeti-2026' },
  { key: 'eticaret', Card: CheckoutCard, post: 'shopify-mi-woocommerce-mi' },
  { key: 'bot', Card: ChatCard, post: 'whatsapp-chatbot' },
  { key: 'otel', Card: BookingCard, post: 'otel-rezervasyon-hizi' },
  { key: 'kiralama', Card: ListingCard, post: 'fotograf-cekimi' },
  { key: 'gorunurluk', Card: RankCard, post: 'geo-yapay-zeka-gorunurluk' },
];
