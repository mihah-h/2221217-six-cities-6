import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { fetchFavoritesAction } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFavorites, getFavoritesDataLoading } from '../../store/selectors';
import { OfferType } from '../../types/offer';

function FavoritesEmpty(): JSX.Element {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );
}

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const isFavoritesDataLoading = useAppSelector(getFavoritesDataLoading);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const favoritesByCity = useMemo(() => {
    const grouped = new Map<string, OfferType[]>();

    favorites.forEach((offer) => {
      const cityName = offer.city.name;
      const cityOffers = grouped.get(cityName) ?? [];
      cityOffers.push(offer);
      grouped.set(cityName, cityOffers);
    });

    return grouped;
  }, [favorites]);

  const isEmpty = !isFavoritesDataLoading && favorites.length === 0;

  const renderContent = () => {
    if (isFavoritesDataLoading) {
      return <Spinner />;
    }

    if (isEmpty) {
      return <FavoritesEmpty />;
    }

    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Array.from(favoritesByCity.entries()).map(([cityName, cityOffers]) => (
            <li key={cityName} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{cityName}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {cityOffers.map((offer) => (
                  <article key={offer.id} className="favorites__card place-card">
                    {offer.isPremium && (
                      <div className="place-card__mark">
                        <span>Premium</span>
                      </div>
                    )}
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={`/offer/${offer.id}`}>
                        <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                      </Link>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;{offer.price}</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite} />
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
                      </h2>
                      <p className="place-card__type">{offer.type}</p>
                    </div>
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {renderContent()}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
