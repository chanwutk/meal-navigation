import { Preferences } from '../types';
import isPreferences from './is-preferences';
import { constraints } from '../data/constraints';

export const defaultPreferences: Preferences = Object.assign(
  {},
  ...constraints.map(d => ({ [d]: false })),
);

export default function loadPreferences() {
  const preferences = Object.assign(
    {},
    defaultPreferences,
    ...Object.entries(
      JSON.parse(localStorage.getItem('__meal_navigation__') ?? '{}'),
    )
      .filter(([k, v]) => constraints.findIndex(c => c === k) !== -1)
      .map(([k, v]) => ({ [k]: v })),
  );

  if (!isPreferences(preferences)) {
    throw new Error(JSON.stringify(preferences));
  }

  return preferences;
}
