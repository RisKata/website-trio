import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, ElementRef, HostListener, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { A11yService } from '../../core/a11y/a11y.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationKey } from '../../core/i18n/translations';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'site-header' }
})
export class HeaderComponent {
  readonly a11y = inject(A11yService);
  private readonly mainHeader = viewChild<ElementRef<HTMLElement>>('mainHeader');
  menuOpen = false;
  scrolled = false;

  constructor() {
    afterNextRender(() => this.onWindowScroll());
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const header = this.mainHeader()?.nativeElement;
    const hidden = header
      ? header.getBoundingClientRect().bottom <= 0
      : (window.scrollY || document.documentElement.scrollTop || 0) > 140;
    if (hidden !== this.scrolled) {
      this.scrolled = hidden;
      this.menuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  a11yLabel(): TranslationKey {
    return this.a11y.mono() ? 'a11y.disable' : 'a11y.enable';
  }
}
