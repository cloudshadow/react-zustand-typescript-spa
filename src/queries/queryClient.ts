import { QueryClient } from '@tanstack/react-query';

/**
 * Single client for the whole app. No `typeof window` guard is needed here --
 * unlike the SSR template, this code only ever runs in the browser.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
