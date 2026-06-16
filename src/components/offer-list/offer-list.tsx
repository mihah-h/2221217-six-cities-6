import OfferCard from '../offer-card/offer-card';
import { OfferType } from '../../types/offer';

type OfferListProps = {
  offers: OfferType[];
  onActiveOfferChange?: (offerId: string | null) => void;
};

function OfferList({ offers, onActiveOfferChange }: OfferListProps): JSX.Element {
  const handleMouseEnter = (offerId: string) => {
    onActiveOfferChange?.(offerId);
  };

  const handleMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <OfferCard
            {...offer}
          />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
