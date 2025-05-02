import React, { useRef, useEffect, useState } from "react";
import { FileDown, AlertTriangle, Share2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Variables de entorno de Supabase no configuradas correctamente.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const AboutPage: React.FC = () => {
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase
        .from("votes")
        .select("count")
        .single();

      if (!error && data) {
        setVoteCount(data.count);
      }
    };

    fetchVotes();
  }, []);

  const handleVote = async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip || "unknown";
      const userAgent = navigator.userAgent || "unknown";
  
      const { error } = await supabase.rpc("register_vote", {
        ip,
        ua: userAgent,
      });
  
      if (error) {
        alert(error.message);
      } else {
        setVoteCount((prev) => prev + 1);
      }
    } catch (err) {
      alert("Hubo un error al registrar tu voto. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="container-padding max-w-4xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-alert rounded-full mb-4">
            <AlertTriangle size={18} className="mr-2" />
            <span className="font-semibold uppercase">
              ¡Alerta Democrática en Misiones!
            </span>
          </div>
          {/* Hero */}
          <section className=" py-24 px-4 text-center flex flex-col items-center justify-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                ¿Tu voto no elige al ganador? Eso no es democracia.
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 mb-8">
                En Misiones, la Ley de Lemas permite que gane quien no fue el
                más votado. Descubrí cómo funciona esta estafa legal y ayudanos
                a cambiarla.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleVote}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-lg transition-all"
                >
                  Sumá tu voto para derogar la Ley de Lemas
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title:
                          "Mentira Electoral - Conocé la verdad sobre la Ley de Lemas",
                        text: "¿Sabías que en Misiones podés votar a alguien y que gane otro? Entrá y enterate.",
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(
                        "Link copiado al portapapeles. ¡Compartilo con quienes les pueda interesar!"
                      );
                    }
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-md text-lg transition-all flex items-center justify-center"
                >
                  <Share2 size={20} className="mr-2" />
                  Compartí esta causa
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Votos registrados:{" "}
                <span className="font-semibold text-gray-800">{voteCount}</span>
              </p>
            </div>
          </section>
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

        <div className="mt-16 flex flex-col items-center space-y-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            ¿Querés una democracia más justa?
          </h2>

          {/* Contenedor horizontal de botones */}
          <div className="flex w-full max-w-[600px] gap-4">
            <button
              onClick={handleVote}
              className="flex-[4] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all"
            >
              Sumá tu voto para derogar la Ley de Lemas
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title:
                      "Mentira Electoral - Entendé cómo funciona la Ley de Lemas",
                    text: "Conocé cómo este sistema afecta tu voto. Sumate a quienes quieren cambiarlo.",
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(
                    "Link copiado al portapapeles. ¡Compartilo con quienes les pueda interesar!"
                  );
                }
              }}
              className="flex-[1] flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-2 rounded-md transition-all"
            >
              <Share2 size={18} className="mr-1" />
              Compartí
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Votos registrados:{" "}
            <span className="font-semibold text-gray-800">{voteCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
