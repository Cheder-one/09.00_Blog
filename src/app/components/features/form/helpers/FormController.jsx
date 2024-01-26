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
  message,
  children,
  className,
  hasFeedback,
}) {
  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      help={errors?.[name]?.message || message}
      hasFeedback={hasFeedback}
      validateStatus={errors?.[name] || message ? 'error' : 'success'}
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
  rules: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  message: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  hasFeedback: PropTypes.bool,
};

FormController.defaultProps = {
  label: '',
  hasFeedback: false,
  rules: {},
  errors: {},
  message: '',
  className: '',
};

export default FormController;
