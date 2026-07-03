import { useNavigate } from 'react-router-dom';
import { Typography, List, Divider } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  WifiOutlined,
  CarOutlined,
  MessageOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const modules = [
  {
    key: 'students',
    title: 'Students',
    description: 'Manage student records and parent contacts',
    icon: <UserOutlined />,
    path: '/students',
  },
  {
    key: 'schools',
    title: 'Schools',
    description: 'View and manage school organizations',
    icon: <BankOutlined />,
    path: '/schools',
  },
  {
    key: 'districts',
    title: 'Districts',
    description: 'View and manage districts',
    icon: <EnvironmentOutlined />,
    path: '/districts',
  },
  {
    key: 'beacons',
    title: 'Beacons',
    description: 'Monitor and configure beacon devices',
    icon: <WifiOutlined />,
    path: '/beacons',
  },
  {
    key: 'trips',
    title: 'Trips',
    description: 'Track and manage trips',
    icon: <CarOutlined />,
    path: '/trips',
  },
  {
    key: 'messages',
    title: 'Messages',
    description: 'Send and review notifications',
    icon: <MessageOutlined />,
    path: '/messages',
  },
];

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '-30 0px' }}>
      <Title level={3} style={{ marginBottom: 2, marginTop: 0 }}>
        Dashboard
      </Title>
      <Text type="secondary">Select a module to get started.</Text>

      <Divider style={{ margin: '16px 0' }} />

      <List
        itemLayout="horizontal"
        dataSource={modules}
        renderItem={m => (
          <List.Item
            onClick={() => navigate(m.path)}
            style={{
              cursor: 'pointer',
              padding: '16px 12px',
              borderRadius: 8,
              transition: 'background 0.15s ease',
            }}
            className="home-module-row"
          >
            <List.Item.Meta
              avatar={
                <span
                  style={{
                    fontSize: 18,
                    color: '#8c8c8c',
                    width: 24,
                    display: 'inline-flex',
                    justifyContent: 'center',
                  }}
                >
                  {m.icon}
                </span>
              }
              title={<Text strong>{m.title}</Text>}
              description={
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {m.description}
                </Text>
              }
            />
            <ArrowRightOutlined style={{ color: '#bfbfbf', fontSize: 14 }} />
          </List.Item>
        )}
      />

      <style>{`
        .home-module-row:hover {
          background: #fafafa;
        }
      `}</style>
    </div>
  );
};
