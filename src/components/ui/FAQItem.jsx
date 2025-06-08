import { ChevronDown } from 'lucide-react'

const FAQItem = ({ faq, index, isOpen, onClick, isVisible }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-lg group"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-blue-600 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <p className="text-gray-600 animate-fade-in">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default FAQItem
