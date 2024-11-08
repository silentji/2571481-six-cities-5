import { Offers } from '@/types/offer';
import { Link } from 'react-router-dom';

type HeaderProps = {
  offers: Offers;
};

export function Header({offers}: HeaderProps) : JSX.Element {
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to='/'>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">{favoritesCount}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to='/login'>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
