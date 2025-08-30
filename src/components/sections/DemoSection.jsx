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
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg backdrop-blur-md ring-1 ring-white/10">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
      )}

      <div className={`max-w-[75%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg ${isBot
        ? 'bg-white text-slate-800 border border-gray-200'
        : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white ml-8 sm:ml-12'
        }`}>
        <p className="text-xs sm:text-sm leading-relaxed font-medium">{message.content}</p>
      </div>

      {!isBot && (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg backdrop-blur-md ring-1 ring-white/10">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
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
        }, 6000)
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
    <>
      <section className="demo-section" ref={sectionRef}>
        <div className="demo-container">
          <div className={`demo-header ${isVisible ? 'demo-header--visible' : ''}`}>
            <h2 className="demo-title">
              Experimente na Prática
            </h2>
            <p className="demo-subtitle">
              Veja como nossa inteligência artificial integrada ao WhatsApp pode revolucionar seu atendimento
            </p>
          </div>

          {/* Chat Demo */}
          <div className={`demo-chat ${isVisible ? 'demo-chat--visible' : ''}`}>
            <div className="chat-container">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-content">
                  <div className="chat-header-info">
                    <div className="chat-avatar">
                      <SiWhatsapp className="chat-avatar-icon" />
                    </div>
                    <div className="chat-user-info">
                      <h3 className="chat-user-name">Assistente I.A</h3>
                      <div className="chat-status">
                        <div className="status-indicator"></div>
                        <span className="status-text">Online</span>
                      </div>
                    </div>
                  </div>

                  {/* Restart indicator */}
                  {isRestarting && (
                    <div className="restart-indicator">
                      <RefreshCw className="restart-icon" />
                      <span className="restart-text-full">Reiniciando...</span>
                      <span className="restart-text-short">...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={chatContainerRef} className="chat-messages">
                <div className="messages-container">
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
                  <div className="typing-indicator">
                    <div className="typing-avatar">
                      <Bot className="typing-bot-icon" />
                    </div>
                    <div className="typing-bubble">
                      <div className="typing-dots">
                        <div className="typing-dot typing-dot-1"></div>
                        <div className="typing-dot typing-dot-2"></div>
                        <div className="typing-dot typing-dot-3"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Demo restart message */}
                {isRestarting && (
                  <div className="restart-message">
                    <div className="restart-badge">
                      <RefreshCw className="restart-badge-icon" />
                      <span className="restart-badge-text-full">Reiniciando demonstração...</span>
                      <span className="restart-badge-text-short">Reiniciando...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="chat-input">
                <div className="chat-input-container">
                  <div className="input-field">
                    <span className="input-placeholder">Digite sua mensagem...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .demo-section {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .demo-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at top left, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .demo-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .demo-header--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .demo-title {
          font-size: clamp(2.5rem, 6vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .demo-subtitle {
          font-size: clamp(1rem, 3vw, 1.125rem);
          color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }

        .demo-chat {
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .demo-chat--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .chat-container {
          background: white;
          border-radius: 24px;
          border: 1px solid rgba(6, 182, 212, 0.1);
          overflow: hidden;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(6, 182, 212, 0.05);
        }

        .chat-header {
          background: #f1f5f9;
          border-bottom: 1px solid rgba(6, 182, 212, 0.1);
          padding: 18px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-header-info {
          display: flex;
          align-items: center;
        }

        .chat-avatar {
          width: 42px;
          height: 42px;
          background: linear-gradient(to right, #1e293b, #334155);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .chat-avatar-icon {
          width: 22px;
          height: 22px;
          color: #ffffff;
        }

        .chat-user-name {
          font-weight: 700;
          color: #1e293b;
          font-size: 16px;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }

        .chat-status {
          display: flex;
          align-items: center;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          margin-right: 8px;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .status-text {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
        }

        .restart-indicator {
          display: flex;
          align-items: center;
          color: white;
          font-size: 14px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
        }

        .restart-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          animation: spin 1s linear infinite;
        }

        .restart-text-short {
          display: block;
        }

        .restart-text-full {
          display: none;
        }

        .chat-messages {
          padding: 28px 24px;
          height: 420px;
          overflow-y: auto;
          background: #fafafa;
        }

        .messages-container {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          margin-top: 18px;
          animation: fadeIn 0.3s ease-in;
        }

        .typing-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .typing-bot-icon {
          width: 16px;
          height: 16px;
          color: white;
        }

        .typing-bubble {
          background: white;
          border-radius: 18px;
          padding: 12px 16px;
          border: 1px solid rgba(6, 182, 212, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-dot-1 {
          animation-delay: -0.32s;
        }

        .typing-dot-2 {
          animation-delay: -0.16s;
        }

        .typing-dot-3 {
          animation-delay: 0s;
        }

        .restart-message {
          text-align: center;
          padding: 32px 0;
        }

        .restart-badge {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
          color: white;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }

        .restart-badge-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          animation: spin 1s linear infinite;
        }

        .restart-badge-text-short {
          display: block;
        }

        .restart-badge-text-full {
          display: none;
        }

        .chat-input {
          padding: 20px 24px;
          background: #f1f5f9;
          border-top: 1px solid rgba(6, 182, 212, 0.1);
        }

        .chat-input-container {
          display: flex;
          align-items: center;
        }

        .input-field {
          flex: 1;
          background: white;
          border-radius: 24px;
          padding: 12px 18px;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .input-placeholder {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }

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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        /* Scrollbar customization */
        .chat-messages {
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 182, 212, 0.3) transparent;
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }

        /* Responsive Design */
        @media (min-width: 640px) {
          .restart-text-short {
            display: none;
          }

          .restart-text-full {
            display: block;
          }

          .restart-badge-text-short {
            display: none;
          }

          .restart-badge-text-full {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .demo-section {
            padding: 60px 0;
          }

          .demo-container {
            padding: 0 16px;
          }

          .demo-header {
            margin-bottom: 48px;
          }

          .chat-header {
            padding: 14px 18px;
          }

          .chat-avatar {
            width: 36px;
            height: 36px;
            border-radius: 12px;
          }

          .chat-avatar-icon {
            width: 18px;
            height: 18px;
          }

          .chat-user-name {
            font-size: 15px;
          }

          .status-text {
            font-size: 13px;
          }

          .chat-messages {
            padding: 20px 18px;
            height: 380px;
          }

          .messages-container {
            gap: 14px;
          }

          .typing-avatar {
            width: 28px;
            height: 28px;
            border-radius: 10px;
          }

          .typing-bot-icon {
            width: 14px;
            height: 14px;
          }

          .typing-bubble {
            padding: 10px 14px;
            border-radius: 16px;
          }

          .typing-dots {
            gap: 3px;
          }

          .typing-dot {
            width: 6px;
            height: 6px;
          }

          .chat-input {
            padding: 16px 18px;
          }

          .input-field {
            padding: 10px 16px;
            border-radius: 20px;
          }

          .input-placeholder {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  )
}

export default DemoSection