import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import OfferList from './offer-list';

describe('OfferList', () => {
  it('should render list of offers', () => {
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <OfferList offers={[mockOffer]} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should call onActiveOfferChange on mouse enter and leave', async () => {
    const handleActiveOfferChange = vi.fn();

    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <OfferList
            offers={[mockOffer]}
            onActiveOfferChange={handleActiveOfferChange}
          />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.hover(screen.getByText(mockOffer.title));
    expect(handleActiveOfferChange).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(screen.getByText(mockOffer.title));
    expect(handleActiveOfferChange).toHaveBeenCalledWith(null);
  });
});
