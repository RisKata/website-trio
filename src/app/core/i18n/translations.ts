import type en from './locales/en.json';

export type Language = 'en' | 'mk' | 'sq';

export const languages: { code: Language; label: string }[] = [
  { code: 'mk', label: 'МК' },
  { code: 'en', label: 'EN' },
  { code: 'sq', label: 'SQ' }
];

/** English is the source of keys. Other locales may omit a key and fall back to English. */
export type TranslationKey = keyof typeof en;

export type TranslationTable = Partial<Record<TranslationKey, string>>;
