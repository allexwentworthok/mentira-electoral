import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { MetaAd } from "@/types/ads";
import { calculateSpending } from "@/services/metaAdsApi";

interface SpendingChartProps {
  adsData: MetaAd[];
}

interface ChartData {
  name: string;
  gasto: number;
  color: string;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ adsData }) => {
  const spendingByParty: Record<string, { total: number; count: number }> = {};

  adsData.forEach((ad) => {
    const partyName = ad.page_name;
    const spending = calculateSpending(ad.spend as never);

    if (!spendingByParty[partyName]) {
      spendingByParty[partyName] = { total: 0, count: 0 };
    }

    spendingByParty[partyName].total += spending;
    spendingByParty[partyName].count += 1;
  });

  const chartData: ChartData[] = Object.entries(spendingByParty)
    .map(([name, { total }]) => ({
      name: name.length > 20 ? name.substring(0, 20) + "..." : name,
      gasto: Number(total.toFixed(2)),
      color: getColorByAmount(total),
    }))
    .sort((a, b) => b.gasto - a.gasto)
    .slice(0, 10);

  function getColorByAmount(amount: number): string {
    if (amount < 5000) return "#43a047";       // Verde - bajo
    if (amount < 20000) return "#ffb74d";      // Amarillo - medio
    return "#e53935";                          // Rojo - alto
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gasto por partido político</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">No hay datos disponibles para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gasto por partido político</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Gasto total"]}
              labelFormatter={(name) => `Partido: ${name}`}
            />
            <Bar dataKey="gasto" name="Gasto total (ARS)">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;