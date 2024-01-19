import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useScrollToElement } from '../../../../hooks';

import _ from './Header.module.scss';

function Header({ logoTitle }) {
  const [clicked, setClicked] = useState(null);
  useScrollToElement('login-form', clicked);

  const handleClick = () => {
    setClicked({});
  };

  return (
    <div className={_.header}>
      <Link to="/" className={_.logo_title}>
        {logoTitle}
      </Link>
      <Link className={_.sign_in} to="/sign-in/">
        <button type="button" onClick={handleClick}>
          Sign In
        </button>
      </Link>
      <Link className={_.sign_out} to="/sign-up/">
        <button type="button" onClick={handleClick}>
          Sign Up
        </button>
      </Link>
      <Link className={_.sign_out} to="/sign-up/">
        <button type="button" onClick={handleClick}>
          Sign Up
        </button>
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
