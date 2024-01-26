import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Flex, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';

import FormController from '../helpers/FormController';
import { useScrollToElement } from '../../../../../hooks';
import { emailCheck, passwordCheck } from '../validators';
import { authActions } from '../../../../store/reducers/auth';

import _ from './LoginForm.module.scss';

function LoginForm({ loginUser }) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: 'username@gmail.com',
      password: 'username@gmail.com',
    },
  });
  const { errors, isSubmitSuccessful } = formState;
  const history = useHistory();

  useScrollToElement('login-form');

  const onSubmit = async (data) => {
    if (isSubmitSuccessful) return;
    const user = {
      email: data.email,
      password: data.password,
    };
    loginUser(user)
      .then(() => history.push('/'))
      .catch((error) => alert(error));
  };

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
              <Button htmlType="submit" type="primary" block>
                Login
              </Button>
              <div className={_.have_account}>
                Don’t have an account?
                <Link className={_.toggle_login} to="/sign-up">
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
  // name: reducerSelectors.getStoreState(state)
});

const mapDispatch = (dispatch) => {
  const authAct = bindActions(authActions, dispatch);
  return { ...authAct };
};

export default connect(mapState, mapDispatch)(LoginForm);
