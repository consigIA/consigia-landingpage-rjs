import { useState, useEffect } from 'react'
import { faqs } from '../data/faqs'
import FAQItem from '../ui/FAQItem'

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null)
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

    const element = document.getElementById('faq')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FAQs
          </h2>
          <p className="text-xl text-gray-600">
            Ficou com alguma dúvida? Confira nossa seção de dúvidas frequentes
            ou entre em contato com nossa equipe
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
