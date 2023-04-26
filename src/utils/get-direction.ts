const BASE_URL = 'https://meal-navigation.herokuapp.com/directions?';

export default function getDirection(
  start: [number, number],
  end: [number, number],
) {
  const [slat, slon] = start;
  const [elat, elon] = end;
  const url = BASE_URL + `start=${slat},${slon}&end=${elat},${elon}`;
  console.log(url);
  return fetch(url, {
    mode: 'no-cors',
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
}
