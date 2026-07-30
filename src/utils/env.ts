/**
 * Environment helpers.
 *
 * Accept the host explicitly rather than reading `window.location` so the same
 * code can be unit-tested in Node.
 */

export type Env = 'test' | 'preprod' | 'production';

export function envFromHost(host: string): Env {
  if (
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.startsWith('local.') ||
    host.endsWith('.test')
  ) {
    return 'test';
  }
  if (host.includes('preprod') || host.includes('staging')) return 'preprod';
  return 'production';
}
