import { Card, Flex, Form, Input, Select } from 'antd';
const { Item } = Form;

export const FilterBar = ({ filters = [] }) => {
  return (
    <>
      <Card>
        <Flex gap={'middle'} wrap={true}>
          <Flex flex={1} gap={'middle'}>
            {filters.map((f, index) => {
              const { type, title, ...others } = f;
              switch (type) {
                case 'select':
                  return (
                    <Form.Item
                      key={index}
                      label={title}
                      style={{ marginBottom: '0', width: '100%' }}
                    >
                      <Select key={index} allowClear={true} {...others} />
                    </Form.Item>
                  );
                case 'input':
                  return (
                    <Form.Item
                      key={index}
                      label={title}
                      style={{ marginBottom: '0', width: '100%' }}
                    >
                      <Input key={index} allowClear={true} {...others} />
                    </Form.Item>
                  );
              }
            })}
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
