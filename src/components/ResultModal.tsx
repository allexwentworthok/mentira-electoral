
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SimulationResult } from '../hooks/useVoteSimulation';
import { AlertTriangle, Share } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  result: SimulationResult | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onOpenChange, result }) => {
  if (!result) return null;
  
  const { selectedCandidate, winningCandidate, explanation } = result;
  
  const didSelectedWin = selectedCandidate.id === winningCandidate.id;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {!didSelectedWin && <AlertTriangle className="text-alert" />}
            {didSelectedWin ? "Tu candidato ganó, pero..." : "¡Tu voto se desvió!"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {!didSelectedWin && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md text-gray-800">
                Votaste por <span className="font-semibold">{selectedCandidate.name}</span> pero ganó <span className="font-semibold">{winningCandidate.name}</span>
              </div>
            )}
            
            <p className="mb-4">{explanation}</p>
            
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h4 className="font-semibold mb-2">Así funciona la Ley de Lemas:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Los votos se suman por partido (Lema)</li>
                <li>El Lema con más votos totales gana</li>
                <li>Dentro del Lema ganador, el candidato más votado es elegido</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a href="#info" className="button-primary" onClick={() => onOpenChange(false)}>
            ¿Por qué pasa esto?
          </a>
          <button className="button-secondary">
            <Share size={18} className="mr-1" />
            Compartir
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
