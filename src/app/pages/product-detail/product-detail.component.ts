import { Component, HostListener, OnDestroy, effect, inject, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { Allergen, Diet, findProduct, Product } from '../../core/products/catalog';
import { TranslationKey } from '../../core/i18n/translations';
import { MarkIconComponent } from './mark-icon.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, TranslatePipe, MarkIconComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly i18n = inject(TranslationService);

  readonly product = toSignal(
    this.route.paramMap.pipe(map(params => findProduct(params.get('id') ?? '') ?? null)),
    { initialValue: null as Product | null }
  );

  readonly activeImage = signal(0);
  readonly flavorIndex = signal(0);
  readonly enlarged = signal(false);

  constructor() {
    effect(() => {
      this.product();
      this.activeImage.set(0);
      this.flavorIndex.set(0);
      this.closeImage();
    });

    effect(() => {
      const product = this.product();
      const flavor = product?.flavors?.[this.flavorIndex()];
      this.i18n.currentLang();
      const name = product ? this.i18n.t(flavor?.titleKey ?? product.nameKey) : '';
      this.title.setTitle(product ? `${name} — Trio 95` : 'Trio 95');
    });
  }

  imageList(product: Product): string[] {
    const flavor = product.flavors?.[this.flavorIndex()];
    return flavor?.images?.length ? flavor.images : product.images;
  }

  titleFor(product: Product): TranslationKey {
    const flavor = product.flavors?.[this.flavorIndex()];
    return flavor?.titleKey ?? product.nameKey;
  }

  dietFor(product: Product): Diet {
    const flavor = product.flavors?.[this.flavorIndex()];
    return flavor?.diet ?? product.diet;
  }

  allergensFor(product: Product): Allergen[] {
    const flavor = product.flavors?.[this.flavorIndex()];
    return flavor?.allergens ?? product.allergens;
  }

  dietLabel(diet: Exclude<Diet, 'none'>): TranslationKey {
    return diet === 'vegan' ? 'products.diet.vegan' : 'products.diet.vegetarian';
  }

  allergenLabel(allergen: Allergen): TranslationKey {
    if (allergen === 'milk') {
      return 'products.allergen.milk';
    }
    if (allergen === 'soy') {
      return 'products.allergen.soy';
    }
    return 'products.allergen.gluten';
  }

  selectImage(index: number): void {
    this.activeImage.set(index);
    this.openImage();
  }

  selectFlavor(index: number): void {
    this.flavorIndex.set(index);
    this.activeImage.set(0);
    this.closeImage();
  }

  openImage(): void {
    this.enlarged.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeImage(): void {
    this.enlarged.set(false);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.enlarged()) {
      this.closeImage();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
