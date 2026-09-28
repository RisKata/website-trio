import en from './locales/en.json';
import mk from './locales/mk.json';
import sq from './locales/sq.json';

export type Language = 'en' | 'mk' | 'sq';

export const languages: { code: Language; label: string }[] = [
  { code: 'mk', label: 'МК' },
  { code: 'en', label: 'EN' },
  { code: 'sq', label: 'SQ' }
];

/** English is the source of keys. Other locales may omit a key and fall back to English. */
export type TranslationKey = keyof typeof en;

type TranslationMap = Partial<Record<TranslationKey, string>>;

/**
 * Copy locales/en.json when adding a language, then register the file here
 * and add its code to the Language union and the languages list.
 */
export const translations: { en: Record<TranslationKey, string> } & Record<Language, TranslationMap> = {
  en,
  mk,
  sq
};
