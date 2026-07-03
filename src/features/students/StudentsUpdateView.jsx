import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { StudentsUpdateController } from './StudentsUpdateController';

export const StudentsUpdateView = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  return (
    <StudentsUpdateController
      id={id}
      onBack={() => {
        navigate(RoutePaths.students.list());
      }}
    />
  );
};
