import React, { useState, useEffect } from 'react'
import { Instagram, Mail, ArrowRight, ExternalLink, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const footerElement = document.querySelector('#footer')
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      url: 'https://www.instagram.com/consignado.ia?utm_source=qr'
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:atendimento@consigia.com.br'
    }
  ]

  const companyLinks = [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Cases de Sucesso', href: '/cases' },
    { label: 'Carreiras', href: '/carreiras' }
  ]

  const productLinks = [
    { label: 'Recursos', href: '/recursos' },
    { label: 'Preços', href: '/precos' },
    { label: 'Documentação', href: '/documentacao' },
    { label: 'Status', href: '/status' }
  ]

  const legalLinks = [
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Cookies', href: '/cookies' }
  ]

  return (
    <>
      <footer id="footer" className={`footer ${isVisible ? 'footer--visible' : ''}`}>
        <div className="footer__container">
          <div className="footer__content">
            
            {/* Brand Section */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="/logo.png" alt="ConsigIA Logo" className="footer__logo-image" />
                <div className="footer__logo-text">ConsigIA</div>
              </div>
              
              <p className="footer__description">
                Transformando o atendimento do setor financeiro com soluções de IA personalizadas.
                Automatize processos, reduza custos e aumente a satisfação dos seus clientes.
              </p>

              <div className="footer__social">
                {socialLinks.map(({ icon: Icon, label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={label}
                  >
                    <Icon className="footer__social-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer__nav">
              
              <div className="footer__nav-section">
                <h3 className="footer__nav-title">Empresa</h3>
                <ul className="footer__nav-list">
                  {companyLinks.map((link) => (
                    <li key={link.href} className="footer__nav-item">
                      <a href={link.href} className="footer__nav-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__nav-section">
                <h3 className="footer__nav-title">Produto</h3>
                <ul className="footer__nav-list">
                  {productLinks.map((link) => (
                    <li key={link.href} className="footer__nav-item">
                      <a href={link.href} className="footer__nav-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__nav-section">
                <h3 className="footer__nav-title">Contato</h3>
                <div className="footer__contact">
                  
                  <a href="mailto:atendimento@consigia.com.br" className="footer__contact-item">
                    <Mail className="footer__contact-icon" />
                    <span>atendimento@consigia.com.br</span>
                  </a>

                  <a href="https://wa.me/554999957692" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                    <Phone className="footer__contact-icon" />
                    <span>(49) 99995-7692</span>
                  </a>

                  <div className="footer__contact-item">
                    <MapPin className="footer__contact-icon" />
                    <span>Lages - SC</span>
                  </div>

                  <a 
                    href="https://app.consigia.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer__btn footer__btn--primary"
                  >
                    <span>Acessar Plataforma</span>
                    <ExternalLink className="footer__btn-icon" />
                  </a>

                </div>
              </div>

            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer__bottom">
            <div className="footer__bottom-content">
              <p className="footer__copyright">
                &copy; 2025 ConsigIA. Todos os direitos reservados.
              </p>
              
              <div className="footer__legal">
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href} className="footer__legal-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          padding: 80px 0 0;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .footer__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .footer__content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        @media (min-width: 1024px) {
          .footer__content {
            flex-direction: row;
            gap: 64px;
          }
        }

        /* Brand Section */
        .footer__brand {
          flex: 1;
          max-width: 400px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer--visible .footer__brand {
          opacity: 1;
          transform: translateY(0);
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .footer__logo-image {
          width: 40px;
          height: 40px;
        }

        .footer__logo-text {
          font-size: 22px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }

        .footer__description {
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .footer__social {
          display: flex;
          gap: 12px;
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #cbd5e1;
          transition: all 0.2s ease;
        }

        .footer__social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transform: translateY(-1px);
        }

        .footer__social-icon {
          width: 20px;
          height: 20px;
        }

        /* Navigation Section */
        .footer__nav {
          flex: 2;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
        }

        .footer--visible .footer__nav {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 640px) {
          .footer__nav {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer__nav {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .footer__nav-section {
          margin: 0;
        }

        .footer__nav-title {
          font-size: 14px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .footer__nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer__nav-item {
          margin: 0;
        }

        .footer__nav-link {
          display: block;
          color: #cbd5e1;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 0;
          transition: all 0.2s ease;
        }

        .footer__nav-link:hover {
          color: white;
          padding-left: 8px;
        }

        /* Contact Section */
        .footer__contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #cbd5e1;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 0;
          transition: all 0.2s ease;
        }

        .footer__contact-item:hover {
          color: white;
        }

        .footer__contact-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* Button */
        .footer__btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          text-decoration: none;
          margin-top: 16px;
        }

        .footer__btn--primary {
          background: #3b82f6;
          color: white;
        }

        .footer__btn--primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .footer__btn-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .footer__btn:hover .footer__btn-icon {
          transform: translateX(2px);
        }

        /* Bottom Section */
        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 64px;
          padding: 32px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .footer--visible .footer__bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .footer__bottom-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        @media (min-width: 640px) {
          .footer__bottom-content {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer__copyright {
          color: #94a3b8;
          font-size: 14px;
          margin: 0;
        }

        .footer__legal {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .footer__legal {
            justify-content: flex-end;
          }
        }

        .footer__legal-link {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer__legal-link:hover {
          color: white;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .footer {
            padding: 60px 0 0;
          }

          .footer__container {
            padding: 0 16px;
          }

          .footer__content {
            gap: 40px;
          }

          .footer__logo-text {
            font-size: 20px;
          }

          .footer__bottom {
            margin-top: 48px;
            padding: 24px 0;
          }
        }
      `}</style>
    </>
  )
}

export default Footer