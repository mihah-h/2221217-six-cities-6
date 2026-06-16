import { OfferType } from '../../types/offer';
import { Action, ActionType } from '../action';

export type FavoritesData = {
  favorites: OfferType[];
  isFavoritesDataLoading: boolean;
};

export const initialFavoritesState: FavoritesData = {
  favorites: [],
  isFavoritesDataLoading: false,
};

const toBriefOffer = (offer: OfferType): OfferType => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  rating: offer.rating,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  previewImage: offer.previewImage,
  city: offer.city,
  location: offer.location,
});

export function favoritesReducer(state: FavoritesData = initialFavoritesState, action: Action): FavoritesData {
  switch (action.type) {
    case ActionType.FillFavorites:
      return { ...state, favorites: action.payload };
    case ActionType.SetFavoritesDataLoading:
      return { ...state, isFavoritesDataLoading: action.payload };
    case ActionType.UpdateOffer: {
      const offer = toBriefOffer(action.payload);

      if (offer.isFavorite) {
        const exists = state.favorites.some((item) => item.id === offer.id);

        if (exists) {
          return {
            ...state,
            favorites: state.favorites.map((item) => (
              item.id === offer.id ? offer : item
            )),
          };
        }

        return { ...state, favorites: [...state.favorites, offer] };
      }

      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== offer.id),
      };
    }
    default:
      return state;
  }
}
