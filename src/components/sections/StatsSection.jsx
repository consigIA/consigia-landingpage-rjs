import { useState, useEffect } from 'react'
import { TrendingUp, Clock, Star, Zap } from 'lucide-react'
import StatCard from '../ui/StatCard'

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
    { number: '73%', label: 'Redução de Custos', icon: TrendingUp },
    { number: '24/7', label: 'Disponibilidade', icon: Clock },
    { number: '300%', label: 'Aumento em Vendas', icon: Star },
    { number: '30min', label: 'Tempo de Setup', icon: Zap }
  ]

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 animate-gradient-x"
      id="stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
