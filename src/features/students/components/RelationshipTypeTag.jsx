import { withReactive } from '@/reactive';
import { TeamOutlined, SyncOutlined } from '@ant-design/icons';

import { Tag } from 'antd';

export const RelationshipTypesTag = withReactive(
  ({ data, monitors }) => {
    return (
      <Tag color={'blue'} icon={<TeamOutlined />}>
        {monitors.getRelationshipTypeById ? (
          <SyncOutlined spin />
        ) : data.relationshipTypes?.id >= 0 ? (
          data.relationshipTypes.relationship.replace(/\b\w/g, c => c.toUpperCase())
        ) : (
          '-'
        )}
      </Tag>
    );
  },
  {
    init: ({ services, id }) => {
      services.relationshipTypes.getRelationshipTypeById(id);
    },
    queries: ({ id }) => [
      {
        collection: 'relationshipTypes',
        name: 'relationshipTypes',
        where: [
          {
            field: ['id'],
            op: 'byId',
            value: id,
          },
        ],
        defaultValue: [],
      },
    ],
    monitors: () => ['getRelationshipTypeById'],
  },
);
