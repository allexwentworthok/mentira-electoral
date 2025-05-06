import { MetaAdsResponse, SearchParams } from "../types/ads";

const BASE_URL = import.meta.env.VITE_DEVELOPER_PROXY_URL;

export async function fetchPoliticalAds(
  accessToken: string,
  searchParams: SearchParams,
  limit: number = 25,
  after?: string
): Promise<MetaAdsResponse | null> {
  try {
    // Join search terms with commas for the API
    const searchTermsString = searchParams.searchTerms.join(",");
    
    // Build the URL with search terms
    const url = `${BASE_URL}/?q=${encodeURIComponent(searchTermsString)}`;
    
    // Make the API call to the Cloudflare Worker
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Meta API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Helper function to detect lemas and sublemas in ad text
export function detectLemasAndSublemas(adText: string[]): { lemas: string[], sublemas: string[] } {
  // This is a simplified implementation - in a real application, this would be more sophisticated
  // and would use Natural Language Processing or a database of known lemas/sublemas
  
  const lemas: Set<string> = new Set();
  const sublemas: Set<string> = new Set();
  
  // Simple pattern detection (would need refinement in production)
  const lemaPatterns = [/partido\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/gi, /lema\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/gi];
  const sublemaPatterns = [/sublema\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/gi];
  
  adText.forEach(text => {
    if (!text) return;
    
    // Look for lemas
    lemaPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) lemas.add(match[1].trim());
      }
    });
    
    // Look for sublemas
    sublemaPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) sublemas.add(match[1].trim());
      }
    });
  });
  
  return {
    lemas: Array.from(lemas),
    sublemas: Array.from(sublemas)
  };
}

interface spend {
  lower_bound: string;
  upper_bound: string;
}

export interface SpendRange {
  spend(spend: spend): unknown;
  lower_bound?: string;
  upper_bound?: string;
}


export function calculateSpending(spend: SpendRange): number {
  if (!spend?.lower_bound || !spend?.upper_bound) return 0;

  const lower = parseInt(spend.lower_bound, 10);
  const upper = parseInt(spend.upper_bound, 10);

  if (isNaN(lower) || isNaN(upper)) return 0;

  return Math.round((lower + upper) / 2);
}

function parseSpendingNumber(raw: string): number {
  raw = raw.replace(",", "").toUpperCase();

  if (raw.endsWith("K")) {
    return parseFloat(raw) * 1000;
  }
  if (raw.endsWith("M")) {
    return parseFloat(raw) * 1_000_000;
  }
  return parseFloat(raw);
}

export function getSpendingCategory(amount: number): 'low' | 'medium' | 'high' {
  // Thresholds would be adjusted based on actual data analysis
  if (amount < 5000) return 'low';
  if (amount < 20000) return 'medium';
  return 'high';
}
