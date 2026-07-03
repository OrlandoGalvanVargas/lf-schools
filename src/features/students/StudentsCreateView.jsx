import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { StudentsCreateController } from './StudentsCreateController';

export const StudentsCreateView = () => {
  const navigate = useNavigate();

  return (
    <StudentsCreateController
      onBack={() => {
        navigate(RoutePaths.students.list());
      }}
    />
  );
};
