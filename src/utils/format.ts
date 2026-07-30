/** Locale-aware formatting helpers. Pure functions -- SSR-safe. */

/** ar-SA is displayed with the Gregorian calendar and Latin digits. */
function normaliseLocale(locale: string): string {
  return locale === 'ar-SA' ? 'ar-u-nu-latn-ca-gregory' : locale;
}

export function formatDate(date: string | Date, locale: string): string {
  return new Date(date).toLocaleDateString(normaliseLocale(locale), {
    month: 'long',
    day: '2-digit',
  });
}

export function formatDateWithYear(date: string | Date, locale: string): string {
  return new Date(date).toLocaleDateString(normaliseLocale(locale), {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(normaliseLocale(locale), { style: 'currency', currency }).format(
    amount,
  );
}

/**
 * Rewrites the size segment of an iHerb product image URL.
 * Format: https://{host}/{brand}/{part}/{size}/{index}.{ext}
 */
export function convertImageSize(imageUrl: string, newSize: string): string {
  const parts = imageUrl.split('/');
  if (parts.length <= 5) return imageUrl;
  parts[5] = newSize;
  return parts.join('/');
}
