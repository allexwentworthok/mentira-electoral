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
    <div className="h-dvh bg-background flex flex-col justify-center items-center text-center px-4">
      {/* Header con botón */}
      <div className="absolute top-4 right-4">
        <a href="/search">
          <Button variant="outline">Buscar por candidato</Button>
        </a>
      </div>

      <main className="max-w-2xl w-full space-y-8">
        <section className="container mx-auto my-auto py-8 overflow-scroll">
          {fetchingLoading ? (
            <p className="font-bold text-center animate-pulse text-red-700 ">
              <TextLoop>
                {LEMAS_2025.map((text) => (
                  <span key={text} className="block text-left">
                    {text}
                  </span>
                ))}
              </TextLoop>
            </p>
          ) : (
            <div className="text-4xl sm:text-6xl sm:mt-64 font-bold text-red-700 flex items-center justify-center gap-2">
              <span>{formatCurrency(totalCasta)}</span>
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold">
            {
              fetchingLoading
                ? "Buscando entre los lemas registrados..."
                : "Gasto total estimado en publicidad"
            }
          </h2>
          <p className="mt-2 text-base">Con eso podrías comprar:</p>

          {/* Tarjetas de comida */}
          {!fetchingLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
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
          )}

          <p className="text-sm text-muted-foreground mt-4">
            (Valores aproximados, precios de mercado)
          </p>
          <p className="text-sm text-muted-foreground">
            (Datos obtenidos de la API de Meta Ads)
          </p>

          {!fetchingLoading && (
            <Accordion type="single" collapsible className="mt-6 text-left">
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
                        <tr key={l.lema} className="border-b border-gray-100">
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
          )}
        </section>
      </main>
    </div>
  );
};

export default GastosIndex;
