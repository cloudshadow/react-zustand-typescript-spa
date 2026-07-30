import { createContext, useContext } from 'react';
import { DEFAULT_LOCALE } from '@/utils';
import type { Locale } from '@/types';

/**
 * Locale is resolved once at bootstrap and shared through context.
 *
 * Reading it from a context rather than calling `resolveLocale()` in every
 * component keeps a single source of truth and avoids repeated cookie parsing.
 * Language switching happens in the host app / header and triggers a full page
 * reload, so the value never changes during a session.
 */
export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
