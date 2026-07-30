import { describe, expect, it } from 'vitest';
import { envFromHost } from '../env';

describe('envFromHost', () => {
  it.each([
    ['localhost:3000', 'test'],
    ['127.0.0.1:8080', 'test'],
    ['local.myapp.com', 'test'],
    ['myapp.test', 'test'],
    ['preprod.myapp.com', 'preprod'],
    ['staging.myapp.com', 'preprod'],
    ['www.myapp.com', 'production'],
    ['myapp.com', 'production'],
  ])('%s -> %s', (host, expected) => {
    expect(envFromHost(host)).toBe(expected);
  });
});
