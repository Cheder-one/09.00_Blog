import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Flex, Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';

import FormController from '../helpers/FormController';
import { emailCheck, passwordCheck } from '../validators';
import { authActions, authSelectors } from '../../../../store/reducers/auth';
import {
  useAlert,
  useScrollToElement,
  useSubmitStatus,
} from '../../../../../hooks';

import _ from './LoginForm.module.scss';

function LoginForm({ loginUser, authError }) {
  const [isSubmitted, setIsSubmitted] = useSubmitStatus(authError.login);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: 'useracc@gmail.com',
      password: 'useracc@gmail.com',
    },
  });
  const history = useHistory();
  const { errors } = formState;

  useScrollToElement('login-form');

  const onSubmit = async (data) => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const user = {
      email: data.email,
      password: data.password,
    };
    loginUser(user) // prettier-ignore
      .then(() => history.push('/'));
  };

  useAlert(authError.login, 'info');

  return (
    <div className={_.page}>
      <div className={_.wrapper} id="login-form">
        <Flex className={_.container} justify="center">
          <Form
            className={_.login_form}
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
          >
            <h3 className={_.title}>Sign In</h3>
            <div className={_.inputs_box}>
              <FormController
                name="email"
                label="Email address"
                control={control}
                rules={emailCheck}
                errors={errors}
              >
                <Input id="email" placeholder="Email address" autoFocus />
              </FormController>
              <FormController
                name="password"
                label="Password"
                control={control}
                rules={passwordCheck}
                errors={errors}
              >
                <Input.Password
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </FormController>
            </div>

            <div className={_.submit_box}>
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={isSubmitted}
              >
                Login
              </Button>
              <div className={_.have_account}>
                Don’t have an account?
                <Link className={_.toggle_login} to="/login/sign-up">
                  Sign Up
                </Link>
              </div>
            </div>
          </Form>
        </Flex>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  authError: authSelectors.getError(state),
});

const mapDispatch = (dispatch) => {
  const authAct = bindActions(authActions, dispatch);
  return { ...authAct };
};

export default connect(mapState, mapDispatch)(LoginForm);
