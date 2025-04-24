
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container-padding max-w-6xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-red-100 text-alert rounded-full animate-fade-in">
          <AlertTriangle size={18} className="mr-2" />
          <span className="font-medium">Alerta Democrática</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
          ¿Sabías que podés <span className="text-alert">perder... ganando</span>?
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Con la Ley de Lemas, tu voto puede terminar eligiendo a alguien que NO querías. Descubrí cómo funciona este sistema y por qué es controversial.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <a href="#simulador" className="button-primary">
            Probar el simulador
          </a>
          <a href="#info" className="button-secondary">
            ¿Por qué pasa esto?
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
