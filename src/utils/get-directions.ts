const BASE_URL = 'https://meal-navigation.herokuapp.com/directions?';

export default function getDirections(
  start: [number, number],
  ...ends: [number, number][]
) {
  const [slat, slon] = start;
  const nend = ends.length;
  const url =
    BASE_URL +
    `start=${slat},${slon}&nend=${nend}&${ends
      .map(([lat, lon], i) => `end${i}=${lat},${lon}`)
      .join('&')}`;
  return fetch(url, {
    // mode: 'no-cors',
    method: 'GET',
  });
}
