/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { authSelectors } from '../app/store/reducers/auth';
import { Loader } from '../app/components/ui';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

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

export default PrivateRoute;
