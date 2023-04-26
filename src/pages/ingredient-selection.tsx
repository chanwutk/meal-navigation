import React from 'react';
import { data } from '../data/data';
import { useState } from "react";

interface IngredientSelectionProp {
  selectedMeals: {[key: string]: string};
};

export default function IngredientSelection({ selectedMeals }: IngredientSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mondayMeal = selectedMeals['Monday'];
  const mondayingr = [];
  const tuesdayMeal = selectedMeals['Tuesday'];
  const tuesdayingr = [];
  const wednesdayMeal = selectedMeals['Wednesday'];
  const wednesdayingr = [];
  const thursdayMeal = selectedMeals['Thursday'];
  const thursdayingr = [];
  const fridayMeal = selectedMeals['Friday'];
  const fridayingr = [];
  const saturdayMeal = selectedMeals['Saturday'];
  const saturdayingr = [];
  const sundayMeal = selectedMeals['Sunday'];
  const sundayingr = [];


  for (const m of data["meal"]) {
    if(m.name == mondayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        mondayingr.push(r.category);
      }
    }
    if(m.name == tuesdayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        tuesdayingr.push(r.category);
      }
    }
    if(m.name == wednesdayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        wednesdayingr.push(r.category);
      }
    }
    if(m.name == thursdayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        thursdayingr.push(r.category);
      }
    }
    if(m.name == fridayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        fridayingr.push(r.category);
      }
    }
    if(m.name == saturdayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        saturdayingr.push(r.category);
      }
    }
    if(m.name == sundayMeal){
      for (const r of m.recipe){
        //Accessing each recipe, for now only extracting name of the ingredient
        sundayingr.push(r.category);
      }
    }
  }

  return <>
    {/*TODO: Sunny please look at src/pages/ingredient-selection.tsx*/}
    <div>
      <h2>Selected meals:</h2>
      <ul>
        <li>Monday: {mondayingr.join(", ")}</li>
        <li>Tuesday: {tuesdayingr.join(", ")}</li>
        <li>Wednesday: {wednesdayingr.join(", ")}</li>
        <li>Thursday: {thursdayingr.join(", ")}</li>
        <li>Friday: {fridayingr.join(", ")}</li>
        <li>Saturday: {saturdayingr.join(", ")}</li>
        <li>Sunday: {sundayingr.join(", ")}</li>
      </ul>
    </div>
    <button hidden={true}>Next</button>
  </>;
}