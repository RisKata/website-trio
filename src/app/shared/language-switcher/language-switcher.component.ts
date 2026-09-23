import { Component, inject } from '@angular/core';
import { Language, languages } from '../../core/i18n/translations';
import { TranslationService } from '../../core/i18n/translation.service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  private readonly i18n = inject(TranslationService);

  languages = languages;

  currentLang = this.i18n.currentLang;

  setLanguage(lang: Language): void {
    this.i18n.setLanguage(lang);
  }
}
