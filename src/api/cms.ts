import { postJson } from './http';
import type { CmsKeyMap } from '@/types';

export interface FetchCmsKeysInput {
  checkoutDomain: string;
  countryCode: string;
  languageCode: string;
  cmsKeys: string[];
}

/** Batch-fetches translated copy for the given CMS keys. */
export async function fetchCmsKeys({
  checkoutDomain,
  countryCode,
  languageCode,
  cmsKeys,
}: FetchCmsKeysInput): Promise<CmsKeyMap> {
  if (cmsKeys.length === 0) return {};
  return await postJson<CmsKeyMap>(`${checkoutDomain}/api/subscription/cms/getTranslations`, {
    countryCode,
    languageCode,
    cmsKeys,
  });
}
