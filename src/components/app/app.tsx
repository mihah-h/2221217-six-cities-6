import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { OfferType } from '../../mocks/offers';

type AppProps = {
  offers: OfferType[];
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
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<Offer offers={offers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
