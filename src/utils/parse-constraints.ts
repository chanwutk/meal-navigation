import { Preferences } from '../types';
import { constraints } from '../data/constraints';

export default function parseConstraints(
  _constraints?: [boolean, boolean, boolean, boolean, boolean],
): Preferences {
  if (_constraints === undefined) {
    throw new Error('constrains is not defined');
  }

  // return Object.fromEntries(constraints.map((c, i) => [c, _constraints[i]]));
  return {
    Vegetarian: _constraints[constraints.findIndex(c => c === 'Vegetarian')],
    'No Cilantro':
      _constraints[constraints.findIndex(c => c === 'No Cilantro')],
    'No Lamb': _constraints[constraints.findIndex(c => c === 'No Lamb')],
    'No Pork': _constraints[constraints.findIndex(c => c === 'No Pork')],
    'No Lactose': _constraints[constraints.findIndex(c => c === 'No Lactose')],
  };
}
