import type { TranslationKey } from '../i18n/translations';

export type Diet = 'vegetarian' | 'vegan' | 'none';
export type Allergen = 'gluten' | 'milk' | 'soy' | 'egg' | 'mustard' | 'sesame';
export type ProductMark = 'vegetarian' | 'vegan' | Allergen;

export interface HorecaSpec {
  pieceKey: TranslationKey;
  packKey: TranslationKey;
}

export interface ProductFlavor {
  id: string;
  nameKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  ingredientsKey: TranslationKey;
  weightKey: TranslationKey;
  allergens?: Allergen[];
  diet?: Diet;
  preparationKey?: TranslationKey;
  nutritionKey?: TranslationKey;
  images?: string[];
}

export interface Product {
  id: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  ingredientsKey: TranslationKey;
  weightKey: TranslationKey;
  weightGrams: number;
  allergens: Allergen[];
  diet: Diet;
  preparationKey: TranslationKey;
  nutritionKey: TranslationKey;
  storageKey: TranslationKey;
  extraKey: TranslationKey;
  categoryKey: TranslationKey;
  category: 'Puff' | 'Dough' | 'Fry';
  images: string[];
  flavors?: ProductFlavor[];
  /** Pieces in the retail package, when that count is shown on the product page. */
  retailPieces?: number;
  /** Omitted products are sold in retail packs. Set false when there is no retail pack. */
  retail?: boolean;
  horeca?: HorecaSpec;
}
