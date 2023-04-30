const CA_GAS = 4.872;
const MPG = 30;

export default function gasPrice(miles: number) {
  return miles * CA_GAS / MPG;
}