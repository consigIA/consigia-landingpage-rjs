import { useState, useEffect, useRef, useCallback } from 'react'
import { Bot, User, RefreshCw } from 'lucide-react'
import { SiWhatsapp } from "react-icons/si"

const chatMessages = [
  {
    id: 1,
    type: 'user',
    content: 'Olá! Preciso de ajuda com empréstimo usando FGTS. Tenho algumas dúvidas sobre como funciona e se vale a pena.'
  },
  {
    id: 2,
    type: 'bot',
    content: 'Olá! Fico feliz em ajudá-lo! O empréstimo com garantia do FGTS é uma excelente opção para quem está trabalhando com carteira assinada. Para começar, você tem mais de 3 anos de trabalho na mesma empresa?'
  },
  {
    id: 3,
    type: 'user',
    content: 'Sim, trabalho na mesma empresa há 5 anos. Estou interessado em fazer uma reforma na minha casa.'
  },
  {
    id: 4,
    type: 'bot',
    content: 'Perfeito! Com 5 anos de empresa, você tem condições muito boas para o empréstimo. Qual o valor aproximado do seu saldo no FGTS? Com essa informação posso calcular exatamente quanto você pode solicitar.'
  },
  {
    id: 5,
    type: 'user',
    content: 'Tenho cerca de R$ 45.000,00 no FGTS. Preciso de uns R$ 30.000 para a reforma. Será que consigo?'
  },
  {
    id: 6,
    type: 'bot',
    content: 'Excelente! Com um saldo de R$ 45.000,00 no FGTS, você pode usar até 40% como garantia. Para R$ 30.000,00, as parcelas ficariam em torno de R$ 450,00 mensais em 84 meses. O FGTS serve como garantia, reduzindo muito os juros!'
  },
  {
    id: 7,
    type: 'user',
    content: 'Que bom! E quais são as vantagens desse empréstimo comparado a outros?'
  },
  {
    id: 8,
    type: 'bot',
    content: 'Ótima pergunta! O empréstimo com garantia do FGTS tem várias vantagens: ✓ Juros mais baixos (a partir de 1,49% ao mês), ✓ Seu FGTS continua rendendo normalmente, ✓ Não compromete seu salário mensal, ✓ Aprovação mais rápida, ✓ Parcelas fixas até o final. Gostaria que eu faça uma simulação detalhada para você?'
  },
  {
    id: 9,
    type: 'user',
    content: 'Sim, por favor! Quero ver os detalhes da simulação.'
  },
  {
    id: 10,
    type: 'bot',
    content: 'Perfeito! Vou preparar sua simulação personalizada. Em poucos segundos você receberá uma proposta detalhada com todas as condições, prazos e valores. Nosso time de especialistas entrará em contato para finalizar o processo. Sua reforma está mais próxima do que imagina! 🏠✨'
  }
]

const ChatMessage = ({ message, isNew }) => {
  const isBot = message.type === 'bot'

  return (
    <div
      className={`flex items-start space-x-2 sm:space-x-3 ${isNew ? 'animate-slide-in' : ''
        } ${isBot ? 'justify-start' : 'justify-end'
        }`}
    >
      {isBot && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm ${isBot
        ? 'bg-slate-100 text-blue-950'
        : 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-blue-950 ml-8 sm:ml-12'
        }`}>
        <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
      </div>

      {!isBot && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-950" />
        </div>
      )}
    </div>
  )
}

const DemoSection = () => {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const sectionRef = useRef(null)
  const chatContainerRef = useRef(null)
  const animationTimeoutRef = useRef(null)

  const startChatAnimation = useCallback(() => {
    setVisibleMessages([])
    setIsRestarting(false)
    setIsTyping(false)
    setCurrentMessageIndex(0)

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    const animateNextMessage = (index) => {
      if (index >= chatMessages.length) {
        // All messages sent, restart after delay
        animationTimeoutRef.current = setTimeout(() => {
          setIsRestarting(true)
          setTimeout(() => {
            startChatAnimation()
          }, 2000)
        }, 6000) // Aguarda mais tempo antes de reiniciar
        return
      }

      const message = chatMessages[index]

      // Show typing indicator for bot messages
      if (message.type === 'bot' && index > 0) {
        setIsTyping(true)
        setCurrentMessageIndex(index)
      }

      // Add message after delay
      animationTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(prev => [...prev, { ...message, isNew: true }])
        setCurrentMessageIndex(index + 1)

        // Auto-scroll to bottom
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
          }
        }, 100)

        // Remove isNew flag after animation
        setTimeout(() => {
          setVisibleMessages(prev =>
            prev.map(msg => ({ ...msg, isNew: false }))
          )
        }, 600)

        // Animate next message
        const nextDelay = index === 0 ? 1500 :
          message.type === 'bot' ? 2000 : 1500
        animationTimeoutRef.current = setTimeout(() => {
          animateNextMessage(index + 1)
        }, nextDelay)

      }, message.type === 'bot' && index > 0 ? 1500 : 500)
    }

    // Start animation
    animateNextMessage(0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)

            // Start initial chat animation
            setTimeout(() => {
              startChatAnimation()
            }, 1000)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [hasAnimated, startChatAnimation])

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-cyan-50 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">
            Exemplificação
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Que tal uma inteligência artificial integrada ao Whatsapp que possa te ajudar a encontrar o melhor empréstimo consignado?
          </p>
        </div>

        {/* Chat Demo */}
        <div
          className={`transform transition-all duration-1000 ease-out max-w-2xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <SiWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Assistente I.A</h3>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1.5 sm:mr-2"></div>
                      <span className="text-xs sm:text-sm text-blue-100">Online</span>
                    </div>
                  </div>
                </div>

                {/* Restart indicator */}
                {isRestarting && (
                  <div className="flex items-center text-slate-200 text-xs sm:text-sm">
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 animate-spin" />
                    <span className="hidden sm:inline">Reiniciando...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="p-6 h-96 overflow-y-auto bg-slate-50 scroll-smooth scrollbar-hide"
            >
              <div className="space-y-4">
                {visibleMessages.map((message) => (
                  <ChatMessage
                    key={`${message.id}-${currentMessageIndex}`}
                    message={message}
                    isNew={message.isNew}
                  />
                ))}
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center mt-3 sm:mt-4 animate-pulse">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-3 bg-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-500 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-500 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo restart message */}
              {isRestarting && (
                <div className="text-center py-6 sm:py-8">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-100 text-blue-950 rounded-full text-xs sm:text-sm font-medium">
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-spin" />
                    <span className="hidden sm:inline">Reiniciando demonstração...</span>
                    <span className="sm:hidden">Reiniciando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-1 bg-slate-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <span className="text-slate-500 text-xs sm:text-sm">Digite sua mensagem...</span>
                </div>
                <button className="bg-gradient-to-r from-slate-900 to-blue-950 hover:from-blue-950 hover:to-slate-900 text-white rounded-full p-1.5 sm:p-2 transition-all">
                  <SiWhatsapp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

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

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default DemoSection