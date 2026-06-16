import { OfferType } from '../../types/offer';
import { Action, ActionType } from '../action';

export type OffersData = {
  offers: OfferType[];
  isOffersDataLoading: boolean;
  hasError: boolean;
};

export const initialOffersState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
  hasError: false,
};

export function offersReducer(state: OffersData = initialOffersState, action: Action): OffersData {
  switch (action.type) {
    case ActionType.FillOffers:
      return { ...state, offers: action.payload, hasError: false };
    case ActionType.SetOffersDataLoading:
      return { ...state, isOffersDataLoading: action.payload };
    case ActionType.SetOffersError:
      return { ...state, hasError: action.payload };
    case ActionType.UpdateOffer:
      return {
        ...state,
        offers: state.offers.map((offer) => (
          offer.id === action.payload.id
            ? { ...offer, isFavorite: action.payload.isFavorite }
            : offer
        )),
      };
    default:
      return state;
  }
}
