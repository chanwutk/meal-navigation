import {Preferences} from '../types';
import PreferenceEntry from '../components/preference-entry';

import React from 'react';
import MealSelection from './meal-selection';
// import { selectedMeals } from './meal-selection';
interface UserPreferencesProp {
  preferences: Preferences;
  setPreferences: (p: Preferences) => void;
};

export default function UserPreferences({preferences, setPreferences}: UserPreferencesProp) {
  function isKey(k: string): k is keyof Preferences {
    return k in preferences;
  }

  function makeEntry(name: string, index: number) {
    if (!isKey(name)) {
      throw new Error();
    }

    return <PreferenceEntry
      key={index}
      name={name}
      value={preferences[name]}
      setValue={(value) => setPreferences({...preferences, [name]: value})}
    />;
  }

  return <>
    {Object.keys({
      ...preferences,
    }).map(makeEntry)}
  {/* <MealSelection
      selectedMeals={selectedMeals}
      setSelectedMeals={setSelectedMeals}
      preferences={preferences}
      setPreferences={setPreferences}
    /> */}
  </>;
}
