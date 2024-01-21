import { useParams } from 'react-router-dom';

import { LoginForm, RegisterForm } from '../components/features';

function LoginSwitcher() {
  const { loginType } = useParams();

  switch (loginType) {
    case 'sign-in':
      return <LoginForm />;
    case 'sign-up':
      return <RegisterForm />;
    default:
  }
}

export default LoginSwitcher;
