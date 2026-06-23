import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ReferencesSection() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const references = [
    { 
      id: 1, 
      name: "Emsa Otel", 
      desc: "Otel Rezervasyon Sistemi",
      service: "Web Tasarım & Yazılım",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      link: "https://emsaotel.com.tr"
    },
    { 
      id: 2, 
      name: "Roasters", 
      desc: "QR Menü & Masa Sipariş",
      service: "Operasyonel Altyapı",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80",
      link: "https://roasters.menu"
    },
    { 
      id: 3, 
      name: "GastroPub", 
      desc: "Kurumsal Web & Etkinlik",
      service: "Dijital Vitrin",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80",
      link: "https://gastropubesk.com"
    },
    { 
      id: 4, 
      name: "Nova Mimarlık", 
      desc: "Portfolyo ve UI/UX",
      service: "Tasarım & Geliştirme",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      link: "https://novamimarlik.com"
    }
  ];

  // Modal açıkken arkadaki sayfanın kaymasını engelle
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img) => {
        if (!img) return;
        
        gsap.fromTo(img, 
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
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
      marginBottom: '8rem'
    },
    title: {
      fontSize: 'clamp(3rem, 6vw, 6rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      margin: 0,
      lineHeight: '1'
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
      height: '90vh',
      position: 'relative',
      marginBottom: '15rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageWrapper: {
      width: '80%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
      cursor: 'pointer'
    },
    parallaxImage: {
      width: '100%',
      height: '130%',
      position: 'absolute',
      top: '-15%',
      left: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.6)',
      transition: 'filter 0.5s ease, transform 0.5s ease'
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
      pointerEvents: 'none' // Click passes through to imageWrapper
    },
    hoverText: {
      color: 'var(--color-text)',
      fontSize: '2rem',
      fontWeight: 'bold',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      padding: '1rem 3rem',
      border: '2px solid var(--color-gold)',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      background: 'rgba(255, 236, 175, 0.1)'
    },
    contentOverlay: {
      position: 'absolute',
      bottom: '-3rem',
      left: '5vw',
      zIndex: 2,
      pointerEvents: 'none'
    },
    projectName: {
      fontSize: 'clamp(4rem, 12vw, 15rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      margin: 0,
      lineHeight: '0.8',
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
    modalContainer: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0a0a0c',
      display: 'flex',
      flexDirection: 'column',
      opacity: selectedProject ? 1 : 0,
      pointerEvents: selectedProject ? 'all' : 'none',
      transition: 'opacity 0.5s ease'
    },
    modalHeader: {
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      background: '#111',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    modalTitle: {
      color: 'var(--color-gold)',
      fontSize: '1.2rem',
      fontWeight: '600',
      letterSpacing: '1px'
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
      background: '#fff' // Web siteleri genelde beyazdır, yüklenirken temiz görünsün
    }
  };

  return (
    <>
      <section ref={containerRef} id="references" style={styles.section}>
        <div style={styles.header}>
          <h2 style={styles.title}>İmza Attığımız<br/>Projeler.</h2>
          <div style={styles.subtitle}>Case Studies</div>
        </div>

        <div>
          {references.map((project, index) => {
            const isHovered = hoveredProject === project.id;
            return (
              <div key={project.id} style={styles.projectContainer}>
                {/* Parallax Görsel */}
                <div 
                  style={{
                    ...styles.imageWrapper,
                    marginLeft: index % 2 === 0 ? 'auto' : '0',
                    marginRight: index % 2 === 0 ? '0' : 'auto'
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                >
                  <div 
                    ref={el => imagesRef.current[index] = el}
                    style={{
                      ...styles.parallaxImage,
                      backgroundImage: `url(${project.image})`,
                      filter: isHovered ? 'brightness(0.4) scale(1.02)' : 'brightness(0.6) scale(1)'
                    }} 
                  />
                  <div style={{...styles.hoverOverlay, opacity: isHovered ? 1 : 0}}>
                    <div style={{...styles.hoverText, transform: isHovered ? 'translateY(0)' : 'translateY(20px)', transition: 'transform 0.4s ease'}}>
                      Projeyi Keşfet
                    </div>
                  </div>
                </div>

                {/* Devasa Proje İsmi */}
                <div style={{
                  ...styles.contentOverlay,
                  left: index % 2 === 0 ? '5vw' : 'auto',
                  right: index % 2 === 0 ? 'auto' : '5vw',
                  textAlign: index % 2 === 0 ? 'left' : 'right'
                }}>
                  <h3 style={styles.projectName}>{project.name}</h3>
                  <div style={styles.projectMeta}>
                    <span style={styles.serviceTag}>{project.service}</span>
                    <span style={{color: 'rgba(255,255,255,0.2)'}}>|</span>
                    <span style={styles.descTag}>{project.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Screen Iframe Modal */}
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>{selectedProject?.name} - Canlı Önizleme</div>
          <button 
            style={styles.closeButton} 
            onClick={() => setSelectedProject(null)}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 236, 175, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={24} color="var(--color-gold)" />
          </button>
        </div>
        <div style={styles.iframeContainer}>
          {selectedProject && (
            <iframe 
              src={selectedProject.link} 
              title={selectedProject.name}
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
              allowFullScreen
            />
          )}
        </div>
      </div>
    </>
  );
}
