import { changeCity } from '../action';
import { appReducer, initialAppState } from './app-reducer';

describe('appReducer', () => {
  it('should return initial state with default action', () => {
    const result = appReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(result).toEqual(initialAppState);
  });

  it('should change city', () => {
    const result = appReducer(initialAppState, changeCity('Amsterdam'));

    expect(result.city).toBe('Amsterdam');
  });
});
