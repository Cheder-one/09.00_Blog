import { Image } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import { useScrollToElement } from '../../../../hooks';
import { paginationActions } from '../../../store/reducers/pagination';
import { authActions, authSelectors } from '../../../store/reducers/auth';
import smileSrc from '../../../assets/smiley-cyrus.jpg';

import _ from './Header.module.scss';

function Header({
  user,
  logoTitle,
  updatePagination,
  logoutUser,
  isAuthenticated,
}) {
  const history = useHistory();
  const [clicked, setClicked] = useState();
  useScrollToElement('login-form', clicked);

  const handleClick = () => {
    updatePagination(1, 5);
  };

  const handleLogout = () => {
    logoutUser();
    history.push('/');
  };

  const handleCreateArticle = () => {
    console.log('create article');
  };

  return (
    <div className={_.header}>
      <Link to="/" className={_.logo_title} onClick={handleClick}>
        {logoTitle}
      </Link>
      {isAuthenticated ? (
        <div className={_.auth}>
          <Link
            to="/new-article"
            className={_.create_article}
            onClick={handleCreateArticle}
          >
            <button type="button">Create article</button>
          </Link>
          <Link className={_.profile} to="/profile/">
            <span>{user.username}</span>
            <Image
              src=""
              width={46}
              height={46}
              preview={false}
              fallback={smileSrc}
            />
          </Link>
          <button className={_.log_out} type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={_.not_auth}>
          <Link className={_.sign_in} to="/sign-in">
            <button type="button" onClick={setClicked}>
              Sign In
            </button>
          </Link>
          <Link className={_.sign_up} to="/sign-up">
            <button type="button" onClick={setClicked}>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  logoTitle: PropTypes.string,
};

Header.defaultProps = {
  logoTitle: '',
};

const mapState = (state) => ({
  user: authSelectors.user(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});

const mapDispatch = (dispatch) => {
  const paginateAct = bindActions(paginationActions, dispatch);
  const authAct = bindActions(authActions, dispatch);
  return { ...paginateAct, ...authAct };
};

export default connect(mapState, mapDispatch)(Header);
