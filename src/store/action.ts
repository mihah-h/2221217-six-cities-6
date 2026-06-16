import axios, { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/offer';
import { CommentData, ReviewType } from '../types/review';
import { LoginData, UserType } from '../types/user';
import { dropToken, getToken, saveToken } from '../services/api';
import { State } from './root-reducer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  FillOffers = 'FILL_OFFERS',
  SetOffersDataLoading = 'SET_OFFERS_DATA_LOADING',
  SetOffersError = 'SET_OFFERS_ERROR',
  SetAuthorizationStatus = 'SET_AUTHORIZATION_STATUS',
  SetUser = 'SET_USER',
  SetCurrentOffer = 'SET_CURRENT_OFFER',
  SetNearbyOffers = 'SET_NEARBY_OFFERS',
  SetReviews = 'SET_REVIEWS',
  SetOfferDataLoading = 'SET_OFFER_DATA_LOADING',
  ResetOfferData = 'RESET_OFFER_DATA',
  UpdateOffer = 'UPDATE_OFFER',
  FillFavorites = 'FILL_FAVORITES',
  SetFavoritesDataLoading = 'SET_FAVORITES_DATA_LOADING',
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

export type SetOffersErrorAction = {
  type: ActionType.SetOffersError;
  payload: boolean;
};

export type SetAuthorizationStatusAction = {
  type: ActionType.SetAuthorizationStatus;
  payload: AuthorizationStatus;
};

export type SetUserAction = {
  type: ActionType.SetUser;
  payload: UserType | null;
};

export type SetCurrentOfferAction = {
  type: ActionType.SetCurrentOffer;
  payload: OfferType | null;
};

export type SetNearbyOffersAction = {
  type: ActionType.SetNearbyOffers;
  payload: OfferType[];
};

export type SetReviewsAction = {
  type: ActionType.SetReviews;
  payload: ReviewType[];
};

export type SetOfferDataLoadingAction = {
  type: ActionType.SetOfferDataLoading;
  payload: boolean;
};

export type ResetOfferDataAction = {
  type: ActionType.ResetOfferData;
};

export type UpdateOfferAction = {
  type: ActionType.UpdateOffer;
  payload: OfferType;
};

export type FillFavoritesAction = {
  type: ActionType.FillFavorites;
  payload: OfferType[];
};

export type SetFavoritesDataLoadingAction = {
  type: ActionType.SetFavoritesDataLoading;
  payload: boolean;
};

export type Action =
  | ChangeCityAction
  | FillOffersAction
  | SetOffersDataLoadingAction
  | SetOffersErrorAction
  | SetAuthorizationStatusAction
  | SetUserAction
  | SetCurrentOfferAction
  | SetNearbyOffersAction
  | SetReviewsAction
  | SetOfferDataLoadingAction
  | ResetOfferDataAction
  | UpdateOfferAction
  | FillFavoritesAction
  | SetFavoritesDataLoadingAction;

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

export const setOffersError = (hasError: boolean): SetOffersErrorAction => ({
  type: ActionType.SetOffersError,
  payload: hasError,
});

export const setAuthorizationStatus = (authorizationStatus: AuthorizationStatus): SetAuthorizationStatusAction => ({
  type: ActionType.SetAuthorizationStatus,
  payload: authorizationStatus,
});

export const setUser = (user: UserType | null): SetUserAction => ({
  type: ActionType.SetUser,
  payload: user,
});

export const setCurrentOffer = (offer: OfferType | null): SetCurrentOfferAction => ({
  type: ActionType.SetCurrentOffer,
  payload: offer,
});

export const setNearbyOffers = (offers: OfferType[]): SetNearbyOffersAction => ({
  type: ActionType.SetNearbyOffers,
  payload: offers,
});

export const setReviews = (reviews: ReviewType[]): SetReviewsAction => ({
  type: ActionType.SetReviews,
  payload: reviews,
});

export const setOfferDataLoading = (isOfferDataLoading: boolean): SetOfferDataLoadingAction => ({
  type: ActionType.SetOfferDataLoading,
  payload: isOfferDataLoading,
});

export const resetOfferData = (): ResetOfferDataAction => ({
  type: ActionType.ResetOfferData,
});

export const updateOffer = (offer: OfferType): UpdateOfferAction => ({
  type: ActionType.UpdateOffer,
  payload: offer,
});

export const fillFavorites = (favorites: OfferType[]): FillFavoritesAction => ({
  type: ActionType.FillFavorites,
  payload: favorites,
});

export const setFavoritesDataLoading = (isFavoritesDataLoading: boolean): SetFavoritesDataLoadingAction => ({
  type: ActionType.SetFavoritesDataLoading,
  payload: isFavoritesDataLoading,
});

export const fetchFavoritesAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    dispatch(setFavoritesDataLoading(true));
    try {
      const { data } = await api.get<OfferType[]>('/favorite');
      dispatch(fillFavorites(data));
      data.forEach((offer) => {
        dispatch(updateOffer({ ...offer, isFavorite: true }));
      });
    } finally {
      dispatch(setFavoritesDataLoading(false));
    }
  };

export const fetchOffersAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    dispatch(setOffersDataLoading(true));
    dispatch(setOffersError(false));
    try {
      const { data } = await api.get<OfferType[]>('/offers');
      dispatch(fillOffers(data));
    } catch {
      dispatch(setOffersError(true));
    } finally {
      dispatch(setOffersDataLoading(false));
    }
  };

export const checkAuthAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    const token = getToken();

    if (!token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return;
    }

    try {
      const { data } = await api.get<UserType>('/login');
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      await fetchFavoritesAction()(dispatch, _getState, api);
    } catch {
      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({ email, password }: LoginData) =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<UserType>('/login', { email, password });
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      await fetchFavoritesAction()(dispatch, _getState, api);
      return true;
    } catch {
      return false;
    }
  };

export const logoutAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    try {
      await api.delete('/logout');
    } catch {
      // Log out locally even if the request fails.
    } finally {
      dropToken();
      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(fillFavorites([]));
    }
  };

export const fetchOfferAction = (offerId: string) =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<boolean> => {
    dispatch(setOfferDataLoading(true));

    try {
      const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
        api.get<OfferType>(`/offers/${offerId}`),
        api.get<OfferType[]>(`/offers/${offerId}/nearby`),
        api.get<ReviewType[]>(`/comments/${offerId}`),
      ]);

      dispatch(setCurrentOffer(offerResponse.data));
      dispatch(setNearbyOffers(nearbyResponse.data));
      dispatch(setReviews(commentsResponse.data));

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        dispatch(resetOfferData());
        return false;
      }

      throw error;
    } finally {
      dispatch(setOfferDataLoading(false));
    }
  };

export const postCommentAction = (offerId: string, { comment, rating }: CommentData) =>
  async (
    dispatch: Dispatch<Action>,
    getState: () => State,
    api: AxiosInstance,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<ReviewType>(`/comments/${offerId}`, { comment, rating });
      const { reviews } = getState().offerData;
      dispatch(setReviews([data, ...reviews]));
      return true;
    } catch {
      return false;
    }
  };

export const toggleFavoriteAction = (offerId: string, isFavorite: boolean) =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    const status = isFavorite ? 0 : 1;
    const { data } = await api.post<OfferType>(`/favorite/${offerId}/${status}`);
    dispatch(updateOffer(data));
  };
