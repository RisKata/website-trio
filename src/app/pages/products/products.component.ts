import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selectedCategory = 'All';

  categories: CategoryTile[] = [
    { id: 'Puff', key: 'products.category.puff' },
    { id: 'Dough', key: 'products.category.dough' },
    { id: 'Fry', key: 'products.category.fry' }
  ];

  products: Product[] = products;

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category === 'All' || this.selectedCategory === category ? 'All' : category;
  }
}
