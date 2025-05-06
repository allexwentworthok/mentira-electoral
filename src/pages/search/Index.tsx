import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import AdFiltersComponent from "@/components/AdFilters";
import StatsOverview from "@/components/StatsOverview";
import SpendingChart from "@/components/SpendingChart";
import AdCard from "@/components/AdCard";
import { useAdsData } from "@/hooks/useAdsData";
import { SearchParams, AdFilters } from "@/types/ads";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const IndexSearch = () => {
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchTerms: ["Martín Arjol", "Sebastián Macias"],
    region: "AR-N", // Código de región para Misiones
    onlyActive: true,
  });

  const [filters, setFilters] = useState<AdFilters>({
    sortBy: "spend",
    sortOrder: "desc",
  });

  const {
    adsData,
    loading,
    error,
    hasMore,
    loadMore,
    totalSpending,
    activeParties,
    totalAds,
    comida: { arrozKg, litrosLeche, panKilos },
    // Desestructuración de stats
  } = useAdsData({
    searchParams,
    filters,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  const handleSearch = (terms: string[]) => {
    setSearchParams({
      ...searchParams,
      searchTerms: terms,
    });
  };

  const handleFilterChange = (newFilters: AdFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-center text-primary-foreground py-8">
        <div className="container px-4">
          <h1 className="text-4xl font-bold">¿Cuánta comida cuesta tu voto?</h1>
          <p className="mt-2 text-lg opacity-90">
            {`Transparencia democrática en Misiones: Monitoreo de anuncios
      políticos bajo la Ley 27.275 (Nacional) y la Ley IV – N° 58 (Misiones)`}
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="inline-block bg-white text-primary font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 space-y-8">
        <>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="bg-card p-4 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Búsqueda</h2>
                <SearchBar
                  onSearch={handleSearch}
                  initialTerms={searchParams.searchTerms}
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Tarjetas de comida con impacto visual */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-5xl animate-bounce">🍚</span>
                  <p className="mt-3 text-2xl font-bold text-primary">
                    {arrozKg} kg
                  </p>
                  <p className="text-sm text-muted-foreground">de arroz</p>
                </Card>

                <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-5xl animate-bounce">🥛</span>
                  <p className="mt-3 text-2xl font-bold text-primary">
                    {litrosLeche} litros
                  </p>
                  <p className="text-sm text-muted-foreground">de leche</p>
                </Card>

                <Card className="flex flex-col items-center p-6 border shadow-md rounded-xl bg-muted/50 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-5xl animate-bounce">🍞</span>
                  <p className="mt-3 text-2xl font-bold text-primary">
                    {panKilos} kg
                  </p>
                  <p className="text-sm text-muted-foreground">de pan</p>
                </Card>
              </div>

              {/* Estadísticas generales */}
              <StatsOverview
                totalSpending={totalSpending}
                activeParties={activeParties.size}
                totalAds={totalAds}
                isLoading={loading}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Análisis de gastos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SpendingChart adsData={adsData} />
              </div>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-md shadow-sm border">
                  <h2 className="text-lg font-semibold mb-4">Ordenar por</h2>
                  <AdFiltersComponent
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                <div className="bg-card p-4 rounded-md shadow-sm border">
                  <h2 className="text-lg font-semibold mb-2">Información</h2>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Región:</strong> Misiones (AR-N)
                    </p>
                    <p>
                      <strong>Estado:</strong> Mostrando solo anuncios activos
                    </p>
                    <p>
                      <strong>¿Qué es la Ley de Lemas?</strong> Sistema
                      electoral que permite a un partido presentar múltiples
                      candidatos (sublemas). Los votos de los sublemas se suman
                      para el candidato final del partido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Anuncios políticos</h2>
              {loading && (
                <p className="text-muted-foreground">Cargando datos...</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adsData.length > 0 ? (
                adsData.map((ad) => <AdCard key={ad.id} ad={ad} />)
              ) : !loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron anuncios. Intente con otros términos de
                    búsqueda.
                  </p>
                </div>
              ) : null}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-6">
                <Button onClick={loadMore} disabled={loading} variant="outline">
                  {loading ? "Cargando..." : "Cargar más anuncios"}
                </Button>
              </div>
            )}
          </section>
        </>
      </main>

      <footer className="bg-muted py-6">
        <div className="container px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Visualizador de Propaganda Política en Misiones – Proyecto de
              transparencia democrática © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexSearch;
