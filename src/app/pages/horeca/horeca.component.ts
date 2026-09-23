import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-horeca',
  imports: [RouterLink, TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './horeca.component.html',
  styleUrl: './horeca.component.scss'
})
export class HorecaComponent {}
