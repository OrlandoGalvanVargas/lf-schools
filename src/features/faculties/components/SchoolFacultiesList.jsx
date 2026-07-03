import { Spin, Flex, Tag, Typography, Space } from 'antd';
import {
    MessageOutlined,
    SoundOutlined,
    MailOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { withReactive } from '@/reactive';
import { ItemList } from '@/features/shared/components/itemList/ItemList';

const { Title } = Typography;

const roleColors = {
    Master: 'purple',
    Headmaster: 'magenta',
    Default: 'blue'
};

/**
 * Reusable component that fetches and displays faculties
 * for a given school ID using the ItemList shared component.
 *
 * Can be embedded in any module that needs to show faculties per school.
 *
 * @param {number|string} schoolId - The school ID to fetch faculties for.
 */
export const SchoolFacultiesList = withReactive(
    ({ data, monitors, schoolId }) => {
        const faculties = data.schoolFaculties || [];
        const loading = monitors.getBySchoolId;

        if (!schoolId) return null;

        return (
            <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>

                <Spin spinning={loading}>
                    <ItemList
                        data={faculties}
                    // onDetails={({ item }) => navigate(RoutePaths.faculties.detail(item.id))}
                    >
                        {({ item }) => (
                            <Flex justify="space-between" align="center" style={{ width: '100%', padding: '8px 0' }} gap="large">
                                <Flex vertical gap="4px" style={{ flex: 1 }}>
                                    <Title level={5} style={{ margin: 0 }}>
                                        {item.faculty}
                                    </Title>
                                    <Flex gap={8} wrap="wrap">
                                        <Tag color={roleColors[item.roleName] || roleColors.Default} icon={<SafetyCertificateOutlined />}>
                                            {item.roleName || '—'}
                                        </Tag>
                                    </Flex>
                                </Flex>

                                <Flex align="center" gap="large">
                                    <Space size="small">
                                        <MessageOutlined
                                            style={{ fontSize: '16px', color: item.notifications?.whatsapp ? '#2f54eb' : '#bfbfbf', background: item.notifications?.whatsapp ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                                        />
                                        <SoundOutlined
                                            style={{ fontSize: '16px', color: item.notifications?.voice ? '#2f54eb' : '#bfbfbf', background: item.notifications?.voice ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                                        />
                                        <MailOutlined
                                            style={{ fontSize: '16px', color: item.notifications?.email ? '#2f54eb' : '#bfbfbf', background: item.notifications?.email ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                                        />
                                    </Space>
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
                services.faculties.getBySchoolId(schoolId);
            }
        },
        queries: ({ schoolId }) => [
            {
                name: 'schoolFaculties',
                collection: 'faculties',
                defaultValue: [],
                where: [{ field: ['organization'], op: '==', value: Number(schoolId) }],
            },
        ],
        monitors: () => ['getBySchoolId'],
    },
); 
