import { Checkbox as AntCheckbox, Form } from 'antd';

export const Checkbox = ({
  labelText,
  children,
  onChange,
  required,
  error,
  status,
  helperText,
  hidden,
  rules,
  readOnly,
  ...props
}) => {
  const { name, valuePropName = 'checked', ...checkboxProps } = props;
  return (
    <Form.Item
      label={labelText}
      name={name}
      valuePropName={valuePropName}
      required={required}
      validateStatus={error ? 'error' : status}
      help={error || helperText}
      labelCol={{ xs: 24, sm: 6, md: 4 }}
      wrapperCol={{ xs: 24, sm: 18, md: 20 }}
      style={{ marginBottom: 16 }}
      hidden={hidden}
      rules={rules}
    >
      <AntCheckbox
        onChange={onChange}
        {...checkboxProps}
        style={{
          ...(readOnly ? { pointerEvents: 'none' } : {}),
          ...props.style
        }}
      >
        {children}
      </AntCheckbox>
    </Form.Item>
  );
};

export default Checkbox;