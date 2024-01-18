import { useParams } from 'react-router-dom';

import { LoginForm, RegisterForm } from '../components/features';

function LoginSwitcher() {
  const { loginType } = useParams();

  return loginType === 'sign-in' ? <LoginForm /> : <RegisterForm />;
}

export default LoginSwitcher;
