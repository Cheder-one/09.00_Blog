import { Form } from 'antd';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { Controller } from 'react-hook-form';

function FormController({
  name,
  label,
  control,
  rules,
  errors,
  children,
  className,
  hasFeedback,
}) {
  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      help={errors[name]?.message}
      validateStatus={errors[name] ? 'error' : 'success'}
      hasFeedback={hasFeedback}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => cloneElement(children, { ...field })}
      />
    </Form.Item>
  );
}

FormController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  rules: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
  hasFeedback: PropTypes.bool,
};

FormController.defaultProps = {
  label: '',
  hasFeedback: false,
};

export default FormController;
