import { Spin, Flex, Tag, Typography } from 'antd';
import {
    StarFilled,
    StarOutlined,
    MessageOutlined,
    SoundOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { withReactive } from '@/reactive';
import { ItemList } from '@/features/shared/components/itemList/ItemList';

const { Text, Title } = Typography;

const priorityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
};

/**
 * Reusable component that fetches and displays broadcast messages
 * for a given school ID using the ItemList shared component.
 *
 * Can be embedded in any module that needs to show messages per school.
 *
 * @param {number|string} schoolId - The school ID to fetch messages for.
 */
export const SchoolMessagesList = withReactive(
    ({ data, monitors, schoolId }) => {
        const messages = data.schoolMessages || [];
        const loading = monitors.getBySchoolId;

        if (!schoolId) return null;

        return (
            <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>

                <Spin spinning={loading}>
                    <ItemList
                        data={messages}
                    //onDetails={({ item }) => navigate(RoutePaths.messages.detail(item.id))}
                    >
                        {({ item }) => (
                            <Flex justify="space-between" align="center" style={{ width: '100%', padding: '8px 0' }} gap="large">
                                <Flex vertical gap="4px" style={{ flex: 1 }}>
                                    <Title level={5} style={{ margin: 0 }}>
                                        {item.description}
                                    </Title>
                                    <Flex gap={8} wrap="wrap">
                                        <Tag color="blue" icon={<MessageOutlined />}>
                                            {item.broadcastMessageType?.name || '—'}
                                        </Tag>
                                        <Tag color={priorityColors[item.broadcastMessagePriority?.name] || 'default'} icon={<ThunderboltOutlined />}>
                                            {item.broadcastMessagePriority?.name || '—'} Priority
                                        </Tag>
                                        <Tag color="purple" icon={<SoundOutlined />}>
                                            {item.broadcastMessageEnvironmentType?.name || '—'}
                                        </Tag>
                                    </Flex>
                                </Flex>

                                <Flex align="center" gap="large">
                                    <Flex vertical align="center">
                                        <Text type="secondary">
                                            {item.isFavorite
                                                ? <StarFilled style={{ color: '#faad14', fontSize: 20 }} />
                                                : <StarOutlined style={{ color: '#d9d9d9', fontSize: 20 }} />
                                            }
                                        </Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>
                                            {item.isFavorite}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}
                    </ItemList>
                </Spin>
            </div>
        );
    },
    {
        init: ({ services, schoolId }) => {
            if (schoolId) {
                services.broadcastMessages.getBySchoolId(schoolId);
            }
        },
        queries: ({ schoolId }) => [
            {
                name: 'schoolMessages',
                collection: 'broadcastMessages',
                defaultValue: [],
                where: [{ field: ['schoolId'], op: '==', value: Number(schoolId) }],
            },
        ],
        monitors: () => ['getBySchoolId'],
    },
);
