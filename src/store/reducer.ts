import { OfferType } from '../mocks/offers';
import { Action, ActionType } from './action';

export type State = {
  city: string;
  offers: OfferType[];
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.FillOffers:
      return { ...state, offers: action.payload };
    default:
      return state;
  }
}

export default reducer;
