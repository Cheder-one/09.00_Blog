import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from './Header.module.scss';

function Header({ logoTitle }) {
  return (
    <div className={_.header}>
      <Link to="/" className={_.logo_title}>
        {logoTitle}
      </Link>
      <Link className={_.sign_in} to="/sign-in/">
        Sign In
      </Link>
      <Link className={_.sign_out} to="/sign-up/">
        Sign Up
      </Link>
    </div>
  );
}

Header.propTypes = {
  logoTitle: PropTypes.string,
};

Header.defaultProps = {
  logoTitle: '',
};

export default Header;
