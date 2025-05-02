import React from "react";
import { Share, Lock } from "lucide-react";

const Footer: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Alerta Ley de Lemas",
        text: "¿Sabías que con la Ley de Lemas tu voto puede elegir a alguien que no querías? Descubrí cómo funciona este sistema electoral.",
        url: window.location.href,
      });
    } else {
      alert("Comparte este link: " + window.location.href);
    }
  };

  return (
    <footer className="bg-white border-t mt-10">
      <div className="container-padding max-w-6xl mx-auto">
        {/* Bloque Blanco */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">
            Ayudanos a difundir esta información
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Para fortalecer nuestra democracia, es esencial entender cómo
            funcionan los sistemas electorales y sus implicancias.
          </p>

          <button
            onClick={handleShare}
            className="button-primary mx-auto flex items-center"
          >
            <Share size={18} className="mr-2" />
            Compartir esta información
          </button>
        </div>
      </div>

      {/* Bloque Negro */}
      <div className="mt-6 text-center text-xs text-white bg-black py-6">
        <p>
          Desarrollado por{" "}
          <span className="font-mono text-green-400">Alejandro Bogado</span> ·{" "}
          <a
            href="https://github.com/allexwentworthok.gpg"
            target="_blank"
            className="underline hover:text-green-400"
          >
            GPG pública
          </a>{" "}
          ·{" "}
          <span className="font-mono text-green-400">
            421A E4EB 75AA B5F0 92ED  CE70 FC70 7CDA F09B A4DE
          </span>
        </p>
        <p className="flex justify-center items-center mt-2">
          <Lock size={14} className="mr-1 text-green-400" />
          La privacidad y la transparencia son derechos. Este sitio no utiliza
          trackers.
        </p>
        <p className="mt-2">
          Código fuente disponible en{" "}
          <a
            href="https://github.com/allexwentworthok/mentira-electoral"
            target="_blank"
            className="underline hover:text-green-400"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;