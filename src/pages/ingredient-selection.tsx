import React, {useState} from 'react';
import {data} from '../data/data';
import {Card, Form, ListGroup} from "react-bootstrap";

interface IngredientSelectionProp {
  selectedMeals: {[key: string]: string};
  //Make it global
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function IngredientSelection({ selectedMeals, selectedBrands, setSelectedBrands}: IngredientSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mondayMeal = selectedMeals['Monday'];
  const tuesdayMeal = selectedMeals['Tuesday'];
  const wednesdayMeal = selectedMeals['Wednesday'];
  const thursdayMeal = selectedMeals['Thursday'];
  const fridayMeal = selectedMeals['Friday'];
  const saturdayMeal = selectedMeals['Saturday'];
  const sundayMeal = selectedMeals['Sunday'];
  let ingr = new Set<string>();
  //Don't need to use ingr_count in this page, pass it to the next page!
  let ingr_count = new Map<string, number>();
  let data_map = new Map<string, Array<Array<string>>>();
  //                    {ingredient: [[name0, brand0, original0 price0, discount price0, store0],
  //                                 [name1, brand1, original1 price1, discount price1, store1]]}

  for (const m of data["meal"]) {
    if(m.name == mondayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == tuesdayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == wednesdayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == thursdayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == fridayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == saturdayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
    if(m.name == sundayMeal){
      for (const r of m.recipe){
        ingr.add(r.category);
        if(!ingr_count.has(r.category)){
          ingr_count.set(r.category, 1);
        }
        else{
          // @ts-ignore
          ingr_count.set(r.category, ingr_count.get(r.category)+1);
        }
      }
    }
  }


  let ingr_arr = Array.from(ingr);

  let id = 0;
  for (const i of ingr_arr){
    data_map.set(i,[]);
    // @ts-ignore
    let unit = data["ingredient"][i]["unit"];
    // @ts-ignore
    for(const n of data["ingredient"][i]["product"]){
      let info = [];
      info.push(n.name);
      info.push(n.brand);
      info.push(n.original_price);
      info.push(n.discount_price);
      info.push(n.store);
      info.push(unit);
      info.push(id);
      id = id + 1;
      if(info[1] == info[4]){
        info[1] = "Store Brand";
      }
      // @ts-ignore
      data_map.get(i).push(info);
    }
    console.log(data_map);
  }

  return <>
    {/*<div>*/}
    {/*  <h2>Selected meals:</h2>*/}
    {/*  <ul>*/}
    {/*    <li>Ingredient: {ingr_arr.join(", ")}</li>*/}
    {/*  </ul>*/}
    {/*</div>*/}


    {Array.from(data_map.entries()).map(([ingredient, items]) => (
      <Card
          key={ingredient}
          style={{ width: '50rem' }}
          text = "white"
          className="mb-2"
          bg="dark"
      >
        <Card.Header>{ingredient}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            {items.map(([itemName, itemBrand, itemOPrice, itemDPrice, itemStore, unit, id]) => (
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
                        setSelectedBrands(selectedBrands.filter((item) => item !== id));
                      }
                    }}
                />
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
  ))}
    <button hidden={true}>Next</button>
  </>;
}