import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}
