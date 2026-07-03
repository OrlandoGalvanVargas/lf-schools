import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { StudentsUpdate } from './StudentsUpdate';

export const StudentsUpdateController = withReactive(
  ({ data, monitors, onBack, services, id }) => {
    useOnResultReactor({
      updateStudent: {
        onSuccess: () => onBack?.(),
      },
    });
    return (
      <StudentsUpdate
        students={{ ...(data?.students || []) }}
        onBack={onBack}
        loading={monitors.getStudentById || monitors.updateStudent}
        onEdit={values => {
          services.students.updateStudent(id, values);
        }}
      />
    );
  },
  {
    init: ({ services, id }) => {
      services.students.getStudentById(id);
    },
    queries: ({ id }) => [
      {
        collection: 'students',
        name: 'students',
        where: [
          {
            field: ['id'],
            op: 'byId',
            value: id,
          },
        ],
        defaultValue: [],
      },
    ],
    monitors: () => ['getStudentById', 'updateStudent'],
  },
);
