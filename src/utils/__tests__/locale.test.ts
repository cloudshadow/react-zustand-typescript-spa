import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, dirFor, resolveLocaleFromPref } from '../locale';

describe('resolveLocaleFromPref', () => {
  it('falls back to the default locale for an empty pref', () => {
    expect(resolveLocaleFromPref('')).toEqual(DEFAULT_LOCALE);
  });

  it('reads country / language / currency', () => {
    expect(resolveLocaleFromPref('lan=zh-CN&sccode=CN&currencyCode=CNY&storeid=3')).toEqual({
      languageCode: 'zh-CN',
      countryCode: 'CN',
      currencyCode: 'CNY',
      storeId: '3',
      dir: 'ltr',
    });
  });

  it('marks RTL languages', () => {
    expect(resolveLocaleFromPref('lan=ar-SA&sccode=SA').dir).toBe('rtl');
  });
});

describe('dirFor', () => {
  it.each([
    ['ar-SA', 'rtl'],
    ['he-IL', 'rtl'],
    ['en-US', 'ltr'],
  ])('%s -> %s', (lang, expected) => {
    expect(dirFor(lang)).toBe(expected);
  });
});
