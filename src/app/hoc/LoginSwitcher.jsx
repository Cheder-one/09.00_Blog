import { useParams, Redirect, Route, Switch } from 'react-router-dom';

import { LoginForm, RegisterForm } from '../components/features';
import { NotFound } from '../components/ui';

function LoginSwitcher() {
  return (
    <Switch>
      <Route path="/login/sign-in" exact component={LoginForm} />
      <Route path="/login/sign-up" exact component={RegisterForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default LoginSwitcher;
