import OfferCard from '../offer-card/offer-card';
import { OfferType } from '../../mocks/offers';

type OfferListProps = {
  offers: OfferType[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  );
}

export default OfferList;
