import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockFavoriteOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import Favorites from './favorites';

describe('Favorites', () => {
  it('should render empty state when favorites list is empty', async () => {
    const api = axios.create();
    const mockApi = new MockAdapter(api);
    mockApi.onGet('/favorite').reply(200, []);

    const store = createTestStore(undefined, api);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render favorites list when data is loaded', async () => {
    const api = axios.create();
    const mockApi = new MockAdapter(api);
    mockApi.onGet('/favorite').reply(200, [mockFavoriteOffer]);

    const store = createTestStore(undefined, api);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteOffer.title)).toBeInTheDocument();
  });
});
