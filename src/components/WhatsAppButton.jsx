import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/905555555555" 
      target="_blank" 
      rel="noreferrer"
      className="whatsapp-btn"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        background: '#25D366',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
        zIndex: 9999,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(37, 211, 102, 0.6)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.4)';
      }}
    >
      <MessageCircle size={32} />
    </a>
  );
}
