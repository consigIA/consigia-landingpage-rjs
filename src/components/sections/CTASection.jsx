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
    { icon: Shield, label: '+ Segurança' },
    { icon: Users, label: '+ Clientes' },
    { icon: Zap, label: '+ Resultados' }
  ]

  return (
    <section
      className="py-20 px-14 bg-gradient-to-br from-slate-50 to-cyan-50 relative"
      id="cta"
    >


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 animate-fade-in-up">
            Pronto para{' '}
            <span className="bg-gradient-to-r from-slate-900 to-blue-950 bg-clip-text text-transparent">
              revolucionar
            </span>{' '}
            suas vendas?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Junte-se aos nossos parceiros que já estão faturando
            com nossa I.A
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-500">
            <button
              onClick={() =>
                window.open(
                  'https://wa.me/554999957692?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20ConsigIA',
                  '_blank'
                )
              }
              className="group bg-gradient-to-r from-slate-900 to-blue-950 hover:from-blue-950 hover:to-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-950 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <MessageCircle className="mr-2 h-5 w-5 relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10 cursor-pointer">Contrate Agora!</span>
            </button>

            <button
              onClick={() =>
                window.open(
                  'https://calendly.com/atendimento-consigia/30min'
                )
              }
            className="group bg-white border-2 border-slate-200 hover:border-blue-950 text-blue-950 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-lg">
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block cursor-pointer">
                Agendar Reunião
              </span>
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-700">
            <div className="grid grid-cols-3 gap-8">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <indicator.icon className="h-8 w-8 text-blue-950" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium">{indicator.label}</p>
                </div>
              ))}
            </div>
          </div>
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

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  )
}

export default CTASection