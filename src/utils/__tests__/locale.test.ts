import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, dirFor } from '../locale';

describe('dirFor', () => {
  it.each([
    ['ar-SA', 'rtl'],
    ['he-IL', 'rtl'],
    ['ar', 'rtl'],
    ['en-US', 'ltr'],
    ['zh-CN', 'ltr'],
    ['fr-FR', 'ltr'],
  ])('%s -> %s', (lang, expected) => {
    expect(dirFor(lang)).toBe(expected);
  });
});

describe('DEFAULT_LOCALE', () => {
  it('is ltr en-US', () => {
    expect(DEFAULT_LOCALE).toEqual({ languageCode: 'en-US', dir: 'ltr' });
  });
});
