import { Form, Col } from 'antd';
import { TextInput, PhoneInput } from '@/features/shared/components/inputs';

export function ContactForm({ namePrefix, readOnly }) {
    const getName = (name) => namePrefix ? [namePrefix, name] : name;

    return (
        <>
            <Col span={12}>
                <TextInput
                    labelText="First name"
                    name={getName("firstName")}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    readOnly={readOnly}
                    rules={[{ required: true, message: 'Please enter a first name' }]}
                />
            </Col>
            <Col span={12}>
                <TextInput
                    labelText="Last name"
                    name={getName("lastName")}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    readOnly={readOnly}
                    rules={[{ required: true, message: 'Please enter a last name' }]}
                />
            </Col>
            <Col span={24}>
                <TextInput
                    labelText="Email"
                    name={getName("email")}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    readOnly={readOnly}
                    rules={[
                        { required: true, message: 'Please enter an email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                />
            </Col>
            <Col span={12}>
                <PhoneInput
                    labelText="Phone number"
                    name={getName("phoneNumber")}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    readOnly={readOnly}
                    rules={[{ required: true, message: 'Please enter a phone number' }]}
                />
            </Col>
            <Col span={12}>
                <PhoneInput
                    labelText="Mobile phone"
                    name={getName("mobilePhone")}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    readOnly={readOnly}
                    rules={[{ required: true, message: 'Please enter a mobile number' }]}

                />
            </Col>

            <Form.Item name={getName("id")} hidden>
                <input />
            </Form.Item>
        </>
    );
}