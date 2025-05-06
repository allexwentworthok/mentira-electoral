import { LEMAS_2025, useLemasSpendingGame } from "@/hooks/useLemasSpendingGame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextLoop } from "@/components/TextLoop";

const GastosIndex = () => {
  const { lemaStats, totalCasta, comida, fetchingLoading } =
    useLemasSpendingGame();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      {/* Botón fijo arriba */}
      <div className="pt-8 flex justify-center">
        <a href="/search">
          <Button variant="outline">Buscar por candidato</Button>
        </a>
      </div>

      {/* Contenido principal */}
      <main
        className={`flex-1 w-full max-w-4xl mx-auto ${
          fetchingLoading ? "flex items-center justify-center" : "py-10"
        }`}
      >
        <section className="w-full">
          <div className="flex flex-col items-center text-center">
            {fetchingLoading ? (
              <>
                <p className="font-bold animate-pulse text-red-700 text-3xl sm:text-5xl">
                  <TextLoop>
                    {LEMAS_2025.map((text) => (
                      <span key={text} className="block">
                        {text}
                      </span>
                    ))}
                  </TextLoop>
                </p>
                <p>
                  <span className="block mt-12">
                    Tarda tanto por que no le aflojan a la tarjeta...
                  </span>
                  <span className="block">Datos de Meta Ads API</span>
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl sm:text-6xl font-bold text-red-700">
                  {formatCurrency(totalCasta)}
                </div>

                <h2 className="mt-4 text-lg sm:text-xl font-semibold">
                  Gasto total estimado en publicidad
                </h2>
                <p className="mt-2 text-base">Con eso podrías comprar:</p>

                {/* Tarjetas de comida */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50">
                    <span className="text-5xl animate-bounce">🍚</span>
                    <p className="mt-3 text-2xl font-bold text-primary">
                      {comida.arrozKg} kg
                    </p>
                    <p className="text-sm text-muted-foreground">de arroz</p>
                  </Card>
                  <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50">
                    <span className="text-5xl animate-bounce">🥛</span>
                    <p className="mt-3 text-2xl font-bold text-primary">
                      {comida.litrosLeche} litros
                    </p>
                    <p className="text-sm text-muted-foreground">de leche</p>
                  </Card>
                  <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50">
                    <span className="text-5xl animate-bounce">🍞</span>
                    <p className="mt-3 text-2xl font-bold text-primary">
                      {comida.panKilos} kg
                    </p>
                    <p className="text-sm text-muted-foreground">de pan</p>
                  </Card>
                </div>

                <div className="text-sm text-muted-foreground mt-6 space-y-1 text-center">
                  <p>(Valores aproximados, precios de mercado)</p>
                  <p>(Datos obtenidos de la API de Meta Ads)</p>
                </div>

                {/* Tabla desplegable */}
                <Accordion
                  type="single"
                  collapsible
                  className="mt-6 text-left w-full"
                >
                  <AccordionItem value="stats">
                    <AccordionTrigger className="text-lg font-medium">
                      Ver más
                    </AccordionTrigger>
                    <AccordionContent>
                      <table className="w-full text-sm mt-4 border-collapse">
                        <thead>
                          <tr className="text-left border-b border-gray-200">
                            <th className="py-2">Lema</th>
                            <th className="py-2">Anuncios</th>
                            <th className="py-2">Gasto estimado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lemaStats.map((l) => (
                            <tr
                              key={l.lema}
                              className="border-b border-gray-100"
                            >
                              <td className="py-2 font-medium">{l.lema}</td>
                              <td className="py-2">{l.adsCount}</td>
                              <td className="py-2">
                                {formatCurrency(l.totalSpending)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GastosIndex;
