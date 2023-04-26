import React from 'react';
import { data } from '../data/data';
import { useState } from "react";

interface IngredientSelectionProp {
  selectedMeals: {[key: string]: string};
  //Make it global
  selectedBrands: {[key: string]: string};
  setSelectedBrands: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
};

export default function IngredientSelection({ selectedMeals }: IngredientSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mondayMeal = selectedMeals['Monday'];
  const tuesdayMeal = selectedMeals['Tuesday'];
  const wednesdayMeal = selectedMeals['Wednesday'];
  const thursdayMeal = selectedMeals['Thursday'];
  const fridayMeal = selectedMeals['Friday'];
  const saturdayMeal = selectedMeals['Saturday'];
  const sundayMeal = selectedMeals['Sunday'];
  let ingr = new Set<string>();
  let ingr_count = new Map<string, number>();


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

  return <>
    <div>
      <h2>Selected meals:</h2>
      <ul>
        <li>Ingredient: {Array.from(ingr).join(", ")}</li>
      </ul>
    </div>
    <button hidden={true}>Next</button>
  </>;
}