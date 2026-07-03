import { Flex, Form, Spin, Typography } from 'antd';
const { Title } = Typography;
import { useForm } from 'antd/es/form/Form';
import { TextInput, Dropdown, NumberInput } from '@/features/shared/components/inputs';
import { DividerComponent } from '@/features/shared/components/divider';
import { SaveButton, CancelButton, SecondaryButton } from '@/features/shared/components/buttons';
import { RelationShipTypesLookup } from '@/features/shared/lookups';

export const ParentsForm = ({
  initData = {},
  readOnly = false,
  loading = false,
  onSubmitForm = () => {},
  onBack,
}) => {
  const [form] = useForm();

  if (loading) return <Spin size="large" />;
  return (
    <>
      <Form
        form={form}
        initialValues={initData}
        onFinish={values => {
          onSubmitForm(values);
        }}
      >
        <Flex vertical={true} gap={'middle'}>
          <DividerComponent
            title={
              <Title level={5} style={{ margin: 0 }}>
                Parents info.
              </Title>
            }
          />
          <div>
            <NumberInput
              labelCol={{ span: 8 }}
              labelText={'Contact id'}
              name={['id']}
              disabled={true}
              hidden={true}
            />
            <TextInput
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'First name'}
              name={['firstName']}
              rules={
                !readOnly
                  ? [
                      { required: true, message: 'Please input your First name!' },
                      { type: 'string', message: 'First name is a string' },
                    ]
                  : []
              }
            />
            <TextInput
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'Last name'}
              name={['lastName']}
              rules={
                !readOnly
                  ? [
                      { required: true, message: 'Please input your Last name!' },
                      { type: 'string', message: 'Last name is a string' },
                    ]
                  : []
              }
            />
            <TextInput
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'Email'}
              name={['email']}
              rules={
                !readOnly
                  ? [
                      { required: true, message: 'Please input your Email!' },
                      { type: 'email', message: 'Email is an email' },
                    ]
                  : []
              }
            />
            <TextInput
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'Phone number'}
              name={['phoneNumber']}
              rules={
                !readOnly
                  ? [
                      { required: true, message: 'Please input your Phone number!' },
                      { type: 'tel', message: 'Phone number is a telephone number' },
                    ]
                  : []
              }
            />
            <TextInput
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'Mobile phone'}
              name={['mobilePhone']}
              rules={
                !readOnly
                  ? [
                      { required: true, message: 'Please input your Mobile phone!' },
                      { type: 'tel', message: 'Mobile phone is a telephone number' },
                    ]
                  : []
              }
            />
            <RelationShipTypesLookup
              name={'relationshipTypeId'}
              required={!readOnly}
              readOnly={readOnly}
              labelCol={{ span: 8 }}
              labelText={'Relationship type'}
              rules={
                !readOnly
                  ? [{ required: true, message: 'Please input the Relationship Type!' }]
                  : []
              }
            />
          </div>
          {!readOnly ? (
            <Flex justify="flex-end" gap={'middle'}>
              <SaveButton htmlType="submit" />
              <CancelButton onClick={onBack} htmlType="button" />
            </Flex>
          ) : (
            <Flex justify="flex-end" gap={'middle'}>
              <SecondaryButton onClick={onBack} htmlType="button">
                Close
              </SecondaryButton>
            </Flex>
          )}
        </Flex>
      </Form>
    </>
  );
};
