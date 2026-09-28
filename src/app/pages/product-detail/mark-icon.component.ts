import { Component, input } from '@angular/core';
import { ProductMark } from '../../core/products/catalog';

@Component({
  selector: 'app-mark-icon',
  template: `
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('vegetarian') {
          <circle cx="24" cy="24" r="20.5" fill="#FFED00" stroke="#fff" stroke-width="3" />
          <path d="M24 34c.2-7.2 5.4-13.2 13.2-15.6-1.6 8.6-7.2 14.4-13.2 15.6z" fill="#fff6d8" />
          <path d="M24 34c-.2-7.2-5.4-13.2-13.2-15.6 1.6 8.6 7.2 14.4 13.2 15.6z" fill="#007D34" />
          <path d="M24 33.5V16" stroke="#fff6d8" stroke-width="2" stroke-linecap="round" />
        }
        @case ('vegan') {
          <circle cx="24" cy="24" r="20.5" fill="#007D34" stroke="#fff" stroke-width="3" />
          <path d="M24 34V18" stroke="#FFED00" stroke-width="2" stroke-linecap="round" />
          <path d="M24 28c-4-1.2-8.2-4.6-10.4-10.2 6.2.4 10.2 4.2 10.4 10.2z" fill="#FFED00" />
          <path d="M24 24c4-.8 8.4-4.4 10.2-10.4-6.4.6-10 4.6-10.2 10.4z" fill="#FFED00" />
          <circle cx="24" cy="15.5" r="2" fill="#FFED00" />
        }
        @case ('gluten') {
          <circle cx="24" cy="24" r="22" fill="#f7f1e6" stroke="#c4a574" stroke-width="1.5" />
          <path d="M24 36V13" stroke="#8a6232" stroke-width="1.7" stroke-linecap="round" />
          <ellipse cx="24" cy="12.5" rx="2.1" ry="3" fill="#c4a574" />
          <ellipse cx="19.2" cy="18" rx="3.4" ry="1.9" transform="rotate(-28 19.2 18)" fill="#b8894a" />
          <ellipse cx="28.8" cy="18" rx="3.4" ry="1.9" transform="rotate(28 28.8 18)" fill="#b8894a" />
          <ellipse cx="18.6" cy="23.5" rx="3.6" ry="1.9" transform="rotate(-22 18.6 23.5)" fill="#c4a574" />
          <ellipse cx="29.4" cy="23.5" rx="3.6" ry="1.9" transform="rotate(22 29.4 23.5)" fill="#c4a574" />
          <ellipse cx="19" cy="29" rx="3.3" ry="1.8" transform="rotate(-16 19 29)" fill="#a9783c" />
          <ellipse cx="29" cy="29" rx="3.3" ry="1.8" transform="rotate(16 29 29)" fill="#a9783c" />
        }
        @case ('milk') {
          <circle cx="24" cy="24" r="22" fill="#f4f8fb" stroke="#8eafc4" stroke-width="1.5" />
          <path d="M19.5 15h9l1.4 3.2V32a4.2 4.2 0 0 1-4.2 4.2h-3.4A4.2 4.2 0 0 1 18 32V18.2z" fill="#fff" stroke="#5d86a3" stroke-width="1.6" stroke-linejoin="round" />
          <path d="M19.5 20.2h10.2" stroke="#5d86a3" stroke-width="1.4" />
          <path d="M21.2 15v-1.6h5.6V15" stroke="#5d86a3" stroke-width="1.4" stroke-linecap="round" />
        }
        @case ('soy') {
          <circle cx="24" cy="24" r="22" fill="#f3f7ee" stroke="#8eaf6a" stroke-width="1.5" />
          <g transform="rotate(-28 24 24)">
            <ellipse cx="24" cy="24" rx="7.2" ry="13.2" fill="#6fa344" />
            <path d="M24 12.2v23.6" stroke="#f7f3e8" stroke-width="1.2" stroke-linecap="round" />
            <circle cx="24" cy="18" r="2" fill="#f7f3e8" />
            <circle cx="24" cy="24" r="2" fill="#f7f3e8" />
            <circle cx="24" cy="30" r="2" fill="#f7f3e8" />
          </g>
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
})
export class MarkIconComponent {
  readonly name = input.required<ProductMark>();
}
