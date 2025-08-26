import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Efeito principal para lidar com scroll
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

  // Função para rolar até a seção
  const scrollToSection = (targetId) => {
    if (!targetId) return;

    // Pequeno delay para garantir que o DOM está atualizado
    setTimeout(() => {
      const cleanId = targetId.startsWith('/') ? targetId.substring(1) : targetId;
      const section = document.getElementById(cleanId);

      if (section) {
        const headerHeight = 64;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = sectionTop - headerHeight - startPosition;
        const duration = 800; // Duração em milissegundos
        const startTime = performance.now();

        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function scrollAnimation(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

          if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
          }
        }

        requestAnimationFrame(scrollAnimation);
      }
    }, 100);
  };


  // Manipulador de clique genérico
  const handleNavClick = (e, path, targetId) => {
    e.preventDefault();

    if (location.pathname !== path) {
      navigate(path, {
        state: { scrollTo: targetId },
        replace: false
      });
    } else if (targetId) {
      scrollToSection(targetId);
    }
  };

  // Renderização dos itens de navegação
  const renderNavItem = (item) => {
    if (item.isButton) {
      return (
        <button
          onClick={(e) => handleNavClick(e, item.path)}
          className={`bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-5 py-1.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden group text-sm ${location.pathname === item.path ? 'ring-1 ring-cyan-300' : ''
            }`}
        >
          <span className="relative z-10">{item.label}</span>
        </button>
      );
    }

    if (item.isClientArea) {
      return (
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/80 backdrop-blur-sm border border-gray-200 text-blue-950 hover:bg-blue-950 hover:text-white px-5 py-1.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer text-sm"
        >
          {item.label}
        </a>
      );
    }

    const isActive = location.pathname === item.path && !item.targetId;
    return (
      <Link
        to={item.targetId ? `${item.path}#${item.targetId}` : item.path}
        onClick={(e) => handleNavClick(e, item.path, item.targetId)}
        className={`text-blue-950/90 hover:text-cyan-600 transition-all duration-300 relative group font-medium text-sm ${isActive ? 'text-cyan-600' : ''
          }`}
      >
        {item.label}
        <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left transform scale-x-0 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'group-hover:scale-x-100'
          }`}></span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-white/30"></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-16 relative">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 p-1">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <img
                  src="/logo.png"
                  alt="Logo do site"
                  width="32"
                  height="32"
                  className="w-8 h-8 sm:w-9 sm:h-9 relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              <div className="bg-gradient-to-r from-blue-950 to-cyan-800 bg-clip-text text-transparent text-base sm:text-lg lg:text-xl font-bold whitespace-nowrap transition-all duration-300 group-hover:from-cyan-600 group-hover:to-blue-600">
                ConsigIA
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <div key={`${item.path}-${item.targetId || index}`}>
                {renderNavItem(item)}
              </div>
            ))}
          </div>

          {/* Tablet Menu */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navItems.slice(0, 3).map((item, index) => (
              <div key={`tablet-${item.path}-${item.targetId || index}`}>
                {renderNavItem(item)}
              </div>
            ))}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-950 hover:text-cyan-500 transition-colors duration-300 p-1.5 rounded-md hover:bg-gray-100/50 ml-2 border border-gray-200"
              aria-label="Mais opções"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-950 hover:text-cyan-500 transition-colors duration-300 p-1.5 rounded-md hover:bg-gray-100/50 border border-gray-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed left-0 right-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            } ${isMenuOpen ? 'lg:hidden' : 'md:hidden'
            } overflow-hidden bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 z-40`}
        >
          <div className="py-4 sm:py-6 space-y-3 sm:space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item, index) => (
              <div key={`mobile-${item.path}-${item.targetId || index}`} className="px-3 sm:px-4">
                {item.isButton ? (
                  <button
                    onClick={(e) => {
                      handleNavClick(e, item.path);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium hover:shadow-md transition-all duration-300 text-sm"
                  >
                    {item.label}
                  </button>
                ) : item.isClientArea ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-white border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium hover:shadow-md transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.targetId ? `${item.path}#${item.targetId}` : item.path}
                    onClick={(e) => {
                      handleNavClick(e, item.path, item.targetId);
                      setIsMenuOpen(false);
                    }}
                    className="block text-blue-950 font-medium hover:text-cyan-500 transition-colors duration-300 py-2 rounded-lg hover:bg-white/50 text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;