import React from 'react';
import { Candidate } from '../hooks/useVoteSimulation';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';  // Animaciones suaves

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onSelect, isSelected }) => {
  const getColorClasses = () => {
    const baseClasses = 'relative border rounded-lg p-6 flex flex-col items-center transition-transform cursor-pointer';
    
    if (isSelected) {
      switch (candidate.color) {
        case 'blue':
          return `${baseClasses} bg-party-blue/10 border-party-blue scale-105 shadow-lg`;
        case 'red':
          return `${baseClasses} bg-party-red/10 border-party-red scale-105 shadow-lg`;
        case 'green':
          return `${baseClasses} bg-party-green/10 border-party-green scale-105 shadow-lg`;
        default:
          return baseClasses;
      }
    }
    
    return `${baseClasses} bg-white border-gray-200 hover:shadow-md`;
  };

  const emojiMap = {
    blue: "🧑‍💼",
    red: "👨‍🦰",
    green: "👩‍🦱",
  };

  return (
    <motion.div
      className={getColorClasses()}
      onClick={() => onSelect(candidate.id)}
      whileTap={{ scale: 0.98 }}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Check size={18} className="text-green-600" />
        </div>
      )}
      
      <div 
        className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center text-3xl`}
      >
        {emojiMap[candidate.color]}
      </div>
      
      <h3 className="text-xl font-semibold">{candidate.name}</h3>
      <p className="text-gray-600">{candidate.party}</p>

      {!isSelected && (
        <button 
          className="mt-4 px-4 py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: `var(--party-${candidate.color})` }}
        >
          Votar
        </button>
      )}

      {isSelected && (
        <span className="mt-4 text-green-600 font-semibold">¡Seleccionado!</span>
      )}
    </motion.div>
  );
};

export default CandidateCard;