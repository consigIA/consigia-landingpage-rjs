import React, { useState, useEffect } from 'react'

const partners = [
  { name: 'Facta Financeira', logo: 'FACTA' },
  { name: 'V8 Digital', logo: 'V8' },
  { name: 'Paraná Banco', logo: 'PARANA' },
  { name: 'Hub Crédito', logo: 'HUB' },
]

const PartnerCard = ({ partner }) => {
  return (
    <div
      className="flex-shrink-0 w-48 sm:w-56 lg:w-64 group relative overflow-hidden"
    >
      {/* Updated card styling to match BenefitsSection */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl hover:border-cyan-400/50 transition-all duration-300 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center h-24 sm:h-28 lg:h-32">

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-95">
            <LogoDisplay name={partner.name} logo={partner.logo} />
          </div>
        </div>
      </div>
    </div>
  )
}

const logos = {
  'Facta Financeira': '/logo_facta.png',
  'V8 Digital': '/logo_v8.png',
  'Paraná Banco': '/logo_parana.png',
  'Hub Crédito': '/logo_hub.png',
}

const LogoDisplay = ({ name }) => {
  const logoSrc = logos[name] || '/logos/default.png'

  return (
    <div className="flex items-center justify-center p-2 sm:p-3 lg:p-4">
      <img
        src={logoSrc}
        alt={name}
        className="max-h-16 sm:max-h-24 lg:max-h-32 w-auto object-contain drop-shadow-xl transition-transform hover:scale-105"
        loading="lazy"
      />
    </div>
  )
}


const PartnerSection = () => {
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

    const element = document.getElementById('partners')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="partners" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background matching BenefitsSection */}
      <div className="absolute inset-0 bg-slate-900"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 relative z-10">
        {/* Header section with BenefitsSection styling */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-block mb-4">
            <span className="text-cyan-400/80 text-base sm:text-lg font-semibold tracking-wider uppercase">
              Integrações
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            APIs e{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Integrações
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-4">
            Integramos com as principais APIs do mercado financeiro:
          </p>
        </div>

        {/* Partners grid */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --scroll-duration: 20s;
        }
        
        @media (min-width: 640px) {
          :root {
            --scroll-duration: 25s;
          }
        }
        
        @media (min-width: 1024px) {
          :root {
            --scroll-duration: 30s;
          }
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll var(--scroll-duration, 30s) linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default PartnerSection