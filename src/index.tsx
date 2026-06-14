import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const offers = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    rating: 4,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-03.jpg',
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      offersCount={offers.length}
      activeCity="Amsterdam"
    />
  </React.StrictMode>
);
