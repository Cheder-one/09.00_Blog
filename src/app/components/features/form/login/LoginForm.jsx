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
  useScrollToElement('login-form');
  // prettier-ignore
  const {  control, handleSubmit, formState: {errors} } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    loginUser(user)
      .then(() => history.push('/'))
      .catch((error) => alert(error));
  };

  return (
    <div className={_.wrapper}>
      <Flex className={_.container} id="login-form" justify="center">
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
              <Input id="email" placeholder="Email address" />
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
              Create
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
