import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Flex, Form, Input, Divider, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';

import { useScrollToElement } from '../../../../../hooks';
import {
  nameCheck,
  emailCheck,
  passwordCheck,
  confirmPassCheck,
  imageUrlCheck,
} from '../validators';
import FormController from '../helpers/FormController';
import _ from '../login/LoginForm.module.scss';

function ProfileEditForm() {
  useScrollToElement('profile-form');
  // prettier-ignore
  const { watch, control, handleSubmit, formState: {errors} } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    const user = {
      username: data.name,
      email: data.email,
      password: data.password,
    };
    // registerUser(user)
    // .then(() => history.push('/sign-in'))
    // .catch((error) => alert(error.info));
  };

  return (
    <div className={_.wrapper}>
      <Flex className={_.container} id="profile-form" justify="center">
        <Form
          className={_.login_form}
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <h3 className={_.title}>Edit Profile</h3>
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
              label="New password"
              control={control}
              rules={passwordCheck}
              errors={errors}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder="New password"
              />
            </FormController>
            <FormController
              name="image"
              label="Avatar image (url)"
              control={control}
              rules={imageUrlCheck}
              errors={errors}
            >
              <Input id="image" placeholder="Avatar image" />
            </FormController>
          </div>

          <div className={_.submit_box}>
            <Button htmlType="submit" type="primary" block>
              Save
            </Button>
          </div>
        </Form>
      </Flex>
    </div>
  );
}

export default ProfileEditForm;
