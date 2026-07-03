import { Input, Form } from 'antd';

const PhoneInputField = ({ value, onChange, ...rest }) => {
    const handleChange = (e) => {
        let val = e.target.value;

        const firstChar = val.startsWith('+') ? '+' : '';
        const restOfStr = val.startsWith('+') ? val.slice(1) : val;
        const digitsOnly = restOfStr.replace(/[^\d]/g, '');

        const finalVal = (firstChar + digitsOnly).trim();
        onChange?.(finalVal);
    };

    return (
        <Input
            value={value}
            onChange={handleChange}
            style={{ width: '100%' }}
            {...rest}
        />
    );
};

export const PhoneInput = ({
    labelText,
    name,
    required = true,
    labelCol,
    wrapperCol,
    status,
    error,
    maxLength = 15,
    helperText,
    placeholder,
    hidden,
    rules,
    readOnly,
    ...rest
}) => {
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
            normalize={(val) => val?.trim()}
            hidden={hidden}
            rules={rules}
        >
            <PhoneInputField maxLength={maxLength} placeholder={placeholder || defaultPlaceholder} readOnly={readOnly} {...rest} />
        </Form.Item>
    );
};

export default PhoneInput;
