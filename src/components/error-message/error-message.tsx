function ErrorMessage(): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">Unable to load data</b>
        <p className="cities__status-description">
          The server is temporarily unavailable. Please try again later.
        </p>
      </div>
    </section>
  );
}

export default ErrorMessage;
