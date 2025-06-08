import { useState, useEffect } from 'react'
import { X, CheckCircle, Zap } from 'lucide-react'

const HowItWorksSection = () => {
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

    const element = document.getElementById('como-funciona')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const beforeItems = [
    'Captação manual de clientes',
    'Atendimento limitado por horário',
    'Altos custos com equipe',
    'Perdas de vendas por falta de agilidade'
  ]

  const afterItems = [
    'IA converte automaticamente',
    'Atendimento 24/7 sem parar',
    'Redução de até 73% nos custos',
    'Conversão instantânea e eficiente'
  ]

  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Compare os fluxos e veja
          </h2>
          <p className="text-xl text-gray-600">
            Você capta os clientes e deixa a conversão com nossa IA
            especializada!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Before */}
          <div
            className={`bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-red-800 mb-6 text-center flex items-center justify-center">
              <X className="mr-2 h-6 w-6" />
              Antes
            </h3>
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center animate-slide-in-left"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 animate-pulse">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div
            className={`bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center flex items-center justify-center">
              <CheckCircle className="mr-2 h-6 w-6" />
              Com ConsigIA
            </h3>
            <div className="space-y-4">
              {afterItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center animate-slide-in-right"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 animate-bounce-slow">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-16 bg-white rounded-2xl p-8 text-center shadow-xl transform transition-all duration-1000 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } animation-delay-1000`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Implantação em até 30 minutos
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            É só cadastrar seu número de WhatsApp oficial ou escanear seu QR
            code de WhatsApp não oficial em nossa plataforma que a IA já tomará
            conta dos seus atendimentos
          </p>
          <div className="mt-8">
            <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Sua operação continua funcionando como antes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
