import React from 'react'
import { Instagram, Mail } from 'lucide-react'
import { SiWhatsapp } from "react-icons/si"

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
      icon: SiWhatsapp,
      text: 'WhatsApp: (49) 99995-7692',
      url: 'https://wa.me/554999957692'
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-950 text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="ConsigIA Logo" className="w-8 h-8" />
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ConsigIA
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              Transformando o atendimento do setor financeiro com soluções de IA personalizadas.
              Automatize processos, reduza custos e aumente a satisfação dos seus clientes.
            </p>
            <div className="flex space-x-4 pt-2">
              {contactInfo.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors duration-300"
                >
                  {React.createElement(icon, { className: "h-5 w-5 text-gray-300" })}
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a href="/sobre" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Sobre Nós</a>
              </li>
              <li>
                <a href="/cases" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Cases de Sucesso</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Blog</a>
              </li>
              <li>
                <a href="/carreiras" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Carreiras</a>
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Produto</h3>
            <ul className="space-y-3">
              <li>
                <a href="/recursos" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Recursos</a>
              </li>
              <li>
                <a href="/precos" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Preços</a>
              </li>
              <li>
                <a href="/documentacao" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Documentação</a>
              </li>
              <li>
                <a href="/status" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Status</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:atendimento@consigia.com.br" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">atendimento@consigia.com.br</a>
              </li>
              <li>
                <a href="tel:+554999957692" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">(49) 99995-7692</a>
              </li>
              <li className="text-gray-300 text-sm">
                Lages - SC
              </li>
              <li>
                <a href="https://app.consigia.com.br" className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm text-white transition-colors duration-300">
                  <span>Acessar Plataforma</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2025 ConsigIA. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Termos de Uso
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer