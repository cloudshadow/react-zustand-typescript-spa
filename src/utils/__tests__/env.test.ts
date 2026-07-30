import { describe, expect, it } from 'vitest';
import { domainNameFromHost, envFromHost, fallbackDomains } from '../env';

describe('envFromHost', () => {
  it.each([
    ['www.iherbtest.com', 'test'],
    ['local.iherbtest.com', 'test'],
    ['localhost:3000', 'test'],
    ['www.iherbpreprod.com', 'preprod'],
    ['www.iherb.com', 'production'],
    ['mx.iherb.com', 'production'],
  ])('%s -> %s', (host, expected) => {
    expect(envFromHost(host)).toBe(expected);
  });
});

describe('fallbackDomains', () => {
  it('builds a complete table for production', () => {
    const d = fallbackDomains('www.iherb.com');
    expect(d.catalog).toBe('https://www.iherb.com');
    expect(d.checkout).toBe('https://checkout.iherb.com');
    expect(d.payment).toBe('https://p-proc-srv.iherb.com');
    expect(d.autoship).toBe('https://secure.iherb.com/myaccount/subscription-api');
  });

  it('points at test infrastructure for test hosts', () => {
    expect(domainNameFromHost('local.iherbtest.com')).toBe('iherbtest');
    expect(fallbackDomains('local.iherbtest.com').catalogApi).toBe(
      'https://catalog.app.iherbtest.com',
    );
  });
});
