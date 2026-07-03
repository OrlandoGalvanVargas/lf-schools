import { Input, Form } from 'antd';

export const TextInput = ({
  labelText,
  placeholder,
  helperText,
  maxLength,
  error,
  status,
  required = true,
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
      normalize={(val) => val?.trimStart()}
      hidden={hidden}
      rules={rules}
    >
      <Input
        placeholder={placeholder || defaultPlaceholder}
        maxLength={maxLength}
        showCount={!!maxLength}
        style={{ width: '100%' }}
        readOnly={readOnly}
        {...inputProps}
      />
    </Form.Item>
  );
};

export default TextInput;