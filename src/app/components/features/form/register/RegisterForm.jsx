import { Flex, Form, Input, Divider, Checkbox, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import _ from '../login/LoginForm.module.scss';
import { useScrollToElement } from '../../../../../hooks';
import { confirmPassCheck, emailCheck, passwordCheck } from '../validators';
import FormController from '../helpers/FormController';

function RegisterForm() {
  useScrollToElement('login-form', 15);
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Flex className={_.login_box} id="login-form" justify="center">
      <Form
        className={_.login_form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <h3 className={_.title}>Create new account</h3>
        <FormController
          name="name"
          label="Username"
          control={control}
          rules={{ required: true }}
          errors={errors}
        >
          <Input placeholder="Username" />
        </FormController>
        <FormController
          name="email"
          label="Email address"
          control={control}
          rules={emailCheck}
          errors={errors}
        >
          <Input placeholder="Email address" />
        </FormController>

        <FormController
          name="password"
          label="Password"
          control={control}
          rules={passwordCheck}
          errors={errors}
        >
          <Input.Password type="password" placeholder="Password" />
        </FormController>
        <FormController
          name="password-repeat"
          label="Repeat Password"
          control={control}
          rules={confirmPassCheck(watch('password'))}
          errors={errors}
        >
          <Input.Password type="password" placeholder="Password" />
        </FormController>

        <Divider />
        <FormController
          name="checkbox"
          control={control}
          className={_[`checkbox_wrapper${errors.checkbox ? '--error' : ''}`]}
          rules={{ required: true }}
          errors={errors}
          hasFeedback
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </FormController>

        <Button htmlType="submit" type="primary" block>
          Create
        </Button>

        <div className={_.have_account}>
          Already have an account?
          <Link className={_.toggle_login} to="/sign-in/">
            Sign In
          </Link>
        </div>
      </Form>
    </Flex>
  );
}

export default RegisterForm;
