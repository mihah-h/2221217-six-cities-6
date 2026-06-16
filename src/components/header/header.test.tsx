import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { mockFavoriteOffer, mockUser } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import Header from './header';

function renderHeader(
  authorizationStatus: AuthorizationStatus,
  api = axios.create(),
  favorites = [mockFavoriteOffer],
) {
  const store = createTestStore({
    user: {
      authorizationStatus,
      user: authorizationStatus === AuthorizationStatus.Auth ? mockUser : null,
    },
    offers: {
      offers: [],
      isOffersDataLoading: false,
      hasError: false,
    },
    favorites: {
      favorites,
      isFavoritesDataLoading: false,
    },
  }, api);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    ),
  };
}

describe('Header', () => {
  it('should render sign in link for unauthorized user', () => {
    renderHeader(AuthorizationStatus.NoAuth);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info for authorized user', () => {
    renderHeader(AuthorizationStatus.Auth);

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should dispatch logout on sign out click', async () => {
    const api = axios.create();
    const mockApi = new MockAdapter(api);
    mockApi.onDelete('/logout').reply(204);

    const { store } = renderHeader(AuthorizationStatus.Auth, api);

    await userEvent.click(screen.getByText('Sign out'));

    expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(store.getState().user.user).toBeNull();
  });
});
