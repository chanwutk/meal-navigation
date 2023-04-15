import { Preferences } from '../types';

export default function(preferences: Preferences) {
  localStorage.setItem('__meal_navigation__preferences', JSON.stringify(preferences));
}