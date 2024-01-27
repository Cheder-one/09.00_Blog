import { Image } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import { useScrollToElement } from '../../../../hooks';
import smileSrc from '../../../assets/smiley-cyrus.jpg';
import { paginationActions } from '../../../store/reducers/pagination';
import { authActions, authSelectors } from '../../../store/reducers/auth';

import _ from './Header.module.scss';

function HeaderAuth({ user, logoutUser }) {
  const [setClickedProfile] = useScrollToElement('profile-form');
  const [setClickedArticle] = useScrollToElement('article-form');
  const history = useHistory();

  const handleLogout = () => {
    logoutUser();
    history.push('/');
    window.location.reload();
  };

  return (
    <div className={_.auth}>
      <Link
        to="/new-article"
        className={_.create_article}
        onClick={setClickedArticle}
      >
        <button type="button">Create article</button>
      </Link>
      <Link className={_.profile} to="/profile" onClick={setClickedProfile}>
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

HeaderAuth.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  user: authSelectors.getUser(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});

const mapDispatch = (dispatch) => {
  const paginateAct = bindActions(paginationActions, dispatch);
  const authAct = bindActions(authActions, dispatch);
  return { ...paginateAct, ...authAct };
};

export default connect(mapState, mapDispatch)(HeaderAuth);
