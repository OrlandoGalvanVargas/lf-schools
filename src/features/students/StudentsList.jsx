import { Flex } from 'antd';
import { CrudTable } from '@/features/shared/components/table';
import { Filter } from '@/features/shared/components/filters';
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';

export const StudentsList = ({
  onCreate,
  onEdit,
  onView,
  loading,
  onDelete,
  onRefresh,
  refreshLoading,
  schools,
}) => {
  const schoolMap = Object.fromEntries(schools.map(s => [s.id, s.name]));
  const columns = [
    {
      field: 'studentNumber',
      title: 'Student number',
      render: value => value || '—',
      sorter: (a, b) => a.studentNumber.localeCompare(b.studentNumber),
    },
    {
      field: ['contact', 'name'],
      title: 'Name',
      render: value => value || '—',
      sorter: (a, b) => a.contact.name.localeCompare(b.contact.name),
    },
    {
      field: ['contact', 'mobilePhone'],
      title: 'Mobile phone',
      render: value => value || '—',
    },
    {
      field: 'schoolId',
      title: 'School',
      render: value => (value ? schoolMap[value] : '—'),
    },
    {
      field: 'parents',
      title: 'Parents ',
      render: value => (value ? value.length : '—'),
    },
  ];

  const filtersConfig = [
    {
      type: 'input',
      title: 'Number',
      field: ['studentNumber'],
      placeholder: 'Search by number...',
    },
    {
      type: 'input',
      title: 'Name',
      field: ['contact', 'name'],
      placeholder: 'Search by name...',
    },
    {
      type: 'select',
      field: ['schoolId'],
      title: 'School',
      filterOption: '==',
      placeholder: 'Select School',
      options: schools.map(s => ({ value: s.id, label: s.name })),
    },
  ];

  return (
    <>
      <Filter collectionName={'students'} filters={filtersConfig}>
        {({ filteredData }) => {
          return (
            <Flex vertical={true} gap={'large'}>
              <Flex justify="flex-end" gap={'middle'}>
                <RefreshButton onClick={onRefresh} loading={refreshLoading} />
                <AddButton onClick={onCreate} />
              </Flex>
              <CrudTable
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                rowKey="id"
                actionConfig={{ view: true, edit: true, delete: true }}
                onView={record => onView(record.id)}
                onEdit={record => onEdit(record.id)}
                onDelete={record => onDelete(record.id)}
              />
            </Flex>
          );
        }}
      </Filter>
    </>
  );
};
