import { describe, expect, it, vi } from 'vitest';
import { retry } from '../http';

describe('retry', () => {
  it('re-invokes the factory on failure (the legacy bug: it awaited one settled promise)', async () => {
    const factory = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce('ok');

    await expect(retry(factory, 2)).resolves.toBe('ok');
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('rethrows once retries are exhausted', async () => {
    const factory = vi.fn<() => Promise<string>>().mockRejectedValue(new Error('always'));
    await expect(retry(factory, 1)).rejects.toThrow('always');
    expect(factory).toHaveBeenCalledTimes(2);
  });
});
