import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import CandidateCard from "../components/CandidateCard";
import ResultModal from "../components/ResultModal";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import { useVoteSimulation } from "../hooks/useVoteSimulation";
import { InfoIcon, ExternalLink } from "lucide-react";

const Index = () => {
  const { candidates, simulateVote, isModalOpen, setIsModalOpen, result } =
    useVoteSimulation();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null
  );

  const handleCandidateSelect = (id: string) => {
    setSelectedCandidateId(id);
    simulateVote(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeroSection />

      {/* Destacados de navegación */}
      <div className="bg-muted py-8">
        <div className="container-padding max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            Explorá todas las herramientas
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-party-blue font-medium">
            <a
              href="/gastos"
              className="hover:underline flex items-center gap-1"
            >
              Gasto total por partido político <ExternalLink size={16} />
            </a>
            <a
              href="/search"
              className="hover:underline flex items-center gap-1"
            >
              Buscador por candidato o lema <ExternalLink size={16} />
            </a>
            <a href="/vota" className="hover:underline flex items-center gap-1">
              Votá contra la Ley de Lemas <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Simulador Electoral */}
      <div id="simulador" className="container-padding max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Simulador Electoral</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Elegí un candidato y descubrí qué sucede con tu voto bajo el sistema
            de Ley de Lemas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {candidates.map((candidate) => (
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
              <h4 className="font-semibold text-lg mb-2">
                ¿Cómo funciona este simulador?
              </h4>
              <p className="text-gray-700">
                En este ejemplo simplificado, María (Lema B) obtiene
                individualmente un 45% de los votos, mientras que Juan y Pedro
                (ambos del Lema A) obtienen un 25% y 30% respectivamente. Con la
                Ley de Lemas, los votos de Juan y Pedro se suman (55%), y gana
                Pedro por ser el más votado dentro del Lema A.
              </p>
            </div>
          </div>
        </div>
      </div>

      <InfoSection />

      {/* Mensaje legal / disclaimer */}
      <div className="bg-gray-50 py-8">
        <div className="container-padding max-w-3xl text-center mx-auto text-sm text-gray-600 space-y-4">
          <h3 className="text-center font-semibold">Aviso legal</h3>
          <p>
            Esta plataforma tiene fines exclusivamente informativos y
            educativos. Los datos presentados se obtienen de fuentes públicas y
            accesibles de forma libre, en cumplimiento con la Ley 27.275 de
            Acceso a la Información Pública y la Ley IV – N° 58 de la Provincia
            de Misiones.
          </p>
          <p>
            No se realiza ningún tipo de manipulación, inferencia estadística ni
            predicción electoral. Toda visualización, simulación o clasificación
            disponible en el sitio es de carácter especulativo y no debe
            interpretarse como una proyección certera de resultados electorales.
          </p>
          <p>
            La participación de los usuarios es completamente voluntaria y los
            contenidos publicados se ajustan al marco del derecho a la libertad
            de expresión y acceso a la información pública. En caso de
            intimaciones o solicitudes, este sitio se reserva el derecho de
            evaluar su validez jurídica conforme al orden legal vigente.
          </p>
        </div>
      </div>

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
