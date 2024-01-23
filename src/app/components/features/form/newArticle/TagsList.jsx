import { times } from 'lodash';
import { useState } from 'react';
import { Button, Col } from 'antd';

import TagComponent from './TagComponent';
import _ from './NewArticle.module.scss';

function TagsList({ className, unregister, control, errors }) {
  const [tagsCount, setTagsCount] = useState(1);

  const handleAdd = () => {
    setTagsCount((prev) => prev + 1);
  };

  const handleDelete = () => {
    setTagsCount((prev) => prev - 1);
    unregister(`tag_${tagsCount}`);
  };

  if (tagsCount === 0) {
    return (
      <Col className={_.add_tag}>
        <Button htmlType="button" onClick={handleAdd}>
          Add Tag
        </Button>
      </Col>
    );
  }

  return (
    <div className={className}>
      {times(tagsCount, (i) => {
        return (
          <TagComponent
            id={i}
            key={i}
            control={control}
            errors={errors}
            isLast={tagsCount === i + 1}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default TagsList;
