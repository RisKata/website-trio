import { afterNextRender, Component, HostListener, inject, signal } from '@angular/core';
import { ConsentService } from '../../core/consent/consent.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-scroll-top',
  imports: [TranslatePipe],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss'
})
export class ScrollTopComponent {
  readonly consent = inject(ConsentService);
  readonly visible = signal(false);

  constructor() {
    afterNextRender(() => this.onWindowScroll());
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const next = y > 320;
    if (next !== this.visible()) {
      this.visible.set(next);
    }
  }

  scrollToTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
