import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: "Como ajudar minha empresa a melhorar o atendimento ao cliente?",
    answer: "A ConsigIA desenvolve bots inteligentes que automatizam interações repetitivas, otimizam o tempo da equipe humana e garantem respostas rápidas e precisas 24/7. Isso melhora a experiência do cliente e reduz significativamente o custo por atendimento."
  },
  {
    id: 2,
    question: "O bot da ConsigIA pode ser integrado aos sistemas que já usamos?",
    answer: "Sim. Nossos bots podem ser integrados a CRMs, ERPs, plataformas de e-commerce, WhatsApp, sites, e-mails e diversos outros sistemas por meio de APIs, Webhooks e ferramentas como o N8N."
  },
  {
    id: 3,
    question: "Qual o nível de personalização dos bots?",
    answer: "Total. Cada bot é projetado com base nas necessidades, linguagem e processos específicos de cada empresa. O fluxo de conversação, integrações e automações são todos personalizados."
  },
  {
    id: 4,
    question: "Quais resultados posso esperar ao adotar um bot da ConsigIA?",
    answer: "Nossos clientes geralmente observam redução de até 70% na carga de atendimentos humanos, aumento da taxa de resposta em tempo real e melhorias no índice de satisfação do cliente (CSAT e NPS), além de maior controle sobre os dados do atendimento."
  },
  {
    id: 5,
    question: "É seguro utilizar a automação em processos que envolvem dados sensíveis?",
    answer: "Sim. Todas as soluções seguem rigorosos padrões de segurança, com criptografia de dados, autenticação em múltiplas camadas e adequação à LGPD. A ConsigIA trabalha apenas com provedores e plataformas confiáveis."
  },
  {
    id: 6,
    question: "Qual o suporte e acompanhamento oferecido após a entrega do bot?",
    answer: "Oferecemos suporte contínuo, manutenção, relatórios de performance e ajustes baseados na evolução do atendimento. Também disponibilizamos acompanhamento para treinar e ajustar o bot conforme o comportamento dos usuários."
  }
]

const FAQItem = ({ faq, isOpen, onToggle, isVisible, index }) => {
  return (
    <div
      className={`faq-item ${isVisible ? 'faq-item-visible' : 'faq-item-hidden'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="faq-card">
        <button
          onClick={onToggle}
          className="faq-button"
        >
          <span className="faq-question">
            {faq.question}
          </span>
          <div className="faq-icon-container">
            {isOpen ? (
              <ChevronUp className="faq-icon faq-icon-open" />
            ) : (
              <ChevronDown className="faq-icon faq-icon-closed" />
            )}
          </div>
        </button>

        <div className={`faq-answer-container ${isOpen ? 'faq-answer-open' : 'faq-answer-closed'}`}>
          <div className="faq-answer-content">
            <div className="faq-answer-divider">
              <p className="faq-answer-text">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="duvidas" className="faq-section" ref={sectionRef}>
      
      <div className="faq-container">
        
        <div className={`faq-header ${isVisible ? 'faq-header-visible' : 'faq-header-hidden'}`}>
          <h2 className="faq-title">
            Tire suas{' '}
            <span className="faq-title-highlight">dúvidas</span>
          </h2>

          <p className="faq-subtitle">
            Encontre respostas para as principais questões sobre nossa plataforma de automação
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        {/* CTA Bottom */}
        <div className={`faq-cta ${isVisible ? 'faq-cta-visible' : 'faq-cta-hidden'}`}>
          <div className="faq-cta-content">
            <h3 className="faq-cta-title">Ainda tem dúvidas?</h3>
            <p className="faq-cta-text">
              Nossa equipe está pronta para te ajudar a encontrar a melhor solução
            </p>
            <button
              onClick={() => window.open('https://wa.me/554999957692?text=Olá!%20Tenho%20algumas%20dúvidas%20sobre%20ConsigIA', '_blank')}
              className="faq-cta-button"
            >
              <MessageCircle className="faq-cta-button-icon" />
              <span>Falar com Especialista</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .faq-section {
          padding: 100px 0px;
          background: #fafafa;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.6) 50%, transparent 100%);
        }

        .faq-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-header-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .faq-header-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 50px;
          padding: 0.5rem 1rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .faq-badge-text {
          font-weight: 700;
          font-size: 0.75rem;
          color: #0f172a;
          letter-spacing: 0.1em;
        }

        .faq-title {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
        }

        .faq-title-highlight {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .faq-subtitle {
          font-size: clamp(1.125rem, 3vw, 1.25rem);
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .faq-grid {

          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .faq-item-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.4);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .faq-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
        }

        .faq-button {
          width: 100%;
          padding: 1.25rem 1.5rem; /* Reduzido de 1.5rem 2rem */
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .faq-button:hover {
          background: rgba(248, 250, 252, 0.8);
        }

        .faq-question {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.4;
          padding-right: 1rem;
          flex: 1; /* Garante que a pergunta ocupe o espaço disponível */
        }

        .faq-icon-container {
          flex-shrink: 0;
          width: 1.75rem; /* Reduzido de 2rem */
          height: 1.75rem; /* Reduzido de 2rem */
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .faq-card:hover .faq-icon-container {
          background: rgba(6, 182, 212, 0.15);
        }

        .faq-icon {
          width: 1rem;
          height: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-icon-open {
          color: #0891b2;
          transform: rotate(0deg);
        }

        .faq-icon-closed {
          color: #64748b;
          transform: rotate(0deg);
        }

        .faq-answer-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .faq-answer-open {
          max-height: 500px;
          opacity: 1;
        }

        .faq-answer-closed {
          max-height: 0;
          opacity: 0;
        }

        .faq-answer-content {
          padding: 0 1.5rem 1.25rem; /* Ajustado para combinar com o novo padding do botão */
        }

        .faq-answer-divider {
          padding-top: 1rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        .faq-answer-text {
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        .faq-cta {
          margin-top: 4rem;
          text-align: center;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0.6s;
        }

        .faq-cta-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .faq-cta-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-cta-content {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.4);
          border-radius: 1.25rem;
          padding: 3rem 2rem;
          backdrop-filter: blur(10px);
        }

        .faq-cta-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.75rem 0;
        }

        .faq-cta-text {
          font-size: 1rem;
          color: #64748b;
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }

        .faq-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #0f172a;
          color: white;
          padding: 0.875rem 1.75rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .faq-cta-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
          background: #1e293b;
        }

        .faq-cta-button-icon {
          width: 1.125rem;
          height: 1.125rem;
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .faq-container {
            padding: 0 200px;
          }
          
          .faq-section {
            padding: 8rem 0 10rem;
          }
          
          .faq-button {
            padding: 1.5rem 2rem; /* Reduzido de 2rem 2.5rem */
          }
          
          .faq-question {
            font-size: 1.25rem;
          }
          
          .faq-answer-content {
            padding: 60px 2rem 1.5rem; /* Ajustado para combinar com o novo padding do botão */
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .faq-button {
            padding: 1.125rem 1.5rem; /* Ajustado para ser mais compacto */
          }
          
          .faq-question {
            font-size: 1rem;
          }
          
          .faq-answer-content {
            padding: 0 1.5rem 1.125rem; /* Ajustado para combinar com o novo padding do botão */
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .faq-section {
            padding: 4rem 0 6rem;
          }
          
          .faq-container {
            padding: 0 1.5rem;
          }
          
          .faq-header {
            margin-bottom: 3rem;
          }
          
          .faq-button {
            padding: 1rem 1.25rem; /* Mais compacto em mobile */
          }
          
          .faq-answer-content {
            padding: 0 1.25rem 1rem; /* Ajustado para combinar com o novo padding do botão */
          }
          
          .faq-cta-content {
            padding: 2rem 1.5rem;
          }
          
          .faq-cta-button {
            width: 100%;
            justify-content: center;
            max-width: 16rem;
          }
        }

        @media (max-width: 480px) {
          .faq-container {
            padding: 0 1rem;
          }
          
          .faq-button {
            padding: 0.875rem 1rem; /* Mais compacto em telas muito pequenas */
          }
          
          .faq-question {
            font-size: 0.9375rem; /* Texto ligeiramente menor em mobile */
            padding-right: 0.75rem;
          }
          
          .faq-icon-container {
            width: 1.5rem;
            height: 1.5rem;
          }
          
          .faq-answer-content {
            padding: 0 1rem 0.875rem; /* Ajustado para combinar com o novo padding do botão */
          }
          
          .faq-badge {
            padding: 0.375rem 0.875rem;
          }
          
          .faq-badge-text {
            font-size: 0.6875rem;
          }
        }
      `}</style>
    </section>
  )
}

export default FAQSection