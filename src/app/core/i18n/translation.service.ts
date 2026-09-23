import { Injectable, computed, signal } from '@angular/core';
import { Language, TranslationKey, translations } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly storageKey = 'trio-lang';

  readonly currentLang = signal<Language>(this.loadLanguage());
  readonly langSignal = computed(() => this.currentLang());

  constructor() {
    document.documentElement.lang = this.currentLang();
  }

  t(key: TranslationKey): string {
    const lang = this.currentLang();
    const table = translations[lang] as Record<string, string | undefined>;
    return table[key] ?? translations.en[key] ?? key;
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    localStorage.setItem(this.storageKey, lang);
    document.documentElement.lang = lang;
  }

  private loadLanguage(): Language {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'en' || stored === 'mk' || stored === 'sq') {
      return stored;
    }
    return 'mk';
  }
}
