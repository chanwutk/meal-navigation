import { Preferences } from '../data/preferences';
import isPreferences from './is-preferences';
import { constraints } from '../data/constraints';
import isPreferenceTitle from './is-preference-title';

export const defaultPreferences: Preferences = new Map(
  constraints.map(c => [c, null]),
);

export default function loadPreferences() {
  const preferences = new Map([
    ...defaultPreferences,
    ...Object.entries(
      JSON.parse(localStorage.getItem('__meal_navigation__') ?? '{}'),
    ).filter(
      ([k, v]) =>
        isPreferenceTitle(k) && (typeof v === 'boolean' || v === null),
    ),
  ]);

  if (!isPreferences(preferences)) {
    throw new Error(JSON.stringify(preferences));
  }

  return preferences;
}
