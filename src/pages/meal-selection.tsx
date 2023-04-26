import React from 'react';
import { useState } from "react";

interface MealSelectionProp {
};

interface MenuOption {
  id: number;
  name: string;
}

const menuOptions: MenuOption[] = [
  { id: 1, name: "Hamburger" },
  { id: 2, name: "Pizza" },
  { id: 3, name: "Salad" },
  { id: 4, name: "Tacos" },
  { id: 5, name: "Sushi" }
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];

export default function MealSelection({}: MealSelectionProp) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedMeals, setSelectedMeals] = useState<{[key: string]: string}>({});

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
                <option value="hamburger">Hamburger</option>
                <option value="pizza">Pizza</option>
                <option value="salad">Salad</option>
                <option value="tacos">Tacos</option>
                <option value="sushi">Sushi</option>
              </select>
            </React.Fragment>
          ))}
        </div>
      </div>
      <button hidden={true}>Next</button>
    </>
  );
}