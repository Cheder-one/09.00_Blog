/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form, Col } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { bindActionCreators as bindActions } from 'redux';
import { toast } from 'react-toastify';

import {
  articleActions,
  articleSelectors,
} from '../../../../store/reducers/articles';
import {
  useAlert,
  useScrollToElement,
  useSubmitStatus,
} from '../../../../../hooks';
import { Loader } from '../../../ui';
import FormController from '../helpers/FormController';
import { descriptionCheck, textCheck, titleCheck } from '../validators';

import TagsList from './TagsList';
import _ from './ArticleForm.module.scss';
import { useArticlePresetOnEdit } from './helpers';

function ArticleForm({
  articleOne,
  setArticleOne,
  createArticle,
  editArticle,
  articleError,
  isLoadingOne,
}) {
  const { edit, create } = articleError || {};
  // console.log(edit, create);
  const [isSubmitted, setIsSubmitted] = useSubmitStatus(edit || create);
  const { control, register, setValue, handleSubmit, formState } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });
  const { errors } = formState;
  const { slug } = useParams();
  const history = useHistory();
  const isEdit = !!slug;

  useEffect(() => {
    if (isEdit) {
      setArticleOne(slug);
    }
  }, []);

  useScrollToElement('article-form');
  useArticlePresetOnEdit(isEdit, articleOne, setValue);

  const onSubmit = async (data) => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const article = {
      body: data.text,
      title: data.title,
      description: data.description,
      tagList: data.tags.map((item) => item.tag),
    };

    try {
      if (isEdit) {
        await editArticle(slug, article);
        history.replace(`/articles/${slug}`);
      } else {
        await createArticle(article);
        history.push('/');
      }
    } catch (error) {
      toast.error(error.info);
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
              <Button
                className={_.submit_btn}
                htmlType="submit"
                type="primary"
                loading={isSubmitted}
              >
                Send
              </Button>
            </Col>
          </Form>
        </div>
      </div>
      {/* {isLoadingOne && isEdit && <Loader />} */}
    </div>
  );
}

const mapState = (state) => ({
  articleOne: articleSelectors.getOne(state),
  articleError: articleSelectors.getError(state),
  isLoadingOne: articleSelectors.isLoadingOne(state),
});

const mapDispatch = (dispatch) => {
  const articlesAct = bindActions(articleActions, dispatch);
  return { ...articlesAct };
};

export default connect(mapState, mapDispatch)(ArticleForm);
