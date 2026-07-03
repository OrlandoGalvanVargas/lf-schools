import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';
import { useCallback } from 'react';

const StudentOption = ({ student }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
    <span style={{ fontWeight: 500, fontSize: '14px' }}>{student.contact.name}</span>
    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>{student.studentNumber}</span>
  </div>
);

export const StudentsLookup = withReactive(
  ({
    data,
    monitors,
    name = 'StudentsId',
    labelText = 'Students',
    placeholder = 'Select a student...',
    ...rest
  }) => {
    const studentsList = data?.students || [];

    const options = studentsList.map(s => ({
      label: s.contact.name,
      value: s.id,
      studentNumber: s.studentNumber,
      s,
    }));

    const optionRender = useCallback(option => {
      return <StudentOption student={option.data.s} />;
    }, []);

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        isAutocomplete={true}
        loading={monitors.getStudents}
        showSearch={{
          optionFilterProp: ['label', 'studentNumber'],
        }}
        optionRender={optionRender}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.students.getStudents();
    },
    queries: () => [
      {
        collection: 'students',
        name: 'students',
        defaultValue: [],
      },
    ],
    monitors: () => ['getStudents'],
  },
);
