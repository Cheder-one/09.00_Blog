import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { LinkAs } from '../common';

import _ from './Header.module.scss';

const Button = styled.button``;

function Header({ logoTitle }) {
  return (
    <div className={_.header}>
      <Link to="/articles" className={_.logo_title}>
        {logoTitle}
      </Link>
      <LinkAs as={Button} className={_.sign_in} to="signIn/" type="button">
        Sign In
      </LinkAs>
      <LinkAs as={Button} className={_.sign_out} to="signUp/" type="button">
        Sign Up
      </LinkAs>
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
