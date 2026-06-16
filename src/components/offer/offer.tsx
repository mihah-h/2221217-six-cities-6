import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { fetchOfferAction, resetOfferData } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getAuthorizationStatus,
  getCurrentOffer,
  getNearbyOffersForDisplay,
  getOfferDataLoading,
  getOfferReviews,
} from '../../store/selectors';
import Header from '../header/header';
import FavoriteButton from '../favorite-button/favorite-button';
import NotFound from '../not-found/not-found';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import Map from '../map/map';
import Spinner from '../spinner/spinner';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffersForDisplay = useAppSelector(getNearbyOffersForDisplay);
  const reviews = useAppSelector(getOfferReviews);
  const isOfferDataLoading = useAppSelector(getOfferDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isNotFound, setIsNotFound] = useState(false);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsNotFound(false);

    void dispatch(fetchOfferAction(id)).then((isFound) => {
      if (!isFound) {
        setIsNotFound(true);
      }
    });

    return () => {
      dispatch(resetOfferData());
    };
  }, [id, dispatch]);

  if (isNotFound) {
    return <NotFound />;
  }

  if (isOfferDataLoading || !currentOffer) {
    return <Spinner />;
  }

  const offer = currentOffer;
  const ratingWidth = `${Math.round(offer.rating) * 20}%`;
  const offersForMap = [offer, ...nearbyOffersForDisplay];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {/* eslint-disable react/no-array-index-key */}
              {offer.images?.slice(0, 6).map((image, index) => (
                <div key={`${offer.id}-image-${index}`} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
              {/* eslint-enable react/no-array-index-key */}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <FavoriteButton
                  offerId={offer.id}
                  isFavorite={offer.isFavorite}
                  buttonClassName="offer__bookmark-button button"
                  iconClassName="offer__bookmark-icon"
                  iconWidth="31"
                  iconHeight="33"
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                {offer.bedrooms && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </li>
                )}
                {offer.maxAdults && (
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
                  </li>
                )}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {offer.goods && offer.goods.length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={`good-${offer.id}-${good}`} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {offer.host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper${offer.host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}>
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">
                        Pro
                      </span>
                    )}
                  </div>
                  {offer.description && (
                    <div className="offer__description">
                      <p className="offer__text">
                        {offer.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews} />
                {isAuth && id && <ReviewForm offerId={id} />}
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{ height: '500px' }}>
            <Map city={offer.city} offers={offersForMap} activeOfferId={offer.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list tabs__content">
              {nearbyOffersForDisplay.map((nearbyOffer) => (
                <article
                  key={nearbyOffer.id}
                  className="near-places__card place-card"
                >
                  {nearbyOffer.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={`/offer/${nearbyOffer.id}`}>
                      <img
                        className="place-card__image"
                        src={nearbyOffer.previewImage}
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{nearbyOffer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <FavoriteButton offerId={nearbyOffer.id} isFavorite={nearbyOffer.isFavorite} />
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `${Math.round(nearbyOffer.rating) * 20}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`/offer/${nearbyOffer.id}`}>{nearbyOffer.title}</Link>
                    </h2>
                    <p className="place-card__type">{nearbyOffer.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
