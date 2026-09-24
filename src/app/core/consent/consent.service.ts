import { Injectable, computed, signal } from '@angular/core';
import { deleteCookie, readCookie, writeCookie } from './cookies';

export const CONSENT_COOKIE = 'trio-consent';
export const LANG_COOKIE = 'trio-lang';
export const A11Y_COOKIE = 'trio-a11y-bw';

export type ConsentStatus = 'unknown' | 'accepted' | 'declined';

/** Bump when the policy changes so earlier answers are asked again. */
const CONSENT_VERSION = '2';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly status = signal<ConsentStatus>(this.load());
  readonly bannerOpen = signal(this.status() === 'unknown');
  readonly pending = this.bannerOpen;
  /** Preference cookies and Google Analytics. Both stay off until this is true. */
  readonly accepted = computed(() => this.status() === 'accepted');
  readonly analyticsAllowed = this.accepted;

  accept(): void {
    writeCookie(CONSENT_COOKIE, `accepted.${CONSENT_VERSION}`);
    this.clearLegacyStorage();
    this.status.set('accepted');
    this.bannerOpen.set(false);
  }

  decline(): void {
    deleteCookie(CONSENT_COOKIE);
    deleteCookie(LANG_COOKIE);
    deleteCookie(A11Y_COOKIE);
    this.clearLegacyStorage();
    this.status.set('declined');
    this.bannerOpen.set(false);
  }

  reopen(): void {
    this.bannerOpen.set(true);
  }

  private load(): ConsentStatus {
    const stored = readCookie(CONSENT_COOKIE);
    if (stored === `accepted.${CONSENT_VERSION}`) {
      return 'accepted';
    }
    return 'unknown';
  }

  private clearLegacyStorage(): void {
    try {
      localStorage.removeItem(LANG_COOKIE);
      localStorage.removeItem(A11Y_COOKIE);
    } catch {
      // Storage can be blocked; cookies are the source of truth.
    }
  }
}
