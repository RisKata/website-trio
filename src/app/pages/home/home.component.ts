import { Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/consent/consent.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly consent = inject(ConsentService);
  private readonly i18n = inject(TranslationService);

  readonly facebookPage = 'https://www.facebook.com/TRIO95DOO/';

  /** Temporary visualization clip; swap the id when the final film is ready. */
  readonly videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/PyX9iImFnOI?si=yPqRwcOjuPl0zzRC'
  );

  /** Facebook Page Plugin timeline. A custom post grid needs the Graph API and a server. */
  readonly facebookFeedUrl = computed((): SafeResourceUrl | null => {
    if (!this.consent.accepted()) {
      return null;
    }

    const locale = { en: 'en_US', mk: 'mk_MK', sq: 'sq_AL' }[this.i18n.currentLang()];
    const href = encodeURIComponent(this.facebookPage);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.facebook.com/plugins/page.php?href=${href}&tabs=timeline&width=500&height=560&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&locale=${locale}`
    );
  });

  openCookieSettings(): void {
    this.consent.reopen();
  }

}
