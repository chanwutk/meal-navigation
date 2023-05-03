import React, { useState, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Preferences } from '../data/preferences';
import { meals } from '../data/meals';
import validatePreferences from '../utils/validate-preferences';
import parseConstraints from '../utils/parse-constraints';

declare module 'react-bootstrap' {
  interface CarouselItemProps {
    onSlid?: (event: any) => void;
  }
}

interface MealSelectionProp {
  preferences: Preferences;
  selectedMeals: { [key: string]: string };
  setSelectedMeals: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}

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
for (const meal of meals) {
  allfoods.push(meal.name);
}

const randomLists: string[][] = [];
for (let i = 0; i < 7; i++) {
  randomLists.push(getRandomItems(allfoods, 5));
}

const menuOptions: MenuOption[] = [
  { id: 1, name: 'Colcannon Potatoes' },
  { id: 2, name: 'Grilled Potato Wedges' },
  { id: 3, name: 'Japanese Cucumber Salad' },
  { id: 4, name: 'Fried Rice' },
  { id: 5, name: 'Egg Muffin Cups' },
];

export default function MealSelection({
  preferences,
  selectedMeals,
  setSelectedMeals,
}: MealSelectionProp) {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const defaultSelectedMeals = useMemo(() => {
    const selectedMeals: Record<string, string> = {};
    for (const day of daysOfWeek) {
      selectedMeals[day] = randomLists[daysOfWeek.indexOf(day)][0];
    }
    return selectedMeals;
  }, [daysOfWeek]);

  const [currentSelectedMeals, setCurrentSelectedMeals] =
    useState(defaultSelectedMeals);

  const handleSelect = (day: string, meal: string, selectedIndex: number) => {
    setSelectedMeals(prevSelectedMeals => {
      const updatedSelectedMeals = {
        ...prevSelectedMeals,
        [day]: randomLists[daysOfWeek.indexOf(day)][selectedIndex],
      };
      console.log('Updated selected meals:', updatedSelectedMeals);
      return updatedSelectedMeals;
    });
  };

  return (
    <>
      {daysOfWeek.map((day: string, index: number) => (
        <div key={day}>
          <h1 style={{ textAlign: 'center' }}>{day}</h1>
          <Carousel
            defaultActiveIndex={0}
            interval={null}
            activeIndex={randomLists[daysOfWeek.indexOf(day)].indexOf(
              currentSelectedMeals[day],
            )}
            onSelect={selectedIndex => {
              setCurrentSelectedMeals(prevSelectedMeals => ({
                ...prevSelectedMeals,
                [day]: randomLists[daysOfWeek.indexOf(day)][selectedIndex],
              }));
              handleSelect(
                day,
                randomLists[daysOfWeek.indexOf(day)][selectedIndex],
                selectedIndex,
              );
            }}
          >
            {randomLists[index]
              .filter(f =>
                validatePreferences(
                  preferences,
                  parseConstraints(meals.find(m => m.name === f)?.constraints),
                ),
              )
              .map(food => (
                <Carousel.Item key={`${food}-${day}`}>
                  <img
                    className='d-block w-100'
                    // src={`https://source.unsplash.com/800x400/?${food}`}
                    src={`./foods/${food}.jpeg`}
                    alt={`${food} image`}
                    width='auto'
                    height='auto'
                  />
                  <Carousel.Caption>
                    <h4>{food}</h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      ))}
      <button hidden={true}>Next</button>
    </>
  );
}
