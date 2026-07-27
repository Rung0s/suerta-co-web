import { useEffect, useState, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { referencesData } from '../data/references';
import { serviceBlogMap } from '../data/blogs';
import Seo, { SITE_URL, DEFAULT_IMAGE, breadcrumbSchema, faqSchema } from './Seo';

// Bir hizmet başlığını (ör. "Fotoğraf Çekimi:") blog haritasındaki anahtarla
// eşleştirmek için normalize et: sondaki iki noktayı at, kırp, Türkçe küçült.
const normalizeLabel = (s) => s.replace(/[:：]\s*$/, '').trim().toLocaleLowerCase('tr-TR');

// Kalın bir metin parçasını; blog haritasında karşılığı varsa tıklanabilir
// bir link, yoksa normal kalın metin olarak render eder.
const renderBold = (part, key) => {
  const hadColon = /[:：]\s*$/.test(part);
  const label = part.replace(/[:：]\s*$/, '');
  const slug = serviceBlogMap[normalizeLabel(part)];
  if (slug) {
    return (
      <Fragment key={key}>
        <Link
          to={`/blog/${slug}`}
          style={{ color: 'var(--color-gold)', fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'rgba(255,236,175,0.4)' }}
        >
          {label}
        </Link>
        {hadColon ? ':' : ''}
      </Fragment>
    );
  }
  return <strong key={key} style={{ color: '#fff' }}>{part}</strong>;
};

// Basit markdown ayrıştırıcı: başlıklar, madde işaretleri ve kalın metinler.
const parseMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return <h3 key={index} style={{ color: 'var(--color-gold)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-main)' }}>{line.replace('### ', '')}</h3>;
    }
    if (line.startsWith('* ')) {
      const content = line.replace('* ', '');
      const parts = content.split(/\*\*(.*?)\*\*/g);
      return (
        <li key={index} style={{ marginBottom: '0.8rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
          {parts.map((part, i) => (i % 2 === 1 ? renderBold(part, i) : part))}
        </li>
      );
    }
    if (line.trim() !== '') {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={index} style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
          {parts.map((part, i) => (i % 2 === 1 ? renderBold(part, i) : part))}
        </p>
      );
    }
    return null;
  });
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = referencesData.find(p => p.id === parseInt(id));
  const [openFaq, setOpenFaq] = useState(null);
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setOpenFaq(null);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '100vh', color: '#fff' }}>
        <h2>Proje bulunamadı.</h2>
        <Link to="/referanslar" style={{ color: 'var(--color-gold)', textDecoration: 'none', marginTop: '2rem', display: 'inline-block' }}>
          Tüm Projelere Dön
        </Link>
      </div>
    );
  }

  const styles = {
    wrapper: {
      padding: '120px 5vw 100px',
      minHeight: '100vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--color-secondary)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      font: 'inherit',
    },
    navRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '3rem',
    },
    tag: {
      display: 'inline-block',
      color: 'var(--color-gold)',
      fontSize: '0.85rem',
      fontWeight: '700',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '1rem',
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '1rem',
      textTransform: 'uppercase',
    },
    desc: {
      fontSize: '1.2rem',
      color: 'var(--color-secondary)',
      marginBottom: '3rem',
    },
    imageContainer: {
      width: '100%',
      aspectRatio: '16 / 9',
      borderRadius: '24px',
      overflow: 'hidden',
      marginBottom: '4rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      marginBottom: '3rem',
    },
    visitBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.8rem 1.5rem',
      background: 'var(--color-gold)',
      color: '#000',
      textDecoration: 'none',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '0.95rem',
      transition: 'opacity 0.3s ease',
    },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
    },
    faqSection: {
      marginTop: '4rem',
      paddingTop: '4rem',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    faqTitle: {
      fontSize: '2rem',
      fontFamily: 'var(--font-main)',
      marginBottom: '2rem',
      color: '#fff',
    },
    faqItem: {
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '1.5rem 0',
    },
    faqQuestion: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: '500',
      color: '#fff',
      gap: '1rem',
    },
    faqAnswer: {
      color: 'rgba(255,255,255,0.6)',
      lineHeight: '1.6',
      paddingTop: '1rem',
    },
    ctaBox: {
      marginTop: '4rem',
      padding: '2.5rem',
      borderRadius: '24px',
      background: 'rgba(255,236,175,0.04)',
      border: '1px solid rgba(255,236,175,0.12)',
      textAlign: 'center',
    }
  };

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.desc,
    image: `${SITE_URL}${project.image}`,
    inLanguage: 'tr-TR',
    creator: { '@type': 'Organization', name: 'suerta co.', url: SITE_URL },
    about: project.category,
  };

  return (
    <div style={styles.wrapper}>
      <Seo
        path={`/referanslar/${project.id}`}
        title={`${project.name} — ${project.desc}`}
        description={`${project.name} projesi: ${project.desc}. suerta co.'nun ${project.category.toLocaleLowerCase('tr-TR')} alanında hayata geçirdiği çalışmanın detayları ve sık sorulan sorular.`}
        image={`${SITE_URL}${project.image}`}
        type="article"
        jsonLd={[
          creativeWorkSchema,
          faqSchema(project.faqs),
          breadcrumbSchema([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Referanslar', path: '/referanslar' },
            { name: project.name, path: `/referanslar/${project.id}` },
          ]),
        ]}
      />
      <div style={styles.container}>
        <div style={styles.navRow}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backLink}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-secondary)'}
          >
            <ArrowLeft size={16} /> Geri
          </button>

          <Link
            to="/referanslar"
            style={styles.backLink}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-secondary)'}
          >
            Tüm Projeler <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={styles.tag}>{project.category}</span>
          <h1 style={styles.title}>{project.name}</h1>
          <div style={styles.desc}>{project.desc}</div>

          <div style={styles.imageContainer}>
            <img src={project.image} alt={project.name} style={styles.image} />
          </div>

          <div style={styles.meta}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              <strong>Hizmet:</strong> {project.category}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.instagram && (
                <a
                  href={project.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.visitBtn, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.15)' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Instagram <ExternalLink size={16} />
                </a>
              )}
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.visitBtn}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Projeyi Ziyaret Et <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <div style={styles.content}>
            {project.details ? (
              <div className="project-details">
                {parseMarkdown(project.details)}
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
                  İpucu: Altı çizili başlıklara tıklayarak o hizmetin nasıl yapıldığını anlatan yazıları okuyabilirsiniz.
                </p>
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>Bu proje için henüz detaylı bir inceleme yazısı bulunmamaktadır.</p>
            )}
          </div>

          {project.faqs && project.faqs.length > 0 && (
            <div style={styles.faqSection}>
              <h2 style={styles.faqTitle}>Sıkça Sorulan Sorular</h2>
              <div>
                {project.faqs.map((faq, index) => (
                  <div key={index} style={styles.faqItem}>
                    <div
                      style={styles.faqQuestion}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {faq.question}
                      {openFaq === index ? <Minus size={20} color="var(--color-gold)" /> : <Plus size={20} color="var(--color-secondary)" />}
                    </div>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={styles.faqAnswer}>{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={styles.ctaBox}>
            <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.8rem' }}>
              Benzer bir proje mi düşünüyorsunuz?
            </h3>
            <p style={{ color: 'var(--color-secondary)', marginBottom: '1.8rem' }}>
              Markanız için nasıl bir çözüm üretebileceğimizi birlikte konuşalım.
            </p>
            <Link
              to="/iletisim"
              style={{ ...styles.visitBtn, padding: '1rem 2.2rem', fontSize: '1rem' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Bize Ulaşın <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
