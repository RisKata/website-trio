import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

const PDF_FILE = 'catalog/TRIO PRODUCT CATALOGUE.pdf';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly pdfPath = encodeURI(PDF_FILE);
  readonly pdfName = 'TRIO PRODUCT CATALOGUE.pdf';
  readonly pdfSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `${this.pdfPath}#view=FitH`
  );
}
