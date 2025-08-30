import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mostrar o botão quando o usuário rolar para baixo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para rolar suavemente para o topo (mesma lógica do header)
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const distance = -startPosition;
    const duration = 1200;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function scrollAnimation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <div className="top-button-container">
      {/* Tooltip on hover - posicionado à direita */}
      {isHovered && (
        <div className="tooltip right-tooltip">
          Voltar ao topo
        </div>
      )}
      
      {/* Main button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`top-button ${isVisible ? 'visible' : 'hidden'}`}
      >
        <ChevronUp size={24} className="icon" />
        <div className="text">TOPO</div>
      </button>

      <style jsx>{`
        .top-button-container {
          position: fixed;
          bottom: 25px;
          left: 25px;
          z-index: 1000;
        }
        
        .top-button {
          position: relative;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4a6bff, #2a4dff);
          border: none;
          border-radius: 50%;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }
        
        .top-button.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .top-button:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
          transform: translateY(-5px);
        }
        
        .icon {
          margin-bottom: 2px;
        }
        
        .text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .top-button.hidden {
          opacity: 0;
          transform: translateY(5px);
          pointer-events: none;
        }
        
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          animation: tooltipFadeInFromLeft 0.3s ease forwards;
          z-index: 3;
          bottom: 50%;
          left: 70px;
          transform: translateY(50%);
        }
        
        @keyframes tooltipFadeInFromLeft {
          from {
            opacity: 0;
            transform: translateY(50%) translateX(-20px);
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

export default TopButton;