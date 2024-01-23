import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useScrollToElement } from '../../../../hooks';

import _ from './Header.module.scss';

function HeaderNotAuth() {
  const [setClicked] = useScrollToElement('login-form');

  return (
    <div className={_.not_auth}>
      <Link className={_.sign_in} to="/login/sign-in" onClick={setClicked}>
        <button type="button">Sign In</button>
      </Link>
      <Link className={_.sign_up} to="/login/sign-up" onClick={setClicked}>
        <button type="button">Sign Up</button>
      </Link>
    </div>
  );
}

export default HeaderNotAuth;
