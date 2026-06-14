import MainPage from '../main-page/main-page';

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
    <MainPage
      offers={offers}
      offersCount={offersCount}
      activeCity={activeCity}
    />
  );
}

export default App;
