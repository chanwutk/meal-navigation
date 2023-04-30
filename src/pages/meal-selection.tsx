import React from 'react';
import { useState } from "react";
import IngredientSelection from './ingredient-selection';
import {Preferences} from '../types';
import UserPreferences from './user-preferences'
import {data} from '../data/data';


interface MealSelectionProp {
  selectedMeals: {[key: string]: string};
  setSelectedMeals: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
};

interface MenuOption {
  id: number;
  name: string;
}

function getRandomItems(items: string[], count: number): string[] {
  const result: string[] = [];
  const source: string[] = [...items];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * source.length);
    result.push(source.splice(index, 1)[0]);
  }

  return result;
}

const allfoods: string[] = [];
for (const meal of data.meal) {
  allfoods.push(meal.name);
}

const randomLists: string[][] = [];
for (let i = 0; i < 7; i++) {
  randomLists.push(getRandomItems(allfoods,5));
}
console.log(randomLists)

const menuOptions: MenuOption[] = [
  { id: 1, name: "Colcannon Potatoes" },
  { id: 2, name: "Grilled Potato Wedges" },
  { id: 3, name: "Japanese Cucumber Salad" },
  { id: 4, name: "Fried Rice" },
  { id: 5, name: "Egg Muffin Cups" }
];


export default function MealSelection({ selectedMeals, setSelectedMeals }: MealSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // const [selectedMeals, setSelectedMeals] = useState<{[key: string]: string}>({});

  const handleMealSelection = (event: React.ChangeEvent<HTMLSelectElement>, day: string) => {
    setSelectedMeals({...selectedMeals, [day]: event.target.value});
    console.log(selectedMeals);
  };

  return (
    <>
      <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Select meals for the week:</h1>
      </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
        {daysOfWeek.map((day: string,index: number) => (
  <div key={day} style={{ alignItems: 'center', marginBottom: '1em' }}>
    <div style={{ display: 'inline-block', marginRight: '1em' }}>
      <h3 style={{ display: 'inline-block' }}>{day}</h3>
      <select style={{ display: 'inline-block' }} value={selectedMeals[day]} onChange={(event) => handleMealSelection(event, day)}>
        <option value="">Select a meal...</option>
        {randomLists[index].map((food) => (
          <option key={`${food}-${day}`} value={`${food}-${day}`}>
            {food}
          </option>
        ))}
      </select>
    </div>
  </div>
))}
        </div>
      </div>
      <button hidden={true}>Next</button>
    </>
  );
}