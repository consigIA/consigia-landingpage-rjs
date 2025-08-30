import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react'

const HeroSection = () => {
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const words = [
    'Atendimento totalmente automatizado e customizado.',
    'Transforme visitantes em clientes satisfeitos.',
    'Vendas 24 horas/7 dias por semana.',
    'Suporte instantâneo para seus clientes.'
  ]

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isTyping && typedText.length < currentWord.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    } else if (isTyping && typedText.length === currentWord.length) {
      setTimeout(() => setIsTyping(false), 2500)
    } else if (!isTyping && typedText.length > 0) {
      const timeout = setTimeout(() => {
        setTypedText(typedText.slice(0, -1))
      }, 40)
      return () => clearTimeout(timeout)
    } else if (!isTyping && typedText.length === 0) {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      setIsTyping(true)
    }
  }, [typedText, isTyping, currentWordIndex])

  return (
    <section id="inicio" className="hero-section">
      
      {/* Background decorations */}
      <div className="hero-bg-decoration" />
      <div className="hero-bg-pattern" />
      
      <div className="hero-container">
        
        {/* Left column - Text */}
        <div className="hero-content">
          
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles className="hero-badge-icon" />
            <span className="hero-badge-text">
              #1 EM AUTOMAÇÃO COMERCIAL
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Conheça a{' '}
            <span className="hero-title-highlight">
              ConsigIA
            </span>
          </h1>

          {/* Typing animation */}
          <div className="hero-subtitle-container">
            <p className="hero-subtitle">
              {typedText}
              <span className="hero-cursor">|</span>
            </p>
          </div>

          {/* Description */}
          <p className="hero-description">
            Revolucione seu atendimento com inteligência artificial. 
            Automatize processos e ofereça experiências excepcionais 24 horas por dia.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => window.open('https://wa.me/554999957692?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20ConsigIA', '_blank')}
            className="hero-cta-button"
          >
            <MessageCircle className="hero-cta-icon" />
            <span>Começar Agora</span>
            <ArrowRight className="hero-cta-arrow" />
          </button>

        </div>

        {/* Right column - Image */}
        <div className="hero-image-section">
          <div className="hero-image-container">
            <img
              src="/foto1.png"
              className="hero-image"
              alt="ConsigIA Interface"
              loading="eager"
            />
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .hero-section {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          align-items: center;
          padding: 2rem 40px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .hero-bg-decoration {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0%, transparent 50%, rgba(15, 23, 42, 0.02) 100%);
          pointer-events: none;
        }

        .hero-bg-pattern {
          display: none;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: heroFadeIn 1s ease-out forwards;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 50px;
          padding: 0.625rem 1.25rem;
          width: fit-content;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .hero-badge-icon {
          width: 1rem;
          height: 1rem;
          color: #06b6d4;
        }

        .hero-badge-text {
          font-weight: 700;
          font-size: 0.75rem;
          color: #0f172a;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 4rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin: 0;
        }

        .hero-title-highlight {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle-container {
          height: 4rem;
          display: flex;
          align-items: center;
          margin: 0.5rem 0;
        }

        .hero-subtitle {
          font-size: clamp(1.25rem, 4vw, 1.5rem);
          font-weight: 500;
          color: #374151;
          margin: 0;
        }

        .hero-cursor {
          color: #06b6d4;
          animation: heroPulse 1.5s infinite;
        }

        .hero-description {
          font-size: clamp(1.125rem, 3vw, 1.25rem);
          color: #4b5563;
          line-height: 1.7;
          max-width: 32rem;
          margin: 0;
        }

        .hero-cta-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #0f172a;
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          width: fit-content;
          font-family: inherit;
        }

        .hero-cta-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
          background: #1e293b;
        }

        .hero-cta-icon,
        .hero-cta-arrow {
          width: 1.25rem;
          height: 1.25rem;
        }

        .hero-cta-arrow {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-cta-button:hover .hero-cta-arrow {
          transform: translateX(0.5rem);
        }

        .hero-image-section {
          display: flex;
          justify-content: center;
        }

        .hero-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Desktop Large */
        @media (min-width: 1024px) {
          .hero-container {
            padding: 0 3rem;
            grid-template-columns: 1fr 1.2fr;
            gap: 4rem;
          }
        }

        @media (min-width: 1280px) {
          .hero-container {
            padding: 0 4rem;
          }
        }

        /* Tablet */
        @media (max-width: 1023px) {
          .hero-container {
            padding: 0 2rem;
          }
          
          .hero-image-section {
            order: -1;
          }
          
          .hero-content {
            text-align: center;
            align-items: center;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-container {
            padding: 0 1.5rem;
            gap: 2rem;
          }

          .hero-section {
            padding: 1rem 0;
          }

          .hero-badge {
            padding: 0.625rem 1.25rem;
          }

          .hero-badge-text {
            font-size: 0.6875rem;
          }

          .hero-cta-button {
            width: 100%;
            justify-content: center;
            max-width: 20rem;
          }
        }

        @media (max-width: 480px) {
          .hero-container {
            padding: 0 1rem;
          }

          .hero-image-container {
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection