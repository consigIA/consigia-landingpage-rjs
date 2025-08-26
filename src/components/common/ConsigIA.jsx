import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SiWhatsapp } from "react-icons/si";


const ConsigAIButton = () => {
  const [isVisible] = useState(true);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/554999957692?text=Ol%C3%A1!%20Gostaria%20de%20%20saber%20mais%20sobre%20o%20ConsigIA%20`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Conteúdo */}
      <div className="space-y-3">
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-4 rounded-full font-medium text-sm transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center gap-2 cursor-pointer animate-[soft-float_1s_ease-in-out_infinite] hover:animate-none"
        >
          <SiWhatsapp size={30} />
        </button>
      </div>
    </div>
  );
};

export default ConsigAIButton;