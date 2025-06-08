import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { chatMessages } from '../data/chatMessages'
import ChatMessage from '../ui/ChatMessage'

const DemoSection = () => {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Reset and start animation when section becomes visible
            setVisibleMessages([])
            chatMessages.forEach((message, index) => {
              setTimeout(() => {
                setVisibleMessages(prev => [...prev, message])
              }, message.delay)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('demo')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gray-50 relative" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Veja o poder da nossa IA na prática!
          </h2>
          <p className="text-xl text-gray-600">
            Confira alguns dos nossos últimos atendimentos realizados pela IA
          </p>
        </div>

        <div
          className={`bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto transform transition-all duration-1000 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center mb-6 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                WhatsApp Business
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-ping"></div>
              </h3>
              <p className="text-sm text-gray-500">Online agora</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {visibleMessages.map((message, index) => (
              <ChatMessage key={index} message={message} index={index} />
            ))}
          </div>

          {/* Typing indicator */}
          {visibleMessages.length > 0 && (
            <div className="mt-4 flex items-center text-gray-500 animate-pulse">
              <div className="flex space-x-1 ml-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
              </div>
              <span className="ml-2 text-sm">IA está digitando...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DemoSection
