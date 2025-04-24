
import React from 'react';
import { Candidate } from '../hooks/useVoteSimulation';
import { Check } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onSelect, isSelected }) => {
  const getColorClasses = () => {
    const baseClasses = 'relative border rounded-lg p-6 flex flex-col items-center card-hover';
    
    if (isSelected) {
      switch (candidate.color) {
        case 'blue':
          return `${baseClasses} bg-party-blue/10 border-party-blue`;
        case 'red':
          return `${baseClasses} bg-party-red/10 border-party-red`;
        case 'green':
          return `${baseClasses} bg-party-green/10 border-party-green`;
        default:
          return baseClasses;
      }
    }
    
    return `${baseClasses} bg-white border-gray-200`;
  };
  
  return (
    <div
      className={getColorClasses()}
      onClick={() => onSelect(candidate.id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Check size={16} className="text-green-600" />
        </div>
      )}
      
      <div 
        className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold`}
        style={{ backgroundColor: `var(--party-${candidate.color})` }}
      >
        {candidate.name.charAt(0)}
      </div>
      
      <h3 className="text-xl font-semibold">{candidate.name}</h3>
      <p className="text-gray-600">{candidate.party}</p>
      
      <button 
        className={`mt-4 px-4 py-2 rounded-md text-white font-medium`}
        style={{ backgroundColor: `var(--party-${candidate.color})` }}
      >
        Votar
      </button>
    </div>
  );
};

export default CandidateCard;
