import { describe, it, expect, vi, afterEach } from 'vitest';
import { CITIES } from '../const';
import { getRandomCity } from './get-random-city';

describe('getRandomCity', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return city from CITIES list', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(getRandomCity()).toBe(CITIES[0]);
    expect(CITIES).toContain(getRandomCity());
  });
});
