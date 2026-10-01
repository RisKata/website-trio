import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, ElementRef, HostListener, inject, OnDestroy, viewChild } from '@angular/core';
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
export class HeaderComponent implements OnDestroy {
  readonly a11y = inject(A11yService);
  private readonly document = inject(DOCUMENT);
  private readonly mainHeader = viewChild<ElementRef<HTMLElement>>('mainHeader');
  private scrollLockY = 0;
  menuOpen = false;
  scrolled = false;

  constructor() {
    afterNextRender(() => this.onWindowScroll());
  }

  ngOnDestroy(): void {
    this.unlockPageScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.menuOpen) {
      return;
    }

    const header = this.mainHeader()?.nativeElement;
    const hidden = header
      ? header.getBoundingClientRect().bottom <= 0
      : (window.scrollY || this.document.documentElement.scrollTop || 0) > 140;
    if (hidden !== this.scrolled) {
      this.scrolled = hidden;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.menuOpen && !this.isMobileNav()) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.syncScrollLock();
  }

  closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }

    this.menuOpen = false;
    this.syncScrollLock();
  }

  private isMobileNav(): boolean {
    return window.matchMedia('(max-width: 960px)').matches;
  }

  private syncScrollLock(): void {
    if (this.menuOpen && this.isMobileNav()) {
      this.lockPageScroll();
      return;
    }

    this.unlockPageScroll();
  }

  private lockPageScroll(): void {
    const root = this.document.documentElement;
    const body = this.document.body;
    if (root.classList.contains('menu-scroll-lock')) {
      return;
    }

    this.scrollLockY = window.scrollY || root.scrollTop || 0;
    root.classList.add('menu-scroll-lock');
    body.style.position = 'fixed';
    body.style.top = `-${this.scrollLockY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
  }

  private unlockPageScroll(): void {
    const root = this.document.documentElement;
    const body = this.document.body;
    if (!root.classList.contains('menu-scroll-lock')) {
      return;
    }

    root.classList.remove('menu-scroll-lock');
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    window.scrollTo(0, this.scrollLockY);
  }

  a11yLabel(): TranslationKey {
    return this.a11y.mono() ? 'a11y.disable' : 'a11y.enable';
  }
}
