import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const initialRender = useRef(true);

  // Itens de navegação
  const navItems = [
    { label: 'Início', path: '/', targetId: 'inicio' },
    { label: 'Benefícios', path: '/', targetId: 'beneficios' },
    { label: 'Parceiros', path: '/', targetId: 'partners' },
    { label: 'Dúvidas', path: '/', targetId: 'duvidas' },
    { label: 'Notícias', path: '/noticias' },
    { label: 'Área do Cliente', path: 'https://app.consigia.com.br', isClientArea: true },
    { label: 'Seja Parceiro', path: '/formulario', isButton: true }
  ];

  // Fecha o menu quando a rota muda
  // Effect para detectar scroll e controlar visibilidade
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Efeito principal para lidar com scroll entre páginas
  useEffect(() => {
    // Se for a renderização inicial, não faz nada
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Se temos um hash na URL, rola para a seção
    if (location.hash) {
      const targetId = location.hash.substring(1);
      scrollToSection(targetId);
    }
    // Se estamos em uma nova página (sem state.scrollTo), rola para o topo
    else if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
    }

    // Se temos state.scrollTo, rola para a seção
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
    }
  }, [location.pathname, location.hash, location.state]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header com background quando rolar
      setScrolled(currentScrollY > 10);
      
      // Esconder/mostrar header baseado na direção do scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - esconder header
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        // Scrolling up - mostrar header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Função para rolar até a seção com animação customizada suave
  const scrollToSection = (targetId) => {
    if (!targetId) return;

    setTimeout(() => {
      const cleanId = targetId.startsWith('/') ? targetId.substring(1) : targetId;
      const section = document.getElementById(cleanId);

      if (section) {
        const headerHeight = 80;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = sectionTop - headerHeight - startPosition;
        const duration = 1200; // Duração mais longa para suavidade
        const startTime = performance.now();

        // Função de easing mais suave
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function scrollAnimation(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

          if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
          }
        }

        requestAnimationFrame(scrollAnimation);
      }
    }, 100);
  };

  // Manipulador de clique com navegação real
  const handleNavClick = (e, path, targetId, isExternal = false) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    // Se estamos na mesma página e tem targetId, faz scroll
    if (location.pathname === path && targetId) {
      scrollToSection(targetId);
    }
    // Se é uma página diferente, navega
    else if (location.pathname !== path) {
      if (targetId) {
        // Navega para a página com state para scroll posterior
        navigate(path, {
          state: { scrollTo: targetId },
          replace: false
        });
      } else {
        // Navega normalmente (como para /noticias)
        navigate(path);
      }
    }
    // Se estamos na mesma página mas sem targetId, scroll para o topo
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${isVisible ? 'header--visible' : 'header--hidden'}`}>
        <div className="header__container">
          <div className="header__content">
            
            {/* Logo */}
            <div className="header__logo">
              <button 
                className="header__logo-link"
                onClick={(e) => handleNavClick(e, '/', 'inicio')}
              >
                  <img 
                    src="/logo.png" 
                    alt="ConsigIA" 
                    className="header__logo-image"
                  />
                <div className="header__logo-text">
                  ConsigIA
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                {navItems.slice(0, -2).map((item, index) => (
                  <li key={index} className="header__nav-item">
                    <button
                      className="header__nav-link"
                      onClick={(e) => handleNavClick(e, item.path, item.targetId)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="header__actions">
              <button
                className="header__btn header__btn--secondary"
                onClick={(e) => handleNavClick(e, navItems[5].path, null, true)}
              >
                <span>Área do Cliente</span>
                <ExternalLink className="header__btn-icon" />
              </button>
              
              <button
                className="header__btn header__btn--primary"
                onClick={(e) => handleNavClick(e, navItems[6].path)}
              >
                <span>Seja Parceiro</span>
                <ArrowRight className="header__btn-icon" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="header__mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
          <div className="header__mobile-content">
            <nav className="header__mobile-nav">
              {navItems.map((item, index) => (
                <div key={index} className="header__mobile-item">
                  {item.isButton ? (
                    <button
                      className="header__mobile-btn header__mobile-btn--primary"
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.label}
                      <ArrowRight className="header__mobile-btn-icon" />
                    </button>
                  ) : item.isClientArea ? (
                    <button
                      className="header__mobile-btn header__mobile-btn--secondary"
                      onClick={(e) => handleNavClick(e, item.path, null, true)}
                    >
                      {item.label}
                      <ExternalLink className="header__mobile-btn-icon" />
                    </button>
                  ) : (
                    <button
                      className="header__mobile-link"
                      onClick={(e) => handleNavClick(e, item.path, item.targetId)}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {isMenuOpen && (
          <div 
            className="header__backdrop"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 80px;
          transform: translateY(0);
        }

        .header--scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          border-bottom-color: rgba(0, 0, 0, 0.12);
        }

        .header--hidden {
          transform: translateY(-5px);
        }

        .header--visible {
          transform: translateY(0);
        }

        .header__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        /* Logo */
        .header__logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .header__logo-image {
          width: 40px;
          height: 40px;
        }

        .header__logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #1f2937;
          letter-spacing: -0.02em;
        }

        /* Desktop Navigation */
        .header__nav {
          display: none;
        }

        @media (min-width: 1024px) {
          .header__nav {
            display: block;
          }
        }

        .header__nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .header__nav-item {
          margin: 0;
        }

        .header__nav-link {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }

        .header__nav-link:hover {
          color: #1f2937;
          background: rgba(0, 0, 0, 0.04);
        }

        .header__nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: #3b82f6;
          border-radius: 1px;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .header__nav-link:hover::after {
          transform: scaleX(1);
        }

        /* Desktop Actions */
        .header__actions {
          display: none;
          align-items: center;
          gap: 12px;
        }

        @media (min-width: 1024px) {
          .header__actions {
            display: flex;
          }
        }

        .header__btn {
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
          white-space: nowrap;
        }

        .header__btn--secondary {
          background: white;
          color: #6b7280;
          border: 1px solid #e5e7eb;
        }

        .header__btn--secondary:hover {
          color: #1f2937;
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .header__btn--primary {
          background: #3b82f6;
          color: white;
        }

        .header__btn--primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .header__btn-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .header__btn:hover .header__btn-icon {
          transform: translateX(2px);
        }

        /* Mobile Toggle */
        .header__mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .header__mobile-toggle:hover {
          background: rgba(0, 0, 0, 0.04);
        }

        @media (min-width: 1024px) {
          .header__mobile-toggle {
            display: none;
          }
        }

        /* Hamburger Animation */
        .header__hamburger {
          position: relative;
          width: 20px;
          height: 16px;
        }

        .header__hamburger span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: #1f2937;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .header__hamburger span:nth-child(1) {
          top: 0;
        }

        .header__hamburger span:nth-child(2) {
          top: 7px;
        }

        .header__hamburger span:nth-child(3) {
          top: 14px;
        }

        .header__hamburger--open span:nth-child(1) {
          transform: rotate(45deg);
          top: 7px;
        }

        .header__hamburger--open span:nth-child(2) {
          opacity: 0;
        }

        .header__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg);
          top: 7px;
        }

        /* Mobile Menu */
        .header__mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          opacity: 0;
          visibility: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .header__mobile-menu--open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .header__mobile-content {
          padding: 24px;
        }

        .header__mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .header__mobile-item {
          opacity: 0;
          transform: translateY(20px);
          animation: slideIn 0.4s ease forwards;
        }

        .header__mobile-menu--open .header__mobile-item:nth-child(1) { animation-delay: 0.05s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(2) { animation-delay: 0.1s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(3) { animation-delay: 0.15s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(4) { animation-delay: 0.2s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(5) { animation-delay: 0.25s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(6) { animation-delay: 0.3s; }
        .header__mobile-menu--open .header__mobile-item:nth-child(7) { animation-delay: 0.35s; }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header__mobile-link {
          display: block;
          width: 100%;
          padding: 16px;
          background: none;
          border: none;
          text-align: left;
          color: #1f2937;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .header__mobile-link:hover {
          background: #f3f4f6;
          color: #3b82f6;
        }

        .header__mobile-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          margin-top: 8px;
        }

        .header__mobile-btn--secondary {
          background: #f9fafb;
          color: #6b7280;
          border: 1px solid #e5e7eb;
        }

        .header__mobile-btn--secondary:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        .header__mobile-btn--primary {
          background: #3b82f6;
          color: white;
        }

        .header__mobile-btn--primary:hover {
          background: #2563eb;
        }

        .header__mobile-btn-icon {
          width: 18px;
          height: 18px;
        }

        /* Backdrop */
        .header__backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .header__container {
            padding: 0 16px;
          }

          .header__logo-text {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .header__logo-text {
            display: none;
          }

          .header__logo-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;