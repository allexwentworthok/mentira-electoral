import React from "react";
import { Share, Lock, Github, Twitter, Mail } from "lucide-react";

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
    <footer className="bg-white border-t mt-10 text-sm text-gray-600">
      {/* Bloque de llamada a la acción */}
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Ayudanos a difundir esta información
        </h3>
        <p className="max-w-2xl mx-auto mb-6">
          Para fortalecer nuestra democracia, es esencial entender cómo
          funcionan los sistemas electorales y sus implicancias.
        </p>
        <button
          onClick={handleShare}
          className="bg-black text-white py-2 px-4 rounded flex items-center justify-center mx-auto hover:bg-gray-900 transition"
        >
          <Share size={18} className="mr-2" />
          Compartir esta información
        </button>
      </div>

      {/* Footer principal */}
      <div className="bg-black text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sobre el proyecto */}
          <div>
            <h4 className="uppercase text-gray-400 mb-2">Proyecto</h4>
            <p>
              Desarrollado por{" "}
              <span className="font-mono text-green-400">Alejandro Bogado</span>, hoy mantenido por{" "}
              <span className="font-mono text-green-400">Mentira Electoral</span>.
            </p>
            <p className="mt-2">
              Código fuente en{" "}
              <a
                href="https://github.com/allexwentworthok/mentira-electoral"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-400"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          {/* Contacto y redes */}
          <div>
            <h4 className="uppercase text-gray-400 mb-2">Contacto</h4>
            <ul className="space-y-1">
              <li className="flex items-center">
                <Mail size={14} className="mr-2 text-green-400" />
                <a href="mailto:mentiraelectoral@proton.me" className="hover:text-green-400">
                  mentiraelectoral@proton.me
                </a>
              </li>
              <li className="flex items-center">
                <Twitter size={14} className="mr-2 text-green-400" />
                <a
                  href="https://twitter.com/MentiElectoral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  @MentiraElectoral
                </a>
              </li>
              <li className="flex items-center">
                <Github size={14} className="mr-2 text-green-400" />
                <a
                  href="https://github.com/allexwentworthok/mentira-electoral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  /mentira-electoral
                </a>
              </li>
            </ul>
          </div>

          {/* Seguridad y privacidad */}
          <div>
            <h4 className="uppercase text-gray-400 mb-2">Seguridad</h4>
            <p className="flex items-center">
              <Lock size={14} className="mr-2 text-green-400" />
              Este sitio no utiliza trackers.
            </p>
            <p className="mt-2">
              <span className="text-gray-400">Fingerprint GPG:</span>{" "}
              <span className="font-mono text-green-400 block mt-1">
                421A E4EB 75AA B5F0 92ED<br />
                CE70 FC70 7CDA F09B A4DE
              </span>
              <a
                href="https://github.com/allexwentworthok.gpg"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-400 block mt-1"
              >
                Ver clave pública
              </a>
            </p>
          </div>
        </div>

        {/* Línea final */}
        <div className="border-t border-gray-700 mt-6 text-center py-4 text-gray-400">
          © {new Date().getFullYear()} Mentira Electoral. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;