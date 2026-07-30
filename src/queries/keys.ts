/** Central registry of query keys, so invalidation stays type-safe. */
export const queryKeys = {
  domains: (countryCode: string) => ['domains', countryCode] as const,
  cmsKeys: (countryCode: string, languageCode: string) =>
    ['cmsKeys', countryCode, languageCode] as const,
  recommendations: (countryCode: string) => ['recommendations', countryCode] as const,
} as const;
