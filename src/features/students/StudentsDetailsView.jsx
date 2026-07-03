import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { StudentsDetailsController } from './StudentsDetailsController';

export const StudentsDetailsView = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  return (
    <StudentsDetailsController
      id={id}
      onBack={() => {
        navigate(RoutePaths.students.list());
      }}
    />
  );
};
