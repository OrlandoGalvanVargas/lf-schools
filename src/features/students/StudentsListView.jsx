import { useNavigate } from 'react-router-dom';
import { StudentsListController } from './StudentsListController';
import { RoutePaths } from '@/features/routing';

export const StudentsListView = () => {
  const navigate = useNavigate();
  return (
    <StudentsListController
      onView={id => {
        navigate(RoutePaths.students.details(id));
      }}
      onEdit={id => {
        navigate(RoutePaths.students.update(id));
      }}
      onCreate={() => navigate(RoutePaths.students.create())}
    />
  );
};
