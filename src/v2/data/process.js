/* Surec adimlari ve sik sorulanlar. Anasayfa ve /v2/hizmetlerimiz ayni
   kaynagi kullaniyor; iki kopya iki farkli taahhut demek olurdu. */
/* Dort adim. Sureler gercek taahhut; degistirmeden once teslim gecmisine bak. */
export const STEPS = [
  { num: '01', title: 'Keşif', desc: '15 dakikalık görüşme. Ne sattığınızı, kime sattığınızı ve neyin eksik olduğunu netleştiririz.' },
  { num: '02', title: 'Kapsam', desc: 'Sabit fiyat, sabit kapsam ve teslim tarihi. Sürpriz kalem yok.' },
  { num: '03', title: 'Kurulum', desc: 'Tasarım, geliştirme, rezervasyon motoru ve entegrasyonlar. Ara teslimlerle ilerler.' },
  { num: '04', title: 'Devir', desc: 'Yayına alma, panel eğitimi ve 30 gün destek. Site sizde kalır, bize bağımlı değilsiniz.' },
];

export const FAQS = [
  {
    q: 'OTA komisyonunu gerçekten düşürebilir miyim?',
    a: 'Tamamen bitirmez ama payı ciddi biçimde kaydırır. Booking veya Airbnb üzerinden gelen misafir komisyon götürür; kendi sitenizden gelen götürmez. Emsa Otel’de doğrudan rezervasyon oranı %40 arttı. Hedef platformları bırakmak değil, ikinci ve üçüncü kez gelen misafiri doğrudan kendinize almak.',
  },
  {
    q: 'Mevcut channel manager veya PMS’imle çalışır mı?',
    a: 'Evet. API veya iCal desteği olan sistemlerle takvim ve envanter senkronu kuruyoruz; müsaitlik iki yerde ayrı ayrı güncellenmez. Hangi sistemi kullandığınızı söyleyin, entegrasyonun mümkün olup olmadığını görüşmeden önce netleştirelim.',
  },
  {
    q: 'Siteyi kendim güncelleyebilir miyim?',
    a: 'Evet. Oda, ilan, fiyat, görsel ve içerik girişini yapabileceğiniz bir panel teslim ediyoruz. Devirde eğitim veriyoruz. Küçük değişiklik için bize dönmeniz gerekmiyor.',
  },
  {
    q: 'Ne kadar sürede teslim ediyorsunuz?',
    a: 'Kapsama bağlı. Tek mülk veya butik otel için 2–3 hafta; rezervasyon motoru ve entegrasyon gerektiren işler 4–6 hafta. Tarihi kapsam aşamasında yazılı veriyoruz.',
  },
  {
    q: 'Çok dilli ve çok para birimli olur mu?',
    a: 'Olur, bu nişte neredeyse zorunlu. Türkçe–İngilizce standart; talep halinde Almanca, Rusça ve Arapça ekliyoruz. Fiyatlar ziyaretçinin para biriminde gösterilebilir.',
  },
];
