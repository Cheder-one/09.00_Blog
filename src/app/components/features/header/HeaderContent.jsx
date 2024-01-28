import PropTypes from 'prop-types';

import { HeaderSkeleton } from '../../ui';

import HeaderAuth from './HeaderAuth';
import HeaderNotAuth from './HeaderNotAuth';

function HeaderContent({ isAuthenticated, isAuthLoaded }) {
  if (isAuthenticated) {
    return <HeaderAuth />;
  }
  if (!isAuthLoaded) {
    return <HeaderNotAuth />;
  }
  return <HeaderSkeleton />;
}

HeaderContent.propTypes = {
  isAuthenticated: PropTypes.oneOf([null, false, true]),
  isAuthLoaded: PropTypes.bool.isRequired,
};

HeaderContent.defaultProps = {
  isAuthenticated: null,
};

export default HeaderContent;
