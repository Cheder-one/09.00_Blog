import { Image } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import smileSrc from '../../../assets/smiley-cyrus.jpg';
import { paginationActions } from '../../../store/reducers/pagination';
import { authActions, authSelectors } from '../../../store/reducers/auth';

import _ from './Header.module.scss';

function HeaderAuth({ user, logoutUser }) {
  const history = useHistory();

  const handleLogout = () => {
    logoutUser();
    history.push('/');
    window.location.reload();
  };

  const handleCreateArticle = () => {
    console.log('create article');
  };

  return (
    <div className={_.auth}>
      <Link
        to="/new-article"
        className={_.create_article}
        onClick={handleCreateArticle}
      >
        <button type="button">Create article</button>
      </Link>
      <Link className={_.profile} to="/profile">
        <span>{user.username}</span>
        <Image
          width={46}
          height={46}
          src={user.image}
          preview={false}
          fallback={smileSrc}
        />
      </Link>
      <button className={_.log_out} type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

const mapState = (state) => ({
  user: authSelectors.user(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});

const mapDispatch = (dispatch) => {
  const paginateAct = bindActions(paginationActions, dispatch);
  const authAct = bindActions(authActions, dispatch);
  return { ...paginateAct, ...authAct };
};

export default connect(mapState, mapDispatch)(HeaderAuth);
