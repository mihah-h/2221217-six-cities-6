import '../../mocks/mock-leaflet';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import L from 'leaflet';
import { mockCity, mockOffer } from '../../mocks/mock-data';
import Map from './map';

describe('Map', () => {
  it('should render map container and create markers for offers', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={[mockOffer]}
        activeOfferId={mockOffer.id}
      />,
    );

    expect(container.querySelector('div')).toBeInTheDocument();
    expect(L.map).toHaveBeenCalled();
    expect(L.marker).toHaveBeenCalled();
  });
});
