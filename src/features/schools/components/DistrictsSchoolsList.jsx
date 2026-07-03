import { Spin, Flex, Tag, Typography } from 'antd';
import {
    TeamOutlined,
    BookOutlined,
    MessageOutlined,
    UserOutlined,
    MailOutlined,
    AlertOutlined
} from '@ant-design/icons';
import { withReactive } from "@/reactive";
import { ItemList } from '@/features/shared/components/itemList';

const { Text, Title } = Typography;

export const DistrictsSchoolsList = withReactive(
    ({ data, monitors, districtId }) => {

        const loading = monitors.getSchoolsByDistrict;
        const schools = data.schools || []

        if (!districtId) return null

        return (
            <Spin spinning={loading}>
                <ItemList data={schools}>
                    {({ item }) => (
                        <Flex justify="space-between" align="center" style={{ width: '100%' }} gap="large">
                            <Flex vertical gap="4px" >
                                <Title level={5} style={{ margin: 0 }}>
                                    {item.name}
                                </Title>
                                <Flex gap={8} wrap="wrap">
                                    <Tag color="blue">
                                        {data.timeZones?.find(tz => tz.value === item.timeZone)?.label || item.timeZone || item.timeZone}
                                    </Tag>
                                    {item.soscallNumber && (
                                        <Tag color="error" icon={<AlertOutlined />}>
                                            SOS: {item.soscallNumber}
                                        </Tag>
                                    )}
                                </Flex>
                            </Flex>
                            <Flex gap="small" align="center" >
                                <UserOutlined />
                                <Flex vertical>
                                    <Text strong>{item.contact.name}</Text>
                                    <Text type="secondary">
                                        <MailOutlined /> {item.contact.email}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex align="center" gap="large">
                                <Flex vertical align="center">
                                    <TeamOutlined />
                                    <Text strong>{item.studentsCount}</Text>
                                    <Text type="secondary">STUDENTS</Text>
                                </Flex>
                                <Flex vertical align="center">
                                    <BookOutlined />
                                    <Text strong>{item.facultiesCount}</Text>
                                    <Text type="secondary">FACULTIES</Text>
                                </Flex>
                                <Flex vertical align="center">
                                    <MessageOutlined />
                                    <Text strong>{item.messagesCount}</Text>
                                    <Text type="secondary">MESSAGES</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </ItemList>
            </Spin>
        );
    },
    {
        init: ({ services, districtId }) => {
            districtId && services.schools.getSchoolsByDistrict(districtId)
            services.timeZones.getTimeZones()
        },
        queries: ({ districtId }) => [
            {
                collection: 'schools',
                name: 'schools',
                where: [{
                    op: '==',
                    field: ['districtId'],
                    value: districtId
                }],
                defaultValue: []
            },
            {
                collection: 'timeZones',
                name: 'timeZones'

            }
        ],
        monitors: () => ["getSchoolsByDistrict", "getTimeZones"]
    }
)