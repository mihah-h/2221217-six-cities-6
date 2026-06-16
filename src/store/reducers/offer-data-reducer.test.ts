import { mockOffer, mockOffers, mockReview } from '../../mocks/mock-data';
import {
  resetOfferData,
  setCurrentOffer,
  setNearbyOffers,
  setOfferDataLoading,
  setReviews,
  updateOffer,
} from '../action';
import { initialOfferDataState, offerDataReducer } from './offer-data-reducer';

describe('offerDataReducer', () => {
  it('should return initial state with default action', () => {
    const result = offerDataReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(result).toEqual(initialOfferDataState);
  });

  it('should set current offer', () => {
    const result = offerDataReducer(initialOfferDataState, setCurrentOffer(mockOffer));

    expect(result.currentOffer).toEqual(mockOffer);
  });

  it('should set nearby offers', () => {
    const result = offerDataReducer(initialOfferDataState, setNearbyOffers(mockOffers));

    expect(result.nearbyOffers).toEqual(mockOffers);
  });

  it('should set reviews', () => {
    const result = offerDataReducer(initialOfferDataState, setReviews([mockReview]));

    expect(result.reviews).toEqual([mockReview]);
  });

  it('should set offer data loading status', () => {
    const result = offerDataReducer(initialOfferDataState, setOfferDataLoading(true));

    expect(result.isOfferDataLoading).toBe(true);
  });

  it('should reset offer data', () => {
    const filledState = {
      currentOffer: mockOffer,
      nearbyOffers: mockOffers,
      reviews: [mockReview],
      isOfferDataLoading: true,
    };
    const result = offerDataReducer(filledState, resetOfferData());

    expect(result).toEqual(initialOfferDataState);
  });

  it('should update favorite status in current and nearby offers', () => {
    const state = {
      ...initialOfferDataState,
      currentOffer: mockOffer,
      nearbyOffers: [mockOffer],
    };
    const result = offerDataReducer(
      state,
      updateOffer({ ...mockOffer, isFavorite: true }),
    );

    expect(result.currentOffer?.isFavorite).toBe(true);
    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });
});
