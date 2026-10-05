import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ConsentService, LANG_COOKIE } from '../consent/consent.service';
import { readCookie, writeCookie } from '../consent/cookies';
import { Language, TranslationKey, TranslationTable } from './translations';

const localeLoaders: Record<Language, () => Promise<TranslationTable>> = {
  en: () => import('./locales/en.json').then(module => module.default),
  mk: () => import('./locales/mk.json').then(module => module.default),
  sq: () => import('./locales/sq.json').then(module => module.default)
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly consent = inject(ConsentService);
  private readonly tables = new Map<Language, TranslationTable>();
  private readonly loading = new Map<Language, Promise<TranslationTable>>();
  private request = 0;

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

  /** Loads the active language before the first render. */
  loadCurrent(): Promise<TranslationTable> {
    return this.load(this.currentLang());
  }

  t(key: TranslationKey): string {
    const lang = this.currentLang();
    return this.tables.get(lang)?.[key] ?? this.tables.get('en')?.[key] ?? key;
  }

  async setLanguage(lang: Language): Promise<void> {
    const request = ++this.request;
    const table = await this.load(lang);
    if (request !== this.request) {
      return;
    }

    this.tables.set(lang, table);
    this.currentLang.set(lang);
    document.documentElement.lang = lang;
  }

  private load(lang: Language): Promise<TranslationTable> {
    const cached = this.tables.get(lang);
    if (cached) {
      return Promise.resolve(cached);
    }

    const pending = this.loading.get(lang);
    if (pending) {
      return pending;
    }

    const request = localeLoaders[lang]().then(table => {
      this.tables.set(lang, table);
      this.loading.delete(lang);
      return table;
    });
    this.loading.set(lang, request);
    return request;
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
