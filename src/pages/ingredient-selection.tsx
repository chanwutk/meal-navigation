import { useEffect, useState } from 'react';
import { meals } from '../data/meals';
import { ingredient } from '../data/ingredients';
import { Card, Form, ListGroup, Image } from 'react-bootstrap';
import { ICONS } from './grocery-selection';

export type _Ingredient = { ingredient: string; idata: IngredientData };

interface IngredientSelectionProp {
  selectedMeals: { [key: string]: string };
  setSelectedIngredients: (d: _Ingredient[]) => void;
}

export type IngredientData = {
  name: string;
  brand: string;
  original_price: number;
  discount_price: number;
  store: string;
  unit: string;
  id: number;
};

export default function IngredientSelection({
  selectedMeals,
  setSelectedIngredients,
}: IngredientSelectionProp) {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  let mondayMeal: string = selectedMeals['Monday'];
  if (mondayMeal !== undefined) {
    mondayMeal = mondayMeal.split('-')[0];
  }
  let tuesdayMeal: string = selectedMeals['Tuesday'];
  if (tuesdayMeal !== undefined) {
    tuesdayMeal = tuesdayMeal.split('-')[0];
  }
  let wednesdayMeal: string = selectedMeals['Wednesday'];
  if (wednesdayMeal !== undefined) {
    wednesdayMeal = wednesdayMeal.split('-')[0];
  }
  let thursdayMeal: string = selectedMeals['Thursday'];
  if (thursdayMeal !== undefined) {
    thursdayMeal = thursdayMeal.split('-')[0];
  }
  let fridayMeal: string = selectedMeals['Friday'];
  if (fridayMeal !== undefined) {
    fridayMeal = fridayMeal.split('-')[0];
  }
  let saturdayMeal: string = selectedMeals['Saturday'];
  if (saturdayMeal !== undefined) {
    saturdayMeal = saturdayMeal.split('-')[0];
  }
  let sundayMeal: string = selectedMeals['Sunday'];
  if (sundayMeal !== undefined) {
    sundayMeal = sundayMeal.split('-')[0];
  }

  let ingr = new Set<string>();
  //Don't need to use ingr_count in this page, pass it to the next page!
  let ingr_count = new Map<string, number>();
  let data_map = new Map<string, Array<IngredientData>>();
  //                    {ingredient: [[name0, brand0, original0 price0, discount price0, store0],
  //                                 [name1, brand1, original1 price1, discount price1, store1]]}

  for (const m of meals) {
    if (m.name == mondayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == tuesdayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == wednesdayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == thursdayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == fridayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == saturdayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
    if (m.name == sundayMeal) {
      for (const r of m.recipe) {
        ingr.add(r.category);
        if (!ingr_count.has(r.category)) {
          ingr_count.set(r.category, 1);
        } else {
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category) + 1);
        }
      }
    }
  }

  let ingr_arr = Array.from(ingr);

  let id = 0;
  for (const i of ingr_arr) {
    data_map.set(i, []);
    const unit = ingredient[i]['unit'];
    for (const n of ingredient[i]['product']) {
      const info: IngredientData = { ...n, unit, id };
      id = id + 1;
      // if (info[1] == info[4]) {
      //   info[1] = 'Store Brand';
      // }
      data_map.get(i)?.push(info);
    }
  }

  useEffect(() => {
    const brands = new Set(selectedBrands);
    setSelectedIngredients(
      [...data_map].flatMap(([ingredient, ingredientBrands]) =>
        ingredientBrands
          .filter(({ id }) => brands.has(id))
          .map(d => ({ ingredient, idata: d })),
      ),
    );
  }, [selectedBrands]);

  return (
    <>
      {Array.from(data_map.entries()).map(([ingredients, items]) => (
        <Card key={ingredients} text='white' className='mb-2' bg='dark'>
          <Card.Header>
            <h1>
              {ingredients[0].toUpperCase()}
              {ingredients.slice(1)}
            </h1>
          </Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush'>
              {items.map(
                ({
                  name,
                  brand,
                  original_price,
                  discount_price,
                  store,
                  unit,
                  id,
                }) => (
                  <Form.Check
                    className='m-1'
                    key={`${name}-${brand}-${store}`}
                    type='checkbox'
                    label={
                      <div className='d-flex flex-row align-items-center'>
                        <Image
                          src={ICONS[store]}
                          width={40}
                          height={40}
                        ></Image>{' '}
                        <div className='d-flex flex-column justify-content-center mx-2'>
                          {name}
                          <div>
                            <s style={{ color: 'grey' }}>
                              {original_price !== discount_price
                                ? '$' + original_price
                                : ''}
                            </s>
                            {` $${discount_price} / ${unit}`}
                          </div>
                        </div>
                      </div>
                    }
                    checked={selectedBrands.includes(id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedBrands([...selectedBrands, id]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter(item => item !== id),
                        );
                      }
                    }}
                  />
                ),
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
      <button hidden={true}>Next</button>
    </>
  );
}
