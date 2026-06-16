import { createSelector } from '@reduxjs/toolkit';
import { CITY_COORDINATES } from '../const';
import { OfferType } from '../types/offer';
import { ReviewType } from '../types/review';
import { getSortedOffers, SortType } from '../utils/sorting';
import { getSortedReviews } from '../utils/reviews';
import { State } from './root-reducer';

export type RootState = State;

export const getCity = (state: RootState) => state.app.city;

export const getOffers = (state: RootState): OfferType[] => state.offers.offers;

export const getOffersDataLoading = (state: RootState) => state.offers.isOffersDataLoading;

export const getOffersError = (state: RootState) => state.offers.hasError;

export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;

export const getUser = (state: RootState) => state.user.user;

export const getCurrentOffer = (state: RootState) => state.offerData.currentOffer;

export const getNearbyOffers = (state: RootState) => state.offerData.nearbyOffers;

export const getOfferReviews = (state: RootState): ReviewType[] => state.offerData.reviews;

export const getOfferDataLoading = (state: RootState) => state.offerData.isOfferDataLoading;

export const getFavorites = (state: RootState): OfferType[] => state.favorites.favorites;

export const getFavoritesDataLoading = (state: RootState) => state.favorites.isFavoritesDataLoading;

export const getFavoriteOffersCount = createSelector(
  getFavorites,
  (favorites) => favorites.length,
);

export const getFilteredOffersByCity = createSelector(
  getOffers,
  getCity,
  (offers, city) => offers.filter((offer) => offer.city.name === city),
);

export const getOffersCountByCity = createSelector(
  getFilteredOffersByCity,
  (offers) => offers.length,
);

export const getCityLocation = createSelector(
  getFilteredOffersByCity,
  getCity,
  (filteredOffers, city) => (
    filteredOffers.length > 0
      ? filteredOffers[0].city
      : {
        name: city,
        location: CITY_COORDINATES[city],
      }
  ),
);

export const getSortedOffersByCity = createSelector(
  getFilteredOffersByCity,
  (_state: RootState, sortType: SortType) => sortType,
  (offers, sortType) => getSortedOffers(offers, sortType),
);

export const getSortedOfferReviews = createSelector(
  getOfferReviews,
  (reviews) => getSortedReviews(reviews),
);

export const getNearbyOffersForDisplay = createSelector(
  getNearbyOffers,
  (nearbyOffers) => nearbyOffers.slice(0, 3),
);
