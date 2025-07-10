import React, { useState, useEffect } from 'react'

const partners = [
  { name: 'Facta Financeira', logo: 'FACTA' },
  { name: 'Facta Financeira', logo: 'FACTA' },
  { name: 'Facta Financeira', logo: 'FACTA' },
  { name: 'Facta Financeira', logo: 'FACTA' },
  { name: 'Facta Financeira', logo: 'FACTA' },
]

const PartnerCard = ({ partner }) => {
  return (
    <div 
      className="flex-shrink-0 w-64 group relative overflow-hidden"
    >
      {/* Updated card styling to match BenefitsSection */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300 hover:transform hover:scale-95 p-8 flex flex-col items-center justify-center h-32">
        
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
  'C6 Consig': '/logos/c6consig.png',
  'Banco Pan': '/logos/bancopan.png',
  'Banco Daycoval': '/logos/daycoval.png',
  'Olé Consignado': '/logos/oleconsignado.png',
  'Facta Financeira': '/logo_facta.png',
  'Santander': '/logos/santander.png',
  'Itaú': '/logos/itau.png',
  'Mercantil': '/logos/mercantil.png',
  'BMG': '/logos/bmg.png',
  'Master': '/logos/master.png',
  'Banrisul': '/logos/banrisul.png',
  'BRB': '/logos/brb.png',
  'Mais': '/logos/mais.png',
  'Crefaz': '/logos/crefaz.png',
  'Digio': '/logos/digio.png',
}

const LogoDisplay = ({ name }) => {
  const logoSrc = logos[name] || '/logos/default.png'

  return (
    <div className="flex items-center justify-center p-4">
      <img
        src={logoSrc}
        alt={name}
        className="max-h-32 object-contain drop-shadow-xl transition-transform hover:scale-105"
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
    <section id="partners" className="py-20 relative overflow-hidden">
      {/* Background matching BenefitsSection */}
      <div className="absolute inset-0 bg-slate-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 relative z-10">
        {/* Header section with BenefitsSection styling */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="text-cyan-400/80 text-lg font-semibold tracking-wider uppercase">
              Portfólio
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Nosso{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              portfólio
            </span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Somos prestadores de serviços nas instituições abaixo:
          </p>
        </div>
        
        {/* Partners infinite scroll */}
        <div className="relative">
          {/* Enhanced fade gradients on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
          
          {/* Infinite scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <PartnerCard key={`first-${index}`} partner={partner} />
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <PartnerCard key={`second-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default PartnerSection