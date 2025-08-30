import React, { useState, useEffect } from 'react';
import { SiWhatsapp } from "react-icons/si";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/554999957692?text=Ol%C3%A1!%20Gostaria%20de%20%20saber%20mais%20sobre%20o%20ConsigIA%20`;
    window.open(whatsappUrl, '_blank');
  };

  // Animation effect for the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="whatsapp-button-container">
      {/* Tooltip on hover - posicionado à esquerda */}
      {isHovered && (
        <div className="whatsapp-tooltip left-tooltip">
          Fale conosco pelo WhatsApp!
        </div>
      )}
      
      {/* Main button com anel interno */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="whatsapp-button"
      >
        {/* Pulsating ring effect - dentro do botão */}
        <div className="ping-ring"></div>
        <SiWhatsapp size={26} className="whatsapp-icon" />
      </button>

      <style jsx>{`
        .whatsapp-button-container {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 1000;
        }
        
        .whatsapp-button {
          position: relative;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          border: none;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          z-index: 2;
          overflow: visible;
        }
        
        .whatsapp-button:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(135deg, #128C7E, #075E54);
        }
        
        .ping-ring {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: #25D366;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.4;
          z-index: 1;
        }
        
        @keyframes ping {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        
        .whatsapp-icon {
          position: relative;
          z-index: 3;
        }
        
        .whatsapp-tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          animation: tooltipFadeIn 0.3s ease forwards;
          z-index: 3;
          bottom: 50%;
          right: 70px;
          transform: translateY(50%);
        }
        
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(50%) translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateY(50%) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;