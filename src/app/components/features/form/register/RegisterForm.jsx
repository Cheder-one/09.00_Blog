import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators as bindActions } from 'redux';
import { Flex, Form, Input, Divider, Checkbox, Button } from 'antd';
import { toast } from 'react-toastify';

import {
  nameCheck,
  emailCheck,
  passwordCheck,
  confirmPassCheck,
} from '../validators';
import _ from '../login/LoginForm.module.scss';
import FormController from '../helpers/FormController';
import { useSubmitStatus } from '../../../../../hooks';
import { authActions, authSelectors } from '../../../../store/reducers/auth';

function RegisterForm({ registerUser, authError }) {
  const [isSubmitted, setIsSubmitted] = useSubmitStatus(authError.register);
  const { watch, control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: 'useracc',
      email: 'useracc@gmail.com',
      password: 'useracc@gmail.com',
      passRepeat: 'useracc@gmail.com',
      agreement: true,
    },
  });
  const { errors } = formState;
  const history = useHistory();

  const onSubmit = async (data) => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const user = {
      username: data.name,
      email: data.email,
      password: data.password,
    };
    registerUser(user)
      .then(() => history.push('/login/sign-in'))
      .catch((err) => toast.error(err.info));
  };

  const defineClass = (className) => {
    return _[`${className}${errors.checkbox ? '--error' : ''}`];
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
            <h3 className={_.title}>Create new account</h3>
            <div className={_.inputs_box}>
              <FormController
                name="name"
                label="Username"
                control={control}
                rules={nameCheck}
                errors={errors}
              >
                <Input id="name" placeholder="Username" autoFocus />
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
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={isSubmitted}
              >
                Create
              </Button>
              <div className={_.have_account}>
                Already have an account?
                <Link className={_.toggle_login} to="/login/sign-in/">
                  Sign In
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

export default connect(mapState, mapDispatch)(RegisterForm);
