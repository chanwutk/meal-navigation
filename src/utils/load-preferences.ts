import { Preferences } from '../types';
import isPreferences from './is-preferences';

export const defaultPreferences: Preferences = {
  'Vegetarian': false,
  'Lactose Intolerance': false,
};

export default function loadPreferences() {
  console.log(localStorage.getItem('__meal_navigation__preferences'));
  console.log(localStorage.getItem('__meal_navigation__preferences') ?? 'undefined');
  const preferences = JSON.parse(localStorage.getItem('__meal_navigation__preferences') ?? 'null') ?? defaultPreferences;
  console.log(preferences)

  if (!isPreferences(preferences)) {
    throw new Error();
  }

  return preferences;
}