/** Central registry of query keys, so invalidation stays type-safe. */
export const queryKeys = {
  posts: () => ['posts'] as const,
} as const;
