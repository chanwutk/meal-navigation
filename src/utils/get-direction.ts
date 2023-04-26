const BASE_URL = 'https://meal-navigation.herokuapp.com/directions?';

export default function getDirection(start: [number, number], end: [number, number]) {
  const [slat, slon] = start;
  const [elat, elon] = end;
  const url = BASE_URL + `start=${slat},${slon}&end=${elat},${elon}`;
  console.log(url);
  return fetch(
    url,
    {
      mode: 'no-cors',
      method: 'GET',
      headers: {'Accept': 'application/json'}
    }
  )
}


/*
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.855577,-122.260054
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.837657,-122.262078
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.880569,-122.297177
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.845923,-122.252565
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.871713,-122.273071
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.837047,-122.293903
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.85073,-122.252364
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.829478,-122.280603
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.880819,-122.269725
https://meal-navigation.herokuapp.com/directions?start=37.87607,-122.258502&end=37.878793,-122.269677
*/