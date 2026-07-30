/**
 * Locale resolution.
 *
 * Uses navigator.language, which every modern browser sets from OS/browser
 * preferences. Resolved once at bootstrap and shared via LocaleContext.
 */
import type { Locale } from '@/types';

const RTL_LANGUAGES = ['ar', 'ar-SA', 'he', 'he-IL', 'fa', 'ur'];

export const DEFAULT_LOCALE: Locale = {
  languageCode: 'en-US',
  dir: 'ltr',
};

export function dirFor(languageCode: string): 'ltr' | 'rtl' {
  const base = languageCode.split('-')[0] ?? languageCode;
  return RTL_LANGUAGES.includes(languageCode) || RTL_LANGUAGES.includes(base) ? 'rtl' : 'ltr';
}

export function resolveLocale(): Locale {
  const languageCode = navigator.language || DEFAULT_LOCALE.languageCode;
  return { languageCode, dir: dirFor(languageCode) };
}

/** Sets <html lang> and <html dir> to prevent a flash of the wrong direction. */
export function applyDocumentLocale(locale: Locale): void {
  document.documentElement.lang = locale.languageCode;
  document.documentElement.dir = locale.dir;
}

/** Mobile detection from the browser UA. */
export function isMobileDevice(): boolean {
  return /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);
}
