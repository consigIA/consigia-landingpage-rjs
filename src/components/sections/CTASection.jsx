import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, Users, Zap, MessageCircle } from 'lucide-react'

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Para de observar após a primeira vez
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const trustIndicators = [
    { icon: Shield, label: '+ Segurança' },
    { icon: Users, label: '+ Clientes' },
    { icon: Zap, label: '+ Resultados' }
  ]

  return (
    <section 
      className="cta-section" 
      ref={sectionRef}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out',
        minHeight: '100vh',
        display: 'block'
      }}
    >
      
      {/* Background decorations */}
      <div className="cta-bg-decoration" />
      
      <div className="cta-container">
        <div className="cta-content">
          
          {/* Top section: Image and Title */}
          <div className="cta-top-section">
            {/* Image section */}
            <div className="cta-image-section">
              <div className="cta-image-container">
                <img
                  src="/foto1.png"
                  className="cta-image"
                  alt="ConsigIA Interface"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title section */}
            <div className="cta-title-section">
              <h2 className="cta-title">
                Pronto para{' '}
                <span className="cta-title-highlight">
                  revolucionar
                </span>{' '}
                suas vendas?
              </h2>
            </div>
          </div>

          {/* Bottom section: Subtitle, buttons and trust indicators */}
          <div className="cta-bottom-section">
            <p className="cta-subtitle">
              Junte-se aos nossos parceiros que já estão faturando
              com nossa I.A
            </p>

            <div className="cta-buttons">
              <button
                onClick={() =>
                  window.open(
                    'https://wa.me/554999957692?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20ConsigIA',
                    '_blank'
                  )
                }
                className="cta-primary-button"
              >
                <MessageCircle className="cta-button-icon" />
                <span>Contrate Agora!</span>
              </button>

              <button
                onClick={() =>
                  window.open(
                    'https://calendly.com/atendimento-consigia/30min',
                    '_blank'
                  )
                }
                className="cta-secondary-button"
              >
                <span>Agendar Reunião</span>
                <ArrowRight className="cta-button-arrow" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="cta-trust-indicators">
              <div className="cta-trust-grid">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="cta-trust-item">
                    <div className="cta-trust-icon-container">
                      <indicator.icon className="cta-trust-icon" />
                    </div>
                    <p className="cta-trust-label">{indicator.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          background: #fafafa;
          padding: 4rem 40px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .cta-bg-decoration {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0%, transparent 50%, rgba(15, 23, 42, 0.02) 100%);
          pointer-events: none;
        }

        .cta-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
        }

        .cta-top-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .cta-bottom-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
          max-width: 800px;
        }

        .cta-title-section {
          display: flex;
          align-items: center;
          text-align: left;
        }

        .cta-title {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin: 0;
        }

        .cta-title-highlight {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cta-image-section {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .cta-image-container {
          width: 100%;
          max-width: 500px;
        }

        .cta-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .cta-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.25rem);
          color: #4b5563;
          line-height: 1.7;
          max-width: 32rem;
          margin: 0;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 24rem;
        }

        .cta-primary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
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
          font-family: inherit;
          width: 100%;
        }

        .cta-primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
          background: #1e293b;
        }

        .cta-secondary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          color: #0f172a;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-size: 1.125rem;
          font-weight: 600;
          border: 1px solid rgba(226, 232, 240, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          font-family: inherit;
          width: 100%;
        }

        .cta-secondary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(6, 182, 212, 0.2);
        }

        .cta-button-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .cta-button-arrow {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-secondary-button:hover .cta-button-arrow {
          transform: translateX(0.25rem);
        }

        .cta-trust-indicators {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(226, 232, 240, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
          max-width: 32rem;
          width: 100%;
        }

        .cta-trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .cta-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
        }

        .cta-trust-icon-container {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cta-trust-item:hover .cta-trust-icon-container {
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .cta-trust-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-trust-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          margin: 0;
        }

        /* Responsividade */
        @media (max-width: 1023px) {
          .cta-top-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .cta-title-section {
            justify-content: center;
            text-align: center;
          }
          
          .cta-image-container {
            max-width: 400px;
          }
        }

        @media (max-width: 640px) {
          .cta-section {
            padding: 2rem 1rem;
          }
          
          .cta-buttons {
            flex-direction: column;
          }
          
          .cta-trust-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default CTASection
