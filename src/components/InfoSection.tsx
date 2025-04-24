
import React from 'react';
import { Info } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div id="info" className="bg-gray-50 py-16">
      <div className="container-padding max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué pasa esto?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            La Ley de Lemas distorsiona la representación directa del voto ciudadano. Entendé cómo funciona y por qué es cuestionada.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-party-blue font-bold text-lg">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Acumulación de votos</h3>
            <p className="text-gray-700">
              Con la Ley de Lemas, los votos de todos los candidatos del mismo partido se suman como si fueran uno solo, incluso cuando representan propuestas muy diferentes.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-party-blue font-bold text-lg">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Ganador inesperado</h3>
            <p className="text-gray-700">
              Un candidato puede recibir individualmente menos votos que otro de un partido diferente, pero aun así ganar la elección gracias a los votos de sus compañeros de lema.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-party-blue font-bold text-lg">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Distorsión democrática</h3>
            <p className="text-gray-700">
              Este sistema puede llevar a resultados contradictorios con la voluntad popular, donde el candidato individualmente más votado no resulta ganador.
            </p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full shrink-0">
              <Info className="text-party-blue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">¿Dónde se aplica?</h3>
              <p className="text-gray-700 mb-4">
                La Ley de Lemas se aplica actualmente en varias provincias argentinas para elecciones provinciales y municipales, como Santa Cruz, Formosa, Misiones, San Luis y Santa Fe, entre otras.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-semibold mb-2">Consecuencias del sistema:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fragmentación política dentro de los partidos</li>
                  <li>Confusión en el electorado</li>
                  <li>Resultados que pueden contradecir la voluntad mayoritaria individual</li>
                  <li>Incentivo a la creación de múltiples candidaturas dentro de un mismo partido</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
