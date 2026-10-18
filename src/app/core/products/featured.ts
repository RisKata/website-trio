import { Product } from './product.model';

const puffCheese: Product = {
  id: 'puff-cheese',
  nameKey: 'products.p01.name',
  descKey: 'products.p01.desc',
  ingredientsKey: 'products.p01.ingredients',
  weightKey: 'products.p01.weight',
  allergens: ['gluten', 'milk', 'egg'],
  diet: 'none',
  preparationKey: 'products.p01.preparation',
  nutritionKey: 'products.p01.nutrition',
  storageKey: 'products.p01.storage',
  extraKey: 'products.p01.extra',
  categoryKey: 'products.category.puff',
  category: 'Puff',
  images: [
    'products/lisnati-pogachici-so-sirenje/pogacici-sirenje.png',
    'products/lisnati-pogachici-so-sirenje/IMG_8666.jpg'
  ]
};

const pizzaCapricciosa: Product = {
  id: 'pizza-capricciosa',
  nameKey: 'products.p13.name',
  descKey: 'products.p13.desc',
  ingredientsKey: 'products.p13.ingredients',
  weightKey: 'products.p13.weight',
  allergens: ['gluten', 'milk'],
  diet: 'none',
  preparationKey: 'products.p13.preparation',
  nutritionKey: 'products.p13.nutrition',
  storageKey: 'products.p13.storage',
  extraKey: 'products.p13.extra',
  categoryKey: 'products.category.dough',
  category: 'Dough',
  images: ['products/pica-kapricioza/IMG_5850.JPG']
};

const croissantPlain: Product = {
  id: 'croissant-plain',
  nameKey: 'products.p26.name',
  descKey: 'products.p26.desc',
  ingredientsKey: 'products.p26.ingredients',
  weightKey: 'products.p26.weight',
  allergens: ['gluten', 'milk', 'egg'],
  diet: 'none',
  preparationKey: 'products.p26.preparation',
  nutritionKey: 'products.p26.nutrition',
  storageKey: 'products.p26.storage',
  extraKey: 'products.p26.extra',
  categoryKey: 'products.category.puff',
  category: 'Puff',
  images: [
    'products/kroasan-blag/croassant.jpeg',
    'products/kroasan-blag/half-croassant.jpeg'
  ]
};

/** Homepage highlights. Kept separate so the full catalog stays out of the first load. */
export const featuredProducts: Product[] = [puffCheese, pizzaCapricciosa, croissantPlain];

export { puffCheese, pizzaCapricciosa, croissantPlain };
