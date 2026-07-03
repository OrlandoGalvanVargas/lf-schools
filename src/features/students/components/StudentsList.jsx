import { Flex, Typography, Tag } from 'antd';
const { Text, Title } = Typography;
import { ScheduleOutlined, UserOutlined } from '@ant-design/icons';

import { withReactive } from '@/reactive';
import { ItemList } from '@/features/shared/components/itemList';

export const StudentsList = withReactive(
  ({ data, onDelete, onEdit, onView }) => {
    return (
      <ItemList data={data.students || []} onDelete={onDelete} onEdit={onEdit} onDetails={onView}>
        {({ item }) => {
          return (
            <>
              <Flex vertical style={{ flex: '1' }} gap={'small'}>
                <Title level={5} style={{ margin: 0 }}>
                  <Flex gap={'small'}>
                    <UserOutlined />
                    {`${item.contact?.firstName || '—'} ${item.contact?.lastName || '—'}`}
                  </Flex>
                </Title>
                <Flex gap={'small'}>
                  <Tag color={'blue'} icon={<ScheduleOutlined />}>
                    {item?.studentNumber || '—'}
                  </Tag>
                </Flex>
              </Flex>
            </>
          );
        }}
      </ItemList>
    );
  },
  {
    init: ({ services }) => {
      services.students.getStudents();
    },
    queries: ({ schoolId }) => [
      {
        collection: 'students',
        name: 'students',
        where: [
          {
            field: ['schoolId'],
            op: '==',
            value: schoolId,
          },
        ],
        defaultValue: [],
      },
    ],
    monitors: () => ['getStudents'],
  },
);
