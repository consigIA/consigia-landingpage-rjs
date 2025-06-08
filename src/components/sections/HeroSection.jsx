import { useState, useEffect } from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'

const HeroSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const fullText = 'Sua inteligência artificial, que vende e bate metas online.'

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else if (typedText.length === fullText.length) {
      setIsTyping(false)
    }
  }, [typedText, isTyping])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="inicio"
      className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="mb-8 animate-fade-in-down">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-4 transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
              ⚡ Reduza custos operacionais em até 73%
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Prazer,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              ConsigIA
            </span>
          </h1>

          <div className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto h-8 animate-fade-in-up animation-delay-300">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-lg text-gray-500 mb-8 animate-fade-in-up animation-delay-500">
            Feita para{' '}
            <span className="text-red-500 font-semibold animate-pulse">
              CORRESPONDENTES BANCÁRIOS ❤
            </span>
          </p>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-700">
            A ConsigIA oferece tudo para seu negócio vender mais e manter seus
            clientes 100% satisfeitos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <MessageCircle className="mr-2 h-5 w-5 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Ver IA em Ação</span>
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group">
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                Saiba Mais
              </span>
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Floating Testimonials */}
          <div className="mt-16 animate-fade-in-up animation-delay-1200">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2 animate-slide-up">
                {testimonials[currentTestimonial]}
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-blue-600 w-6'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
