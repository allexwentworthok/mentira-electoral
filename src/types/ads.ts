
export interface MetaAd {
  id: string;
  page_id: string;
  page_name: string;
  ad_creative_bodies: string[];
  ad_creative_link_captions?: string[];
  ad_creative_link_descriptions?: string[];
  ad_creative_link_titles?: string[];
  ad_snapshot_url: string;
  currency?: string;
  spend: {
    lower_bound: number;
    upper_bound: number;
  };
  demographic_distribution?: any[];
  delivery_by_region: any[];
  ad_delivery_start_time: string;
  ad_delivery_stop_time: string | null;
  ad_active_status?: "ACTIVE" | "COMPLETED" | "WITH_ISSUES" | "OTHER";
}

export interface MetaAdsResponse {
  data: MetaAd[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface AdFilters {
  sortBy: 'spend' | 'date';
  sortOrder: 'asc' | 'desc';
}

export interface SearchParams {
  searchTerms: string[];
  region: string;
  onlyActive: boolean;
}

// No need for the token anymore as it's handled by the Cloudflare Worker
