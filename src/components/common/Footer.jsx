import { MessageCircle, Phone, Mail } from 'lucide-react'

const Footer = () => {
  const productLinks = [
    { href: '#', label: 'Funcionalidades' },
    { href: '#', label: 'Preços' },
    { href: '#', label: 'Integrações' },
    { href: '#', label: 'API' }
  ]

  const supportLinks = [
    { href: '#', label: 'Central de Ajuda' },
    { href: '#', label: 'Contato' },
    { href: '#', label: 'FAQ' },
    { href: '#', label: 'Tutoriais' }
  ]

  const contactInfo = [
    { icon: Phone, text: '(49) 99100-3408' },
    { icon: Mail, text: 'atendimento@consigia.com.br' },
    { icon: MessageCircle, text: 'WhatsApp: (49) 99100-3408' }
  ]

  const socialIcons = [{ icon: MessageCircle }, { icon: Phone }, { icon: Mail }]

  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="animate-fade-in-up">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ConsigIA
            </div>
            <p className="text-gray-400 mb-4">
              Inteligência artificial especializada em vendas para
              correspondentes bancários.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <social.icon className="h-5 w-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="animate-fade-in-up animation-delay-200">
            <h3 className="text-lg font-semibold mb-4 text-white">Produto</h3>
            <ul className="space-y-2 text-gray-400">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="animate-fade-in-up animation-delay-400">
            <h3 className="text-lg font-semibold mb-4 text-white">Suporte</h3>
            <ul className="space-y-2 text-gray-400">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up animation-delay-600">
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <div className="space-y-3 text-gray-400">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center hover:text-white transition-colors duration-300 group"
                >
                  <contact.icon className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up animation-delay-800">
          <p>&copy; 2025 ConsigIA. Todos os direitos reservados.</p>
          {/* <p className="mt-2 text-sm">
            Desenvolvido com ❤️ para correspondentes bancários
          </p> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
