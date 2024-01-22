import { Route, Switch, Redirect } from 'react-router-dom';

import { LoginForm, RegisterForm } from '../app/components/features';

function LoginRoutes() {
  return (
    <Switch>
      <Route path="/login/sign-in" exact component={LoginForm} />
      <Route path="/login/sign-up" exact component={RegisterForm} />
      <Redirect to="/404" />;
    </Switch>
  );
}

export default LoginRoutes;
