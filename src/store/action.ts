import { OfferType } from '../mocks/offers';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  FillOffers = 'FILL_OFFERS',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type FillOffersAction = {
  type: ActionType.FillOffers;
  payload: OfferType[];
};

export type Action = ChangeCityAction | FillOffersAction;

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const fillOffers = (offers: OfferType[]): FillOffersAction => ({
  type: ActionType.FillOffers,
  payload: offers,
});
