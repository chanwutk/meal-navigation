import { Preferences } from '../data/preferences';

export default function savePreferences(preferences: Preferences) {
  localStorage.setItem(
    '__meal_navigation__',
    JSON.stringify(Object.fromEntries(preferences)),
  );
}
