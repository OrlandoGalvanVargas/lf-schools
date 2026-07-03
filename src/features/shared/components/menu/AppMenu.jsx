import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HeartOutlined,
  HomeOutlined,
  TruckOutlined,
  MailOutlined,
  BookOutlined,
  BankOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { RoutePaths } from '@/features/routing';

export const AppMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: '/home',
          icon: <HomeOutlined />,
          label: 'Home',
        },
        // {
        //   key: RoutePaths.trips.list(),
        //   icon: <TruckOutlined />,
        //   label: 'Trips',
        // },
        // {
        //   key: RoutePaths.faculties.list(),
        //   icon: <BookOutlined />, // Re-using an icon since we don't have a specific one yet
        //   label: 'Faculties',
        // },
        {
          key: RoutePaths.students.list(),
          icon: <UserOutlined />,
          label: 'Students',
        },
        {
          key: RoutePaths.districts.list(),
          icon: <BankOutlined />,
          label: 'Districts',
        },
        {
          key: RoutePaths.messages.list(),
          icon: <MailOutlined />,
          label: 'Messages',
        },
        {
          key: RoutePaths.beacons.list(),
          icon: <HeartOutlined />,
          label: 'Beacons',
        },
        {
          key: RoutePaths.schools.list(),
          icon: <BookOutlined />,
          label: 'Schools',
        },
      ]}
    />
  );
};
