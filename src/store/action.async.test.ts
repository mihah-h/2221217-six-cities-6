import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  mockFavoriteOffer,
  mockOffer,
  mockOffers,
  mockReview,
} from '../mocks/mock-data';
import { createTestStore } from '../utils/create-test-store';
import {
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  postCommentAction,
  toggleFavoriteAction,
} from './action';

describe('Async actions', () => {
  let api: AxiosInstance;
  let mockApi: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
  });

  it('fetchOffersAction should load offers', async () => {
    mockApi.onGet('/offers').reply(200, mockOffers);
    const store = createTestStore(undefined, api);

    await store.dispatch(fetchOffersAction());

    expect(store.getState().offers.offers).toEqual(mockOffers);
    expect(store.getState().offers.isOffersDataLoading).toBe(false);
    expect(store.getState().offers.hasError).toBe(false);
  });

  it('fetchOffersAction should set error when server is unavailable', async () => {
    mockApi.onGet('/offers').reply(500);
    const store = createTestStore(undefined, api);

    await store.dispatch(fetchOffersAction());

    expect(store.getState().offers.offers).toEqual([]);
    expect(store.getState().offers.hasError).toBe(true);
    expect(store.getState().offers.isOffersDataLoading).toBe(false);
  });

  it('fetchOfferAction should load offer data', async () => {
    mockApi.onGet('/offers/offer-1').reply(200, mockOffer);
    mockApi.onGet('/offers/offer-1/nearby').reply(200, [mockFavoriteOffer]);
    mockApi.onGet('/comments/offer-1').reply(200, [mockReview]);

    const store = createTestStore(undefined, api);
    const result = await store.dispatch(fetchOfferAction('offer-1'));

    expect(result).toBe(true);
    expect(store.getState().offerData.currentOffer).toEqual(mockOffer);
    expect(store.getState().offerData.nearbyOffers).toEqual([mockFavoriteOffer]);
    expect(store.getState().offerData.reviews).toEqual([mockReview]);
    expect(store.getState().offerData.isOfferDataLoading).toBe(false);
  });

  it('fetchOfferAction should return false when offer is not found', async () => {
    mockApi.onGet('/offers/unknown').reply(404);
    mockApi.onGet('/offers/unknown/nearby').reply(404);
    mockApi.onGet('/comments/unknown').reply(404);

    const store = createTestStore(undefined, api);
    const result = await store.dispatch(fetchOfferAction('unknown'));

    expect(result).toBe(false);
    expect(store.getState().offerData.currentOffer).toBeNull();
  });

  it('postCommentAction should add review on success', async () => {
    mockApi.onPost('/comments/offer-1').reply(201, mockReview);

    const store = createTestStore({
      offerData: {
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        isOfferDataLoading: false,
      },
    }, api);

    const result = await store.dispatch(postCommentAction('offer-1', {
      comment: mockReview.comment,
      rating: mockReview.rating,
    }));

    expect(result).toBe(true);
    expect(store.getState().offerData.reviews).toEqual([mockReview]);
  });

  it('postCommentAction should return false on error', async () => {
    mockApi.onPost('/comments/offer-1').reply(400);

    const store = createTestStore(undefined, api);
    const result = await store.dispatch(postCommentAction('offer-1', {
      comment: 'Too short',
      rating: 3,
    }));

    expect(result).toBe(false);
  });

  it('toggleFavoriteAction should update offer favorite status', async () => {
    const updatedOffer = { ...mockOffer, isFavorite: true };
    mockApi.onPost('/favorite/offer-1/1').reply(200, updatedOffer);

    const store = createTestStore({
      offers: {
        offers: mockOffers,
        isOffersDataLoading: false,
        hasError: false,
      },
    }, api);

    await store.dispatch(toggleFavoriteAction('offer-1', false));

    expect(store.getState().offers.offers[0].isFavorite).toBe(true);
    expect(store.getState().favorites.favorites).toHaveLength(1);
  });

  it('fetchFavoritesAction should load favorites', async () => {
    mockApi.onGet('/favorite').reply(200, [mockFavoriteOffer]);

    const store = createTestStore({
      offers: {
        offers: mockOffers,
        isOffersDataLoading: false,
        hasError: false,
      },
    }, api);

    await store.dispatch(fetchFavoritesAction());

    expect(store.getState().favorites.favorites).toEqual([mockFavoriteOffer]);
    expect(store.getState().favorites.isFavoritesDataLoading).toBe(false);
    expect(store.getState().offers.offers[1].isFavorite).toBe(true);
  });
});
