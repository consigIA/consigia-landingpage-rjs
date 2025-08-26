import { useState, useEffect, useMemo } from 'react'
import { ArrowRight, Sparkles, Bot, Zap } from 'lucide-react'
import { SiWhatsapp } from "react-icons/si"

const HeroSection = () => {
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const words = useMemo(() => [
    'Atendimento totalmente automatizado e customizado.',
    'Transforme visitantes em clientes satisfeitos.',
    'Vendas 24 horas/7 dias por semana.',
    'Suporte instantâneo para seus clientes.'
  ], [])

  // Enhanced typing animation with word rotation
  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isTyping && typedText.length < currentWord.length) {
      // Digitando a palavra
      const timeout = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    } else if (isTyping && typedText.length === currentWord.length) {
      // Palavra completamente digitada, aguarda e depois apaga
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 2000) // Aguarda 2 segundos antes de começar a apagar
      return () => clearTimeout(timeout)
    } else if (!isTyping && typedText.length > 0) {
      // Apagando a palavra
      const timeout = setTimeout(() => {
        setTypedText(typedText.slice(0, -1))
      }, 40) // Apaga mais rápido que digita
      return () => clearTimeout(timeout)
    } else if (!isTyping && typedText.length === 0) {
      // Palavra completamente apagada, vai para próxima palavra
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      setIsTyping(true)
    }
  }, [typedText, isTyping, currentWordIndex, words])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [

  ]

  return (
    <section
      id="inicio"
      className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 relative overflow-hidden inset-0 bg-slate-900"
    >
      {/* Container do conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        {/* Coluna da esquerda (texto) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="text-left space-y-4 sm:space-y-6">
            {/* Badge melhorado */}
            <div
              className={`inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400/80 font-semibold text-sm tracking-wider uppercase">
                Melhore seus atendimentos em 100%
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] transition-all duration-1000 animation-delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              Prazer,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ConsigIA
              </span>
            </h1>

            {/* Typing Animation melhorada */}
            <div
              className={`h-12 sm:h-16 flex items-center transition-all duration-1000 animation-delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <p className="text-xl md:text-2xl text-white font-medium">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p
              className={`text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg transition-all duration-1000 animation-delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              A ConsigIA oferece tudo para seu negócio vender mais e manter seus
              clientes mais que satisfeitos com tecnologia de ponta
            </p>

            {/* Feature Pills */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-1000 animation-delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <feature.icon className={`h-4 w-4 ${feature.color}`} />
                  <span className="text-white text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Botões menores */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 animation-delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <button
                onClick={() =>
                  window.open(
                    'https://wa.me/554999957692?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20ConsigIA',
                    '_blank'
                  )
                }
                className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <SiWhatsapp className="mr-2 h-5 w-5 relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Contrate agora!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Coluna da direita (imagem) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div
            className={`relative group transition-all duration-1000 animation-delay-1200 w-full max-w-lg lg:max-w-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {/* Main image container */}
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-2 sm:p-4 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300">
              <img
                src="/foto1.png"
                className="w-full rounded-2xl transform group-hover:scale-105 transition-transform duration-500 shadow-2xl"
                alt="ConsigIA Interface"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
      `}</style>
    </section>
  )
}

export default HeroSection