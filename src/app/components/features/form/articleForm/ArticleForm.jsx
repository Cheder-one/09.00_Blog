/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form, Col } from 'antd';
import { useFieldArray, useForm } from 'react-hook-form';
import { bindActionCreators as bindActions } from 'redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import FormController from '../helpers/FormController';
import { useScrollToElement } from '../../../../../hooks';
import { descriptionCheck, textCheck, titleCheck } from '../validators';
import { Loader } from '../../../ui';

import _ from './ArticleForm.module.scss';
import TagsList from './TagsList';
import { useArticleDataOnEdit } from './helpers';

function ArticleForm({
  articleOne,
  setArticleOne,
  createArticle,
  editArticle,
  isLoadingOne,
}) {
  const { control, register, handleSubmit, setValue, formState } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });
  const { errors, isSubmitSuccessful } = formState;
  const { slug } = useParams();
  const history = useHistory();
  const isEdit = !!slug;

  useEffect(() => {
    if (isEdit) setArticleOne(slug);
  }, []);

  useScrollToElement('article-form');
  useArticleDataOnEdit(isEdit, articleOne, setValue);

  const onSubmit = async (data) => {
    if (isSubmitSuccessful) return;
    const article = {
      body: data.text,
      title: data.title,
      description: data.description,
      tagList: data.tags.map((item) => item.tag),
    };

    if (isEdit) {
      editArticle(slug, article)
        .then(() => history.replace(`/articles/${slug}`))
        .catch((error) => alert(error.info));
    } else {
      createArticle(article)
        .then(() => history.push('/'))
        .catch((error) => alert(error.info));
    }
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
            <h3 className={_.title}>
              {isEdit ? 'Edit article' : 'Create new article'}
            </h3>
            <div className={_.inputs_box}>
              <FormController
                name="title"
                label="Title"
                control={control}
                rules={titleCheck}
                errors={errors}
              >
                <Input id="title" placeholder="Title" autoFocus />
              </FormController>
              <FormController
                name="description"
                label="Short description"
                control={control}
                rules={descriptionCheck}
                errors={errors}
              >
                <Input id="description" placeholder="Description" />
              </FormController>
              <FormController
                name="text"
                label="Text"
                control={control}
                rules={textCheck}
                errors={errors}
              >
                <Input.TextArea id="text" placeholder="Text" />
              </FormController>

              <div className={_.tags_box}>
                <Col className={_.tags_col}>
                  <h4 className={_.tags_title}>Tags</h4>
                  <TagsList
                    className={_.tags_list}
                    tags={fields}
                    control={control}
                    register={register}
                    append={append}
                    remove={remove}
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
      {isLoadingOne && isEdit && <Loader />}
    </div>
  );
}

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
  isLoadingOne: articleSelectors.isLoadingOne(state),
});

const mapDispatch = (dispatch) => {
  const articlesAct = bindActions(articleActions, dispatch);
  return { ...articlesAct };
};

export default connect(mapState, mapDispatch)(ArticleForm);
