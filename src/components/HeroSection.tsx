
import React from 'react';
import { AlertTriangle } from 'lucide-react';


const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container-padding max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        {/* Texto */}
        <div className="md:w-1/2">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-red-100 text-alert rounded-full animate-fade-in mx-auto md:mx-0">
            <AlertTriangle size={18} className="mr-2" />
            <span className="font-medium">Mentira Electoral</span>
            <AlertTriangle size={18} className="ml-2" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
            ¿Sabías que podés <span className="text-alert">perder... ganando</span>?
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-md mb-8 animate-slide-up">
            Con la Ley de Lemas, tu voto puede terminar eligiendo a alguien que NO querías. Descubrí cómo funciona este sistema y por qué es controversial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center animate-slide-up">
            <a href="#simulador" className="button-primary">
              Probar el simulador
            </a>
            <a href="#info" className="button-secondary">
              ¿Por qué pasa esto?
            </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 mt-10 md:mt-0 animate-fade-in">
          <img
            src="/image-2.png"
            alt="Ley de Lemas"
            className="mx-auto md:mx-0"
            style={{ animationDelay: '0.1s' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;