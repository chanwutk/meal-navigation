export type Store = {
  brand: string;
  address: string;
  phone: string;
  time: string;
  location: [number, number];
};

export type _Store = {
  name: string;
  address: string;
  idx: number;
};
export type _Path = GeoJSON.FeatureCollection & {
  metadata?: any;
};
export type Plan = {
  stores: _Store[];
  paths: _Path[];
  distance: number;
  duration: number;
  groceryCost: number;
  totalCost: number;
  groceryList: {
    store: _Store;
    ingredients: _Ingredient[];
  }[];
};