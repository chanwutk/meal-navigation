import { Preferences } from '../data/preferences';
import isPreferenceTitle from './is-preference-title';

export default function isPreferences(
  preferences: Map<string, any>,
): preferences is Preferences {
  return [...preferences].every(
    ([k, v]) => isPreferenceTitle(k) && (typeof v === 'boolean' || v === null),
  );
}
