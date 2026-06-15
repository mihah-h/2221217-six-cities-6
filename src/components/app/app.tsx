import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { OfferType } from '../../mocks/offers';
import { ReviewType } from '../../mocks/reviews';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
};

function App({ offers, reviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<Offer offers={offers} reviews={reviews} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
