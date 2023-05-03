import { possibleRoutesWithPath } from '../data/possible-routes';
import { Plan, _Path, _Store } from '../types';
import { IngredientData, _Ingredient } from '../pages/ingredient-selection';
import filterIngredients from './filter-ingredients';
import gasPrice from './gas-price';
import { stores as STORES } from '../data/stores';

function getDistance(paths: _Path[]) {
  let distance = 0;
  paths.forEach(p => {
    p.features.forEach(f => {
      (f.properties?.segments ?? []).forEach((s: any) => {
        distance += s.distance / 1000;
      });
    });
  });
  return distance;
}

function getDuration(paths: _Path[]) {
  let duration = 0;
  paths.forEach(p => {
    p.features.forEach(f => {
      (f.properties?.segments ?? []).forEach((s: any) => {
        duration += s.duration;
      });
    });
  });
  return duration;
}

function getGroceryCost(
  groceryList: {
    store: _Store;
    ingredients: _Ingredient[];
  }[],
) {
  let groceryCost = 0;
  groceryList.forEach(({ ingredients }) => {
    ingredients.forEach(({ idata }) => {
      groceryCost += idata.discount_price;
    });
  });
  return groceryCost;
}

function comparePlan(p1: Plan, p2: Plan) {
  const values = [
    (p: Plan) => p.totalCost,
    (p: Plan) => p.distance * 10,
    (p: Plan) => p.duration * 10,
    (p: Plan) => p.stores.length,
  ];
  if (values.every(v => Math.floor(v(p1)) === Math.floor(v(p2)))) {
    return 'equal';
  }
  if (values.every(v => Math.floor(v(p1)) >= Math.floor(v(p2)))) {
    return 'worse';
  }
  return 'inconclusive';
}

export default function processPlans(selectedIngredients: _Ingredient[]) {
  const allIngredients = new Set(selectedIngredients.map(s => s.ingredient));

  const availablePlan = possibleRoutesWithPath.filter(([stores]) => {
    const availableIngredients = selectedIngredients.filter(
      ({ idata }) => stores.findIndex(s => s.name === idata.store) + 1,
    );

    if (
      allIngredients.size !==
      new Set(availableIngredients.map(i => i.ingredient)).size
    ) {
      return false;
    }

    return stores.every(
      store =>
        filterIngredients({ brand: store.name }, availableIngredients).length >
        0,
    );
  });

  const _plans: Plan[] = availablePlan.map(([stores, paths]) => {
    const distance = getDistance(paths);
    const duration = getDuration(paths);

    const availableIngredients = selectedIngredients.filter(
      ({ idata }) => stores.findIndex(s => s.name === idata.store) !== -1,
    );
    console.log(availableIngredients);

    const _stores: _Store[] = stores.map(({ name, address }) => ({
      name,
      address: STORES[name][address].address,
      idx: address,
    }));

    const groceryList = _stores.map(store => ({
      store,
      ingredients: filterIngredients(
        { brand: store.name },
        availableIngredients,
      ),
    }));

    const groceryCost = getGroceryCost(groceryList);

    return {
      stores: _stores,
      paths,
      distance: distance / 1.6, // to miles
      duration: duration / 60,
      groceryCost,
      groceryList,
      totalCost: groceryCost + gasPrice(distance),
    };
  });

  const output: Plan[] = [];
  _plans.forEach((p1, i1) => {
    let add = true;
    _plans.forEach((p2, i2) => {
      if (i1 !== i2) {
        const results = comparePlan(p1, p2);
        if (results === 'worse') {
          add = false;
        }
        // if (results === 'equal' && i1 > i2) {
        //   add = false;
        // }
      }
    });

    if (add) {
      output.push(p1);
    }
  });

  return output;
}
