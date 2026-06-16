import { OfferType } from '../types/offer';
import { Action, ActionType } from './action';

export type State = {
  city: string;
  offers: OfferType[];
  isOffersDataLoading: boolean;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.FillOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetOffersDataLoading:
      return { ...state, isOffersDataLoading: action.payload };
    default:
      return state;
  }
}

export default reducer;
