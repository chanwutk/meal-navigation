import React from 'react';
import { useState } from "react";
import IngredientSelection from './ingredient-selection';

interface MealSelectionProp {
  //Make it global
  selectedMeals: {[key: string]: string};
  setSelectedMeals: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
};

interface MenuOption {
  id: number;
  name: string;
}

const menuOptions: MenuOption[] = [
  { id: 1, name: "Colcannon Potatoes" },
  { id: 2, name: "Grilled Potato Wedges" },
  { id: 3, name: "Japanese Cucumber Salad" },
  { id: 4, name: "Fried Rice" },
  { id: 5, name: "Egg Muffin Cups" }
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];

export default function MealSelection({ selectedMeals, setSelectedMeals }: MealSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // const [selectedMeals, setSelectedMeals] = useState<{[key: string]: string}>({});

  const handleMealSelection = (event: React.ChangeEvent<HTMLSelectElement>, day: string) => {
    setSelectedMeals({...selectedMeals, [day]: event.target.value});
  };

  return (
    <>
      <div>
        <h2>Select meals for the week:</h2>
        <div>
          {daysOfWeek.map((day: string) => (
            <React.Fragment key={day}>
              <h3>{day}</h3>
              {<p>You have selected: {selectedMeals[day]}</p>}
              <select value={selectedMeals[day]} onChange={(event) => handleMealSelection(event, day)}>
                <option value="">Select a meal...</option>
                <option value="Colcannon Potatoes">Colcannon Potatoes</option>
                <option value="Grilled Potato Wedges">Grilled Potato Wedges</option>
                <option value="Japanese Cucumber Salad">Japanese Cucumber Salad</option>
                <option value="Fried Rice">Fried Rice</option>
                <option value="Egg Muffin Cups">Egg Muffin Cups</option>
              </select>
            </React.Fragment>
          ))}
        </div>
      </div>
      <button hidden={true}>Next</button>
    </>
  );
}