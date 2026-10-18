import { Component, inject } from '@angular/core';
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

  selectedCategory = 'All';

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const category = params.get('category');
      this.selectedCategory =
        category === 'Puff' || category === 'Dough' || category === 'Fry' ? category : 'All';
    });
  }

  categories: CategoryTile[] = [
    { id: 'Puff', key: 'products.category.puff' },
    { id: 'Dough', key: 'products.category.dough' },
    { id: 'Fry', key: 'products.category.fry' }
  ];

  products: Product[] = products;

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.mixedCatalog(this.products);
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
    const next = category === 'All' || this.selectedCategory === category ? null : category;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: next },
      queryParamsHandling: 'merge'
    });
  }
}
