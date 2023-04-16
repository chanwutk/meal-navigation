import { Preferences } from '../types';

export default function savePreferences(preferences: Preferences) {
  localStorage.setItem('__meal_navigation__preferences', JSON.stringify(preferences));
}