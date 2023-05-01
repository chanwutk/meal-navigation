import { constraints } from '../data/constraints';
import { PreferenceTitle } from '../data/preferences';

export default function isPreferenceTitle(s: string): s is PreferenceTitle {
  return constraints.some(c => c === s);
}
