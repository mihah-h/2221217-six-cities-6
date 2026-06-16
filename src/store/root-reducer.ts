import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './reducers/app-reducer';
import { favoritesReducer } from './reducers/favorites-reducer';
import { offerDataReducer } from './reducers/offer-data-reducer';
import { offersReducer } from './reducers/offers-reducer';
import { userReducer } from './reducers/user-reducer';

export const reducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  user: userReducer,
  offerData: offerDataReducer,
  favorites: favoritesReducer,
});

export type State = ReturnType<typeof reducer>;
