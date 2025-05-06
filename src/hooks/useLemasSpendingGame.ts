import { calculateSpending, SpendRange } from "@/services/metaAdsApi";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_DEVELOPER_PROXY_URL;

export const LEMAS_2025 = [
  "Partido Agrario y Social",
  "ALGO NUEVO POR LA VIDA Y LOS VALORES",
  "CONFLUENCIA POPULAR POR LA PATRIA",
  "FRENTE RENOVADOR DE LA CONCORDIA",
  "FRENTE UNIDOS POR EL FUTURO",
  "LA LIBERTAD AVANZA",
  "Partido Libertario Distrito Misiones",
  "MOVIMIENTO POSITIVO",
  "PARTIDO DE INTEGRACION Y MILITANCIA",
  "PARTIDO DEL OBRERO",
  "PARTIDO DEMOCRATA",
  "PARTIDO LIBERTARIO",
  "PARTIDO SOCIAL SOLIDARIO",
  "TIERRA TECHO Y TRABAJO",

  // Nombres de candidatos principales (primeros 3 de cada lema)
  "Hector Orlando Barbaro", // AGRARIO Y SOCIAL
  "Elvani Elisa Goring",
  "Sebastian Andres Korol",

  "Olga Monica Gurina", // CONFLUENCIA POPULAR POR LA PATRIA
  "Eduardo Gabriel Sanchez",
  "Graciela Beatriz De Melo",

  "Sebastian Horacio Macias", // FRENTE RENOVADOR DE LA CONCORDIA
  "Paula Virginia Franco",
  "Carlos Horacio Martinez",

  "Santiago Nicolas Koch", // FRENTE UNIDOS POR EL FUTURO
  "Carolina Soledad Gross",
  "Hector Alejandro Falsone",

  "Diego Gabriel Hartfield", // LA LIBERTAD AVANZA
  "Barbara Samantha Stekler",
  "Carlos Adrian Nuñez",

  "Gabriel Conrado Nielsen", // MOVIMIENTO POSITIVO
  "Karina Alejandra Griss",
  "Jorge Anibal Rodriguez",

  "Roberto Juan Cavalheiro", // PARTIDO DE INTEGRACION Y MILITANCIA
  "Olga Cristina Morinigo",
  "Luis Alberto Rosbelke",

  "Anibal Ruben Zeretzki", // PARTIDO DEL OBRERO
  "Lorenza Virginia Villanueva",
  "Ladislao De Lima",

  "Nelly Zart", // PARTIDO DEMOCRATA
  "Julio Enrique Batalla",
  "Maria Cristina Brunaga",

  "Martin Arjol", // PARTIDO LIBERTARIO
  "Pamela Elizabeth Encina",
  "Victor Daniel Wall",

  "Ramon Oscar Amarilla", // POR LA VIDA Y LOS VALORES
  "Viviana Paola Szyszkowski",
  "Walter Roque Rios",

  "Martin Anibal Sereno", // TIERRA TECHO Y TRABAJO
  "Carla Beatriz Pipke",
  "Hector Luis Rodriguez de Olivera",

  // Ya estaban
  "Paula Franco",
  "Lucas Romero Spinelli",
  "Sebastian Macias",
];

interface LemaSpending {
  lema: string;
  adsCount: number;
  totalSpending: number;
}

interface SpendingResult {
  fetchingLoading: boolean;
  lemaStats: LemaSpending[];
  totalCasta: number;
  comida: {
    arrozKg: number;
    litrosLeche: number;
    panKilos: number;
  };
}

const ARROZ_KG = 1300; // $1300/kg
const LECHE_LT = 900; // $900/litro
const PAN_KG = 1800; // $1800/kg

export function useLemasSpendingGame(): SpendingResult {
  const [lemaStats, setLemaStats] = useState<LemaSpending[]>([]);
  const [totalCasta, setTotalCasta] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const results: LemaSpending[] = [];
      let acumulado = 0;

      for (const lema of LEMAS_2025) {
        const res = await fetch(
          `${URL}/?q=${encodeURIComponent(
            lema
          )}`
        );
        const json = await res.json();
        const total = json.data.reduce((acc: number, ad: { spend: SpendRange }) => {
          return acc + calculateSpending(ad.spend);
        }, 0);

        acumulado += total;
        results.push({
          lema,
          adsCount: json.data.length,
          totalSpending: total,
        });
      }

      setLemaStats(results.filter((r) => r.totalSpending > 0));
      setTotalCasta(acumulado);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return {
    fetchingLoading: loading,
    lemaStats,
    totalCasta,
    comida: {
      arrozKg: Math.floor(totalCasta / ARROZ_KG),
      litrosLeche: Math.floor(totalCasta / LECHE_LT),
      panKilos: Math.floor(totalCasta / PAN_KG),
    },
  };
}
