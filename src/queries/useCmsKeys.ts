import { useQuery } from '@tanstack/react-query';
import { fetchCmsKeys } from '@/api';
import { CMS_KEYS } from '@/cmsKeys';
import { queryKeys } from './keys';
import { useDomains } from './useDomains';
import { useLocale } from '@/hooks';
import type { CmsKeyMap } from '@/types';

const ONE_HOUR = 1000 * 60 * 60;

/**
 * CMS copy.
 *
 * Unlike the SSR template -- where copy is loaded by the root loader so it is
 * present in the first paint -- an app-embedded panel fetches it after mount.
 * That is acceptable here: the native app controls its own loading state and
 * these pages are not crawled.
 *
 * TanStack Query's own cache replaces the legacy hand-rolled localStorage TTL.
 */
export function useCmsKeysQuery() {
  const locale = useLocale();
  const { data: domains } = useDomains();
  return useQuery<CmsKeyMap>({
    queryKey: queryKeys.cmsKeys(locale.countryCode, locale.languageCode),
    queryFn: () =>
      fetchCmsKeys({
        checkoutDomain: domains!.checkout,
        countryCode: locale.countryCode,
        languageCode: locale.languageCode,
        cmsKeys: [...CMS_KEYS],
      }),
    enabled: Boolean(domains),
    staleTime: ONE_HOUR,
  });
}
