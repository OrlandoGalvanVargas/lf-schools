import { CrudTable } from '@/features/shared/components/table';

export const DistrictList = ({ districts = [], loading = false, onView, onEdit, onDelete }) => {
  const columns = [
    {
      field: 'name',
      title: 'District name',
      key: 'name',
      render: value => value,
    },
    {
      field: 'timeZone',
      title: 'Time zone',
      key: 'timeZone',
      render: value => value || '—',
    },
    {
      field: 'contact',
      title: 'Contact',
      key: 'contact',
      render: value => value?.name || '—',
    },
    {
      field: 'schools',
      title: 'Schools',
      key: 'schools',
      align: 'center',
      sorter: (a, b) => (a.schools || 0) - (b.schools || 0),
      render: value => value || 0,
    },
    {
      field: 'devices',
      title: 'Devices',
      key: 'devices',
      align: 'center',
      sorter: (a, b) => (a.devices || 0) - (b.devices || 0),
      render: value => value || 0,
    },
    {
      field: 'faculties',
      title: 'Faculties',
      key: 'faculties',
      align: 'center',
      sorter: (a, b) => (a.faculties || 0) - (b.faculties || 0),
      render: value => value || 0,
    },
  ];

  return (
    <CrudTable
      columns={columns}
      dataSource={districts}
      rowKey="id"
      loading={loading}
      actionConfig={{ view: true, edit: true, delete: true }}
      onView={record => onView(record.id)}
      onEdit={record => onEdit(record.id)}
      onDelete={record => onDelete(record.id)}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
    />
  );
};
