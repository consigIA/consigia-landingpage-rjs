import { useState, useEffect } from 'react'
import { MessageCircle, ArrowRight, Shield, Users, Zap } from 'lucide-react'

const CTASection = () => {
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
      { threshold: 0.1 }
    )

    const element = document.getElementById('cta')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const trustIndicators = [
    { icon: Shield, label: '100% Seguro' },
    { icon: Users, label: '+500 Clientes' },
    { icon: Zap, label: 'Setup Rápido' }
  ]

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      id="cta"
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Pronto para{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              revolucionar
            </span>{' '}
            suas vendas?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in-up animation-delay-300">
            Junte-se aos correspondentes bancários que já estão vendendo mais
            com nossa IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-500">
            <button className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <MessageCircle className="mr-2 h-5 w-5 relative z-10 group-hover:animate-spin" />
              <span className="relative z-10">Começar Agora</span>
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-110 transition-all duration-300 relative overflow-hidden">
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                Agendar Demonstração
              </span>
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-700">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <indicator.icon
                  className={`h-8 w-8 mx-auto mb-2 ${
                    index === 0
                      ? 'text-blue-400'
                      : index === 1
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  }`}
                />
                <p className="text-blue-100 text-sm">{indicator.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
