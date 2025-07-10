import React from 'react'
import { MessageCircle, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  const contactInfo = [
    { 
      icon: Instagram, 
      text: 'ConsinadoIA', 
      url: 'https://www.instagram.com/consignado.ia?utm_source=qr'
    },
    { 
      icon: Mail, 
      text: 'atendimento@consigia.com.br',
      url: 'mailto:atendimento@consigia.com.br'
    },
    { 
      icon: MessageCircle, 
      text: 'WhatsApp: (49) 99100-3408',
      url: 'https://wa.me/5549991003408'
    }
  ]

  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ConsigIA
            </div>
            <p className=" text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              A ConsigIA entrega atendimentos personalizados com I.A que otimizam o atendimento, reduzem custos operacionais e aumentam a satisfação do consumidor.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 lg:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">
              Entre em contato
            </h3>
            <div className="space-y-3">
              {contactInfo.map(({ icon, text, url }) => (
                <div key={text} className="flex items-center text-gray-300 text-sm sm:text-base lg:justify-end">
                  {React.createElement(icon, { className: "h-4 w-4 mr-3 flex-shrink-0 lg:order-2 lg:ml-3 lg:mr-0" })}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors duration-300 break-words inline-block lg:order-1"
                  >
                    {text}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; 2025 ConsigIA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer