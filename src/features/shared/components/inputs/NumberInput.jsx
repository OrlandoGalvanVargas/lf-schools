import { InputNumber, Form } from 'antd';

export const NumberInput = ({
  labelText,
  placeholder,
  required,
  error,
  status,
  helperText,
  min,
  max,
  maxLength,
  precision,
  labelCol,
  wrapperCol,
  hidden,
  rules,
  ...rest
}) => {
  const { name, readOnly, ...inputProps } = rest;
  const defaultPlaceholder = labelText ? `Enter ${labelText}...` : '';

  return (
    <Form.Item
      label={`${labelText} :`}
      name={name}
      required={required}
      validateStatus={error ? 'error' : status}
      help={error || helperText}
      labelCol={labelCol || { span: 6 }}
      wrapperCol={wrapperCol || { span: 18 }}
      style={{ marginBottom: 16 }}
      colon={false}
      hidden={hidden}
      rules={rules}
    >
      <InputNumber
        style={{ width: '100%' }}
        min={min}
        max={max}
        maxLength={maxLength}
        precision={precision}
        placeholder={placeholder || defaultPlaceholder}
        controls={false}
        readOnly={readOnly}
        {...inputProps}
      />
    </Form.Item>
  );
};

export default NumberInput;
