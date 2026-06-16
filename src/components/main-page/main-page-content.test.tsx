import '../../mocks/mock-leaflet';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import MainPageContent from './main-page-content';
import { SortType } from '../../utils/sorting';

describe('MainPageContent', () => {
  it('should render offers count and sorting options', () => {
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
          <MainPageContent />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should change sorting on option click', async () => {
    const store = createTestStore({
      app: { city: 'Paris' },
      offers: {
        offers: [mockOffer],
        isOffersDataLoading: false,
        hasError: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageContent />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.click(container.querySelector('.places__sorting-type')!);
    await userEvent.click(screen.getByText(SortType.PriceLowToHigh));

    expect(screen.getAllByText(SortType.PriceLowToHigh)).toHaveLength(2);
  });
});
