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
import FavoriteButton from './favorite-button';

function renderFavoriteButton(
  authorizationStatus: AuthorizationStatus,
  isFavorite = false,
  api = axios.create(),
) {
  const store = createTestStore({
    user: {
      authorizationStatus,
      user: null,
    },
    offers: {
      offers: [mockOffer],
      isOffersDataLoading: false,
    },
  }, api);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <FavoriteButton offerId={mockOffer.id} isFavorite={isFavorite} />
              }
            />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  };
}

describe('FavoriteButton', () => {
  it('should redirect to login when unauthorized user clicks', async () => {
    renderFavoriteButton(AuthorizationStatus.NoAuth);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should dispatch toggle favorite when authorized user clicks', async () => {
    const api = axios.create();
    const mockApi = new MockAdapter(api);
    const updatedOffer = { ...mockOffer, isFavorite: true };
    mockApi.onPost(`/favorite/${mockOffer.id}/1`).reply(200, updatedOffer);

    const { store } = renderFavoriteButton(AuthorizationStatus.Auth, false, api);

    await userEvent.click(screen.getByRole('button'));

    expect(store.getState().offers.offers[0].isFavorite).toBe(true);
  });
});
