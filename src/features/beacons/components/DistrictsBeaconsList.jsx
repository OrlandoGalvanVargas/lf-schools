import { Spin, Tag, Flex, Typography } from 'antd';
import {
  MobileOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { withReactive } from '@/reactive';
import { ItemList } from '@/features/shared/components/itemList';

const { Text } = Typography;
const getBatteryMeta = level => {
  const num = parseInt(level || 0);
  if (num >= 80) {
    return { color: 'success', icon: '🔋' };
  }
  if (num >= 40) {
    return { color: 'warning', icon: '🔋' };
  }
  return { color: 'error', icon: '🪫' };
};

export const DistrictsBeaconsList = withReactive(
  ({ data, monitors }) => {
    const loading = monitors.getBeaconByDistrictId;
    return (
      <Spin spinning={loading}>
        <ItemList data={data.beacons || []}>
          {({ item }) => {
            const beaconTypeName = item.beaconType;
            const lastLocation = item.locations?.[item.locations.length - 1];
            const { color, icon } = getBatteryMeta(lastLocation?.batteryLevel);

            return (
              <Flex align="center" style={{ width: '100%' }} gap={12}>
                <Flex align="center" gap={8} style={{ width: 140, flexShrink: 0 }}>
                  <HeartOutlined style={{ color: '#1677ff', fontSize: 18, flexShrink: 0 }} />
                  <Text strong ellipsis style={{ fontSize: 15, color: '#141414' }}>
                    {item.deviceName}
                  </Text>
                </Flex>

                <Flex align="center" gap={6} style={{ width: 140, flexShrink: 0 }}>
                  <MobileOutlined style={{ color: '#595959', fontSize: 14, flexShrink: 0 }} />
                  <Text style={{ fontSize: 13, color: '#595959', fontWeight: 500 }}>
                    {item.phoneNumber || '—'}
                  </Text>
                </Flex>

                <Flex align="center" gap={6} style={{ flex: 1, minWidth: 0 }}>
                  <EnvironmentOutlined style={{ color: '#1677ff', fontSize: 14, flexShrink: 0 }} />
                  <Text ellipsis style={{ fontSize: 13, color: '#262626' }}>
                    {lastLocation?.reverseGeocode ||
                      (lastLocation ? `${lastLocation.street1}, ${lastLocation.street2}` : '—')}
                  </Text>
                </Flex>

                <Flex style={{ width: 110, flexShrink: 0 }}>
                  <Text type="secondary" ellipsis style={{ fontSize: 13, color: '#262626' }}>
                    {lastLocation?.locality || '—'}
                  </Text>
                </Flex>

                <Flex style={{ width: 80, flexShrink: 0 }}>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, fontWeight: 600, color: '#909090' }}
                  >
                    {lastLocation?.state?.toUpperCase() || '—'}
                  </Text>
                </Flex>

                <Flex style={{ width: 90, flexShrink: 0, justifyContent: 'flex-start' }}>
                  {lastLocation ? (
                    <Tag
                      color={color}
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 'bold',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      {lastLocation.batteryLevel}
                    </Tag>
                  ) : (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      —
                    </Text>
                  )}
                </Flex>

                <Flex
                  align="center"
                  gap={8}
                  style={{ width: 210, flexShrink: 0, justifyContent: 'space-between' }}
                >
                  <Tag
                    color="blue"
                    style={{ margin: 0, fontSize: 10, fontWeight: 650, letterSpacing: '0.5px' }}
                  >
                    {beaconTypeName?.toUpperCase() || '—'}
                  </Tag>
                  <Tag
                    color={item.isAvailable ? 'success' : 'error'}
                    icon={item.isAvailable ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    style={{ margin: 0, minWidth: 100, textAlign: 'center', fontWeight: 500 }}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Tag>
                </Flex>
              </Flex>
            );
          }}
        </ItemList>
      </Spin>
    );
  },
  {
    init: ({ services, districtId }) => {
      if (districtId) services.beacons.getBeaconByDistrictId(Number(districtId));
    },
    queries: ({ districtId }) => [
      {
        collection: 'beacons',
        name: 'beacons',
        where: [{ op: '==', field: ['districtId'], value: districtId }],
        defaultValue: [],
      },
    ],
    monitors: () => ['getBeaconByDistrictId'],
  },
);
