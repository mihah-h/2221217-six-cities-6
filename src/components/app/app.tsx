import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
};

type AppProps = {
  offers: Offer[];
  offersCount: number;
  activeCity: string;
};

function App({ offers, offersCount, activeCity }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} offersCount={offersCount} activeCity={activeCity} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
