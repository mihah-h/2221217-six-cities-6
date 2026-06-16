import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { mockReview } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import ReviewForm from './review-form';

const validComment = 'A quiet cozy and picturesque place with a nice view of the city.';

function renderReviewForm(api = axios.create()) {
  const store = createTestStore({
    offerData: {
      currentOffer: null,
      nearbyOffers: [],
      reviews: [],
      isOfferDataLoading: false,
    },
  }, api);

  return {
    store,
    ...render(
      <Provider store={store}>
        <ReviewForm offerId="offer-1" />
      </Provider>,
    ),
  };
}

describe('ReviewForm', () => {
  let api: ReturnType<typeof axios.create>;
  let mockApi: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
  });

  it('should render review form', () => {
    renderReviewForm();

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    renderReviewForm();

    await userEvent.click(screen.getByTitle('good'));
    await userEvent.type(screen.getByRole('textbox'), validComment);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('should submit review on valid form submit', async () => {
    mockApi.onPost('/comments/offer-1').reply(201, mockReview);

    const { store } = renderReviewForm(api);

    await userEvent.click(screen.getByTitle('good'));
    await userEvent.type(screen.getByRole('textbox'), validComment);
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(store.getState().offerData.reviews).toEqual([mockReview]);
    });
  });
});
