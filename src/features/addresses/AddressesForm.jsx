import { useEffect } from 'react';
import { Form, Row, Col, Space, Input } from 'antd';
import { SaveButton, CancelButton, SecondaryButton } from '@/features/shared/components/buttons';
import { TextInput, NumberInput } from '@/features/shared/components/inputs';
import { DividerComponent } from '@/features/shared/components/divider';
import { StatesLookup } from '@/features/shared/lookups';
import { AddressTypesLookup } from '@/features/shared/lookups';

const labelCol = { span: 6 };
const wrapperCol = { span: 18 };

export function AddressesForm({
  onSubmit,
  onCancel,
  initialValues,
  readOnly = false,
  loading = false,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = values => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign="left"
      >
        <DividerComponent title="Address Details" placement="left" />

        <TextInput
          labelText="Street 1"
          name="street1"
          rules={[
            { required: true, message: 'Street 1 is required' },
          ]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          readOnly={readOnly}
        />

        <TextInput
          labelText="Street 2"
          name="street2"
          required={false}
          rules={[{ max: 250, message: 'Street 2 cannot exceed 250 characters' }]}
          maxLength={250}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          readOnly={readOnly}
        />

        <TextInput
          labelText="Locality"
          name="locality"
          rules={[
            { required: true, message: 'Locality is required' },
          ]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          readOnly={readOnly}
        />

        <StatesLookup
          rules={[{ required: true, message: 'State is required' }]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          readOnly={readOnly}
          onSelect={(value, option) => {
            form.setFieldsValue({ state: option?.label });
          }}
        />

        <AddressTypesLookup
          rules={[{ required: true, message: 'Type is required' }]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          readOnly={readOnly}
          onSelect={(value, option) => {
            form.setFieldsValue({ type: option?.label });
          }}
        />

        <Form.Item name="state" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="type" hidden>
          <Input />
        </Form.Item>

        <DividerComponent title="Location" placement="left" />

        <Row gutter={16}>
          <Col span={12}>
            <TextInput
              labelText="Postal code"
              name="postalCode"
              rules={[
                { required: true, message: 'Postal Code is required' },
              ]}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <TextInput
              labelText="Postal code ext"
              name="postalCodeExt"
              required={false}
              rules={[{ max: 10, message: 'Extension cannot exceed 10 characters' }]}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <TextInput
              labelText="Country name"
              name="countryName"
              required={false}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <TextInput
              labelText="Country code"
              name="countryCode"
              required={false}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <NumberInput
              labelText="Latitude"
              name="latitude"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
              min={-90}
              max={90}
              precision={6}
              step={0.000001}
              rules={[{ type: 'number', min: -90, max: 90, message: 'Latitude must be between -90 and 90' }]}
            />
          </Col>
          <Col span={12}>
            <NumberInput
              labelText="Longitude"
              name="longitude"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              readOnly={readOnly}
              min={-180}
              max={180}
              precision={6}
              step={0.000001}
              rules={[
                { type: 'number', min: -180, max: 180, message: 'Longitude must be between -180 and 180' },
              ]}
            />
          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <Space>
            {readOnly ? (
              <SecondaryButton onClick={onCancel}>Close</SecondaryButton>
            ) : (
              <CancelButton onClick={onCancel} />
            )}
            {!readOnly && (
              <SaveButton onClick={() => form.submit()} loading={loading} disabled={loading}>
                Save Address
              </SaveButton>
            )}
          </Space>
        </div>
      </Form>
    </div>
  );
}
