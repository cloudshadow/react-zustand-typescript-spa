/** Resolved iHerb service domains, fetched from the catalog app (see api/domains.ts). */
export interface DomainInfo {
  catalogApi: string;
  catalog: string;
  checkout: string;
  secure: string;
  payment: string;
  autoship: string;
}

/** Country / language / currency context, read from the `iher-pref1` cookie. */
export interface Locale {
  languageCode: string;
  countryCode: string;
  currencyCode: string;
  storeId: string;
  /** 'rtl' for Arabic/Hebrew/Farsi/Urdu, otherwise 'ltr'. Applied to <html dir>. */
  dir: 'ltr' | 'rtl';
}

export type CmsKeyMap = Record<string, string>;
