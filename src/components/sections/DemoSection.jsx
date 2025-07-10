import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, Bot, User, RefreshCw } from 'lucide-react'

const chatMessages = [
  {
    id: 1,
    type: 'user',
    content: 'Olá! Preciso de ajuda com empréstimo consignado. Estou com algumas dúvidas sobre como funciona e se vale a pena.'
  },
  {
    id: 2,
    type: 'bot',
    content: 'Olá! Fico feliz em ajudá-lo! O empréstimo consignado é uma das modalidades mais vantajosas do mercado. Para começar, você é aposentado, pensionista do INSS ou servidor público? Essa informação me ajudará a dar orientações mais precisas.'
  },
  {
    id: 3,
    type: 'user',
    content: 'Sim, sou aposentado pelo INSS há cerca de 3 anos. Recebo mensalmente e estou interessado em fazer uma reforma na minha casa.'
  },
  {
    id: 4,
    type: 'bot',
    content: 'Perfeito! Como aposentado do INSS, você tem direito ao consignado com as melhores condições. Qual o valor do seu benefício mensal? Com essa informação posso calcular exatamente quanto você pode solicitar e quais serão as parcelas.'
  },
  {
    id: 5,
    type: 'user',
    content: 'Meu benefício é de R$ 2.800,00 por mês. Preciso de uns R$ 50.000 para a reforma. Será que consigo?'
  },
  {
    id: 6,
    type: 'bot',
    content: 'Excelente! Com um benefício de R$ 2.800,00, você pode solicitar até R$ 98.000,00 (até 35x o valor do benefício). Para R$ 50.000,00, as parcelas ficariam em torno de R$ 580,00 mensais em 120 meses. Isso representa apenas 20% do seu benefício, mantendo folga no orçamento.'
  },
  {
    id: 7,
    type: 'user',
    content: 'Que bom! E quais são as vantagens do consignado comparado a outros empréstimos?'
  },
  {
    id: 8,
    type: 'bot',
    content: 'Ótima pergunta! O consignado tem várias vantagens: ✓ Juros mais baixos (a partir de 1,17% ao mês), ✓ Desconto direto no benefício (sem risco de inadimplência), ✓ Não precisa de avalista ou garantia, ✓ Aprovação mais rápida, ✓ Parcelas fixas até o final. Gostaria que eu faça uma simulação detalhada para você?'
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
      className={`flex items-start space-x-3 ${
        isNew ? 'animate-slide-in' : ''
      } ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
        isBot 
          ? 'bg-slate-100 text-blue-950' 
          : 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-blue-950 ml-12'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-4 w-4 text-blue-950" />
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
        }, 3000)
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
    <section className="py-20 px-8 bg-gradient-to-br from-slate-50 to-cyan-50 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Exemplificação
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Que tal uma inteligência artificial integrada ao Whatsapp que possa te ajudar a encontrar o melhor empréstimo consignado?
          </p>
        </div>

        {/* Chat Demo */}
        <div
          className={`transform transition-all duration-1000 max-w-2xl mx-auto ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-white">Assistente I.A</h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm text-blue-100">Online</span>
                    </div>
                  </div>
                </div>
                
                {/* Restart indicator */}
                {isRestarting && (
                  <div className="flex items-center text-slate-200 text-sm">
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    Reiniciando...
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
                <div className="flex items-center mt-4 animate-pulse">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-3 bg-slate-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo restart message */}
              {isRestarting && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-blue-950 rounded-full text-sm font-medium">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Reiniciando demonstração...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4 bg-white border-t border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-slate-100 rounded-full px-4 py-2">
                  <span className="text-slate-500 text-sm">Digite sua mensagem...</span>
                </div>
                <button className="bg-gradient-to-r from-slate-900 to-blue-950 hover:from-blue-950 hover:to-slate-900 text-white rounded-full p-2 transition-all">
                  <MessageCircle className="h-4 w-4" />
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