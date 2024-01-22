import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useScrollToElement } from '../../../../hooks';

import _ from './Header.module.scss';

function HeaderNotAuth() {
  const [clicked, setClicked] = useState();
  useScrollToElement('login-form', clicked);

  return (
    <div className={_.not_auth}>
      <Link className={_.sign_in} to="/login/sign-in">
        <button type="button" onClick={setClicked}>
          Sign In
        </button>
      </Link>
      <Link className={_.sign_up} to="/login/sign-up">
        <button type="button" onClick={setClicked}>
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default HeaderNotAuth;
