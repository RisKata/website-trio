import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly addressMaps = {
    one: 'https://maps.app.goo.gl/SjT3fQ9enuZTPqCU7',
    two: 'https://maps.app.goo.gl/1iXvsTBzL6vdhZ6M9'
  };
}
