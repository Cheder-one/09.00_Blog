/** @jsxImportSource @emotion/react */
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Flex, Form, Input, Button } from 'antd';
import { bindActionCreators as bindActions } from 'redux';
import { toast } from 'react-toastify';

import {
  nameCheck,
  emailCheck,
  passwordCheck,
  imageUrlCheck,
} from '../validators';
import _ from '../login/LoginForm.module.scss';
import FormController from '../helpers/FormController';
import { useAlert, useSubmitStatus } from '../../../../../hooks';
import { authActions, authSelectors } from '../../../../store/reducers/auth';

import { usePresetProfileEditForm } from './helpers';

function ProfileEditForm({ user, editUser, authError }) {
  const [isSubmitted, setIsSubmitted] = useSubmitStatus(authError.profileEdit);
  const { control, setValue, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const history = useHistory();

  usePresetProfileEditForm(user, setValue);

  const onSubmit = async (data) => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const userEdit = {
      username: data.name,
      email: data.email,
      bio: 'Lorem bio',
      image: data.image,
      password: data.password,
    };
    editUser(userEdit)
      .then(() => history.push('/'))
      .catch((err) => toast.error(err.info));
  };

  return (
    <div className={_.page}>
      <div className={_.wrapper} id="profile-form">
        <Flex className={_.container} justify="center">
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
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={isSubmitted}
              >
                Save
              </Button>
            </div>
          </Form>
        </Flex>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  user: authSelectors.getUser(state),
  authError: authSelectors.getError(state),
});

const mapDispatch = (dispatch) => {
  const authAct = bindActions(authActions, dispatch);
  return { ...authAct };
};

export default connect(mapState, mapDispatch)(ProfileEditForm);
