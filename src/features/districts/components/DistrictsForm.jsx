import { useEffect, useState } from 'react';
import { Form, Row, Col, Space } from 'antd';
import { TimeZoneLookup } from '@/features/shared/lookups';
import { DividerComponent } from '@/features/shared/components/divider';
import { TextInput, PhoneInput } from '@/features/shared/components/inputs';
import { CancelButton, SaveButton, SecondaryButton } from '@/features/shared/components/buttons';
import { AddressList } from '@/features/addresses';

export const DistrictsForm = ({
  mode = 'create',
  initialValues,
  loading = false,
  readOnly = false,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const isDetail = mode === 'detail';
  const [localAddresses, setLocalAddresses] = useState([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        contactFirstName: initialValues.contact?.firstName,
        contactLastName: initialValues.contact?.lastName,
        contactEmail: initialValues.contact?.email,
        contactPhoneNumber: initialValues.contact?.phoneNumber,
        contactMobilePhone: initialValues.contact?.mobilePhone,
      });
      setLocalAddresses(initialValues.addresses ?? []);
    } else {
      form.resetFields();
      setLocalAddresses([]);
    }
  }, [initialValues]);

  const handleFinish = values => {
    onSubmit?.(values, localAddresses);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px 40px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Form form={form} layout="horizontal" onFinish={handleFinish}>
          <Row gutter={48}>
            <Col xs={24} lg={12}>
              <DividerComponent title="District Information" />

              <TextInput
                name="name"
                labelText="District name"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'District name is required' }]}
              />

              <TimeZoneLookup
                name="timeZone"
                labelText="Time zone"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'Time zone is required' }]}
              />

              <DividerComponent title="Primary Contact" />

              <TextInput
                name="contactFirstName"
                labelText="First name"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'First name is required' }]}
              />

              <TextInput
                name="contactLastName"
                labelText="Last name"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'Last name is required' }]}
              />

              <TextInput
                name="contactEmail"
                labelText="Email"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[
                  { required: !isDetail, message: 'Email is required' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              />

              <PhoneInput
                name="contactPhoneNumber"
                labelText="Phone number"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'Phone number is required' }]}
              />

              <PhoneInput
                name="contactMobilePhone"
                labelText="Mobile phone"
                readOnly={loading || readOnly}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: !isDetail, message: 'Mobile phone is required' }]}
              />
            </Col>

            <Col xs={24} lg={12}>
              <DividerComponent title="Address Info" />
              <AddressList
                addresses={localAddresses}
                setAddresses={setLocalAddresses}
                readOnly={isDetail || readOnly}
              />
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Space size="large">
                {isDetail ? (
                  <SecondaryButton onClick={onCancel}>Close</SecondaryButton>
                ) : (
                  <CancelButton onClick={onCancel} />
                )}
                {!isDetail && <SaveButton htmlType="submit" loading={loading} />}
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
