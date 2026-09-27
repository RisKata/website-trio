import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SocialBarComponent } from './layout/social-bar/social-bar.component';
import { TranslationService } from './core/i18n/translation.service';
import { CookieBannerComponent } from './layout/cookie-banner/cookie-banner.component';
import { ScrollTopComponent } from './layout/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SocialBarComponent, FooterComponent, CookieBannerComponent, ScrollTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    inject(TranslationService);
  }
}
