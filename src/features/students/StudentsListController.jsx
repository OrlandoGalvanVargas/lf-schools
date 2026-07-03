import { withReactive } from '@/reactive';
import { StudentsList } from './StudentsList';

export const StudentsListController = withReactive(
  ({ data, monitors, onView, services, onEdit, onCreate }) => {
    return (
      <StudentsList
        onView={onView}
        schools={data.schools || []}
        loading={
          monitors.getStudents ||
          monitors.deleteStudent ||
          monitors.createStudents ||
          monitors.updateStudent ||
          monitors.getSchools
        }
        onDelete={services.students.deleteStudent}
        onEdit={onEdit}
        onCreate={onCreate}
        onRefresh={() => {
          services.students.getStudents();
          services.schools.getSchools();
        }}
        refreshLoading={monitors.getStudents}
      />
    );
  },
  {
    init: ({ services }) => {
      services.students.getStudents();
      services.schools.getSchools();
    },
    queries: () => [
      {
        collection: 'students',
        name: 'students',
        defaultValue: [],
      },
      { name: 'schools', collection: 'schools', defaultValue: [] },
    ],
    monitors: () => [
      'getStudents',
      'createStudents',
      'deleteStudent',
      'updateStudent',
      'getSchools',
    ],
  },
);
