/** @jsxImportSource @emotion/react */
import { Input, Button, Form, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators as bindActions } from 'redux';
import { useForm } from 'react-hook-form';
import { filter } from 'lodash';

import { useScrollToElement } from '../../../../../hooks';
import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import FormController from '../helpers/FormController';

import _ from './NewArticle.module.scss';
import TagsList from './TagsList';

function NewArticle({ createArticle }) {
  const { control, unregister, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const history = useHistory();

  useScrollToElement('article-form');

  // TODO Предотвратить двойную отправку формы.

  // TODO Validation всех полей
  // TODO Валидация тегов useFieldArray?

  const onSubmit = async (data) => {
    const article = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: filter(data, (v, key) => key.startsWith('tag_')),
    };

    createArticle(article)
      .then(() => history.push('/'))
      .catch((error) => alert(error.info));
  };

  return (
    <div className={_.page}>
      <div className={_.wrapper} id="article-form">
        <div className={_.container}>
          <Form
            className={_.article_form}
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

              <div className={_.tags_box}>
                <Col className={_.tags_col}>
                  <h4 className={_.tags_title}>Tags</h4>
                  <TagsList
                    className={_.tags_list}
                    unregister={unregister}
                    control={control}
                    errors={errors}
                  />
                </Col>
              </div>
            </div>

            <Col span={11}>
              <Button className={_.submit_btn} htmlType="submit" type="primary">
                Send
              </Button>
            </Col>
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
