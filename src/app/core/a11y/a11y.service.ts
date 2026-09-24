import { Injectable, effect, inject, signal } from '@angular/core';
import { A11Y_COOKIE, ConsentService } from '../consent/consent.service';
import { readCookie, writeCookie } from '../consent/cookies';

@Injectable({ providedIn: 'root' })
export class A11yService {
  private readonly consent = inject(ConsentService);

  readonly mono = signal(this.load());

  constructor() {
    effect(() => {
      const on = this.mono();
      if (this.consent.accepted()) {
        writeCookie(A11Y_COOKIE, on ? '1' : '0');
      }
    });
    this.apply(this.mono());
  }

  toggle(): void {
    const next = !this.mono();
    this.mono.set(next);
    this.apply(next);
  }

  private apply(on: boolean): void {
    document.documentElement.classList.toggle('a11y-bw', on);
  }

  private load(): boolean {
    return this.consent.accepted() && readCookie(A11Y_COOKIE) === '1';
  }
}
