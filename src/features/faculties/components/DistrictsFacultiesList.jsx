import { Spin, Tag, Flex, Typography } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  SoundOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { withReactive } from '@/reactive';
import { ItemList } from '@/features/shared/components/itemList';

const { Text } = Typography;

const roleColors = {
  Master: 'purple',
  Headmaster: 'magenta',
};

export const DistrictsFacultiesList = withReactive(
  ({ data, monitors }) => {
    const loading = monitors.getByDistrictId;

    return (
      <Spin spinning={loading}>
        <ItemList data={data.faculties || []}>
          {({ item }) => (
            <Flex align="center" style={{ width: '100%' }} gap={12}>
              <Flex align="center" gap={8} style={{ width: 180, flexShrink: 0 }}>
                <UserOutlined style={{ color: '#1677ff', fontSize: 18, flexShrink: 0 }} />
                <Text strong ellipsis style={{ fontSize: 15, color: '#141414' }}>
                  {item.name}
                </Text>
              </Flex>

              <Flex style={{ width: 130, flexShrink: 0 }}>
                <Tag
                  color={roleColors[item.roleName] || 'blue'}
                  icon={<SafetyCertificateOutlined />}
                  style={{ margin: 0, fontSize: 12, fontWeight: 600, borderRadius: 4 }}
                >
                  {item.roleName?.toUpperCase() || '—'}
                </Tag>
              </Flex>

              <Flex align="center" gap={6} style={{ width: 130, flexShrink: 0 }}>
                <MobileOutlined style={{ color: '#8c8c8c', fontSize: 14 }} />
                <Text style={{ fontSize: 13, color: '#595959' }}>{item.phoneNumber || '—'}</Text>
              </Flex>

              <Flex align="center" gap={6} style={{ flex: 1, minWidth: 0 }}>
                <MailOutlined style={{ color: '#8c8c8c', fontSize: 14 }} />
                <Text ellipsis style={{ fontSize: 13, color: '#595959' }}>
                  {item.email || '—'}
                </Text>
              </Flex>

              <Flex align="center" gap={6} style={{ width: 390, flexShrink: 0 }}>
                {item.assignedBeaconNames?.length > 0 ? (
                  <>
                    <HeartOutlined style={{ color: '#1677ff', fontSize: 14 }} />
                    <Text strong ellipsis style={{ fontSize: 13, color: '#1677ff' }}>
                      {item.assignedBeaconNames.join(', ')}
                    </Text>
                  </>
                ) : (
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    No Beacon
                  </Text>
                )}
              </Flex>

              <Flex
                align="center"
                gap={8}
                style={{ width: 100, flexShrink: 0, justifyContent: 'flex-end' }}
              >
                <MessageOutlined
                  title="SMS"
                  style={{
                    fontSize: 18,
                    color: item.isSMSNotificationsEnabled ? '#2f54eb' : '#bfbfbf',
                    background: item.isSMSNotificationsEnabled ? '#f0f5ff' : 'transparent',
                    padding: 4,
                    borderRadius: '6px',
                  }}
                />
                <SoundOutlined
                  title="Voice"
                  style={{
                    fontSize: 18,
                    color: item.isVoiceNotificationsEnabled ? '#2f54eb' : '#bfbfbf',
                    background: item.isVoiceNotificationsEnabled ? '#f0f5ff' : 'transparent',
                    padding: 4,
                    borderRadius: '6px',
                  }}
                />
                <MailOutlined
                  title="Email Alert"
                  style={{
                    fontSize: 18,
                    color: item.isEmailNotificationsEnabled ? '#2f54eb' : '#bfbfbf',
                    background: item.isEmailNotificationsEnabled ? '#f0f5ff' : 'transparent',
                    padding: 4,
                    borderRadius: '6px',
                  }}
                />
              </Flex>
            </Flex>
          )}
        </ItemList>
      </Spin>
    );
  },
  {
    init: ({ services, districtId }) => {
      if (districtId) services.faculties.getByDistrictId(districtId);
    },
    queries: ({ districtId }) => [
      {
        name: 'faculties',
        collection: 'faculties',
        defaultValue: [],
        where: [{ field: ['districtId'], op: '==', value: Number(districtId) }],
      },
    ],
    monitors: () => ['getByDistrictId'],
  },
);
