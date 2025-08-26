import { useState, useEffect } from 'react'
import { CheckCircle, TrendingUp, Users, Zap } from 'lucide-react'

const BenefitsSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Mock data dos benefícios
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumento de Vendas",
      description: "Converta mais visitantes em clientes com atendimento inteligente 24h"
    },
    {
      icon: Users,
      title: "Satisfação do Cliente",
      description: "Atendimento humanizado e eficiente que encanta seus clientes"
    },
    {
      icon: Zap,
      title: "Resposta Instantânea",
      description: "Nunca mais deixe um cliente esperando com nossa I.A sempre ativa"
    },
    {
      icon: CheckCircle,
      title: "Customização",
      description: "Sistema totalmente personalizado com base na sua necessidade"
    }
  ]

  // Componente BenefitCard inline
  const BenefitCard = ({ benefit, index, isVisible }) => (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
        <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{benefit.title}</h3>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{benefit.description}</p>
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
    <section id="beneficios" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-slate-900"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 relative z-10" >
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-block mb-4">
            <span className="text-cyan-400/80 text-base sm:text-lg font-semibold tracking-wider uppercase">
              Benefícios
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4">
            Sua atitude vai caminhar para uma{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              direção
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-14 cursor-pointer">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 animation-delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection