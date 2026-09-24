import { Component, inject } from '@angular/core';
import { ConsentService } from '../../core/consent/consent.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-cookie-banner',
  imports: [TranslatePipe],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent {
  readonly consent = inject(ConsentService);

  accept(): void {
    this.consent.accept();
  }

  decline(): void {
    this.consent.decline();
  }
}
