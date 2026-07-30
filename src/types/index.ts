/** Country / language context, resolved from navigator.language. */
export interface Locale {
  languageCode: string;
  /** 'rtl' for Arabic/Hebrew/Farsi/Urdu, otherwise 'ltr'. Set on <html dir>. */
  dir: 'ltr' | 'rtl';
}
