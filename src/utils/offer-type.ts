const OFFER_TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel',
};

export function formatOfferType(type: string): string {
  return OFFER_TYPE_LABELS[type] ?? type;
}
