import { Preferences } from '../data/preferences';
import { constraints as _constraints } from '../data/constraints';

export default function validatePreferences(
  preferences: Preferences,
  constraints: Preferences,
): boolean {
  return _constraints.every(
    p =>
      preferences.get(p) === null || preferences.get(p) === constraints.get(p),
  );
}
