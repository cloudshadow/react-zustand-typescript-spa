/**
 * Environment + domain helpers.
 *
 * SSR-safe: every function takes the host explicitly instead of reading
 * `window.location`, so the same code runs on the server and in the browser.
 */
import type { DomainInfo } from '@/types';

export type Env = 'test' | 'preprod' | 'production';

export function envFromHost(host: string): Env {
  if (host.includes('iherbtest') || host.includes('localhost') || host.includes('local.')) {
    return 'test';
  }
  if (host.includes('iherbpreprod') || host.includes('preprod')) return 'preprod';
  return 'production';
}

/** Second-level domain used to build sibling service hosts. */
export function domainNameFromHost(host: string): string {
  switch (envFromHost(host)) {
    case 'test':
      return 'iherbtest';
    case 'preprod':
      return 'iherbpreprod';
    default:
      return 'iherb';
  }
}

/**
 * Fallback domain table, used when the domain discovery call fails.
 * Mirrors the behaviour of the legacy Redux `fetchDomainInfo.failure` branch.
 */
export function fallbackDomains(host: string): DomainInfo {
  const d = domainNameFromHost(host);
  return {
    catalogApi: `https://catalog.app.${d}.com`,
    catalog: `https://www.${d}.com`,
    checkout: `https://checkout.${d}.com`,
    secure: `https://secure.${d}.com`,
    payment:
      d === 'iherb' ? 'https://p-proc-srv.iherb.com' : 'https://payment-api.internal.iherbtest.io',
    autoship: `https://secure.${d}.com/myaccount/subscription-api`,
  };
}
