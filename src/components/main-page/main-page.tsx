import { useCallback } from 'react';
import CitiesList from '../cities-list/cities-list';
import Header from '../header/header';
import MainEmpty from '../main-empty/main-empty';
import Spinner from '../spinner/spinner';
import MainPageContent from './main-page-content';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCity, getOffersCountByCity, getOffersDataLoading } from '../../store/selectors';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const offersCount = useAppSelector(getOffersCountByCity);
  const isOffersDataLoading = useAppSelector(getOffersDataLoading);
  const isEmpty = !isOffersDataLoading && offersCount === 0;

  const handleCityClick = useCallback((selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  }, [dispatch]);

  const renderContent = () => {
    if (isOffersDataLoading) {
      return <Spinner />;
    }

    if (isEmpty) {
      return <MainEmpty city={city} />;
    }

    return <MainPageContent />;
  };

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={CITIES}
            activeCity={city}
            onCityClick={handleCityClick}
          />
        </div>
        <div className="cities">
          <div className={`cities__places-container${isEmpty ? ' cities__places-container--empty' : ''} container`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
