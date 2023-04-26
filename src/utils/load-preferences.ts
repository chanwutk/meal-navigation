import { Preferences } from '../types';
import isPreferences from './is-preferences';
import { data } from '../data/data';

export const defaultPreferences: Preferences = Object.assign(
  {},
  ...data.constraints.map(d => ({[d]: false}))
);

export default function loadPreferences() {
  const preferences = {
    ...defaultPreferences,
    ...JSON.parse(localStorage.getItem('__meal_navigation__') ?? '{}')
  };

  if (!isPreferences(preferences)) {
    throw new Error(JSON.stringify(preferences));
  }

  return preferences;
}