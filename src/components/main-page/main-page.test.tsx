import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import MainPage from './main-page';

describe('MainPage', () => {
  it('should render spinner while offers are loading', () => {
    const store = createTestStore({
      offers: {
        offers: [],
        isOffersDataLoading: true,
        hasError: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(container.querySelector('div[style*="spinner-rotate"]')).toBeInTheDocument();
  });

  it('should render empty state when there are no offers in city', () => {
    const store = createTestStore({
      app: { city: 'Paris' },
      offers: {
        offers: [],
        isOffersDataLoading: false,
        hasError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render error message when server is unavailable', () => {
    const store = createTestStore({
      offers: {
        offers: [],
        isOffersDataLoading: false,
        hasError: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Unable to load data')).toBeInTheDocument();
  });

  it('should change city on city click', async () => {
    const store = createTestStore({
      app: { city: 'Paris' },
      offers: {
        offers: [mockOffer],
        isOffersDataLoading: false,
        hasError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText('Amsterdam'));

    expect(store.getState().app.city).toBe('Amsterdam');
  });

  it('should render offers list when offers are available', () => {
    const store = createTestStore({
      app: { city: 'Paris' },
      offers: {
        offers: [mockOffer],
        isOffersDataLoading: false,
        hasError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
  });
});
