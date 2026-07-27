import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { referencesData } from '../data/references';
import useIsMobile from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

export default function ReferencesSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const imagesRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const references = referencesData.slice(0, 4);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modalToggle', { detail: true }));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalToggle', { detail: false }));
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modalToggle', { detail: false }));
    }
  }, [selectedProject]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Sadece masaüstünde (768px ve üzeri) sabitleme (pinning) yap
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        projectsRef.current.forEach((projectEl, i) => {
          if (!projectEl) return;
          const img = imagesRef.current[i];

          if (img) {
            gsap.fromTo(img,
              { yPercent: -15 },
              {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                  trigger: projectEl,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              }
            );
          }
        });
      });

      // Mobilde sabitleme (pin) yok, sadece hafif parallax
      mm.add("(max-width: 767px)", () => {
        projectsRef.current.forEach((projectEl, i) => {
          if (!projectEl) return;
          const img = imagesRef.current[i];

          if (img) {
            gsap.fromTo(img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: projectEl,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              }
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const styles = {
    section: {
      padding: '10rem 0',
      background: '#0a0a0c',
      position: 'relative',
      zIndex: 1
    },
    header: {
      padding: '0 5vw',
      marginBottom: 'clamp(1rem, 4vw, 6rem)'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      marginBottom: '1rem',
      fontWeight: '800',
      textTransform: 'uppercase'
    },
    subtitle: {
      color: 'var(--color-gold)',
      fontSize: '1.2rem',
      marginTop: '1rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    projectContainer: {
      width: '100%',
      padding: '1rem 0 3rem 0', // azaltıldı
      position: 'relative',
      marginBottom: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageWrapper: {
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '75vh',
      aspectRatio: isMobile ? '4 / 3' : '16 / 9',
      position: 'relative',
      marginTop: '4vh',
      overflow: 'hidden',
      borderRadius: '24px',
      cursor: 'pointer',
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
    },
    parallaxImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      willChange: 'transform'
    },
    hoverOverlay: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none'
    },
    hoverText: {
      color: 'var(--color-text)',
      fontSize: '1rem',
      fontWeight: 'bold',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      padding: '0.8rem 2rem',
      border: '1px solid var(--color-gold)',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      background: 'rgba(255, 236, 175, 0.1)'
    },
    contentOverlay: {
      position: 'absolute',
      bottom: '3rem',
      left: '5vw',
      zIndex: 2,
      pointerEvents: 'none'
    },
    projectName: {
      fontSize: 'clamp(1.5rem, 6vw, 5rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '800',
      textTransform: 'uppercase',
      color: 'var(--color-text)',
      margin: 0,
      lineHeight: '1',
      textShadow: '0 20px 40px rgba(0,0,0,0.5)'
    },
    projectMeta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'rgba(10, 10, 12, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2rem',
      borderRadius: '50px',
      border: '1px solid rgba(255,255,255,0.1)',
      marginTop: '2rem'
    },
    serviceTag: {
      color: 'var(--color-gold)',
      fontWeight: '600',
      letterSpacing: '1px'
    },
    descTag: {
      color: 'var(--color-secondary)'
    },
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(10, 10, 12, 0.7)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: selectedProject ? 1 : 0,
      pointerEvents: selectedProject ? 'all' : 'none',
      transition: 'opacity 0.4s ease'
    },
    modalContent: {
      width: '90vw',
      height: '85vh',
      background: '#0a0a0c',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      overscrollBehavior: 'contain',
      boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
      transform: selectedProject ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    modalHeader: {
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      background: '#0a0a0c', // Solid background to prevent overlap
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      width: '100%',
      zIndex: 10
    },
    modalTitle: {
      display: 'none'
    },
    closeButton: {
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text)',
      cursor: 'pointer',
      transition: 'background 0.3s ease'
    },
    iframeContainer: {
      flex: 1,
      width: '100%',
      background: '#fff',
      position: 'relative'
    }
  };

  return (
    <>
      <section ref={containerRef} id="references" style={styles.section}>
        <div style={styles.header}>
          <h2 style={styles.title}>İmza Attığımız Projeler</h2>
        </div>

        <div>
          {references.map((project, index) => {
            return (
              <div
                key={project.id}
                ref={el => projectsRef.current[index] = el}
                style={styles.projectContainer}
              >
                <motion.div
                  style={{
                    ...styles.imageWrapper,
                    marginTop: '0' // Mobile view closer to top
                  }}
                  initial="inactive"
                  whileInView="active"
                  viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
                  onClick={() => navigate(`/referanslar/${project.id}`)}
                >
                  <div
                    ref={el => imagesRef.current[index] = el}
                    style={{
                      ...styles.parallaxImage,
                      backgroundImage: `url(${project.image})`
                    }}
                  />
                  
                  {/* Mobilde görsellerin canlı görünmesi için üst kısım şeffaf, alt kısım metin okuma için gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isMobile 
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)' 
                        : 'rgba(0,0,0,0.65)',
                      zIndex: 1,
                      pointerEvents: 'none',
                      transition: 'background 0.3s ease'
                    }}
                  />

                  <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                    pointerEvents: 'none'
                  }}
                    variants={{
                      active: { opacity: 1 },
                      inactive: { opacity: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div style={{
                      padding: '0.8rem 1.5rem',
                      background: 'rgba(255, 236, 175, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 236, 175, 0.3)',
                      borderRadius: '50px',
                      color: 'var(--color-gold)',
                      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                      fontWeight: '600',
                      letterSpacing: '1px'
                    }}
                      variants={{
                        active: { y: 0 },
                        inactive: { y: 20 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      Projeyi İncele
                    </motion.div>
                  </motion.div>
                  <div style={{
                    position: 'absolute',
                    bottom: 'clamp(1.5rem, 4vw, 3rem)',
                    left: 'clamp(1.5rem, 4vw, 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    zIndex: 2
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                      fontFamily: 'var(--font-main)',
                      fontWeight: '700',
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      margin: 0,
                      lineHeight: '1.2',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                      {project.name}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                      margin: '0.5rem 0 0 0',
                      fontWeight: '300'
                    }}>
                      {project.desc}
                    </p>

                    <div style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.8rem',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                      <span style={{ width: '4px', height: '4px', background: 'var(--color-gold)', borderRadius: '50%' }}></span>
                      <span style={{ color: '#fff', fontSize: 'clamp(0.75rem, 2vw, 1rem)', fontWeight: '500', letterSpacing: '0.5px' }}>{project.category || project.service}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Çok Daha Fazlası Butonu */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 0 4rem 0', marginTop: '4rem', position: 'relative', zIndex: 10 }}>
          <a
            href="/referanslar"
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, margin: "50px" }}
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                color: 'var(--color-gold)',
                textAlign: 'center',
                transition: 'text-shadow 0.4s ease',
                display: 'inline-block',
                fontWeight: '300',
                paddingRight: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 15px rgba(255, 236, 175, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Çok Daha Fazlası...
            </motion.div>
          </a>
        </div>
      </section>

      {/* Buzlu Arkaplan ve Oval Modal */}
      <div style={styles.modalOverlay} onClick={() => setSelectedProject(null)} data-lenis-prevent="true">
        <div style={styles.modalContent} onClick={e => e.stopPropagation()} data-lenis-prevent="true">
          <div style={styles.modalHeader}>
            <div style={{ color: 'var(--color-gold)', fontSize: '1.2rem', fontWeight: '600', letterSpacing: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>
              {selectedProject?.name} <span style={{ fontWeight: '300', opacity: 0.7 }}>- Canlı Önizleme</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {selectedProject?.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.6rem 1.5rem',
                    background: 'var(--color-gold)',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Siteye Git
                </a>
              )}
              <button
                style={styles.closeButton}
                onClick={() => setSelectedProject(null)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 236, 175, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <X size={24} color="var(--color-gold)" />
              </button>
            </div>
          </div>

          <div style={styles.iframeContainer}>
            {selectedProject && (
              <div style={{ position: 'absolute', inset: 0, WebkitOverflowScrolling: 'touch', overflowY: 'auto' }} data-lenis-prevent="true">
                <iframe
                  src={selectedProject.link}
                  title={selectedProject.name}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
