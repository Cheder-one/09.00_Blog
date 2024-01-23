import { Input, Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';
import { useForm } from 'react-hook-form';

import { useScrollToElement } from '../../../../../hooks';
import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import FormController from '../helpers/FormController';

import _ from './NewArticle.module.scss';

function NewArticle({ createArticle }) {
  const { control, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;
  const history = useHistory();

  useScrollToElement('article-form');

  const onSubmit = async (data) => {
    const userEdit = {
      username: data.name,
      email: data.email,
      image: data.image,
      password: data.password,
    };
    createArticle(userEdit)
      .then(() => history.push('/'))
      .catch((error) => alert(error.info));
  };

  return (
    <div className={_.page}>
      <div className={_.wrapper} id="article-form">
        <div className={_.container}>
          <Form
            className={_.login_form}
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
          >
            <h3 className={_.title}>Create new article</h3>
            <div className={_.inputs_box}>
              <FormController
                name="title"
                label="Title"
                control={control}
                rules={{}}
                errors={errors}
              >
                <Input id="title" placeholder="Title" />
              </FormController>
              <FormController
                name="description"
                label="Short description"
                control={control}
                rules={{}}
                errors={errors}
              >
                <Input id="description" placeholder="Description" />
              </FormController>
              <FormController
                name="text"
                label="Text"
                control={control}
                rules={{}}
                errors={errors}
              >
                <Input id="text" placeholder="Text" />
              </FormController>
            </div>
            <div className={_.submit_box}>
              <Button htmlType="submit" type="primary" block>
                Send
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
});

const mapDispatch = (dispatch) => {
  const articlesAct = bindActions(articleActions, dispatch);
  return { ...articlesAct };
};

export default connect(mapState, mapDispatch)(NewArticle);
