import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface SocialLink {
  id: 'facebook' | 'instagram' | 'youtube';
  href: string;
  labelKey: 'social.facebook' | 'social.instagram' | 'social.youtube';
}

@Component({
  selector: 'app-social-bar',
  imports: [TranslatePipe],
  templateUrl: './social-bar.component.html',
  styleUrl: './social-bar.component.scss'
})
export class SocialBarComponent {
  readonly links: SocialLink[] = [
    { id: 'facebook', href: 'https://www.facebook.com/TRIO95DOO/', labelKey: 'social.facebook' },
    { id: 'instagram', href: 'https://www.instagram.com', labelKey: 'social.instagram' },
    { id: 'youtube', href: 'https://www.youtube.com', labelKey: 'social.youtube' }
  ];
}
