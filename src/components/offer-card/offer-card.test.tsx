import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { mockOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import OfferCard from './offer-card';

describe('OfferCard', () => {
  it('should render offer card information', () => {
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <OfferCard {...mockOffer} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('should redirect to login when favorite button is clicked by guest', async () => {
    const store = createTestStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<OfferCard {...mockOffer} />} />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should toggle favorite when authorized user clicks bookmark button', async () => {
    const api = axios.create();
    const mockApi = new MockAdapter(api);
    mockApi.onPost(`/favorite/${mockOffer.id}/1`).reply(200, { ...mockOffer, isFavorite: true });

    const store = createTestStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      offers: {
        offers: [mockOffer],
        isOffersDataLoading: false,
      },
    }, api);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard {...mockOffer} />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(store.getState().offers.offers[0].isFavorite).toBe(true);
  });
});
