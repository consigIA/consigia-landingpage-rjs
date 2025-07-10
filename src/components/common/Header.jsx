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
        window.scrollTo({ 
          top: sectionTop - headerHeight, 
          behavior: 'smooth' 
        });
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
          className={`bg-gradient-to-r from-slate-900 to-blue-950 hover:from-blue-950 hover:to-slate-900 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden group text-sm md:text-base ${
            location.pathname === item.path ? 'ring-2 ring-blue-400' : ''
          }`}
        >
          <span className="relative z-10">{item.label}</span>
        </button>
      );
    }

    const isActive = location.pathname === item.path && !item.targetId;
    return (
      <Link
        to={item.targetId ? `${item.path}#${item.targetId}` : item.path}
        onClick={(e) => handleNavClick(e, item.path, item.targetId)}
        className={`text-blue-950 hover:text-cyan-500 transition-all duration-300 hover:scale-105 relative group font-medium ${
          isActive ? 'text-cyan-500' : ''
        }`}
      >
        {item.label}
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/85 backdrop-blur-xl shadow-lg border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-16">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="/logo.png"
                alt="Logo do site"
                width="32"
                height="32"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 transition-transform duration-300 hover:scale-110"
              />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-950">
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
            {navItems.slice(0, 2).map((item, index) => (
              <div key={`tablet-${item.path}-${item.targetId || index}`}>
                {renderNavItem(item)}
              </div>
            ))}
            {renderNavItem(navItems[2])}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-950 hover:text-cyan-500 transition-colors duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}
        >
          <div className="py-3 sm:py-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm rounded-b-xl border-t border-gray-200/50">
            {navItems.map((item, index) => (
              <div key={`mobile-${item.path}-${item.targetId || index}`} className="px-3 sm:px-4">
                {item.isButton ? (
                  <button
                    onClick={(e) => {
                      handleNavClick(e, item.path);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    {item.label}
                  </button>
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