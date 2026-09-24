import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { TranslationKey } from '../../core/i18n/translations';

interface Product {
  id: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  categoryKey: TranslationKey;
  category: string;
  image: string;
}

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
export class ProductsComponent implements OnDestroy {
  selectedCategory = 'All';
  preview: Product | null = null;

  categories: CategoryTile[] = [
    { id: 'Puff', key: 'products.category.puff' },
    { id: 'Dough', key: 'products.category.dough' },
    { id: 'Fry', key: 'products.category.fry' }
  ];

  products: Product[] = [
    { id: '1', nameKey: 'products.p1.name', descKey: 'products.p1.desc', categoryKey: 'products.category.puff', category: 'Puff', image: 'products/IMG_0891.JPG' },
    { id: '2', nameKey: 'products.p2.name', descKey: 'products.p2.desc', categoryKey: 'products.category.puff', category: 'Puff', image: 'products/IMG_0702.JPG' },
    { id: '3', nameKey: 'products.p3.name', descKey: 'products.p3.desc', categoryKey: 'products.category.puff', category: 'Puff', image: 'products/IMG_7890.JPG' },
    { id: '4', nameKey: 'products.p4.name', descKey: 'products.p4.desc', categoryKey: 'products.category.puff', category: 'Puff', image: 'products/IMG_8578.JPG' },
    { id: '5', nameKey: 'products.p5.name', descKey: 'products.p5.desc', categoryKey: 'products.category.dough', category: 'Dough', image: 'products/IMG_7889.JPG' },
    { id: '6', nameKey: 'products.p6.name', descKey: 'products.p6.desc', categoryKey: 'products.category.dough', category: 'Dough', image: 'products/IMG_7901.JPG' },
    { id: '7', nameKey: 'products.p7.name', descKey: 'products.p7.desc', categoryKey: 'products.category.fry', category: 'Fry', image: 'products/IMG_9146.JPG' },
    { id: '8', nameKey: 'products.p8.name', descKey: 'products.p8.desc', categoryKey: 'products.category.fry', category: 'Fry', image: 'products/IMG_9222.JPG' },
    { id: '9', nameKey: 'products.p9.name', descKey: 'products.p9.desc', categoryKey: 'products.category.fry', category: 'Fry', image: 'products/IMG_9333.JPG' }
  ];

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category === 'All' || this.selectedCategory === category ? 'All' : category;
  }

  openPreview(product: Product): void {
    this.preview = product;
    document.body.style.overflow = 'hidden';
  }

  closePreview(): void {
    this.preview = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.preview) {
      this.closePreview();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
