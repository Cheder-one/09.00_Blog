/* eslint-disable react/jsx-props-no-spreading */
import { Row, Input, Button, Col } from 'antd';
import { PropTypes } from 'prop-types';

import FormController from '../helpers/FormController';
import { tagsCheck } from '../validators';

import _ from './ArticleForm.module.scss';

function TagComponent({
  index,
  tagText,
  control,
  register,
  errors,
  isLast,
  onAdd,
  onDelete,
}) {
  const fieldName = `tags.${index}.tag`;
  const fieldError = errors.tags?.[index]?.tag;

  return (
    <Row className={_.tag_row}>
      <Col span={11}>
        <FormController
          name={fieldName}
          control={control}
          rules={tagsCheck}
          errors={{ [fieldName]: fieldError }}
        >
          <Input
            id={fieldName}
            className={_.tag_input}
            placeholder="Tag"
            defaultValue={tagText}
            {...register(fieldName)}
          />
        </FormController>
      </Col>

      <Col>
        <Button
          className={_.delete_btn}
          htmlType="button"
          danger
          onClick={() => onDelete(index)}
        >
          Delete
        </Button>
      </Col>

      {isLast && (
        <Col className={_.add_tag}>
          <Button htmlType="button" onClick={onAdd}>
            Add Tag
          </Button>
        </Col>
      )}
    </Row>
  );
}

TagComponent.propTypes = {
  index: PropTypes.number.isRequired,
  tagText: PropTypes.string.isRequired,
  control: PropTypes.shape({}).isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.shape({
          type: PropTypes.string.isRequired,
          message: PropTypes.string.isRequired,
        }),
      })
    ),
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TagComponent;
