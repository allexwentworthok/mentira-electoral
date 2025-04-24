
import { useState } from 'react';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  color: 'blue' | 'red' | 'green';
}

export interface SimulationResult {
  selectedCandidate: Candidate;
  winningCandidate: Candidate;
  explanation: string;
}

export const useVoteSimulation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  
  // Predefined candidates for the simulation
  const candidates: Candidate[] = [
    { id: '1', name: 'Juan', party: 'Lema A', color: 'blue' },
    { id: '2', name: 'Pedro', party: 'Lema A', color: 'red' },
    { id: '3', name: 'María', party: 'Lema B', color: 'green' }
  ];
  
  // In our simulation:
  // - Juan gets 25% of votes
  // - Pedro gets 30% of votes (same party/lema as Juan)
  // - María gets 45% of votes (different party/lema)
  // Under Ley de Lemas, votes for Juan and Pedro are combined because they're from the same party
  // So Lema A gets 55% total (25% + 30%), making Pedro the winner despite María having more individual votes
  
  const simulateVote = (candidateId: string) => {
    const selectedCandidate = candidates.find(c => c.id === candidateId)!;
    
    // For this simulation, Pedro always wins due to Ley de Lemas
    const winningCandidate = candidates[1]; // Pedro
    
    let explanation = '';
    
    if (selectedCandidate.id === '3') { // María
      explanation = 'A pesar de que votaste por María y ella obtuvo el 45% de los votos individualmente (la mayor cantidad), los votos de Juan (25%) y Pedro (30%) se suman por pertenecer al mismo Lema. Así, el Lema A obtiene un 55% en total y Pedro gana por ser el más votado dentro de su Lema.';
    } else if (selectedCandidate.id === '1') { // Juan
      explanation = 'Votaste por Juan, pero como Pedro recibió más votos dentro del mismo Lema (30% vs 25%), Pedro es quien gana la elección. Los votos de ambos se suman (55%) superando a María (45%).';
    } else { // Pedro
      explanation = 'Votaste por Pedro, quien recibió el 30% de los votos. Como pertenece al mismo Lema que Juan (25%), sus votos se suman (55%) superando a María (45%). Pedro gana por ser el más votado de su Lema.';
    }
    
    setResult({
      selectedCandidate,
      winningCandidate,
      explanation
    });
    
    setIsModalOpen(true);
  };
  
  return {
    candidates,
    simulateVote,
    isModalOpen,
    setIsModalOpen,
    result
  };
};
