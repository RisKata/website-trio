import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';
import { TranslationKey } from './translations';

@Pipe({
  name: 't',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(TranslationService);

  transform(key: TranslationKey): string {
    this.i18n.langSignal();
    return this.i18n.t(key);
  }
}
