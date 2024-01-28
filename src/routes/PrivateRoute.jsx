/* eslint-disable react/jsx-props-no-spreading */
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { Loader } from '../app/components/ui';
import { authSelectors } from '../app/store/reducers/auth';
import { articleSelectors } from '../app/store/reducers/articles';

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login/sign-in" />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.oneOf([null, false, true]),
  component: PropTypes.shape({}).isRequired,
};

PrivateRoute.defaultProps = {
  isAuthenticated: null,
};

const mapState = (state) => ({
  authError: authSelectors.getError(state),
  articleError: articleSelectors.getError(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapState)(PrivateRoute);
