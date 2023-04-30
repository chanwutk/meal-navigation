import { Preferences } from '../types';
import { constraints as _constraints } from '../data/constraints';

export default function validatePreferences(
  preferences: Preferences,
  constraints: Preferences,
): boolean {
  // console.log(preferences, constraints)
  return _constraints.every(p => !preferences[p] || constraints[p]);
}
