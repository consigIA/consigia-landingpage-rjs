import { useState, useEffect } from 'react'
import { TrendingUp, Clock, Star, Zap } from 'lucide-react'

const StatCard = ({ stat, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer transition-all duration-500 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
        perspective: '1000px'
      }}
    >
      {/* Main card */}
      <div
        className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{
          transform: isHovered ? 'rotateX(1deg) rotateY(1deg)' : 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Icon container */}
        <div className={`relative mb-4 transition-all duration-500 ${isHovered ? 'scale-105 rotate-3' : 'scale-100 rotate-0'
          }`}>
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg sm:rounded-xl">
            <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
          </div>
        </div>

        {/* Number */}
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {stat.number}
          </span>
        </div>

        {/* Label */}
        <div className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

const StatsSection = () => {
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

    const element = document.getElementById('stats')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: '100%', label: 'Redução de Custos', icon: TrendingUp },
    { number: '24h', label: 'Disponibilidade', icon: Clock },
    { number: '200%', label: 'Aumento em Vendas', icon: Star },
    { number: '48h', label: 'Implantação', icon: Zap }
  ]

  return (
    <section id="stats" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background matching BenefitsSection */}
      <div className="absolute inset-0 bg-slate-900"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-block mb-4">
            <span className="text-cyan-400/80 text-base sm:text-lg font-semibold tracking-wider uppercase">
              Resultados
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4">
            Resultados{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Impressionantes
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-14">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
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

export default StatsSection