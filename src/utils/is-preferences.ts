import { Preferences } from '../types';

export const types: { [k in keyof Preferences]: string } = {
  Vegetarian: 'boolean',
  'No Cilantro': 'boolean',
  'No Pork': 'boolean',
  'No Lamb': 'boolean',
  'No Lactose': 'boolean',
} as const;

export default function isPreferences(
  preferences: any,
): preferences is Preferences {
  if (typeof preferences !== 'object') {
    return false;
  }

  return Object.entries(preferences).every(
    ([k, v]) => isKey(k) && types[k] === typeof v,
  );
}

function isKey(key: string): key is keyof Preferences {
  return key in types;
}
