import { _Ingredient } from '../pages/ingredient-selection';

export default function filterIngredients(
  store: { brand: string },
  ingredients: _Ingredient[],
) {
  console.log(store.brand);
  const out = ingredients
    .slice()
    .sort(byDiscountedPrice)
    .filter(cheapest)
    .filter(({ idata }) => idata.store === store.brand);
  console.log(out);
  return out;
}

function byDiscountedPrice(ingredient1: _Ingredient, ingredient2: _Ingredient) {
  return ingredient1.idata.discount_price - ingredient2.idata.discount_price;
}

function cheapest(
  ingredient: _Ingredient,
  idx: number,
  ingredientArr: _Ingredient[],
) {
  return (
    idx ===
    ingredientArr
      .map((_ingredient, _idx) => ({ _ingredient, _idx }))
      .filter(
        ({ _ingredient }) => _ingredient.ingredient === ingredient.ingredient,
      )
      .map(_ingredient => _ingredient._idx)[0]
  );
}
