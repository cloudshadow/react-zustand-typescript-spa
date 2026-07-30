import { useQuery } from '@tanstack/react-query';
import { fetchTopSubscribedProducts } from '@/api';
import { queryKeys } from './keys';
import { useDomains } from './useDomains';
import { useLocale } from '@/hooks';

/** Example business-data query. Identical in shape to the SSR template's version. */
export function useRecommendations() {
  const locale = useLocale();
  const { data: domains } = useDomains();
  return useQuery({
    queryKey: queryKeys.recommendations(locale.countryCode),
    queryFn: () => fetchTopSubscribedProducts(domains!.autoship),
    enabled: Boolean(domains),
  });
}
