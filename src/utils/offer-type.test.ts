import { describe, it, expect } from 'vitest';
import { formatOfferType } from './offer-type';

describe('formatOfferType', () => {
  it('should format known offer types', () => {
    expect(formatOfferType('apartment')).toBe('Apartment');
    expect(formatOfferType('room')).toBe('Room');
    expect(formatOfferType('house')).toBe('House');
    expect(formatOfferType('hotel')).toBe('Hotel');
  });

  it('should return original value for unknown type', () => {
    expect(formatOfferType('villa')).toBe('villa');
  });
});
