import { croissantPlain, pizzaCapricciosa, puffCheese } from './featured';
import { Product } from './product.model';

export type { Allergen, Diet, Product, ProductFlavor, ProductMark } from './product.model';

export const products: Product[] = [
  puffCheese,
  {
    id: 'mini-puff-cheese',
    nameKey: 'products.p28.name',
    descKey: 'products.p01.desc',
    ingredientsKey: 'products.p01.ingredients',
    weightKey: 'products.p28.weight',
    weightGrams: 500,
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
  },
  {
    id: 'puff-kashkaval',
    nameKey: 'products.p02.name',
    descKey: 'products.p02.desc',
    ingredientsKey: 'products.p02.ingredients',
    weightKey: 'products.p02.weight',
    weightGrams: 1000,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p02.preparation',
    nutritionKey: 'products.p02.nutrition',
    storageKey: 'products.p02.storage',
    extraKey: 'products.p02.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-kashkaval/pogacici-kaskaval.png',
      'products/lisnati-pogachici-so-kashkaval/IMG_8359.JPG'
    ]
  },
  {
    id: 'mini-puff-kashkaval',
    nameKey: 'products.p29.name',
    descKey: 'products.p02.desc',
    ingredientsKey: 'products.p02.ingredients',
    weightKey: 'products.p29.weight',
    weightGrams: 500,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p02.preparation',
    nutritionKey: 'products.p02.nutrition',
    storageKey: 'products.p02.storage',
    extraKey: 'products.p02.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-kashkaval/pogacici-kaskaval.png',
      'products/lisnati-pogachici-so-kashkaval/IMG_8359.JPG'
    ]
  },
  {
    id: 'puff-spinach-cheese',
    nameKey: 'products.p03.name',
    descKey: 'products.p03.desc',
    ingredientsKey: 'products.p03.ingredients',
    weightKey: 'products.p03.weight',
    weightGrams: 1000,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p03.preparation',
    nutritionKey: 'products.p03.nutrition',
    storageKey: 'products.p03.storage',
    extraKey: 'products.p03.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/lisnati-pogachici-so-spanakj-i-sirenje/IMG_7920.JPG']
  },
  {
    id: 'mini-puff-spinach-cheese',
    nameKey: 'products.p31.name',
    descKey: 'products.p03.desc',
    ingredientsKey: 'products.p03.ingredients',
    weightKey: 'products.p31.weight',
    weightGrams: 500,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p03.preparation',
    nutritionKey: 'products.p03.nutrition',
    storageKey: 'products.p03.storage',
    extraKey: 'products.p03.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/lisnati-pogachici-so-spanakj-i-sirenje/IMG_7920.JPG']
  },
  {
    id: 'puff-pizza',
    nameKey: 'products.p04.name',
    descKey: 'products.p04.desc',
    ingredientsKey: 'products.p04.ingredients',
    weightKey: 'products.p04.weight',
    weightGrams: 1000,
    allergens: ['gluten', 'egg'],
    diet: 'none',
    preparationKey: 'products.p04.preparation',
    nutritionKey: 'products.p04.nutrition',
    storageKey: 'products.p04.storage',
    extraKey: 'products.p04.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-pica-fil/pogacici.png',
      'products/lisnati-pogachici-so-pica-fil/IMG_8387.jpg'
    ]
  },
  {
    id: 'mini-puff-pizza',
    nameKey: 'products.p30.name',
    descKey: 'products.p04.desc',
    ingredientsKey: 'products.p04.ingredients',
    weightKey: 'products.p30.weight',
    weightGrams: 500,
    allergens: ['gluten', 'egg'],
    diet: 'none',
    preparationKey: 'products.p04.preparation',
    nutritionKey: 'products.p04.nutrition',
    storageKey: 'products.p04.storage',
    extraKey: 'products.p04.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-pica-fil/pogacici.png',
      'products/lisnati-pogachici-so-pica-fil/IMG_8387.jpg'
    ]
  },
  {
    id: 'puff-apple-cinnamon',
    nameKey: 'products.p05.name',
    descKey: 'products.p05.desc',
    ingredientsKey: 'products.p05.ingredients',
    weightKey: 'products.p05.weight',
    weightGrams: 1000,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p05.preparation',
    nutritionKey: 'products.p05.nutrition',
    storageKey: 'products.p05.storage',
    extraKey: 'products.p05.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
    'products/lisnati-pogachici-so-jabolko-i-cimet/IMG_7895.JPG',
    'products/lisnati-pogachici-so-jabolko-i-cimet/IMG_7890.JPG',
    'products/lisnati-pogachici-so-jabolko-i-cimet/IMG_8404.jpg'
  ]
  },
  {
    id: 'puff-cherry',
    nameKey: 'products.p06.name',
    descKey: 'products.p06.desc',
    ingredientsKey: 'products.p06.ingredients',
    weightKey: 'products.p06.weight',
    weightGrams: 1000,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p06.preparation',
    nutritionKey: 'products.p06.nutrition',
    storageKey: 'products.p06.storage',
    extraKey: 'products.p06.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/lisnati-pogachici-so-vishna/IMG_8410.jpg']
  },
  {
    id: 'puff-olives-mushrooms',
    nameKey: 'products.p07.name',
    descKey: 'products.p07.desc',
    ingredientsKey: 'products.p07.ingredients',
    weightKey: 'products.p07.weight',
    weightGrams: 500,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p07.preparation',
    nutritionKey: 'products.p07.nutrition',
    storageKey: 'products.p07.storage',
    extraKey: 'products.p07.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-maslinki-i-pechurki/pogacici-maslinki.png',
      'products/lisnati-pogachici-so-maslinki-i-pechurki/IMG_8699.jpg'
    ]
  },
  {
    id: 'mini-puff-olives-mushrooms',
    nameKey: 'products.p32.name',
    descKey: 'products.p07.desc',
    ingredientsKey: 'products.p07.ingredients',
    weightKey: 'products.p07.weight',
    weightGrams: 500,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p07.preparation',
    nutritionKey: 'products.p07.nutrition',
    storageKey: 'products.p07.storage',
    extraKey: 'products.p07.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnati-pogachici-so-maslinki-i-pechurki/pogacici-maslinki.png',
      'products/lisnati-pogachici-so-maslinki-i-pechurki/IMG_8699.jpg'
    ]
  },
  {
    id: 'piroshki-pork',
    nameKey: 'products.p08.name',
    descKey: 'products.p08.desc',
    ingredientsKey: 'products.p08.ingredients',
    weightKey: 'products.p08.weight',
    weightGrams: 400,
    allergens: ['gluten', 'milk', 'egg', 'mustard'],
    diet: 'none',
    preparationKey: 'products.p08.preparation',
    nutritionKey: 'products.p08.nutrition',
    storageKey: 'products.p08.storage',
    extraKey: 'products.p08.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: [
      'products/piroshki-so-svinska-shunka/piroski-sunka.png',
      'products/piroshki-so-svinska-shunka/IMG_9146.JPG'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.100g',
      packKey: 'products.horeca.pack.50pcs'
    }
  },
  {
    id: 'piroshki-chicken',
    nameKey: 'products.p09.name',
    descKey: 'products.p09.desc',
    ingredientsKey: 'products.p09.ingredients',
    weightKey: 'products.p09.weight',
    weightGrams: 400,
    allergens: ['gluten', 'milk', 'egg', 'mustard'],
    diet: 'none',
    preparationKey: 'products.p09.preparation',
    nutritionKey: 'products.p09.nutrition',
    storageKey: 'products.p09.storage',
    extraKey: 'products.p09.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: [
      'products/piroshki-so-pileshka-shunka/piroslki-pileska-sunka.png',
      'products/piroshki-so-pileshka-shunka/IMG_9146.JPG'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.100g',
      packKey: 'products.horeca.pack.50pcs'
    }
  },
  {
    id: 'piroshki-cheese',
    nameKey: 'products.p10.name',
    descKey: 'products.p10.desc',
    ingredientsKey: 'products.p10.ingredients',
    weightKey: 'products.p10.weight',
    weightGrams: 400,
    allergens: [],
    diet: 'none',
    preparationKey: 'products.p10.preparation',
    nutritionKey: 'products.p10.nutrition',
    storageKey: 'products.p10.storage',
    extraKey: 'products.p10.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/piroshki-sirenje/IMG_9333.JPG'],
    horeca: {
      pieceKey: 'products.horeca.piece.100g',
      packKey: 'products.horeca.pack.50pcs'
    }
  },
  {
    id: 'piroshki-kashkaval',
    nameKey: 'products.p11.name',
    descKey: 'products.p11.desc',
    ingredientsKey: 'products.p11.ingredients',
    weightKey: 'products.p11.weight',
    weightGrams: 400,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p11.preparation',
    nutritionKey: 'products.p11.nutrition',
    storageKey: 'products.p11.storage',
    extraKey: 'products.p11.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: [
      'products/piroshki-kashkaval/piroski-kaskaval.png',
      'products/piroshki-kashkaval/IMG_9381.jpg'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.100g',
      packKey: 'products.horeca.pack.50pcs'
    }
  },
  {
    id: 'pizza-dough',
    nameKey: 'products.p12.name',
    descKey: 'products.p12.desc',
    ingredientsKey: 'products.p12.ingredients',
    weightKey: 'products.p12.weight',
    weightGrams: 180,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p12.preparation',
    nutritionKey: 'products.p12.nutrition',
    storageKey: 'products.p12.storage',
    extraKey: 'products.p12.extra',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/polupecheno-testo-za-pica/testo-za-pica.jpeg']
  },
  pizzaCapricciosa,
  {
    id: 'pizza-venezia',
    nameKey: 'products.p14.name',
    descKey: 'products.p14.desc',
    ingredientsKey: 'products.p14.ingredients',
    weightKey: 'products.p14.weight',
    weightGrams: 330,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p14.preparation',
    nutritionKey: 'products.p14.nutrition',
    storageKey: 'products.p14.storage',
    extraKey: 'products.p14.extra',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/venecija-golema/venecija.png']
  },
  {
    id: 'mini-pizza-ham',
    nameKey: 'products.p15.name',
    descKey: 'products.p15.desc',
    ingredientsKey: 'products.p15.ingredients',
    weightKey: 'products.p15.weight',
    weightGrams: 300,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p15.preparation',
    nutritionKey: 'products.p15.nutrition',
    storageKey: 'products.p15.storage',
    extraKey: 'products.p15.extra',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/mini-pica-so-shunka/mini-pica-sunka.png']
  },
  {
    id: 'mini-pizza-chicken',
    nameKey: 'products.p16.name',
    descKey: 'products.p16.desc',
    ingredientsKey: 'products.p16.ingredients',
    weightKey: 'products.p16.weight',
    weightGrams: 300,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p16.preparation',
    nutritionKey: 'products.p16.nutrition',
    storageKey: 'products.p16.storage',
    extraKey: 'products.p16.extra',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/mini-pica-so-pileshka-shunka/mini-pileska-sunka.png']
  },
  {
    id: 'my-pizza',
    nameKey: 'products.p17.name',
    descKey: 'products.p17.desc',
    ingredientsKey: 'products.p17.ingredients',
    weightKey: 'products.p17.weight',
    weightGrams: 270,
    allergens: ['gluten', 'milk'],
    diet: 'none',
    preparationKey: 'products.p17.preparation',
    nutritionKey: 'products.p17.nutrition',
    storageKey: 'products.p17.storage',
    extraKey: 'products.p17.extra',
    categoryKey: 'products.category.dough',
    category: 'Dough',
    images: ['products/moja-pica/IMG_5850.JPG']
  },
  {
    id: 'breaded-kashkaval',
    nameKey: 'products.p18.name',
    descKey: 'products.p18.desc',
    ingredientsKey: 'products.p18.ingredients',
    weightKey: 'products.p18.weight',
    weightGrams: 250,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p18.preparation',
    nutritionKey: 'products.p18.nutrition',
    storageKey: 'products.p18.storage',
    extraKey: 'products.p18.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/kashkaval-pohovan/panedCascaval.png'],
    horeca: {
      pieceKey: 'products.horeca.piece.40-80g',
      packKey: 'products.horeca.pack.8kg'
    }
  },
  {
    id: 'breaded-zdenki',
    nameKey: 'products.p19.name',
    descKey: 'products.p19.desc',
    ingredientsKey: 'products.p19.ingredients',
    weightKey: 'products.p19.weight',
    weightGrams: 280,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p19.preparation',
    nutritionKey: 'products.p19.nutrition',
    storageKey: 'products.p19.storage',
    extraKey: 'products.p19.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: ['products/zdenki-pohovani/zdenki.jpeg'],
    horeca: {
      pieceKey: 'products.horeca.piece.27g',
      packKey: 'products.horeca.pack.8kg'
    }
  },
  {
    id: 'croquettes-cheese',
    nameKey: 'products.p20.name',
    descKey: 'products.p20.desc',
    ingredientsKey: 'products.p20.ingredients',
    weightKey: 'products.p20.weight',
    weightGrams: 400,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p20.preparation',
    nutritionKey: 'products.p20.nutrition',
    storageKey: 'products.p20.storage',
    extraKey: 'products.p20.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: [
      'products/kroketi-so-sirenje/kroketi-sirenje.png',
      'products/kroketi-so-sirenje/kroketi.jpg'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.20g',
      packKey: 'products.horeca.pack.8kg'
    }
  },
  {
    id: 'croquettes-kashkaval',
    nameKey: 'products.p21.name',
    descKey: 'products.p21.desc',
    ingredientsKey: 'products.p21.ingredients',
    weightKey: 'products.p21.weight',
    weightGrams: 400,
    allergens: ['gluten', 'milk', 'egg'],
    diet: 'none',
    preparationKey: 'products.p21.preparation',
    nutritionKey: 'products.p21.nutrition',
    storageKey: 'products.p21.storage',
    extraKey: 'products.p21.extra',
    categoryKey: 'products.category.fry',
    category: 'Fry',
    images: [
      'products/kroketi-so-kashkaval/kroketi-kaskaval.png',
      'products/kroketi-so-kashkaval/kroketi-kaskaval.jpg'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.20g',
      packKey: 'products.horeca.pack.8kg'
    }
  },
  {
    id: 'my-rolls',
    nameKey: 'products.p22.name',
    descKey: 'products.p22.desc',
    ingredientsKey: 'products.p22.ingredients',
    weightKey: 'products.p22.weight',
    weightGrams: 800,
    allergens: ['gluten', 'sesame', 'milk'],
    diet: 'none',
    preparationKey: 'products.p22.preparation',
    nutritionKey: 'products.p22.nutrition',
    storageKey: 'products.p22.storage',
    extraKey: 'products.p22.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/moite-kifli/kifli.png',
      'products/moite-kifli/moite-kifli.jpg'
    ],
    horeca: {
      pieceKey: 'products.horeca.piece.30g',
      packKey: 'products.horeca.pack.10kg'
    }
  },
  {
    id: 'puff-furka',
    nameKey: 'products.p23.name',
    descKey: 'products.p23.desc',
    ingredientsKey: 'products.p23.ingredients',
    weightKey: 'products.p23.weight',
    weightGrams: 500,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p23.preparation',
    nutritionKey: 'products.p23.nutrition',
    storageKey: 'products.p23.storage',
    extraKey: 'products.p23.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnato-testo-furka/furka.png',
      'products/lisnato-testo-furka/furki-peceni.jpg',
      'products/lisnato-testo-furka/IMG_0702.JPG'
    ]
  },
  {
    id: 'puff-sheet',
    nameKey: 'products.p24.name',
    descKey: 'products.p24.desc',
    ingredientsKey: 'products.p24.ingredients',
    weightKey: 'products.p24.weight',
    weightGrams: 500,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p24.preparation',
    nutritionKey: 'products.p24.nutrition',
    storageKey: 'products.p24.storage',
    extraKey: 'products.p24.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/lisnato-testo-plochka/lisnato-plocka.png']
  },
  {
    id: 'puff-zhuzhu',
    nameKey: 'products.p25.name',
    descKey: 'products.p25.desc',
    ingredientsKey: 'products.p25.ingredients',
    weightKey: 'products.p25.weight',
    weightGrams: 500,
    allergens: ['gluten'],
    diet: 'none',
    preparationKey: 'products.p25.preparation',
    nutritionKey: 'products.p25.nutrition',
    storageKey: 'products.p25.storage',
    extraKey: 'products.p25.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: [
      'products/lisnato-testo-zhu-zhu/zuzu.png',
      'products/lisnato-testo-zhu-zhu/IMG_0891.JPG'
    ]
  },
  croissantPlain,
  {
    id: 'lenten-rolls',
    nameKey: 'products.p27.name',
    descKey: 'products.p27.desc',
    ingredientsKey: 'products.p27.ingredients',
    weightKey: 'products.p27.weight',
    weightGrams: 700,
    allergens: [],
    diet: 'none',
    preparationKey: 'products.p27.preparation',
    nutritionKey: 'products.p27.nutrition',
    storageKey: 'products.p27.storage',
    extraKey: 'products.p27.extra',
    categoryKey: 'products.category.puff',
    category: 'Puff',
    images: ['products/posni-kifli/IMG_0454.jpg']
  }
];

export function findProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
