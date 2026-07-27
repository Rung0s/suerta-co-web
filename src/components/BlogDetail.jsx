import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogsData } from '../data/blogs';
import Seo, { SITE_URL, SITE_NAME, DEFAULT_IMAGE, breadcrumbSchema, faqSchema } from './Seo';

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === id);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '100vh', color: '#fff' }}>
        <h2>Blog yazısı bulunamadı.</h2>
        <Link to="/blog" style={{ color: 'var(--color-gold)', textDecoration: 'none', marginTop: '2rem', display: 'inline-block' }}>
          Geri Dön
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
      marginBottom: '3rem',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
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
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '800',
      lineHeight: '1.2',
      marginBottom: '2rem',
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      color: 'rgba(255,255,255,0.4)',
      fontSize: '0.9rem',
      marginBottom: '4rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: 'rgba(255,255,255,0.8)',
      whiteSpace: 'pre-wrap',
      marginBottom: '5rem',
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
    },
    faqAnswer: {
      color: 'rgba(255,255,255,0.6)',
      lineHeight: '1.6',
      paddingTop: '1rem',
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.desc,
    image: DEFAULT_IMAGE,
    articleSection: blog.tag,
    inLanguage: 'tr-TR',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${blog.id}`,
  };

  return (
    <div style={styles.wrapper}>
      <Seo
        path={`/blog/${blog.id}`}
        title={blog.title}
        description={blog.desc}
        type="article"
        jsonLd={[
          articleSchema,
          faqSchema(blog.faqs),
          breadcrumbSchema([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: blog.title, path: `/blog/${blog.id}` },
          ]),
        ]}
      />
      <div style={styles.container}>
        <Link
          to="/blog"
          style={styles.backLink}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-secondary)'}
        >
          <ArrowLeft size={16} /> Tüm Yazılar
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={styles.tag}>{blog.tag}</span>
          <h1 style={styles.title}>{blog.title}</h1>
          <div style={styles.meta}>
            <span>{blog.date}</span>
            <span>•</span>
            <span>5 Dk Okuma</span>
            {blog.views != null && (
              <>
                <span>•</span>
                <span>{blog.views.toLocaleString('tr-TR')} görüntülenme</span>
              </>
            )}
          </div>

          <div style={styles.content}>
            {blog.content.trim()}
          </div>
        </motion.div>

        {blog.faqs && blog.faqs.length > 0 && (
          <div style={styles.faqSection}>
            <h3 style={styles.faqTitle}>Sıkça Sorulan Sorular</h3>
            <div>
              {blog.faqs.map((faq, index) => (
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
      </div>
    </div>
  );
}
