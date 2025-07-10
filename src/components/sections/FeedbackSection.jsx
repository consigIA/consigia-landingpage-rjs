import { useState, useEffect } from 'react'
import { Star, Play, Pause, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideo, setActiveVideo] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      position: 'Gerente de Atendimento',
      company: 'TechCorp',
      rating: 5,
      text: 'A ConsigIA revolucionou nosso atendimento. Reduzimos o tempo de resposta em 80% e nossos clientes estão muito mais satisfeitos.',
      videoThumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b332446c?w=300&h=200&fit=crop&crop=face',
      hasVideo: true
    },
    {
      id: 2,
      name: 'João Santos',
      position: 'CEO',
      company: 'Inovação Digital',
      rating: 5,
      text: 'Implementação rápida e resultados imediatos. O bot desenvolvido pela ConsigIA superou todas nossas expectativas.',
      videoThumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=face',
      hasVideo: true
    },
    {
      id: 3,
      name: 'Ana Costa',
      position: 'Diretora Comercial',
      company: 'VendaMais',
      rating: 5,
      text: 'Aumentamos nossas vendas em 35% após implementar o sistema de automação. Investimento que se paga rapidamente.',
      videoThumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop&crop=face',
      hasVideo: true
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      position: 'Diretor de Marketing',
      company: 'Digital Plus',
      rating: 5,
      text: 'A qualidade do atendimento automatizado é impressionante. Nossos clientes nem percebem que estão falando com IA.',
      videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face',
      hasVideo: true
    }
  ]

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

    const element = document.getElementById('testimonials')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleVideoToggle = (testimonialId) => {
    setActiveVideo(activeVideo === testimonialId ? null : testimonialId)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section
      className="py-10 px-20 bg-gradient-to-br from-cyan-50 to-slate-50 relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
            O que Nossos{' '}
            <span className="bg-blue-950 bg-clip-text text-transparent">
              Clientes
            </span>{' '}
            Dizem
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Histórias reais de empresas que transformaram seu atendimento com nossas soluções
            de automação inteligente.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-900 to-blue-950"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Video Section */}
              <div className="relative group flex-shrink-0">
                <div className="relative w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={testimonials[currentTestimonial].videoThumbnail}
                    alt={`${testimonials[currentTestimonial].name} - ${testimonials[currentTestimonial].company}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent"></div>
                  
                  {/* Play Button */}
                  <button
                    onClick={() => handleVideoToggle(testimonials[currentTestimonial].id)}
                    className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                      {activeVideo === testimonials[currentTestimonial].id ? (
                        <Pause className="w-8 h-8 text-blue-950" />
                      ) : (
                        <Play className="w-8 h-8 text-blue-950 ml-1" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Company Badge */}
                <div className="absolute -bottom-4 left-4 bg-gradient-to-r from-slate-900 to-blue-950 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <Quote className="w-8 h-8 text-blue-950/20 mb-4 mx-auto md:mx-0" />
                
                <blockquote className="text-lg md:text-xl text-slate-700 mb-6 font-medium leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div>
                  <p className="font-bold text-blue-950 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-slate-600">
                    {testimonials[currentTestimonial].position} • {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {testimonials.filter((_, index) => index !== currentTestimonial).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={testimonial.videoThumbnail}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-100"
                  />
                  {testimonial.hasVideo && (
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-slate-900 to-blue-950 rounded-full p-1">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-blue-950 group-hover:text-slate-900 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600">{testimonial.position}</p>
                  <p className="text-sm font-medium text-blue-950">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-gradient-to-r from-slate-900 to-blue-950 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection