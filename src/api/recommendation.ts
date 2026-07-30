import { getJson } from './http';

export interface RecommendedProduct {
  id: string;
  name: string;
  brandName: string;
}

/**
 * Plain fetch function -- no framework imports, so it can be unit-tested on its
 * own. The TanStack Query wrapper lives in `queries/useRecommendations.ts`.
 */
export function fetchTopSubscribedProducts(autoshipDomain: string): Promise<RecommendedProduct[]> {
  return getJson<RecommendedProduct[]>(`${autoshipDomain}/Recommendation/TopSubscribedProducts`, {
    credentials: 'include',
  });
}
