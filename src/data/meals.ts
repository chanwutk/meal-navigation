export const meals: {
  name: string;
  recipe: {
    category: string;
    unit: string;
    addable: boolean;
    amount: number;
  }[];
  constraints: [boolean, boolean, boolean, boolean];
  recipe_link: string;
}[] = [
  {
    name: 'Colcannon Potatoes',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 3 },
      { category: 'bacon', unit: 'slices', addable: true, amount: 1 },
      { category: 'cabbage', unit: 'each', addable: true, amount: 1 },
      { category: 'onion', unit: 'each', addable: true, amount: 1 },
      { category: 'milk', unit: 'cups', addable: false, amount: 1 },
    ],
    constraints: [false, true, true, false],
    recipe_link:
      'https://chefsavvy.com/colcannon-potatoes-aka-irish-mashed-potatoes/',
  },
  {
    name: 'Japanese Cucumber Salad',
    recipe: [
      { category: 'cucumber', unit: 'each', addable: true, amount: 3 },
      { category: 'soy sauce', unit: 'tsp', addable: false, amount: 1 },
      { category: 'vinegar', unit: 'tsp', addable: false, amount: 1 },
      { category: 'sugar', unit: 'tsp', addable: false, amount: 1 },
      { category: 'oil', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/japanese-cucumber-salad/',
  },
  {
    name: 'Breakfast Potatoes',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 3 },
      { category: 'soda', unit: 'tsp', addable: false, amount: 1 },
      { category: 'butter', unit: 'tsp', addable: false, amount: 1 },
      { category: 'oil', unit: 'tsp', addable: false, amount: 1 },
      { category: 'salt', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/breakfast-potatoes/',
  },
  {
    name: 'Fried Rice',
    recipe: [
      { category: 'butter', unit: 'tsp', addable: false, amount: 2 },
      { category: 'egg', unit: 'each', addable: false, amount: 3 },
      { category: 'onion', unit: 'each', addable: true, amount: 1 },
      { category: 'rice', unit: 'cups', addable: false, amount: 4 },
      { category: 'soy sauce', unit: 'tsp', addable: false, amount: 0.5 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/the-best-fried-rice/',
  },
  {
    name: 'Homemade French Fries',
    recipe: [
      { category: 'potato', unit: 'pound', addable: false, amount: 2 },
      { category: 'oil', unit: 'cups', addable: false, amount: 2 },
      { category: 'salt', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/homemade-french-fries/',
  },
  {
    name: 'Creamy Mashed Potatoes',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 5 },
      { category: 'butter', unit: 'stick', addable: false, amount: 1.5 },
      { category: 'milk', unit: 'cup', addable: false, amount: 0.5 },
      { category: 'cream', unit: 'cup', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/creamy-mashed-potatoes/',
  },
  {
    name: 'Cheese Biscuits',
    recipe: [
      {
        category: 'seasoning powder',
        unit: 'tsp',
        addable: false,
        amount: 0.5,
      },
      { category: 'flour', unit: 'tsp', addable: false, amount: 1.5 },
      { category: 'butter', unit: 'tsp', addable: false, amount: 4 },
      { category: 'milk', unit: 'cup', addable: false, amount: 0.75 },
      { category: 'salt', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/garlic-cheese-biscuits/',
  },
  {
    name: 'Grilled Potato Wedges',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 3 },
      { category: 'oil', unit: 'tsp', addable: false, amount: 2 },
      {
        category: 'seasoning powder',
        unit: 'tsp',
        addable: false,
        amount: 1,
      },
      { category: 'salt', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/grilled-sweet-potato-wedges/',
  },
  {
    name: 'Homemade Potato Chips',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 2 },
      { category: 'oil', unit: 'cups', addable: false, amount: 3 },
      { category: 'salt', unit: 'tsp', addable: false, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/homemade-potato-chips/',
  },
  {
    name: 'Egg Muffin Cups',
    recipe: [
      { category: 'egg', unit: 'each', addable: false, amount: 10 },
      {
        category: 'seasoning powder',
        unit: 'cups',
        addable: false,
        amount: 1,
      },
      { category: 'salt', unit: 'tsp', addable: false, amount: 0.25 },
      { category: 'onion', unit: 'each', addable: true, amount: 1 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/egg-muffin-cups/',
  },
  {
    name: 'Homemade Gnocchi',
    recipe: [
      { category: 'potato', unit: 'pound', addable: true, amount: 1 },
      { category: 'flour', unit: 'cups', addable: false, amount: 2 },
      { category: 'egg', unit: 'each', addable: false, amount: 2 },
    ],
    constraints: [true, true, true, true],
    recipe_link: 'https://chefsavvy.com/leftover-mashed-potato-gnocchi/',
  },
];