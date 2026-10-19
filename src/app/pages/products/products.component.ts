import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { products, Product } from '../../core/products/catalog';
import { TranslationKey } from '../../core/i18n/translations';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

interface CategoryTile {
  id: string;
  key: TranslationKey;
}

@Component({
  selector: 'app-products',
  imports: [RouterLink, TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  selectedCategory = 'All';
  categoryMenuOpen = false;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const category = params.get('category');
      this.selectedCategory =
        category === 'Puff' || category === 'Dough' || category === 'Fry' || category === 'Horeca'
          ? category
          : 'All';
    });
  }

  categories: CategoryTile[] = [
    { id: 'Puff', key: 'products.category.puff' },
    { id: 'Dough', key: 'products.category.dough' },
    { id: 'Fry', key: 'products.category.fry' }
  ];

  products: Product[] = products;

  get selectedCategoryKey(): TranslationKey {
    if (this.selectedCategory === 'Horeca') {
      return 'products.horeca.tag';
    }
    return this.categories.find(category => category.id === this.selectedCategory)?.key ?? 'products.category.all';
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.mixedCatalog(this.products);
    }
    if (this.selectedCategory === 'Horeca') {
      return this.products.filter(product => product.horeca);
    }
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  /** Round-robin across categories so "All" does not open with one category's block. */
  private mixedCatalog(items: Product[]): Product[] {
    const order = this.categories.map(category => category.id);
    const buckets = order.map(id => items.filter(product => product.category === id));
    const mixed: Product[] = [];
    const longest = Math.max(0, ...buckets.map(bucket => bucket.length));

    for (let index = 0; index < longest; index++) {
      for (const bucket of buckets) {
        const product = bucket[index];
        if (product) {
          mixed.push(product);
        }
      }
    }

    const known = new Set(order);
    return [...mixed, ...items.filter(product => !known.has(product.category))];
  }

  selectCategory(category: string): void {
    if (this.selectedCategory === category) {
      return;
    }
    const next = category === 'All' ? null : category;
    this.selectedCategory = category;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: next },
      queryParamsHandling: 'merge'
    });
  }

  toggleCategoryMenu(event: Event): void {
    event.stopPropagation();
    this.categoryMenuOpen = !this.categoryMenuOpen;
  }

  chooseCategory(category: string): void {
    this.categoryMenuOpen = false;
    if (category !== this.selectedCategory) {
      this.selectCategory(category);
    }
  }

  @HostListener('document:click', ['$event'])
  closeCategoryMenuOnOutsideClick(event: Event): void {
    if (!this.categoryMenuOpen) {
      return;
    }

    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.categoryMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeCategoryMenuOnEscape(): void {
    this.categoryMenuOpen = false;
  }
}
