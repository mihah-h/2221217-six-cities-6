export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  description?: string;
  bedrooms?: number;
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images?: string[];
  maxAdults?: number;
};
