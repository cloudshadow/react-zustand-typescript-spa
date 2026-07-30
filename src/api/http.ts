/** Minimal fetch helpers shared by every api/ module. No framework deps. */

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    message?: string,
  ) {
    super(message ?? `Request failed with ${status}: ${url}`);
    this.name = 'HttpError';
  }
}

export async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { Accept: 'application/json', ...init?.headers } });
  if (!res.ok) throw new HttpError(res.status, url);
  return (await res.json()) as T;
}

export async function getText(url: string, init?: RequestInit): Promise<string> {
  const res = await fetch(url, init);
  if (!res.ok) throw new HttpError(res.status, url);
  return await res.text();
}

export async function postJson<T>(url: string, body: unknown, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    ...init,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init?.headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new HttpError(res.status, url);
  return (await res.json()) as T;
}

/**
 * Retries a request up to `retries` times.
 *
 * NOTE: takes a FACTORY, not a promise. The legacy implementation accepted an
 * already-created promise and awaited the same settled value on every retry,
 * which made retrying a no-op.
 */
export async function retry<T>(factory: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await factory();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
