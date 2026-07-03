import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Flex, List } from 'antd';
import { ActionButton } from '@/features/shared/components/buttons';

export const ItemList = ({ data, onDetails, onEdit, onDelete, children }) => {
  const hasActions = onDetails || onEdit || onDelete;

  return (
    <>
      <div id="scrollableDiv" style={{ maxHeight: 400, overflow: 'auto' }}>
        <List
          size="large"
          bordered
          dataSource={data}
          rowKey={'id'}
          renderItem={(item, index) => (
            <List.Item
              actions={
                hasActions
                  ? [
                      <Flex gap={'small'}>
                        {onDetails && (
                          <ActionButton
                            type="info"
                            size="small"
                            icon={<EyeOutlined />}
                            style={{ color: '#1890FF' }}
                            onClick={() => onDetails({ item, index })}
                          />
                        )}
                        {onEdit && (
                          <ActionButton
                            type="edit"
                            icon={<EditOutlined />}
                            style={{ color: '#5D5FDA' }}
                            onClick={() => onEdit({ item, index })}
                          />
                        )}
                        {onDelete && (
                          <ActionButton
                            type="delete"
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete({ item, index })}
                          />
                        )}
                      </Flex>,
                    ]
                  : undefined
              }
            >
              {children({ item })}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
