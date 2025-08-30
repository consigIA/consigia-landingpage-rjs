import { useState, useRef, useEffect } from 'react'
import { Sparkles, CheckCircle, XCircle, Users, Clock, TrendingDown, Shield, Zap } from 'lucide-react'

export default function Comparation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('without')
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Clock,
      title: "Tempo de Resposta",
      without: "Horas ou dias para responder",
      with: "Resposta instantânea 24/7"
    },
    {
      icon: Users,
      title: "Equipe Necessária",
      without: "Grande equipe de atendentes",
      with: "Redução de até 80% da equipe"
    },
    {
      icon: TrendingDown,
      title: "Custos Operacionais",
      without: "Altos custos com salários",
      with: "Economia de até 70% nos custos"
    },
    {
      icon: Shield,
      title: "Qualidade do Atendimento",
      without: "Inconsistente, varia por pessoa",
      with: "Padronizado e sempre preciso"
    },
    {
      icon: Zap,
      title: "Disponibilidade",
      without: "Limitado ao horário comercial",
      with: "Disponível 24 horas por dia"
    }
  ]

  return (
    <>
      <section className="comparison-section" ref={sectionRef}>
        <div className="comparison-container">
          
          {/* Header with left-aligned title and right-aligned tabs */}
          <div className={`comparison-header ${isVisible ? 'visible' : ''}`}>
            <div className="comparison-header-content">
              <div className="comparison-title-section">
                <h2 className="comparison-main-title">
                  A Transformação Radical
                </h2>

                <p className="comparison-subtitle">
                  Descubra como empresas estão reinventando seu atendimento ao cliente com nossa ferramenta de ponta.
                </p>
              </div>

              {/* Toggle Tabs */}
              <div className="comparison-tabs">
                <div className="comparisontab-selector">
                  <button
                    className={`comparisontab-button ${activeTab === 'without' ? 'active' : ''}`}
                    onClick={() => setActiveTab('without')}
                    onMouseEnter={() => setHoveredCard(null)}
                  >
                    <XCircle className="comparison-tab-icon" />
                    <span>Método Tradicional</span>
                  </button>
                  <button
                    className={`comparisontab-button ${activeTab === 'with' ? 'active' : ''}`}
                    onClick={() => setActiveTab('with')}
                    onMouseEnter={() => setHoveredCard(null)}
                  >
                    <CheckCircle className="comparison-tab-icon" />
                    <span>Era ConsigIA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Comparison Grid */}
          <div className={`comparison-grid ${isVisible ? 'visible' : ''}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`comparison-feature-card ${activeTab === 'without' ? 'without-ai' : 'with-ai'} ${hoveredCard === index ? 'card-hovered' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    gridArea: `area${index + 1}`
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-inner">
                    <div className="comparison-feature-header">
                      <div className="comparison-feature-icon-wrapper">
                        <Icon className="comparison-feature-icon" />
                      </div>
                      <h3 className="comparison-feature-title">{feature.title}</h3>
                    </div>
                    
                    <div className="comparison-feature-content">
                      {activeTab === 'without' ? (
                        <div className="comparison-feature-description negative">
                          <XCircle className="comparison-status-icon negative-icon" />
                          <span>{feature.without}</span>
                        </div>
                      ) : (
                        <div className="comparison-feature-description positive">
                          <CheckCircle className="comparison-status-icon positive-icon" />
                          <span>{feature.with}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .comparison-section {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .comparison-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .comparison-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .comparison-header {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .comparison-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .comparison-header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
        }

        .comparison-title-section {
          flex: 1;
          text-align: left;
        }

        .comparison-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 8px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(8px);
        }

        .comparison-badge-icon {
          width: 16px;
          height: 16px;
          color: #ffffff;
        }

        .comparison-badge-text {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .comparison-main-title {
          font-size: clamp(2.5rem, 6vw, 3.25rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .comparison-main-title-highlight {
          color: #ffffff;
          position: relative;
          display: inline-block;
        }

        .comparison-main-title-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s ease 0.3s;
        }

        .comparison-header.visible .comparison-main-title-highlight::after {
          transform: scaleX(1);
        }

        .comparison-subtitle {
          font-size: clamp(1rem, 3vw, 1.125rem);
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          line-height: 1.6;
          font-weight: 400;
        }

        .comparison-tabs {
          display: flex;
          align-items: flex-start;
          flex-shrink: 0;
        }

        .comparisontab-selector {
          gap:4px;
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .comparisontab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .comparisontab-button.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
        }

        .comparisontab-button:hover:not(.active) {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
        }

        .comparison-tab-icon {
          width: 16px;
          height: 16px;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(3, auto);
          grid-template-areas: 
            "area1 area1 area2 area2 area3 area3"
            "area4 area4 area4 area5 area5 area5"
            "area4 area4 area4 area5 area5 area5";
          gap: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.2s;
        }

        .comparison-grid.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .comparison-feature-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s ease;
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .comparison-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .comparison-feature-card.without-ai {
          border-left: 3px solid #ef4444;
        }

        .comparison-feature-card.with-ai {
          border-left: 3px solid #10b981;
        }

        .comparison-feature-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .comparison-feature-icon-wrapper {
          width: 48px;
          height: 48px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .comparison-feature-icon {
          width: 24px;
          height: 24px;
          color: #06b6d4;
        }

        .comparison-feature-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .comparison-feature-content {
          margin-top: 16px;
        }

        .comparison-feature-description {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.5;
          font-weight: 400;
        }

        .comparison-feature-description.negative {
          color: #dc2626;
        }

        .comparison-feature-description.positive {
          color: #059669;
        }

        .comparison-status-icon {
          width: 18px;
          height: 18px;
          margin-top: 1px;
          flex-shrink: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .comparison-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .comparison-tabs {
            align-self: stretch;
          }

          .comparisontab-selector {
            width: 100%;
          }

          .comparison-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
              "area1 area2"
              "area3 area4"
              "area5 area5";
          }
        }

        @media (max-width: 768px) {
          .comparison-section {
            padding: 60px 0;
          }

          .comparison-container {
            padding: 0 20px;
          }

          .comparison-header {
            margin-bottom: 40px;
          }

          .comparison-header-content {
            gap: 20px;
          }

          .comparisontab-selector {
            flex-direction: column;
            gap: 4px;
            padding: 8px;
          }

          .comparisontab-button {
            width: 100%;
            justify-content: center;
          }

          .comparison-grid {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "area1"
              "area2"
              "area3"
              "area4"
              "area5";
            gap: 16px;
          }

          .comparison-feature-card {
            padding: 20px;
          }

          .comparison-feature-header {
            gap: 12px;
          }

          .comparison-feature-icon-wrapper {
            width: 40px;
            height: 40px;
          }

          .comparison-feature-icon {
            width: 20px;
            height: 20px;
          }

          .comparison-feature-title {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}