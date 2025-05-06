import { useState, useEffect, useCallback } from "react";
import { MetaAd, SearchParams, AdFilters } from "../types/ads";
import { fetchPoliticalAds, calculateSpending } from "../services/metaAdsApi";

interface UseAdsDataProps {
  searchParams: SearchParams;
  filters: AdFilters;
}

const ARROZ_KG = 1300;
const LECHE_LT = 900;
const PAN_KG = 1800;

interface UseAdsDataResult {
  adsData: MetaAd[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalSpending: number;
  activeParties: Set<string>;
  totalAds: number;
  comida: {
    arrozKg: number;
    litrosLeche: number;
    panKilos: number;
  };
}

export function useAdsData({
  searchParams,
  filters,
}: UseAdsDataProps): UseAdsDataResult {
  const [adsData, setAdsData] = useState<MetaAd[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalSpending: 0,
    activeParties: new Set<string>(),
    totalAds: 0,
  });

  const applyFilters = useCallback(
    (data: MetaAd[]): MetaAd[] => {
      const filtered = [...data];

      filtered.sort((a, b) => {
        if (filters.sortBy === "spend") {
          const spendingA = calculateSpending(a.spend as never);
          const spendingB = calculateSpending(b.spend as never);
          return filters.sortOrder === "desc"
            ? spendingB - spendingA
            : spendingA - spendingB;
        } else {
          const dateA = new Date(a.ad_delivery_start_time).getTime();
          const dateB = new Date(b.ad_delivery_start_time).getTime();
          return filters.sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        }
      });

      return filtered;
    },
    [filters]
  );

  const calculateStats = useCallback((data: MetaAd[]) => {
    let totalSpending = 0;
    const activeParties = new Set<string>();
    const totalAds = data.length;

    data.forEach((ad) => {
      totalSpending += calculateSpending(ad.spend as never);
      activeParties.add(ad.page_name);
    });

    return {
      totalSpending,
      activeParties,
      totalAds,
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPoliticalAds("", searchParams);

        if (response) {
          const filteredData = applyFilters(response.data);
          setAdsData(filteredData);
          setHasMore(!!response.paging?.next);
          setPagination(response.paging?.cursors?.after);

          const newStats = calculateStats(filteredData);
          setStats(newStats);
        } else {
          setError("No se pudieron cargar los datos. Verifique su conexión.");
        }
      } catch (err) {
        setError(
          `Error al cargar datos: ${
            err instanceof Error ? err.message : "Desconocido"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (adsData.length > 0) {
      const filteredData = applyFilters(adsData);
      setAdsData(filteredData);

      const newStats = calculateStats(filteredData);
      setStats(newStats);
    }
  }, [filters, adsData]);

  const loadMore = useCallback(async () => {
    if (!pagination || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchPoliticalAds("", searchParams, 25, pagination);

      if (response) {
        const newData = [...adsData, ...response.data];
        const filteredData = applyFilters(newData);
        setAdsData(filteredData);
        setHasMore(!!response.paging?.next);
        setPagination(response.paging?.cursors?.after);

        const newStats = calculateStats(filteredData);
        setStats(newStats);
      }
    } catch (err) {
      setError(
        `Error al cargar más datos: ${
          err instanceof Error ? err.message : "Desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [pagination, hasMore, adsData, searchParams, applyFilters, calculateStats]);

  return {
    adsData,
    loading,
    error,
    hasMore,
    loadMore,
    totalSpending: stats.totalSpending,
    activeParties: stats.activeParties,
    totalAds: stats.totalAds,
    comida: {
      arrozKg: Math.floor(stats.totalSpending / ARROZ_KG),
      litrosLeche: Math.floor(stats.totalSpending / LECHE_LT),
      panKilos: Math.floor(stats.totalSpending / PAN_KG),
    },
  };
}