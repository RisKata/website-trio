import type en from './locales/en.json';

export type Language = 'en' | 'mk' | 'sq';

/** English is the source of keys. Other locales may omit a key and fall back to English. */
export type TranslationKey = keyof typeof en;

export const languages: { code: Language; label: string; nameKey: TranslationKey }[] = [
  { code: 'mk', label: 'МК', nameKey: 'lang.option.mk' },
  { code: 'en', label: 'EN', nameKey: 'lang.option.en' },
  { code: 'sq', label: 'SQ', nameKey: 'lang.option.sq' }
];

export type TranslationTable = Partial<Record<TranslationKey, string>>;
