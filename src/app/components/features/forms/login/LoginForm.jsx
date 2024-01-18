import { Flex, Form, Input, Divider, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

import _ from './LoginForm.module.scss';

function LoginForm() {
  return (
    <Flex className={_.login_box} justify="center">
      <Form className={_.login_form} name="validateOnly" layout="vertical">
        <h3 className={_.title}>Create new account</h3>
        <Form.Item name="name" label="Username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" label="Email address">
          <Input type="email" placeholder="Email address" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="password-repeat" label="Repeat Password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Divider />
        <Checkbox>
          I agree to the processing of my personal information
        </Checkbox>
        <Button type="primary" block>
          Create
        </Button>
        <div className={_.have_account}>
          Already have an account?
          <Link className={_.toggle_login} to="/sign-in">
            Sign In
          </Link>
        </div>
      </Form>
    </Flex>
  );
}

export default LoginForm;
