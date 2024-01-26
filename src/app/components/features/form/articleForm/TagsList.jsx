import { Button, Col } from 'antd';
import { PropTypes } from 'prop-types';

import TagComponent from './TagComponent';
import _ from './ArticleForm.module.scss';

function TagsList({
  tags,
  remove,
  append,
  register,
  className,
  control,
  errors,
}) {
  const handleAdd = () => {
    append({ tag: '' });
  };
  const handleDelete = (id) => {
    remove(id);
  };

  return tags.length !== 0 ? (
    <div className={className}>
      {tags.map((field, i) => (
        <TagComponent
          index={i}
          key={field.id}
          tagText={field.tag}
          control={control}
          register={register}
          errors={errors}
          onAdd={handleAdd}
          onDelete={handleDelete}
          isLast={tags.length === i + 1}
        />
      ))}
    </div>
  ) : (
    <Col className={_.add_tag}>
      <Button htmlType="button" onClick={handleAdd}>
        Add Tag
      </Button>
    </Col>
  );
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ).isRequired,
  remove: PropTypes.func.isRequired,
  append: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  className: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};

TagsList.defaultProps = {
  className: '',
};
export default TagsList;
