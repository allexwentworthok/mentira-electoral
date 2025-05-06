
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaAd } from "@/types/ads";
import { calculateSpending, detectLemasAndSublemas, getSpendingCategory } from "../services/metaAdsApi";
import { ExternalLink } from "lucide-react";

interface AdCardProps {
  ad: MetaAd;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  // Calculate average spending and get category
  const averageSpending = calculateSpending(ad.spend as never);
  const spendingCategory = getSpendingCategory(averageSpending);
  
  // Format dates
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "En curso";
    return new Date(dateStr).toLocaleDateString("es-AR");
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Detect lemas and sublemas in ad text
  const { lemas, sublemas } = detectLemasAndSublemas(ad?.ad_creative_bodies || []);
  
  // Truncate text if too long
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">
            {ad.page_name}
          </CardTitle>
          <div 
            className={`h-3 w-3 rounded-full ${
              spendingCategory === 'high' 
              ? 'bg-status-high' 
              : spendingCategory === 'medium' 
              ? 'bg-status-medium' 
              : 'bg-status-low'
            }`} 
            title={`Nivel de gasto: ${
              spendingCategory === 'high' 
              ? 'Alto' 
              : spendingCategory === 'medium' 
              ? 'Medio' 
              : 'Bajo'
            }`}
          />
        </div>
        <div className="flex justify-between items-center">
          <Badge variant={ad.ad_active_status === "ACTIVE" ? "default" : "outline"}>
            {ad.ad_active_status === "ACTIVE" 
              ? "Activo" 
              : ad.ad_active_status === "COMPLETED" 
              ? "Completado" 
              : ad.ad_active_status === "WITH_ISSUES" 
              ? "Con problemas"
              : "Otro"}
          </Badge>
          <span className="text-muted-foreground text-sm">
            ID: {ad.id}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-medium text-sm mb-1">Resumen del anuncio:</h3>
          <p className="text-sm">
            {ad?.ad_creative_bodies && ad?.ad_creative_bodies.length > 0
              ? truncateText(ad?.ad_creative_bodies[0], 150)
              : "No se encontró texto del anuncio"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <h3 className="font-medium text-sm">Gasto estimado:</h3>
            <p className="font-semibold">{formatCurrency(averageSpending)}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Período:</h3>
            <p className="text-sm">
              {formatDate(ad.ad_delivery_start_time)} {"-"} {formatDate(ad.ad_delivery_stop_time)}
            </p>
          </div>
        </div>
        
        {(lemas.length > 0 || sublemas.length > 0) && (
          <div>
            <h3 className="font-medium text-sm mb-1">Lemas y Sublemas detectados:</h3>
            <div className="flex flex-wrap gap-1">
              {lemas.map((lema, index) => (
                <Badge key={`lema-${index}`} variant="default">
                  {truncateText(lema, 20)}
                </Badge>
              ))}
              {sublemas.map((sublema, index) => (
                <Badge key={`sublema-${index}`} variant="secondary">
                  {truncateText(sublema, 20)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a 
            href={ad.ad_snapshot_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <ExternalLink size={16} />
            <span>Ver anuncio completo</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdCard;
