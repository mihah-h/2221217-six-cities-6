import { mockOffer, mockOffers } from '../../mocks/mock-data';
import {
  fillOffers,
  setOffersDataLoading,
  setOffersError,
  updateOffer,
} from '../action';
import { initialOffersState, offersReducer } from './offers-reducer';

describe('offersReducer', () => {
  it('should return initial state with default action', () => {
    const result = offersReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(result).toEqual(initialOffersState);
  });

  it('should fill offers', () => {
    const stateWithError = offersReducer(initialOffersState, setOffersError(true));
    const result = offersReducer(stateWithError, fillOffers(mockOffers));

    expect(result.offers).toEqual(mockOffers);
    expect(result.hasError).toBe(false);
  });

  it('should set offers error status', () => {
    const result = offersReducer(initialOffersState, setOffersError(true));

    expect(result.hasError).toBe(true);
  });

  it('should set offers data loading status', () => {
    const result = offersReducer(initialOffersState, setOffersDataLoading(true));

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should update offer favorite status', () => {
    const state = offersReducer(initialOffersState, fillOffers(mockOffers));
    const result = offersReducer(
      state,
      updateOffer({ ...mockOffer, isFavorite: true }),
    );

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.offers[1].isFavorite).toBe(true);
  });
});
