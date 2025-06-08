import { useState, useEffect } from 'react'
import { MessageCircle, CheckCircle } from 'lucide-react'

const NotificationSection = () => {
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

    const element = document.getElementById('notification')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 animate-gradient-x relative overflow-hidden"
      id="notification"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div
          className={`bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl transform transition-all duration-1000 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-slow">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Receba notificações em tempo real pelo WhatsApp a cada venda feita
            pela IA!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Acompanhe todas as conversões e vendas realizadas pela nossa
            inteligência artificial em tempo real
          </p>

          {/* Animated notification examples */}
          <div className="mt-8 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 transform hover:scale-105 transition-all duration-300 animate-slide-in-right">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  🎉 Nova venda realizada! R$ 15.000 em FGTS
                </span>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transform hover:scale-105 transition-all duration-300 animate-slide-in-left animation-delay-500">
              <div className="flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">
                  💬 Cliente convertido em 3 minutos!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotificationSection
