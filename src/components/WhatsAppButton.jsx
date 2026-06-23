import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/905555555555" 
      target="_blank" 
      rel="noreferrer"
      className="whatsapp-btn group"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '65px',
        height: '65px',
        background: 'radial-gradient(circle at 30% 30%, #4ae67a 0%, #25D366 50%, #128C7E 100%)',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 10px rgba(255,255,255,0.6), 0 10px 30px rgba(37, 211, 102, 0.5)',
        zIndex: 9999,
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
        cursor: 'pointer',
        perspective: '1000px'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.08) rotateX(10deg) rotateY(-10deg)';
        e.currentTarget.style.boxShadow = 'inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 10px rgba(255,255,255,0.8), 0 20px 40px rgba(37, 211, 102, 0.7)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        e.currentTarget.style.boxShadow = 'inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 10px rgba(255,255,255,0.6), 0 10px 30px rgba(37, 211, 102, 0.5)';
      }}
    >
      <MessageCircle size={32} />
      
      <style>
        {`
          @keyframes snailCrawl {
            0%, 60% { 
              /* 36 saniye boyunca sol altta gizli bekler */
              transform: translate(-20px, 45px) rotate(-90deg) scale(0);
              opacity: 0;
            }
            62% {
              /* Yavaşça sol ortadan belirir */
              transform: translate(-25px, 15px) rotate(-70deg) scale(1);
              opacity: 1;
            }
            68% {
              /* Sol tepeye ulaşır ve sağa döner (3.6 saniye tırmanış) */
              transform: translate(-10px, -25px) rotate(-10deg) scale(1);
              opacity: 1;
            }
            85% {
              /* Üst kenar boyunca ÇOK YAVAŞÇA sağa ilerler (10.2 saniye sürer!) */
              transform: translate(45px, -25px) rotate(10deg) scale(1);
              opacity: 1;
            }
            92% {
              /* Sağ kenardan aşağı doğru süzülür (4.2 saniye iniş) */
              transform: translate(60px, 25px) rotate(80deg) scale(1);
              opacity: 1;
            }
            95%, 100% {
              /* Sağ altta yavaşça küçülerek kaybolur */
              transform: translate(35px, 55px) rotate(120deg) scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: '30px', /* Daha belirgin olması için büyütüldü */
        animation: 'snailCrawl 60s linear infinite', /* Gerçekçi olması için 60 saniyeye yayıldı */
        pointerEvents: 'none',
        zIndex: 10,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))'
      }}>
        🐌
      </div>
    </a>
  );
}
