import { useState, useEffect } from 'react'
import { CheckCircle, TrendingUp, Users, Zap, ArrowRight, Star } from 'lucide-react'

const BenefitsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  // Dados dos benefícios melhorados
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumento de Vendas",
      description: "Converta mais visitantes em clientes com atendimento inteligente 24h que nunca falha",
      metric: "+127%",
      metricLabel: "Conversão média",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Users,
      title: "Satisfação do Cliente",
      description: "Atendimento humanizado e eficiente que encanta seus clientes em cada interação",
      metric: "98%",
      metricLabel: "Satisfação",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Nunca mais deixe um cliente esperando com nossa I.A sempre ativa e responsiva",
      metric: "<1s",
      metricLabel: "Tempo resposta",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: CheckCircle,
      title: "Customização Total",
      description: "Sistema totalmente personalizado e adaptado às necessidades únicas do seu negócio",
      metric: "100%",
      metricLabel: "Personalizável",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { value: "3+", label: "Empresas Confiantes" },
    { value: "100+", label: "Conversas Processadas" },
    { value: "99.9%", label: "Uptime Garantido" }
  ]

  const BenefitCard = ({ benefit, index, isVisible }) => (
    <div
      className={`benefit-card ${isVisible ? 'benefit-card-visible' : 'benefit-card-hidden'}`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="benefit-card-content">
        <div className={`benefit-icon-container bg-gradient-to-r ${benefit.color}`}>
          <benefit.icon className="benefit-icon" />
        </div>
        
        <div className="benefit-metric">
          <span className="benefit-metric-value">{benefit.metric}</span>
          <span className="benefit-metric-label">{benefit.metricLabel}</span>
        </div>
        
        <h3 className="benefit-title">{benefit.title}</h3>
        <p className="benefit-description">{benefit.description}</p>
        
        <div className="benefit-arrow">
          <ArrowRight className={`arrow-icon ${hoveredCard === index ? 'arrow-active' : ''}`} />
        </div>
      </div>
      
      <div className={`benefit-glow bg-gradient-to-r ${benefit.color}`}></div>
    </div>
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('beneficios')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="beneficios" className="benefits-section">
      {/* Background decorativo */}
      <div className="bg-decoration">
        <div className="bg-grid"></div>
        <div className="bg-gradient"></div>
      </div>

      <div className="benefits-container">
        {/* Grid de benefícios */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Section - Tema Claro */}
        <div className={`benefits-cta-section ${isVisible ? 'benefits-cta-visible' : 'benefits-cta-hidden'}`}>
          <div className="benefits-cta-content">
            <h3 className="benefits-cta-title">Ganhe conosco!</h3>
            <p className="benefits-cta-description">
              Junte-se a milhares de empresas que já transformaram seus resultados
            </p>
            <button className="benefits-cta-button">
              Começar Agora
              <ArrowRight className="benefits-cta-arrow" />
            </button>
          </div>
          <div className="benefits-cta-image">
            <img src="/foto1.png" alt="Dashboard da plataforma" className="dashboard-image" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .benefits-section {
          padding: 8rem 0 10rem;
          background: #0a0f1c;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }

        .bg-gradient {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 90% 10%, rgba(147, 51, 234, 0.06) 0%, transparent 50%);
          animation: gradientFloat 15s ease-in-out infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(4rem, 4rem); }
        }

        @keyframes gradientFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, -30px) rotate(1deg); }
          66% { transform: translate(30px, -20px) rotate(-1deg); }
        }

        .benefits-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }

        .benefits-header {
          text-align: center;
          margin-bottom: 5rem;
          max-width: 52rem;
          margin-left: auto;
          margin-right: auto;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .benefits-header-hidden {
          opacity: 0;
          transform: translateY(40px);
        }

        .benefits-header-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .benefits-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 2rem;
          padding: 0.5rem 1.25rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .benefits-badge:hover {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
          transform: scale(1.02);
        }

        .badge-icon {
          width: 1rem;
          height: 1rem;
          color: #3b82f6;
        }

        .badge-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: #93c5fd;
        }

        .benefits-title {
          font-size: clamp(2.75rem, 6vw, 4.5rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.02em;
        }

        .benefits-title-highlight {
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
        }

        .benefits-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.375rem);
          color: #94a3b8;
          line-height: 1.6;
          margin: 0 0 3rem 0;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          font-weight: 400;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 6rem;
        }

        .benefit-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(51, 65, 85, 0.3);
          border-radius: 1.5rem;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .benefit-card-content {
          padding: 2.5rem 2rem;
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .benefit-card:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(59, 130, 246, 0.4);
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(59, 130, 246, 0.1);
        }

        .benefit-card-hidden {
          opacity: 0;
          transform: translateY(60px);
        }

        .benefit-icon-container {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .benefit-card:hover .benefit-icon-container {
          transform: scale(1.1) rotate(5deg);
        }

        .benefit-icon {
          width: 2rem;
          height: 2rem;
          color: #ffffff;
          z-index: 2;
        }

        .benefit-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .benefit-metric-value {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .benefit-metric-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .benefit-description {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }

        .benefit-arrow {
          margin-top: 1.5rem;
          align-self: flex-end;
        }

        .arrow-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .arrow-active {
          color: #3b82f6;
          transform: translateX(4px);
        }

        /* CTA Section - Tema Claro */
        .benefits-cta-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 2rem;
          padding: 4rem;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        }

        .benefits-cta-hidden {
          opacity: 0;
          transform: translateY(40px);
        }

        .benefits-cta-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .benefits-cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .benefits-cta-description {
          font-size: 1.125rem;
          color: #475569;
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .benefits-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 0.75rem;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px 0 rgba(15, 23, 42, 0.15);
        }

        .benefits-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px 0 rgba(15, 23, 42, 0.25);
          background: #1e293b;
        }

        .benefits-cta-arrow {
          width: 1rem;
          height: 1rem;
          transition: transform 0.3s ease;
        }

        .benefits-cta-button:hover .cta-arrow {
          transform: translateX(4px);
        }

        .benefits-cta-image {
          position: relative;
        }

        .dashboard-image {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
        }

        @keyframes benefitFadeIn {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsividade aprimorada */
        @media (min-width: 1024px) {
          .benefits-container {
            padding: 0 3rem;
          }
          
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (min-width: 1280px) {
          .benefits-section {
            padding: 10rem 0 12rem;
          }
          
          .benefits-container {
            padding: 0 4rem;
          }
          
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }

        @media (max-width: 1023px) {
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-cta-section {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .stats-container {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .benefits-section {
            padding: 5rem 0 7rem;
          }
          
          .benefits-container {
            padding: 0 1.5rem;
          }
          
          .benefits-header {
            margin-bottom: 4rem;
          }

          .cta-section {
            padding: 3rem 2rem;
          }

          .stats-container {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .benefits-container {
            padding: 0 1rem;
          }
          
          .benefit-card-content {
            padding: 2rem 1.5rem;
          }

          .benefits-cta-section {
            padding: 2rem 1.5rem;
          }

          .stats-container {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default BenefitsSection