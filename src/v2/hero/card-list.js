import {
  BookingCard,
  ListingCard,
  VisitorsCard,
  CheckoutCard,
  ChatCard,
  RankCard,
} from './cards';

/* Sira: ziyaretcinin bizde en cok karsilastigi isten en az karsilastigina. */
export const HERO_CARDS = [
  { key: 'otel', area: 'Otel & rezervasyon', Card: BookingCard },
  { key: 'kiralama', area: 'Emlak & kiralama', Card: ListingCard },
  { key: 'site', area: 'İnternet siteleri', Card: VisitorsCard },
  { key: 'eticaret', area: 'E-ticaret', Card: CheckoutCard },
  { key: 'bot', area: 'Yapay zekâ otomasyonları', Card: ChatCard },
  { key: 'gorunurluk', area: 'Görünürlük & büyüme', Card: RankCard },
];
