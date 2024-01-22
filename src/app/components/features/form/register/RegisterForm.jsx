import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Flex, Form, Input, Divider, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';

import _ from '../login/LoginForm.module.scss';
import FormController from '../helpers/FormController';
import { useScrollToElement } from '../../../../../hooks';
import {
  nameCheck,
  emailCheck,
  passwordCheck,
  confirmPassCheck,
} from '../validators';
import { authActions } from '../../../../store/reducers/auth';

function RegisterForm({ registerUser }) {
  const { watch, control, handleSubmit, formState } = useForm();
  const history = useHistory();
  const { errors } = formState;

  useScrollToElement('login-form');

  const onSubmit = async (data) => {
    const user = {
      username: data.name,
      email: data.email,
      password: data.password,
    };
    registerUser(user)
      .then(() => history.push('/sign-in'))
      .catch((error) => alert(error.info));
  };

  const defineClass = (className) => {
    return _[`${className}${errors.checkbox ? '--error' : ''}`];
  };

  return (
    <div className={_.wrapper}>
      <Flex className={_.container} id="login-form" justify="center">
        <Form
          className={_.login_form}
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <h3 className={_.title}>Create new account</h3>
          <div className={_.inputs_box}>
            <FormController
              name="name"
              label="Username"
              control={control}
              rules={nameCheck}
              errors={errors}
            >
              <Input id="name" placeholder="Username" />
            </FormController>
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
            <FormController
              name="passRepeat"
              label="Repeat Password"
              control={control}
              rules={confirmPassCheck(watch('password'))}
              errors={errors}
            >
              <Input.Password
                id="passRepeat"
                type="password"
                placeholder="Password"
              />
            </FormController>
          </div>

          <div className={_.agreement_box}>
            <Divider />
            <FormController
              name="agreement"
              className={defineClass('checkbox_wrapper')}
              control={control}
              rules={{ required: true }}
              errors={errors}
              hasFeedback
            >
              <Checkbox checked={watch('agreement')}>
                I agree to the processing of my personal information
              </Checkbox>
            </FormController>
          </div>

          <div className={_.submit_box}>
            <Button htmlType="submit" type="primary" block>
              Create
            </Button>
            <div className={_.have_account}>
              Already have an account?
              <Link className={_.toggle_login} to="/sign-in/">
                Sign In
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

export default connect(mapState, mapDispatch)(RegisterForm);
