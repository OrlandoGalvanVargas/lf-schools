import { Select, Form } from 'antd';

export const Dropdown = ({
  labelText,
  options = [],
  placeholder,
  isAutocomplete = false,
  required = true,
  error,
  status,
  helperText,
  labelCol,
  wrapperCol,
  hidden,
  rules,
  readOnly,
  ...rest
}) => {
  const defaultPlaceholder = labelText ? `Select ${labelText}...` : 'Select...';

  return (
    <Form.Item
      label={`${labelText} :`}
      name={rest.name}
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
      <Select
        style={{
          width: '100%',
          ...(readOnly ? { pointerEvents: 'none' } : {})
        }}
        placeholder={placeholder || defaultPlaceholder}
        options={options}
        open={readOnly ? false : undefined}
        showSearch={
          isAutocomplete
            ? {
              filterOption: (input, option) =>
                (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase()),
            }
            : false
        }
        {...rest}
      />
    </Form.Item>
  );
};

export default Dropdown;