import { getJson } from './http';
import { domainNameFromHost, fallbackDomains } from '@/utils/env';
import type { DomainInfo } from '@/types';

/**
 * Domain self-discovery: never hard-code service hosts.
 * Falls back to a complete table when the lookup fails.
 */
export async function fetchDomains(host: string, countryCode: string): Promise<DomainInfo> {
  const domainName = domainNameFromHost(host);
  const url = `https://catalog.app.${domainName}.com/domains/${countryCode}`;
  try {
    const data = await getJson<Partial<DomainInfo>>(url);
    return {
      ...fallbackDomains(host),
      ...data,
      // The autoship API is not part of the discovery payload.
      autoship: `https://secure.${domainName}.com/myaccount/subscription-api`,
    };
  } catch {
    return fallbackDomains(host);
  }
}
