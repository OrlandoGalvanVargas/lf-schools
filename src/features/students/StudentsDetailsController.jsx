import { withReactive } from '@/reactive';
import { StudentsDetails } from './StudentsDetails';

export const StudentsDetailsController = withReactive(
  ({ data, monitors, onBack }) => {
    return (
      <StudentsDetails
        students={data.students || {}}
        loading={monitors.getStudentById}
        onBack={onBack}
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
    monitors: () => ['getStudentById'],
  },
);
