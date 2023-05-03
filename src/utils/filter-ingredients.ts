import { IngredientData } from "../pages/ingredient-selection";
import { Store } from "../types";

export default function filterIngredients(
  store: Store,
  ingredients: { ingredient: string; ingredientData: IngredientData }[],
) {
  return (
    ingredients
      .sort(byDiscountedPrice)
      .filter(cheapest)
      .filter(({ ingredientData }) => ingredientData.store === store.brand)
  );
}

function byDiscountedPrice(
  ingredient1: { ingredientData: IngredientData },
  ingredient2: { ingredientData: IngredientData },
) {
  return (
    ingredient1.ingredientData.discount_price -
    ingredient2.ingredientData.discount_price
  );
}

function cheapest(
  ingredient: { ingredient: string },
  idx: number,
  ingredientArr: { ingredient: string }[],
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