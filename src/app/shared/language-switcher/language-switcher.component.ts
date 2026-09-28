import { Component, ElementRef, HostListener, inject } from '@angular/core';
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
  private readonly host = inject(ElementRef<HTMLElement>);

  languages = languages;

  currentLang = this.i18n.currentLang;

  open = false;

  get currentLabel(): string {
    return this.languages.find((lang) => lang.code === this.currentLang())?.label ?? '';
  }

  toggle(event: Event): void {
    event.stopPropagation();
    this.open = !this.open;
  }

  select(lang: Language): void {
    this.i18n.setLanguage(lang);
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event): void {
    if (!this.open) {
      return;
    }

    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.open = false;
  }
}
