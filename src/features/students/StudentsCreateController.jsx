import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { StudentsCreate } from './StudentsCreate';

export const StudentsCreateController = withReactive(
  ({ services, onBack, monitors }) => {
    useOnResultReactor({
      createStudent: {
        onSuccess: () => onBack?.(),
      },
    });
    return (
      <StudentsCreate
        onCreate={values => services.students.createStudent(values)}
        onBack={onBack}
        loading={monitors.createStudent}
      />
    );
  },
  {
    init: () => {},
    queries: () => [],
    monitors: () => ['createStudent'],
  },
);
