import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import { paginationActions } from '../../../store/reducers/pagination';
import { authSelectors } from '../../../store/reducers/auth';

import _ from './Header.module.scss';
import HeaderContent from './HeaderContent';

function Header({ updatePagination, isAuthenticated, isAuthLoaded }) {
  const handleClick = () => {
    updatePagination(1, 5);
  };

  return (
    <div className={_.header}>
      <Link to="/" className={_.logo_title} onClick={handleClick}>
        <span>Realworld Blog</span>
      </Link>
      <HeaderContent {...{ isAuthenticated, isAuthLoaded }} />
    </div>
  );
}

Header.propTypes = {
  updatePagination: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([null]),
  ]),
};

Header.defaultProps = {
  isAuthenticated: null,
};

const mapState = (state) => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
  isAuthLoaded: authSelectors.isLoaded(state),
});

const mapDispatch = (dispatch) => {
  const paginateAct = bindActions(paginationActions, dispatch);
  return { ...paginateAct };
};

export default connect(mapState, mapDispatch)(Header);
