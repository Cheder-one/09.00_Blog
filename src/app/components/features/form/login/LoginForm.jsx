import { Flex, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import { useScrollToElement } from '../../../../../hooks';

import _ from './LoginForm.module.scss';

function LoginForm() {
  useScrollToElement('login-form', 15);

  return (
    <Flex className={_.login_box} justify="center" id="login-form">
      <Form className={_.login_form} name="validateOnly" layout="vertical">
        <h3 className={_.title}>Sign In</h3>
        <Form.Item name="email" label="Email address">
          <Input type="email" placeholder="Email address" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Button type="primary" block>
          Login
        </Button>
        <div className={_.have_account}>
          Don’t have an account?
          <Link className={_.toggle_login} to="/sign-up">
            Sign Up
          </Link>
        </div>
      </Form>
    </Flex>
  );
}

export default LoginForm;
