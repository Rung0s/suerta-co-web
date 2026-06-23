import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function FAQSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [openId, setOpenId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Suerta Co. tam olarak ne yapar?",
      answer: "Suerta Co., markanızın dijital dünyadaki varlığını en üst seviyeye taşımak için premium web & mobil arayüz tasarımları (UI/UX), özel fonksiyonel yazılımlar (CRM, QR menüler, otel rezervasyon altyapıları), yapay zekâ entegrasyonları, akıllı iş otomasyonları ve büyüme odaklı veri analitiği çözümleri geliştiren yeni nesil bir dijital stüdyodur. Şablon tasarımlar yerine her markaya özgün, pürüzsüz ve lüks dijital deneyimler inşa eder."
    },
    {
      id: 2,
      question: "Proje süreçleriniz nasıl ilerliyor?",
      answer: "Kreatif yaklaşımımız üç ana aşamadan oluşur: 1. Stratejik Keşif (işletmenizin ruhunu ve hedeflerini anlamak için derinlemesine analiz), 2. Estetik & Mimari Tasarım (kullanıcı deneyimini ön planda tutan göz alıcı premium tasarımlar) ve 3. Sıfır-Hata Geliştirme (en güncel teknolojilerle pürüzsüz, hızlı ve güvenli kodlama). Tüm bu süreç boyunca şeffaf ve yakın iletişimde kalıyoruz."
    },
    {
      id: 3,
      question: "Mevcut web sitemizi veya sistemimizi geliştirebiliyor musunuz?",
      answer: "Evet. Mevcut sisteminizi, web sitenizi veya dijital süreçlerinizi baştan sona analiz ediyoruz. Modern tasarım trendlerine (karanlık mod, sıvı cam/glassmorphism efektleri, akıcı animasyonlar) uyarlayarak görsel kalitesini artırıyor, hız optimizasyonu gerçekleştiriyor veya sisteminize işlerinizi kolaylaştıracak yapay zekâ entegrasyonları ekleyebiliyoruz."
    },
    {
      id: 4,
      question: "Hizmet sonrası teknik destek ve güvenlik sağlıyor musunuz?",
      answer: "Kesinlikle. İşimiz sistemi teslim etmekle bitmiyor. Geliştirdiğimiz altyapıları 'Suerta Kalkanı' güvenlik protokolleriyle siber tehditlere karşı koruyor, aylık düzenli yedeklemelerini alıyor ve sistem performansını 7/24 izliyoruz. Ayrıca teknolojik yeniliklere, arama motoru (SEO) güncellemelerine ve ihtiyaçlarınıza göre sisteminizi sürekli güncel tutuyoruz."
    },
    {
      id: 5,
      question: "Bir projeye başlamak için ne yapmalıyım?",
      answer: "Süreç oldukça basit! 'Bize Ulaşın' sayfamızdaki formu doldurarak veya doğrudan WhatsApp hattımız üzerinden bizimle iletişime geçebilirsiniz. Hayalinizdeki projeyi ve vizyonunuzu paylaştıktan sonra ekibimiz sizin için en uygun teknoloji ve tasarım stratejisini belirleyip, yol haritasını çizmek üzere bir ön görüşme planlayacaktır."
    }
  ];

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const styles = {
    section: {
      padding: '8rem 2rem',
      position: 'relative',
      zIndex: 1,
      background: 'linear-gradient(to bottom, transparent, rgba(154, 22, 31, 0.02))',
      borderTop: '1px solid rgba(255,255,255,0.02)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '5rem',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      fontFamily: 'var(--font-heading)'
    },
    subtitle: {
      color: 'var(--color-secondary)',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)'
    },
    container: {
      maxWidth: '850px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    item: (isOpen) => ({
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      borderColor: isOpen ? 'rgba(255, 236, 175, 0.3)' : 'var(--color-glass-border)',
      boxShadow: isOpen ? '0 10px 30px rgba(154, 22, 31, 0.15)' : 'none'
    }),
    questionRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.8rem 2rem',
      userSelect: 'none'
    },
    questionText: (isOpen) => ({
      fontSize: '1.15rem',
      fontWeight: '600',
      color: isOpen ? 'var(--color-gold)' : 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      transition: 'color 0.3s ease',
      fontFamily: 'var(--font-body)'
    }),
    icon: (isOpen) => ({
      color: isOpen ? 'var(--color-gold)' : 'var(--color-secondary)',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease'
    }),
    answerWrapper: (isOpen) => ({
      overflow: 'hidden',
      maxHeight: isOpen ? '300px' : '0',
      opacity: isOpen ? 1 : 0,
      transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
    }),
    answerContent: {
      padding: '1.5rem 2rem 2rem 2rem',
      color: 'var(--color-secondary)',
      fontSize: '1.05rem',
      lineHeight: '1.8',
      borderTop: '1px solid rgba(255,255,255,0.03)',
      fontFamily: 'var(--font-body)'
    }
  };

  return (
    <section id="faq" style={styles.section}>
      <div style={styles.header} ref={ref1}>
        <h2 style={styles.title}>Sıkça Sorulan Sorular</h2>
        <p style={styles.subtitle}>Vizyonumuz, süreçlerimiz ve dijital çözümlerimiz hakkında merak ettiğiniz her şey.</p>
      </div>

      <div style={styles.container}>
        {faqData.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id}
              className="glass-panel"
              style={{
                ...styles.item(isOpen),
                opacity: isVisible1 ? 1 : 0,
                transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, border-color 0.4s ease, box-shadow 0.4s ease`
              }}
              onClick={() => toggleItem(item.id)}
            >
              <div style={styles.questionRow}>
                <h3 style={styles.questionText(isOpen)}>
                  <HelpCircle size={22} style={{ color: isOpen ? 'var(--color-gold)' : 'var(--color-accent)', flexShrink: 0 }} />
                  {item.question}
                </h3>
                <div style={styles.icon(isOpen)}>
                  <ChevronDown size={22} />
                </div>
              </div>
              <div style={styles.answerWrapper(isOpen)}>
                <div style={styles.answerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
