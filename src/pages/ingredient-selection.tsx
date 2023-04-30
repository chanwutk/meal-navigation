import React, { useState } from 'react';
import { meals } from '../data/meals';
import {ingredient} from '../data/ingredients';
import { Card, Form, ListGroup } from 'react-bootstrap';

interface IngredientSelectionProp {
  selectedMeals: { [key: string]: string };
  //Make it global
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function IngredientSelection({
  selectedMeals,
  selectedBrands,
  setSelectedBrands,
}: IngredientSelectionProp) {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  // const mondayMeal = selectedMeals['Monday'].substring(0, selectedMeals['Monday'].indexOf("-"));
  // const tuesdayMeal = selectedMeals['Tuesday'].substring(0, selectedMeals['Tuesday'].indexOf("-"));
  // const wednesdayMeal = selectedMeals['Wednesday'].substring(0, selectedMeals['Wednesday'].indexOf("-"));
  // const thursdayMeal = selectedMeals['Thursday'].substring(0, selectedMeals['Thursday'].indexOf("-"));
  // const fridayMeal = selectedMeals['Friday'].substring(0, selectedMeals['Friday'].indexOf("-"));
  // const saturdayMeal = selectedMeals['Saturday'].substring(0, selectedMeals['Saturday'].indexOf("-"));
  // const sundayMeal = selectedMeals['Sunday'].substring(0, selectedMeals['Sunday'].indexOf("-"));

  // let mondayMeal = selectedMeals['Monday'].split("-")[0];
  // let tuesdayMeal = selectedMeals['Tuesday'].split("-")[0];
  // let wednesdayMeal = selectedMeals['Wednesday'].split("-")[0];
  // let thursdayMeal = selectedMeals['Thursday'].split("-")[0];
  // let fridayMeal = selectedMeals['Friday'].split("-")[0];
  // let saturdayMeal = selectedMeals['Saturday'].split("-")[0];
  // let sundayMeal = selectedMeals['Sunday'].split("-")[0];
  let mondayMeal : string = selectedMeals['Monday'];
  if (mondayMeal !== undefined) {
    mondayMeal = mondayMeal.split("-")[0];
  }
  let tuesdayMeal : string = selectedMeals['Tuesday'];
  if (tuesdayMeal !== undefined) {
    tuesdayMeal = tuesdayMeal.split("-")[0];
  }
  let wednesdayMeal : string = selectedMeals['Wednesday'];
  if (wednesdayMeal !== undefined) {
    wednesdayMeal = wednesdayMeal.split("-")[0];
  }
  let thursdayMeal : string = selectedMeals['Thursday'];
  if (thursdayMeal !== undefined) {
    thursdayMeal = thursdayMeal.split("-")[0];
  }
  let fridayMeal : string = selectedMeals['Friday'];
  if (fridayMeal !== undefined) {
    fridayMeal = fridayMeal.split("-")[0];
  }
  let saturdayMeal : string = selectedMeals['Saturday'];
  if (saturdayMeal !== undefined) {
    saturdayMeal = saturdayMeal.split("-")[0];
  }
  let sundayMeal : string = selectedMeals['Sunday'];
  if (sundayMeal !== undefined) {
    sundayMeal = sundayMeal.split("-")[0];
  }

  let ingr = new Set<string>();
  //Don't need to use ingr_count in this page, pass it to the next page!
  let ingr_count = new Map<string, number>();
  let data_map = new Map<string, Array<Array<string>>>();
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
    // @ts-ignore
    let unit = ingredient[i]['unit'];
    // @ts-ignore
    for (const n of ingredient[i]['product']) {
      let info = [];
      info.push(n.name);
      info.push(n.brand);
      info.push(n.original_price);
      info.push(n.discount_price);
      info.push(n.store);
      info.push(unit);
      info.push(id);
      id = id + 1;
      if (info[1] == info[4]) {
        info[1] = 'Store Brand';
      }
      // @ts-ignore
      data_map.get(i).push(info);
    }
    console.log(data_map);
  }

  return (
    <>
      {/*<div>*/}
      {/*  <h2>Selected meals:</h2>*/}
      {/*  <ul>*/}
      {/*    <li>Ingredient: {ingr_arr.join(", ")}</li>*/}
      {/*  </ul>*/}
      {/*</div>*/}

      {Array.from(data_map.entries()).map(([ingredients, items]) => (
        <Card
          key={ingredients}
          style={{ width: '50rem' }}
          text="white"
          className="mb-2"
          bg="dark"
        >
          <Card.Header>{ingredients}</Card.Header>
          <Card.Body>
            <ListGroup className="list-group-flush">
              {items.map(
                ([
                  itemName,
                  itemBrand,
                  itemOPrice,
                  itemDPrice,
                  itemStore,
                  unit,
                  id,
                ]) => (
                  // <ListGroup.Item key={id}>
                  //   {itemName} | {itemStore} | Original Price: ${itemOPrice} | Discount Price: ${itemDPrice} per {unit}
                  // </ListGroup.Item>
                  <Form.Check
                    key={itemName}
                    type="checkbox"
                    label={`${itemName} | ${itemStore} | Original Price: $${itemOPrice} | Discount Price: $${itemDPrice} per ${unit}`}
                    checked={selectedBrands.includes(id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBrands([...selectedBrands, id]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter((item) => item !== id),
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
