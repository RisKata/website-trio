import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ConsentService, LANG_COOKIE } from '../consent/consent.service';
import { readCookie, writeCookie } from '../consent/cookies';
import { Language, TranslationKey, translations } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly consent = inject(ConsentService);

  readonly currentLang = signal<Language>(this.loadLanguage());
  readonly langSignal = computed(() => this.currentLang());

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      if (this.consent.accepted()) {
        writeCookie(LANG_COOKIE, lang);
      }
    });
    document.documentElement.lang = this.currentLang();
  }

  t(key: TranslationKey): string {
    const lang = this.currentLang();
    const table = translations[lang] as Record<string, string | undefined>;
    return table[key] ?? translations.en[key] ?? key;
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    document.documentElement.lang = lang;
  }

  private loadLanguage(): Language {
    if (!this.consent.accepted()) {
      return 'mk';
    }

    const stored = readCookie(LANG_COOKIE);
    if (stored === 'en' || stored === 'mk' || stored === 'sq') {
      return stored;
    }
    return 'mk';
  }
}
