export const possibleRoutes = [
  [store('Safeway', 3)],
  [store('Safeway', 2)],
  [store("Trader Joe's", 1)],
  [store('Whole Food', 0)],
  [store('Whole Food', 2)],
  [store("Trader Joe's", 0)],
  [store('Safeway', 3), store('Whole Food', 2), store("Trader Joe's", 1)],
  [store('Safeway', 3), store("Trader Joe's", 1), store('Whole Food', 0)],
  [store('Safeway', 0), store('Whole Food', 0), store("Trader Joe's", 1)],
  [
    store('Whole Food', 0),
    store("Trader Joe's", 0),
    store('Safeway', 0),
  ],
  [store('Whole Food', 0), store('Safeway', 0)],
  [store("Trader Joe's", 1), store('Whole Food', 0)],
  [store('Safeway', 3), store("Trader Joe's", 1)],
  [store('Safeway', 3), store('Whole Food', 2)],
  [store('Whole Food', 2), store("Trader Joe's", 1)],
];

function store(name: string, address: number) {
  return { name, address };
}