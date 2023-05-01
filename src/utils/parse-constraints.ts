import { PreferenceTitle, Preferences } from '../data/preferences';
import { constraints } from '../data/constraints';

export default function parseConstraints(
  _constraints?: [boolean, boolean, boolean, boolean, boolean],
): Preferences {
  if (_constraints === undefined) {
    throw new Error('constrains is not defined');
  }

  return new Map<PreferenceTitle, boolean>(
    constraints.map((c, i) => [c, _constraints[i]]),
  );
}
