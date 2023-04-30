export type Preferences = {
  Vegetarian: boolean;
  'No Cilantro': boolean;
  'No Lamb': boolean;
  'No Pork': boolean;
  'No Lactose': boolean;
};

export type Store = {
  brand: string;
  address: string;
  phone: string;
  time: string;
  location: [number, number];
};
