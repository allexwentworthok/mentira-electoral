
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import CandidateCard from '../components/CandidateCard';
import ResultModal from '../components/ResultModal';
import InfoSection from '../components/InfoSection';
import Footer from '../components/Footer';
import { useVoteSimulation } from '../hooks/useVoteSimulation';
import { InfoIcon } from 'lucide-react';

const Index = () => {
  const { candidates, simulateVote, isModalOpen, setIsModalOpen, result } = useVoteSimulation();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  const handleCandidateSelect = (id: string) => {
    setSelectedCandidateId(id);
    simulateVote(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeroSection />
      
      {/* Voting Simulator Section */}
      <div id="simulador" className="container-padding max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Simulador Electoral</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Elegí un candidato y descubrí qué sucede con tu voto bajo el sistema de Ley de Lemas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {candidates.map(candidate => (
            <CandidateCard 
              key={candidate.id}
              candidate={candidate}
              onSelect={handleCandidateSelect}
              isSelected={selectedCandidateId === candidate.id}
            />
          ))}
        </div>
        
        <div className="mt-12 p-5 bg-gray-50 rounded-lg max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full sm:mt-1">
              <span className="text-party-blue font-bold">
                <InfoIcon size={24} className="text-party-blue" />
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">¿Cómo funciona este simulador?</h4>
              <p className="text-gray-700">
                En este ejemplo simplificado, María (Lema B) obtiene individualmente un 45% de los votos, mientras que Juan y Pedro (ambos del Lema A) obtienen un 25% y 30% respectivamente. 
                Con la Ley de Lemas, los votos de Juan y Pedro se suman (55%), y gana Pedro por ser el más votado dentro del Lema A.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <InfoSection />
      
      <Footer />
      
      {/* Result Modal */}
      <ResultModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        result={result} 
      />
    </div>
  );
};

export default Index;
