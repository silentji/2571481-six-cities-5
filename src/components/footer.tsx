import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';

function Footer(): JSX.Element {
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
}

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;
