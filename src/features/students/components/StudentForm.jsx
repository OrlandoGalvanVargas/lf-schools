import { Flex, Form, Spin, Typography, Tag } from 'antd';
const { Text, Title } = Typography;
import { PhoneOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { TextInput, NumberInput } from '@/features/shared/components/inputs';
import { DividerComponent } from '@/features/shared/components/divider';
import { SaveButton, CancelButton, SecondaryButton } from '@/features/shared/components/buttons';
import { HandleInternalCrud } from '@/features/shared/components/handleInternalCrud';
import { SchoolsLookup } from '@/features/shared/lookups';
import { ParentsForm } from './ParentsForm';
import { RelationshipTypesTag } from './RelationshipTypeTag';

export const StudentForm = ({
  initData = {},
  readOnly = false,
  loading = false,
  onSubmitForm = () => {},
  onBack,
}) => {
  const [form] = useForm();
  const [parentsList, setParentsList] = useState([]);

  if (loading) return <Spin size="large" />;
  return (
    <>
      <Form
        form={form}
        initialValues={initData}
        onFinish={values => {
          const newData = {
            ...values,
            contactId: values.contact.id,
            contact: {
              ...values.contact,
              name: `${values.contact.firstName} ${values.contact.lastName}`,
            },
            parents: parentsList,
          };
          onSubmitForm(newData);
        }}
      >
        <Flex gap={'large'}>
          <Flex vertical={true} gap={'middle'} flex={'1'}>
            <div>
              <DividerComponent
                title={
                  <Title level={5} style={{ margin: 0 }}>
                    School info.
                  </Title>
                }
              />
              <NumberInput labelText={'Student id'} name={['id']} readOnly={true} hidden={true} />

              <SchoolsLookup
                name={'schoolId'}
                required={!readOnly}
                readOnly={readOnly}
                rules={
                  !readOnly ? [{ required: true, message: 'Please input your School id!' }] : []
                }
              />

              <TextInput
                readOnly={readOnly}
                required={!readOnly}
                labelText={'Student number'}
                name={'studentNumber'}
                rules={
                  !readOnly
                    ? [
                        { required: true, message: 'Please input your Student number!' },
                        { type: 'string', message: 'Student number is a string' },
                      ]
                    : []
                }
              />
            </div>
            <div>
              <DividerComponent
                title={
                  <Title level={5} style={{ margin: 0 }}>
                    Contact info.
                  </Title>
                }
              />
              <NumberInput
                labelText={'Contact id'}
                name={['contact', 'id']}
                readOnly={true}
                hidden={true}
              />
              <TextInput
                readOnly={true}
                required={false}
                labelText={'Name'}
                name={['contact', 'name']}
                hidden={!readOnly}
              />
              <TextInput
                readOnly={readOnly}
                required={!readOnly}
                labelText={'First name'}
                name={['contact', 'firstName']}
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
                readOnly={readOnly}
                required={!readOnly}
                labelText={'Last name'}
                name={['contact', 'lastName']}
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
                readOnly={readOnly}
                required={!readOnly}
                labelText={'Email'}
                name={['contact', 'email']}
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
                readOnly={readOnly}
                required={!readOnly}
                labelText={'Phone number'}
                name={['contact', 'phoneNumber']}
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
                readOnly={readOnly}
                required={!readOnly}
                labelText={'Mobile phone'}
                name={['contact', 'mobilePhone']}
                rules={
                  !readOnly
                    ? [
                        { required: true, message: 'Please input your Mobile phone!' },
                        { type: 'tel', message: 'Mobile phone is a telephone number' },
                      ]
                    : []
                }
              />
            </div>
          </Flex>
          <div style={{ flex: '1' }}>
            <DividerComponent
              title={
                <Title level={5} style={{ margin: 0 }}>
                  Parents
                </Title>
              }
            />
            <HandleInternalCrud
              initListData={initData.parents ? initData.parents : []}
              setData={setParentsList}
              readOnly={readOnly}
              dataForm={({ closeDrawer, addData, form, isReadOnly }) => {
                return (
                  <ParentsForm
                    onBack={closeDrawer}
                    onSubmitForm={addData}
                    initData={form}
                    readOnly={isReadOnly}
                  />
                );
              }}
              showInfo={({ item }) => {
                return (
                  <>
                    <Flex vertical style={{ flex: '1' }} gap={'small'}>
                      <Title level={5} style={{ margin: 0 }}>
                        <Flex gap={'small'}>
                          <UserOutlined />
                          {`${item.firstName} ${item.lastName}`}
                        </Flex>
                      </Title>
                      <Flex gap={'small'}>
                        <Tag type={'secondary'} icon={<PhoneOutlined />}>
                          {item.phoneNumber}
                        </Tag>
                        <RelationshipTypesTag id={item.relationshipTypeId} />
                      </Flex>
                    </Flex>
                  </>
                );
              }}
            />
          </div>
        </Flex>
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
      </Form>
    </>
  );
};
