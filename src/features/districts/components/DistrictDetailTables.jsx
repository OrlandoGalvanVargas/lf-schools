import { HeartOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import { BaseTabs } from '@/features/shared/components/tabs/BaseTabs';
import { DistrictsSchoolsList } from '@/features/schools';
import { DistrictsBeaconsList } from '@/features/beacons/components';
import { DistrictsFacultiesList } from '@/features/faculties/components';

export const DistrictDetailTables = ({ districtId }) => {
  const tabs = [
    {
      label: 'Devices',
      icon: HeartOutlined,
      children: <DistrictsBeaconsList districtId={districtId} />,
    },
    {
      label: 'Faculties',
      icon: TeamOutlined,
      children: <DistrictsFacultiesList districtId={districtId} />,
    },
    {
      label: 'Schools',
      icon: BookOutlined,
      children: <DistrictsSchoolsList districtId={districtId} />,
    },
  ];

  return <BaseTabs tabs={tabs} />;
};
