import React, { useRef } from "react";
import { FileDown, AlertTriangle, Share2 } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="container-padding max-w-4xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-alert rounded-full mb-4">
            <AlertTriangle size={18} className="mr-2" />
            <span className="font-semibold uppercase">
              ¡Alerta Democrática!
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            La <span className="text-alert font-bold">Estafa</span> llamada Ley
            de Lemas
          </h1>
          <p className="text-lg text-gray-700">
            Descubrí cómo un sistema{" "}
            <span className="text-alert font-bold">corrupto</span> y
            <span className="text-alert font-bold"> feudal</span> destruye tu
            derecho a elegir.
          </p>
        </div>

        {/* Sección 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">¿Qué es la Ley de Lemas?</h2>
          <p className="text-gray-700 leading-relaxed">
            La Ley de Lemas es una{" "}
            <span className="text-alert font-bold">trampa legal</span> que
            <span className="text-alert font-bold"> simula democracia</span>,
            pero en realidad
            <span className="text-alert font-bold"> manipula tu voto</span>.
            Aunque creas que elegís a tu candidato, este sistema
            <span className="text-alert font-bold"> perverso</span> permite que
            gane otro, gracias a un
            <span className="text-alert font-bold">
              {" "}
              mecanismo corrupto
            </span>{" "}
            que favorece a los poderosos de siempre.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="mb-12 bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold mb-3 text-alert">
            ¿Por qué es una estafa?
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>
              Podés votar al candidato más elegido y que{" "}
              <span className="text-alert font-bold">igual pierda</span>.
            </li>
            <li>
              Favorece a los partidos dominantes y perpetúa un{" "}
              <span className="text-alert font-bold">sistema feudal</span>.
            </li>
            <li>
              Desmotiva la participación ciudadana:{" "}
              <span className="text-alert font-bold">
                tu voto pierde valor real
              </span>
              .
            </li>
            <li>
              Abre la puerta a la{" "}
              <span className="text-alert font-bold">corrupción</span> y al
              control político de las élites locales.
            </li>
          </ul>
        </section>

        {/* Sección 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">
            Un sistema corrupto que atrasa
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Mientras el mundo avanza hacia modelos más
            <span className="text-green-700 font-bold"> transparentes</span>, en
            Misiones seguimos presos de un
            <span className="text-alert font-bold">
              {" "}
              mecanismo clientelista
            </span>{" "}
            digno del siglo pasado. La Ley de Lemas es el reflejo de un modelo
            que beneficia a unos pocos y perjudica a todos.
          </p>
        </section>

        {/* Sección 4 */}
        <section className="mb-12 bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-2xl font-bold mb-3 text-green-700">
            La solución: Boleta Única, como en Nación
          </h2>
          <p className="text-gray-700 leading-relaxed">
            La <span className="text-green-700 font-bold">Boleta Única</span> es
            un sistema
            <span className="text-green-700 font-bold"> transparente</span>,
            <span className="text-green-700 font-bold"> claro</span> y
            <span className="text-green-700 font-bold"> justo</span>. Cada
            ciudadano elige de manera directa, sin
            <span className="text-alert font-bold"> trampas</span> ni sumatorias
            ocultas. Con este sistema, el candidato más votado{" "}
            <span className="text-green-700 font-bold">SIEMPRE gana</span>.
            Simple, transparente y verdaderamente democrático.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="mb-4 text-lg font-semibold">
            ¿Te indigna este sistema?
          </p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title:
                    "Mentira Electoral - Conocé la verdad sobre la Ley de Lemas",
                  text: "Descubrí cómo este sistema corrupto manipula tu voto. Informate y compartí.",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(
                  "Link copiado al portapapeles. ¡Compartilo con tus contactos!"
                );
              }
            }}
            className="button-primary flex items-center mx-auto"
          >
            <Share2 size={18} className="mr-2" />
            Compartir esta información
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
