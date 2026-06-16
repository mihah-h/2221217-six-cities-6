import '../../mocks/mock-leaflet';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { mockDetailedOffer, mockFavoriteOffer, mockReview, mockUser } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import Offer from './offer';

function renderOffer(offerId: string, api = axios.create()) {
  const store = createTestStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    },
  }, api);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/offer/${offerId}`]}>
          <Routes>
            <Route path="/offer/:id" element={<Offer />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  };
}

describe('Offer', () => {
  let api: ReturnType<typeof axios.create>;
  let mockApi: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
  });

  it('should render offer details after loading', async () => {
    mockApi.onGet('/offers/offer-1').reply(200, mockDetailedOffer);
    mockApi.onGet('/offers/offer-1/nearby').reply(200, [mockFavoriteOffer]);
    mockApi.onGet('/comments/offer-1').reply(200, [mockReview]);

    renderOffer('offer-1', api);

    expect(await screen.findByRole('heading', { level: 1, name: mockDetailedOffer.title })).toBeInTheDocument();
    expect(screen.getByText(mockDetailedOffer.description!)).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render 404 page when offer is not found', async () => {
    mockApi.onGet('/offers/unknown').reply(404);
    mockApi.onGet('/offers/unknown/nearby').reply(404);
    mockApi.onGet('/comments/unknown').reply(404);

    renderOffer('unknown', api);

    expect(await screen.findByText('404 Not Found')).toBeInTheDocument();
  });
});
