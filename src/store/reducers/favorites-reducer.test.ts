import { mockFavoriteOffer, mockOffer } from '../../mocks/mock-data';
import {
  fillFavorites,
  setFavoritesDataLoading,
  updateOffer,
} from '../action';
import { favoritesReducer, initialFavoritesState } from './favorites-reducer';

describe('favoritesReducer', () => {
  it('should return initial state with default action', () => {
    const result = favoritesReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(result).toEqual(initialFavoritesState);
  });

  it('should fill favorites', () => {
    const result = favoritesReducer(
      initialFavoritesState,
      fillFavorites([mockFavoriteOffer]),
    );

    expect(result.favorites).toEqual([mockFavoriteOffer]);
  });

  it('should set favorites data loading status', () => {
    const result = favoritesReducer(initialFavoritesState, setFavoritesDataLoading(true));

    expect(result.isFavoritesDataLoading).toBe(true);
  });

  it('should add offer to favorites', () => {
    const result = favoritesReducer(
      initialFavoritesState,
      updateOffer({ ...mockOffer, isFavorite: true }),
    );

    expect(result.favorites).toHaveLength(1);
    expect(result.favorites[0].id).toBe(mockOffer.id);
  });

  it('should remove offer from favorites', () => {
    const state = favoritesReducer(
      initialFavoritesState,
      fillFavorites([mockFavoriteOffer]),
    );
    const result = favoritesReducer(
      state,
      updateOffer({ ...mockFavoriteOffer, isFavorite: false }),
    );

    expect(result.favorites).toHaveLength(0);
  });
});
