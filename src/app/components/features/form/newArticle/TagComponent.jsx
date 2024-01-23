import { Row, Input, Button, Col } from 'antd';

import FormController from '../helpers/FormController';
import { tagsCheck } from '../validators';

import _ from './NewArticle.module.scss';

function TagComponent({ id, control, errors, isLast, onAdd, onDelete }) {
  return (
    <Row className={_.tag_row}>
      <Col span={11}>
        <FormController
          name={`tag_${id}`}
          control={control}
          rules={tagsCheck}
          errors={errors}
        >
          <Input id={`tag_${id}`} placeholder="Tag" className={_.tag_input} />
        </FormController>
      </Col>
      <Col>
        <Button
          className={_.delete_tag_btn}
          htmlType="button"
          danger
          onClick={onDelete}
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

export default TagComponent;
