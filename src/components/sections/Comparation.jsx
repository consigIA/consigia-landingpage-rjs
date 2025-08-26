import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ComparisonSlider = ({
  contentBefore,
  contentAfter,
  altBefore = "Antes",
  altAfter = "Depois",
  initialPosition = 50
}) => {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percentage)
  }, [isDragging])

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percentage)
  }, [isDragging])

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className="relative  w-full h-full overflow-hidden rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing transform hover:scale-[1.02] transition-transform duration-300"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Content After (Background) */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-sm p-2 sm:p-4 flex flex-col justify-center items-center text-center">
        <div className="bg-white/70 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 max-w-full max-h-full overflow-auto">
          {contentAfter}
        </div>
      </div>

      {/* Content Before (Foreground with clip) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="w-full h-full bg-gradient-to-br from-red-50 to-rose-100 backdrop-blur-sm p-2 sm:p-4 flex flex-col justify-center items-center text-center">
          <div className="bg-white/70 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 max-w-full max-h-full overflow-auto">
            {contentBefore}
          </div>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-lg z-10 cursor-col-resize"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-all duration-200 border-2 border-cyan-400">
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-blue-950 absolute left-1 sm:left-1.5" />
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-950 absolute right-1 sm:right-1.5" />
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-slate-900 to-blue-950 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-opacity duration-200"
        style={{ opacity: position > 10 ? 1 : 0 }}
      >
        {altBefore}
      </div>
      <div
        className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-slate-900 to-blue-950 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-opacity duration-200"
        style={{ opacity: position < 90 ? 1 : 0 }}
      >
        {altAfter}
      </div>
    </div>
  )
}

export default function Comparation() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const beforeContent = (
    <div className="w-full">
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-950 mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1.5 sm:gap-2">
        <span className="text-lg sm:text-xl lg:text-2xl">❌</span> Antes
      </h3>
      <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-slate-700 text-xs sm:text-sm lg:text-base">
        <li className="flex items-start gap-2">
          <span className="text-red-500 mt-1 font-bold text-xs sm:text-sm">×</span>
          <span><strong>Atendimento lento:</strong> Clientes aguardam horas para resposta</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-500 mt-1 font-bold text-xs sm:text-sm">×</span>
          <span><strong>Custos elevados:</strong> Equipe grande e gastos operacionais altos</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-500 mt-1 font-bold text-xs sm:text-sm">×</span>
          <span><strong>Erros humanos:</strong> Informações inconsistentes e retrabalho</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-red-500 mt-1 font-bold text-xs sm:text-sm">×</span>
          <span><strong>Horário limitado:</strong> Sem atendimento fora do expediente</span>
        </li>
      </ul>
    </div>
  )

  const afterContent = (
    <div className="w-full">
      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-950 mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1.5 sm:gap-2">
        <span className="text-lg sm:text-xl lg:text-2xl">✅</span> Depois
      </h3>
      <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-slate-700 text-xs sm:text-sm lg:text-base">
        <li className="flex items-start gap-2">
          <span className="text-green-500 mt-1 font-bold text-xs sm:text-sm">✓</span>
          <span><strong>Resposta instantânea:</strong> Atendimento imediato 24/7</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 mt-1 font-bold text-xs sm:text-sm">✓</span>
          <span><strong>Economia de 70%:</strong> Redução drástica nos custos operacionais</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 mt-1 font-bold text-xs sm:text-sm">✓</span>
          <span><strong>Precisão total:</strong> Respostas consistentes e personalizadas</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 mt-1 font-bold text-xs sm:text-sm">✓</span>
          <span><strong>Sempre disponível:</strong> Nunca perde uma oportunidade de venda</span>
        </li>
      </ul>
    </div>
  )

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-cyan-50 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-11 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Veja a transformação que nossa solução proporcionou aos nossos clientes!
          </p>
        </div>

        <div
          className={`transform transition-all duration-1000 max-w-2xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <ComparisonSlider
            contentBefore={beforeContent}
            contentAfter={afterContent}
            altBefore="Sem I.A"
            altAfter="Com I.A"
            initialPosition={50}
          />
        </div>
      </div>
    </section>
  )
}