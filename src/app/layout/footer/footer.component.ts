import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/consent/consent.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly consent = inject(ConsentService);
  currentYear = new Date().getFullYear();

  openCookieSettings(): void {
    this.consent.reopen();
  }
}
