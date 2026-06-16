import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--not-found">
        <h1>404 Not Found</h1>
        <Link to="/">Go to main page</Link>
      </main>
    </div>
  );
}

export default NotFound;
