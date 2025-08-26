import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react'

// Dados das FAQs (você pode substituir pelos seus dados reais)
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
    question: "Qual o nível de personalização dos bots",
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
      className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
        >
          <span className="font-semibold text-blue-950 text-sm sm:text-base lg:text-lg pr-3 sm:pr-4">
            {faq.question}
          </span>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 transform transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transform transition-transform duration-200" />
            )}
          </div>
        </button>

        <div className={`transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
          <div className="px-4 sm:px-6 pb-4 sm:pb-5">
            <div className="pt-2 border-t border-slate-100">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2 sm:mt-3">
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
      { threshold: 0.3 }
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [hasAnimated])

  return (

    <section id="duvidas" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 bg-gradient-to-br from-slate-50 to-cyan-50 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center">
              <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 mb-3 sm:mb-4">
            Dúvidas Frequentes
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Ficou com alguma dúvida? Confira nossa seção de{' '}
            <span className="text-cyan-600 font-semibold">dúvidas frequentes</span>
            {' '}ou entre em contato com nossa equipe
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
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
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default FAQSection