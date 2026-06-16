import { OfferType } from '../types/offer';
import { ReviewType } from '../types/review';
import { UserType } from '../types/user';

export const mockCityLocation = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13,
};

export const mockCity = {
  name: 'Paris',
  location: mockCityLocation,
};

export const mockOffer: OfferType = {
  id: 'offer-1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  rating: 4.5,
  isPremium: true,
  isFavorite: false,
  previewImage: 'img/apartment-01.jpg',
  city: mockCity,
  location: mockCityLocation,
};

export const mockFavoriteOffer: OfferType = {
  ...mockOffer,
  id: 'offer-2',
  isFavorite: true,
  isPremium: false,
};

export const mockOffers: OfferType[] = [mockOffer, mockFavoriteOffer];

export const mockReview: ReviewType = {
  id: 'review-1',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    isPro: false,
  },
  comment: 'A quiet cozy and picturesque place.',
  rating: 4,
};

export const mockUser: UserType = {
  name: 'Oliver Conner',
  avatarUrl: 'img/avatar.svg',
  isPro: false,
  email: 'oliver@gmail.com',
  token: 'token',
};

export const mockDetailedOffer: OfferType = {
  ...mockOffer,
  description: 'Spacious loft in the city center with great amenities.',
  bedrooms: 3,
  maxAdults: 4,
  goods: ['Wi-Fi', 'Kitchen'],
  host: {
    name: 'Angelina',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true,
  },
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
};
