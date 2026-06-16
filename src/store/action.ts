import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { OfferType } from '../types/offer';
import { State } from './reducer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  FillOffers = 'FILL_OFFERS',
  SetOffersDataLoading = 'SET_OFFERS_DATA_LOADING',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type FillOffersAction = {
  type: ActionType.FillOffers;
  payload: OfferType[];
};

export type SetOffersDataLoadingAction = {
  type: ActionType.SetOffersDataLoading;
  payload: boolean;
};

export type Action = ChangeCityAction | FillOffersAction | SetOffersDataLoadingAction;

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const fillOffers = (offers: OfferType[]): FillOffersAction => ({
  type: ActionType.FillOffers,
  payload: offers,
});

export const setOffersDataLoading = (isOffersDataLoading: boolean): SetOffersDataLoadingAction => ({
  type: ActionType.SetOffersDataLoading,
  payload: isOffersDataLoading,
});

export const fetchOffersAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    dispatch(setOffersDataLoading(true));
    try {
      const { data } = await api.get<OfferType[]>('/offers');
      dispatch(fillOffers(data));
    } finally {
      dispatch(setOffersDataLoading(false));
    }
  };
