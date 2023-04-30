import { Preferences } from '../types';
import { constraints } from '../data/constraints';

export default function parsePreferences(preferences: Preferences) {
  return constraints.map(c => preferences[c]);
}
