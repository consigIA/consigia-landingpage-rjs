import React, { useState, useEffect } from 'react'

const partners = [
  { name: 'Facta Financeira', logo: 'FACTA', needsFilter: false },
  { name: 'V8 Digital', logo: 'V8', needsFilter: true },
  { name: 'Paraná Banco', logo: 'PARANA', needsFilter: false },
  { name: 'Hub Crédito', logo: 'HUB', needsFilter: true },
]

const PartnerCard = ({ partner, index, isVisible }) => {
  return (
    <div className="partner-card">
      <div className="partner-card-inner">
        <LogoDisplay 
          name={partner.name} 
          logo={partner.logo} 
          needsFilter={partner.needsFilter}
        />
      </div>
    </div>
  )
}

const logos = {
  'Facta Financeira': '/logo_facta.png',
  'V8 Digital': '/logo_v8.png',
  'Paraná Banco': '/logo_parana.png',
  'Hub Crédito': '/logo_hub.png',
}

const LogoDisplay = ({ name, needsFilter }) => {
  const logoSrc = logos[name] || '/logos/default.png'

  return (
    <div className="partner-logo-container">
      <img
        src={logoSrc}
        alt={name}
        className={`partner-logo ${needsFilter ? 'partner-logo-filtered' : ''}`}
        loading="lazy"
      />
    </div>
  )
}

const PartnerSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('partners')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Duplicar os parceiros para animação infinita suave
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section id="partners" className="partner-section">
      
      <div className="partner-container">
        
        <div className={`partner-header ${isVisible ? 'partner-header-visible' : 'partner-header-hidden'}`}>

          <h2 className="partner-title">
            Nossos {' '}
            <span className="partner-title-highlight">aliados</span>
          </h2>

          <p className="partner-subtitle">
            Conectamos com as principais plataformas do mercado financeiro brasileiro
          </p>
        </div>

        <div className="partner-grid-wrapper">
          <div className="partner-grid">
            {duplicatedPartners.map((partner, index) => (
              <PartnerCard 
                key={`${partner.name}-${index}`}
                partner={partner} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Additional info section */}
        <div className={`partner-info ${isVisible ? 'partner-info-visible' : 'partner-info-hidden'}`}>
          <div className="partner-info-content">
            <p className="partner-info-text">
              <span className="partner-info-highlight">Integração completa</span> com APIs robustas, 
              webhooks em tempo real e suporte técnico especializado para garantir máxima performance.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .partner-section {
          padding: 6rem 0 8rem;
          background: #fafafa;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .partner-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.6) 50%, transparent 100%);
        }

        .partner-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .partner-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .partner-header-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .partner-header-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .partner-title {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
        }

        .partner-title-highlight {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .partner-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.25rem);
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .partner-grid-wrapper {
          overflow: hidden;
          position: relative;
        }

        /* Gradientes para desktop (scroll horizontal) */
        .partner-grid-wrapper::before,
        .partner-grid-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3rem;
          z-index: 10;
          pointer-events: none;
        }

        .partner-grid-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #fafafa 0%, rgba(250, 250, 250, 0.8) 60%, transparent 100%);
        }

        .partner-grid-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #fafafa 0%, rgba(250, 250, 250, 0.8) 60%, transparent 100%);
        }

        .partner-grid {
          display: flex;
          gap: 2rem;
          animation: scrollHorizontal 20s linear infinite;
          width: max-content;
        }

        @keyframes scrollHorizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scrollVertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }

        .partner-card {
          flex: 0 0 auto;
          width: 12rem;
        }

        .partner-card-inner {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.4);
          border-radius: 1.25rem;
          padding: 1rem;
          height: 7rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .partner-card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .partner-card:hover .partner-card-inner {
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .partner-card:hover .partner-card-inner::before {
          opacity: 1;
        }

        .partner-logo-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

        }

        .partner-logo {
          max-height: 100%;
          max-width: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .partner-logo-filtered {
          filter: brightness(0) saturate(100%);
        }

        .partner-card:hover .partner-logo {
          transform: scale(1.05);
        }

        .partner-info {
          margin-top: 4rem;
          text-align: center;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0.6s;
        }

        .partner-info-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .partner-info-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .partner-info-content {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.4);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
          max-width: 36rem;
          margin: 0 auto;
        }

        .partner-info-text {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        .partner-info-highlight {
          font-weight: 600;
          color: #0891b2;
        }

        /* Desktop Large */
        @media (min-width: 1024px) {
          .partner-container {
            padding: 0 3rem;
          }
          
          .partner-section {
            padding: 8rem 0 10rem;
          }
          
          .partner-card {
            width: 14rem;
          }
          
          .partner-card-inner {
            height: 8rem;
            padding: 2.5rem;
          }
        }

        @media (min-width: 1280px) {
          .partner-container {
            padding: 0 4rem;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .partner-section {
            padding: 4rem 0 6rem;
          }
          
          .partner-container {
            padding: 0 1.5rem;
          }
          
          .partner-header {
            margin-bottom: 3rem;
          }
          
          .partner-grid-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24rem; /* Altura fixa para mostrar 3 cards + gaps */
          }

          /* Gradientes para mobile (scroll vertical) */
          .partner-grid-wrapper::before,
          .partner-grid-wrapper::after {
            left: 0;
            right: 0;
            width: auto;
            height: 4rem;
          }

          .partner-grid-wrapper::before {
            top: 0;
            background: linear-gradient(to bottom, #fafafa 0%, rgba(250, 250, 250, 0.9) 70%, transparent 100%);
          }

          .partner-grid-wrapper::after {
            top: auto;
            bottom: 0;
            background: linear-gradient(to top, #fafafa 0%, rgba(250, 250, 250, 0.9) 70%, transparent 100%);
          }
          
          .partner-grid {
            flex-direction: column;
            animation: scrollVertical 15s linear infinite;
            gap: 1.5rem;
            align-items: center;
            height: calc(3 * 7rem + 2 * 1.5rem); /* 3 cards de 7rem + 2 gaps de 1.5rem */
          }
          
          .partner-card {
            width: 18rem;
            max-width: 18rem;
            min-width: 18rem;
            display: flex;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .partner-card-inner {
            height: 7rem;
            width: 100%;
            padding: 1.5rem;
          }
          
          .partner-info {
            margin-top: 3rem;
          }
          
          .partner-info-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .partner-container {
            padding: 0 1rem;
          }
          
          .partner-grid-wrapper {
            height: 20rem; /* Altura menor para telas pequenas */
          }
          
          .partner-grid-wrapper::before,
          .partner-grid-wrapper::after {
            height: 3.5rem;
          }
          
          .partner-grid {
            gap: 1rem;
            height: calc(3 * 5rem + 2 * 1rem); /* 3 cards de 5rem + 2 gaps de 1rem */
          }
          
          .partner-card {
            width: 16rem;
            max-width: 16rem;
            min-width: 16rem;
          }
          
          .partner-card-inner {
            height: 5rem;
            width: 100%;
            padding: 1rem;
          }
          
          .partner-badge {
            padding: 0.375rem 0.875rem;
          }
          
          .partner-badge-text {
            font-size: 0.6875rem;
          }
        }

        /* Pausa a animação no hover para melhor UX */
        .partner-grid:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default PartnerSection