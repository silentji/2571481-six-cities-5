import React from 'react';
import { AppRoute } from '@const';
import { Link } from 'react-router-dom';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.MainPage}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
};

export default React.memo(Footer, () => true);