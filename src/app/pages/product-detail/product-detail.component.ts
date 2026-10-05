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

interface NutritionRow {
  label: string;
  value: string;
  nested: boolean;
}

interface NutritionTable {
  caption: string;
  rows: NutritionRow[];
}

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

  hasText(key: TranslationKey | undefined): boolean {
    return !!key && this.i18n.t(key).trim().length > 0;
  }

  nutritionTable(key: TranslationKey | undefined): NutritionTable {
    const text = key ? this.i18n.t(key) : '';
    const unit = String.raw`(?:[kк]{1,2}cal|[kк][jј]|гр|gr|г|g)\.?`;
    const amount = String.raw`\d[\d.,]*\s*${unit}`;
    const valuePattern = new RegExp(String.raw`^(.*?)\s+(${amount}(?:\s*\/\s*(?:\d[\d.,]*\s*)?${unit})?)\s*$`, 'iu');
    const notes: string[] = [];
    const rows: NutritionRow[] = [];

    for (const rawLine of text.split('\n')) {
      const line = rawLine.trim();
      if (!line) {
        continue;
      }

      const nested = /^-\s*/.test(line);
      const match = line.replace(/^-\s*/, '').match(valuePattern);
      if (!match) {
        notes.push(line.replace(/:$/, ''));
        continue;
      }

      const label = match[1].replace(/[.:]\s*$/, '').trim();
      const value = match[2].replace(/\.(?=\s|$)/g, '').replace(/\s+/g, ' ').trim();
      if (!label || !value) {
        notes.push(line);
        continue;
      }

      rows.push({
        label,
        value,
        nested: nested || /^(of which|од кои|nga të cilat)(\s|$)/i.test(label)
      });
    }

    return { caption: notes.filter(note => /\d/.test(note)).join(' '), rows };
  }

  allergenLabel(allergen: Allergen): TranslationKey {
    switch (allergen) {
      case 'milk':
        return 'products.allergen.milk';
      case 'soy':
        return 'products.allergen.soy';
      case 'egg':
        return 'products.allergen.egg';
      case 'mustard':
        return 'products.allergen.mustard';
      case 'sesame':
        return 'products.allergen.sesame';
      default:
        return 'products.allergen.gluten';
    }
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
