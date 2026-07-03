import { CrudTable } from '@/features/shared/components/table';
import { Tag } from 'antd';

export const BeaconList = (
  { beacons = [], schools = [], districts = [], faculties = [], loading, onView, onEdit, onDelete }
) => {

  const schoolMap = Object.fromEntries(
    schools.map(s => [s.id, s.name])
  );
  const districtMap = Object.fromEntries(
      districts.map(d => [d.id, d.name])
  );
  const facultiesMap = Object.fromEntries(
      faculties.map(d => [d.id, d.faculty])
  );

  const columns = [
    {
      field: 'deviceName',
      title: 'Beacon name',
    },
    {
      field: 'phoneNumber',
      title: 'Phone number',
    },
    {
      field: 'beaconType',
      title: 'Type',
    },
    {
      field: 'isAvailable',
      title: 'Is available',
      render: (value) =>
        value === true
          ? <Tag color="green">Available</Tag>
          : <Tag color="red">Not Available</Tag>
    },
    {
      field: 'districtId',
      title: 'District',
      render: (value) => value ? districtMap[value] || '----' : '----'
    },
    {
      field: 'facultyId',
      title: 'Faculty',
      render: (value) => value ? facultiesMap[value] || '----' : '----'
    },
    {
      field: 'schoolId',
      title: 'School',
      render: (value) => value ? schoolMap[value] || '----' : '----'
    }
  ]

  return( 
    <div>
      <CrudTable
          columns={columns}
          dataSource={ beacons }
          loading={loading}
          rowKey="id"
          actionConfig={{ view: true, edit: true, delete: true }}
          onView={(record) => onView(record.id)}
          onEdit={(record) => onEdit(record.id)}
          onDelete={(record) => onDelete(record.id)}
      />
    </div>
  );
}
