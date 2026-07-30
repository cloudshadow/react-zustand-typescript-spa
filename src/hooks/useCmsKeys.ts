import { useCmsKeysQuery } from '@/queries/useCmsKeys';
import type { CmsKey } from '@/cmsKeys';

/**
 * Reads translated copy.
 *
 * Components go through this hook rather than touching the query directly, so
 * the copy source stays swappable.
 */
export function useCmsKeys(): (key: CmsKey, fallback?: string) => string {
  const { data } = useCmsKeysQuery();
  return (key, fallback = '') => data?.[key] ?? fallback;
}
