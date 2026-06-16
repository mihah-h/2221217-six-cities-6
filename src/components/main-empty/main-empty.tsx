type MainEmptyProps = {
  city: string;
};

function MainEmpty({ city }: MainEmptyProps): JSX.Element {
  return (
    <>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in {city}
          </p>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <img
            className="cities__no-results-image"
            src="img/ico-no-results.svg"
            width="260"
            height="200"
            alt="No places to stay available"
          />
        </section>
      </div>
    </>
  );
}

export default MainEmpty;
