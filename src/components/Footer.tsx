
import React from 'react';
import { Share } from 'lucide-react';

const Footer: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Alerta Ley de Lemas',
        text: '¿Sabías que con la Ley de Lemas tu voto puede elegir a alguien que no querías? Descubrí cómo funciona este sistema electoral.',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Comparte este link: ' + window.location.href);
    }
  };

  return (
    <footer className="bg-white border-t">
      <div className="container-padding max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">Ayudanos a difundir esta información</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Para fortalecer nuestra democracia, es esencial entender cómo funcionan los sistemas electorales y sus implicancias.
          </p>
          
          <button onClick={handleShare} className="button-primary mx-auto">
            <Share size={18} className="mr-2" />
            Compartir esta información
          </button>
        </div>
        
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 sm:mb-0">
            © 2025 · Alerta Democrática · Campaña de concientización ciudadana
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
