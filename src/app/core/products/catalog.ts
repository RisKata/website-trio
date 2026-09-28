import { TranslationKey } from '../i18n/translations';

export type Diet = 'vegetarian' | 'vegan' | 'none';
export type Allergen = 'gluten' | 'milk' | 'soy';
export type ProductMark = 'vegetarian' | 'vegan' | Allergen;

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
  allergens: Allergen[];
  diet: Diet;
  preparationKey: TranslationKey;
  nutritionKey: TranslationKey;
  categoryKey: TranslationKey;
  category: 'Puff' | 'Dough' | 'Fry';
  images: string[];
  flavors?: ProductFlavor[];
}

export const products: Product[] = [
  {
    id: 'puff-squares',
    nameKey: 'products.p1.name',
    descKey: 'products.p1.desc',
    ingredientsKey: 'products.p1.ingredients',
    weightKey: 'products.p1.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.bake',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/IMG_0891.JPG'],
    flavors: [
      {
        id: 'classic',
        nameKey: 'products.p1.f1.name',
        titleKey: 'products.p1.f1.title',
        descKey: 'products.p1.f1.desc',
        ingredientsKey: 'products.p1.f1.ingredients',
        weightKey: 'products.p1.f1.weight',
        images: ['products/IMG_0891.JPG']
      },
      {
        id: 'cheese',
        nameKey: 'products.p1.f2.name',
        titleKey: 'products.p1.f2.title',
        descKey: 'products.p1.f2.desc',
        ingredientsKey: 'products.p1.f2.ingredients',
        weightKey: 'products.p1.f2.weight',
        images: ['products/IMG_8578.JPG']
      },
      {
        id: 'apple',
        nameKey: 'products.p1.f3.name',
        titleKey: 'products.p1.f3.title',
        descKey: 'products.p1.f3.desc',
        ingredientsKey: 'products.p1.f3.ingredients',
        weightKey: 'products.p1.f3.weight',
        images: ['products/IMG_7890.JPG']
      }
    ]
  },
  {
    id: 'puff-twists',
    nameKey: 'products.p2.name',
    descKey: 'products.p2.desc',
    ingredientsKey: 'products.p2.ingredients',
    weightKey: 'products.p2.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.bake',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/IMG_0702.JPG']
  },
  {
    id: 'apple-cinnamon',
    nameKey: 'products.p3.name',
    descKey: 'products.p3.desc',
    ingredientsKey: 'products.p3.ingredients',
    weightKey: 'products.p3.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.bake',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/cheese.png', 'products/IMG_7890.JPG']
  },
  {
    id: 'cheese-parcels',
    nameKey: 'products.p4.name',
    descKey: 'products.p4.desc',
    ingredientsKey: 'products.p4.ingredients',
    weightKey: 'products.p4.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.bake',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/IMG_8578.JPG']
  },
  {
    id: 'puff-soy',
    nameKey: 'products.p5.name',
    descKey: 'products.p5.desc',
    ingredientsKey: 'products.p5.ingredients',
    weightKey: 'products.p5.weight',
    allergens: ['gluten', 'soy'],
    diet: 'vegan',
    preparationKey: 'products.prep.dough',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/IMG_7889.JPG']
  },
  {
    id: 'filo',
    nameKey: 'products.p6.name',
    descKey: 'products.p6.desc',
    ingredientsKey: 'products.p6.ingredients',
    weightKey: 'products.p6.weight',
    allergens: ['gluten'],
    diet: 'vegan',
    preparationKey: 'products.prep.dough',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/IMG_7901.JPG']
  },
  {
    id: 'breaded-cheese',
    nameKey: 'products.p7.name',
    descKey: 'products.p7.desc',
    ingredientsKey: 'products.p7.ingredients',
    weightKey: 'products.p7.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.fry',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/IMG_9146.JPG']
  },
  {
    id: 'white-cheese',
    nameKey: 'products.p8.name',
    descKey: 'products.p8.desc',
    ingredientsKey: 'products.p8.ingredients',
    weightKey: 'products.p8.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.fry',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/IMG_9222.JPG']
  },
  {
    id: 'mozzarella',
    nameKey: 'products.p9.name',
    descKey: 'products.p9.desc',
    ingredientsKey: 'products.p9.ingredients',
    weightKey: 'products.p9.weight',
    allergens: ['gluten', 'milk'],
    diet: 'vegetarian',
    preparationKey: 'products.prep.fry',
    nutritionKey: 'products.nutrition.body',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/IMG_9333.JPG']
  }
];

export const featuredProducts = [
  products[0],
  products[2],
  products[8]
];

export function findProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
