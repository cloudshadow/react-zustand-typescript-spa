/**
 * Locale resolution (client-side).
 *
 * Country/language live in the `iher-pref1` cookie -- they cannot be derived
 * from the URL. Unlike the SSR template this file may touch `document` freely:
 * there is no server render, so no SSR-safe guards are needed.
 */
import type { Locale } from '@/types';

/** Languages rendered right-to-left. Drives <html dir>, never JS branches. */
const RTL_LANGUAGES = ['ar-SA', 'he-IL', 'fa', 'ur'];

export const DEFAULT_LOCALE: Locale = {
  languageCode: 'en-US',
  countryCode: 'US',
  currencyCode: 'USD',
  storeId: '0',
  dir: 'ltr',
};

export function readCookie(name: string): string {
  const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return match?.pop() ?? '';
}

/** `iher-pref1` is itself a query-string-shaped blob, e.g. `lan=zh-CN&sccode=CN`. */
function readPref(pref: string, name: string): string | undefined {
  return new URLSearchParams(pref).get(name) ?? undefined;
}

export function dirFor(languageCode: string): 'ltr' | 'rtl' {
  return RTL_LANGUAGES.includes(languageCode) ? 'rtl' : 'ltr';
}

export function resolveLocaleFromPref(pref: string): Locale {
  const languageCode = readPref(pref, 'lan') || DEFAULT_LOCALE.languageCode;
  return {
    languageCode,
    countryCode: readPref(pref, 'sccode') || DEFAULT_LOCALE.countryCode,
    currencyCode: readPref(pref, 'currencyCode') || DEFAULT_LOCALE.currencyCode,
    storeId: readPref(pref, 'storeid') || DEFAULT_LOCALE.storeId,
    dir: dirFor(languageCode),
  };
}

export function resolveLocale(): Locale {
  return resolveLocaleFromPref(readCookie('iher-pref1'));
}

/** True when running inside the native app WebView. */
export function isNative(): boolean {
  return Boolean(readCookie('app-ihr'));
}

/** Mobile detection from the browser UA. Safe here -- there is no hydration to match. */
export function isMobileDevice(): boolean {
  return /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);
}

/** Applies lang/dir to <html>. Called once at bootstrap. */
export function applyDocumentLocale(locale: Locale): void {
  const html = document.documentElement;
  html.lang = locale.languageCode;
  html.dir = locale.dir;
}
