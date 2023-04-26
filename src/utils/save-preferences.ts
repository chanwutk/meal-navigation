import { Preferences } from '../types';

export default function savePreferences(preferences: Preferences) {
  localStorage.setItem('__meal_navigation__', JSON.stringify(preferences));
}
