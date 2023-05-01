export type PreferenceTitle =
  | 'Vegetarian'
  | 'Cilantro'
  | 'Lamb'
  | 'Pork'
  | 'Lactose';
export type Preferences = Map<PreferenceTitle, boolean | null>;
