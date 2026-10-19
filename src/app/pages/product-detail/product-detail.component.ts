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
  readonly ingredientsOpen = signal(false);

  private static readonly previewSentences = 2;
  private static readonly previewChars = 360;

  constructor() {
    effect(() => {
      this.product();
      this.activeImage.set(0);
      this.flavorIndex.set(0);
      this.ingredientsOpen.set(false);
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

  backQuery(): { category: string } | null {
    const category = this.route.snapshot.queryParamMap.get('category');
    if (category === 'Puff' || category === 'Dough' || category === 'Fry' || category === 'Horeca') {
      return { category };
    }
    return null;
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
    this.ingredientsOpen.set(false);
    this.closeImage();
  }

  ingredientsVisible(key: TranslationKey | undefined): string {
    this.i18n.currentLang();
    const text = this.ingredientsText(key);
    if (!text || this.ingredientsOpen() || !this.ingredientsOverflows(text)) {
      return text;
    }
    return this.ingredientsPreview(text);
  }

  ingredientsCanExpand(key: TranslationKey | undefined): boolean {
    this.i18n.currentLang();
    return this.ingredientsOverflows(this.ingredientsText(key));
  }

  toggleIngredients(): void {
    this.ingredientsOpen.update(open => !open);
  }

  private ingredientsText(key: TranslationKey | undefined): string {
    return key ? this.i18n.t(key).trim() : '';
  }

  private ingredientsOverflows(text: string): boolean {
    return !!text && this.ingredientsPreview(text).length < text.length;
  }

  private ingredientsPreview(text: string): string {
    const paragraphs = text.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
    if (paragraphs.length > 1 && paragraphs[0].length <= ProductDetailComponent.previewChars) {
      return paragraphs[0];
    }

    const source = paragraphs.length > 1 ? paragraphs[0] : text;
    const sentences = [...source.matchAll(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g)];
    let preview = '';
    for (let index = 0; index < Math.min(sentences.length, ProductDetailComponent.previewSentences); index++) {
      const next = `${preview}${sentences[index][0]}`.trimEnd();
      if (preview && next.length > ProductDetailComponent.previewChars) {
        break;
      }
      preview = next;
    }
    if (!preview) {
      preview = source;
    }

    if (preview.length <= ProductDetailComponent.previewChars) {
      return preview;
    }

    const slice = preview.slice(0, ProductDetailComponent.previewChars);
    const cut = Math.max(slice.lastIndexOf(' '), slice.lastIndexOf('\n'));
    const clipped = (cut > 80 ? slice.slice(0, cut) : slice).trim().replace(/[,;:]+$/, '');
    return `${clipped}…`;
  }

  openImage(): void {
    this.enlarged.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeImage(): void {
    this.enlarged.set(false);
    document.body.style.overflow = '';
  }

  stepImage(delta: number, event?: Event): void {
    event?.stopPropagation();
    const product = this.product();
    if (!product) {
      return;
    }

    const count = this.imageList(product).length;
    if (count < 2) {
      return;
    }

    this.activeImage.set((this.activeImage() + delta + count) % count);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.enlarged()) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeImage();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.stepImage(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
