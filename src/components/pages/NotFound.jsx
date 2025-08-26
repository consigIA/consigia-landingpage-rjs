import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative max-w-xl w-full text-center">
        {/* Main Content */}
        <div className="bg-[#151B30]/50 backdrop-blur-sm rounded-3xl p-8 sm:p-10">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-6 bg-[#1E2642] rounded-2xl">
            <Search className="w-7 h-7 text-[#0EA5E9]" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Página não encontrada
          </h1>

          <p className="text-gray-400 text-base mb-8">
            Ops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 bg-[#1E2642] hover:bg-[#252D4A] text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Início</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar à Página Anterior</span>
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Você pode tentar:</p>
          <ul className="mt-2 space-y-1">
            <li>• Verificar se o endereço foi digitado corretamente</li>
            <li>• Retornar à página anterior</li>
            <li>• Ir para a página inicial</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
