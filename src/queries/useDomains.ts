import { useQuery } from '@tanstack/react-query';
import { fetchDomains } from '@/api';
import { fallbackDomains } from '@/utils';
import { queryKeys } from './keys';
import { useLocale } from '@/hooks';
import type { DomainInfo } from '@/types';

/**
 * Domain self-discovery.
 *
 * `staleTime: Infinity` -- the table never changes within a session.
 * `placeholderData` keeps callers synchronous: they always get a usable table,
 * falling back to the static one until discovery resolves.
 */
export function useDomains() {
  const locale = useLocale();
  return useQuery<DomainInfo>({
    queryKey: queryKeys.domains(locale.countryCode),
    queryFn: () => fetchDomains(window.location.host, locale.countryCode),
    staleTime: Infinity,
    placeholderData: () => fallbackDomains(window.location.host),
  });
}
