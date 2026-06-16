import { CITIES } from '../const';

export function getRandomCity(): string {
  const randomIndex = Math.floor(Math.random() * CITIES.length);

  return CITIES[randomIndex];
}
